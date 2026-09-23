import { NextRequest, NextResponse } from "next/server";
import { getLeadById, addClientMessage } from "@/lib/leads-storage";
import { sendClientReplyEmail } from "@/lib/email-service";

const VALID_TOKEN = "elmia_authenticated_session_token_2026";
const AUTH_COOKIE_NAME = "elmia_crm_session";

function isAuthorized(req: NextRequest): boolean {
  const cookieVal = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieVal === VALID_TOKEN) return true;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.replace("Bearer ", "") === VALID_TOKEN) return true;

  return false;
}

export async function POST(
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

  try {
    const body = await req.json();
    const { subject, message } = body;

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "Email subject is required." },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message body is required." },
        { status: 400 }
      );
    }

    const lead = await getLeadById(id);
    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead record not found." },
        { status: 404 }
      );
    }

    // 1. Send outbound email to client via Resend
    const emailResult = await sendClientReplyEmail({
      lead,
      subject: subject.trim(),
      messageContent: message.trim()
    });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Email transmission failed: ${emailResult.error || "Unknown error"}`
        },
        { status: 502 }
      );
    }

    // 2. Persist message to CRM communication history & advance status to 'responded'
    const updatedRecord = await addClientMessage(id, {
      subject: subject.trim(),
      content: message.trim(),
      sender: "ELMIA DMC <info@elmiadmc.com>",
      recipient: lead.email,
      status: "delivered",
      messageId: emailResult.messageId
    });

    if (!updatedRecord) {
      return NextResponse.json(
        {
          success: false,
          error: "Email was delivered, but communication record could not be saved."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Client reply delivered successfully.",
      lead: updatedRecord.lead,
      clientMessage: updatedRecord.message
    });
  } catch (error) {
    console.error("Client message dispatch error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while transmitting reply." },
      { status: 500 }
    );
  }
}
