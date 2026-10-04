import { NextRequest, NextResponse } from "next/server";
import { 
  getDriverById, 
  updateDriverStatus, 
  updateDriverNotes, 
  deleteDriverApplication 
} from "@/lib/drivers-storage";
import { DriverStatus } from "@/types/driver";

const VALID_TOKEN = "elmia_authenticated_session_token_2026";
const AUTH_COOKIE_NAME = "elmia_crm_session";

function isAuthorized(req: NextRequest): boolean {
  const cookieVal = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieVal === VALID_TOKEN) return true;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.replace("Bearer ", "") === VALID_TOKEN) return true;

  return false;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const driver = await getDriverById(id);

  if (!driver) {
    return NextResponse.json(
      { success: false, error: "Driver not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, driver });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const body = await req.json();

  let updatedDriver = null;

  if (body.status !== undefined) {
    const validStatuses: DriverStatus[] = ["pending", "reviewed", "approved", "rejected"];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, error: "Invalid driver status." },
        { status: 400 }
      );
    }
    updatedDriver = await updateDriverStatus(id, body.status);
  }

  if (body.notes !== undefined) {
    updatedDriver = await updateDriverNotes(id, String(body.notes));
  }

  if (!updatedDriver) {
    return NextResponse.json(
      { success: false, error: "Driver not found or update failed." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, driver: updatedDriver });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const success = await deleteDriverApplication(id);

  if (!success) {
    return NextResponse.json(
      { success: false, error: "Driver not found or deletion failed." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Driver application deleted successfully."
  });
}
