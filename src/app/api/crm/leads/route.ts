import { NextRequest, NextResponse } from "next/server";
import { 
  getAllLeads, 
  updateLeadStatus, 
  updateLeadNotes, 
  trashLead, 
  restoreLead, 
  emptyTrash, 
  deleteLeadPermanently 
} from "@/lib/leads-storage";
import { LeadStatus } from "@/types/crm";

const VALID_TOKEN = "elmia_authenticated_session_token_2026";
const AUTH_COOKIE_NAME = "elmia_crm_session";

function isAuthorized(req: NextRequest): boolean {
  const cookieVal = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieVal === VALID_TOKEN) return true;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.replace("Bearer ", "") === VALID_TOKEN) return true;

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  const leads = await getAllLeads();
  return NextResponse.json({
    success: true,
    leads
  });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, action, status, internalNotes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required." },
        { status: 400 }
      );
    }

    let updatedLead = null;

    if (action === "trash") {
      updatedLead = await trashLead(id);
    } else if (action === "restore") {
      updatedLead = await restoreLead(id);
    } else if (status) {
      updatedLead = await updateLeadStatus(id, status as LeadStatus, internalNotes);
    } else if (internalNotes !== undefined) {
      updatedLead = await updateLeadNotes(id, internalNotes);
    }

    if (!updatedLead) {
      return NextResponse.json(
        { success: false, error: "Lead not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const action = searchParams.get("action");
    const permanent = searchParams.get("permanent") === "true";

    // Batch empty trash
    if (action === "empty-trash") {
      const purgedCount = await emptyTrash();
      return NextResponse.json({
        success: true,
        message: `Trash emptied (${purgedCount} items permanently deleted).`,
        count: purgedCount
      });
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required." },
        { status: 400 }
      );
    }

    if (permanent) {
      const success = await deleteLeadPermanently(id);
      if (!success) {
        return NextResponse.json(
          { success: false, error: "Lead not found." },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "Lead permanently removed from server."
      });
    } else {
      // Default: soft-delete into trash
      const trashed = await trashLead(id);
      if (!trashed) {
        return NextResponse.json(
          { success: false, error: "Lead not found." },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "Lead moved to trash.",
        lead: trashed
      });
    }
  } catch (err) {
    console.error("DELETE lead error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete lead." },
      { status: 500 }
    );
  }
}

