import { NextRequest, NextResponse } from "next/server";
import { findLeadByEmailOrId, addClientMessage } from "@/lib/leads-storage";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Clean email string: "Elena Rostova <client@domain.com>" -> "client@domain.com"
function extractEmailAddress(raw: string): string {
  const match = raw.match(/<([^>]+)>/);
  if (match && match[1]) {
    return match[1].trim().toLowerCase();
  }
  return raw.trim().toLowerCase();
}

// Extract lead ID if embedded in address or subject
function extractLeadIdFromInbound(to: string[], subject: string): string | null {
  // Check TO addresses for pattern: reply+lead-123@...
  for (const addr of to) {
    const match = addr.match(/reply\+([a-zA-Z0-9_-]+)@/i);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Check Subject for pattern: [ELMIA:lead-123] or [ELMIA-lead-123]
  const subjectMatch = subject.match(/\[ELMIA[:-]([a-zA-Z0-9_-]+)\]/i);
  if (subjectMatch && subjectMatch[1]) {
    return subjectMatch[1];
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify event type
    const eventType = body?.type;
    const data = body?.data || body;

    const fromHeader = data?.from || "";
    const toHeaders: string[] = Array.isArray(data?.to) ? data.to : [data?.to || ""];
    const subject = data?.subject || "Re: Client Response";
    const emailId = data?.email_id || data?.id;

    const clientEmail = extractEmailAddress(fromHeader);

    if (!clientEmail) {
      return NextResponse.json(
        { success: false, error: "Sender email could not be parsed." },
        { status: 400 }
      );
    }

    // Try fetching full body if Resend receiving API is accessible
    let messageText = data?.text || data?.body || "";
    if (!messageText && emailId && resend) {
      try {
        const received = await resend.emails.receiving.get(emailId);
        if (received?.data) {
          const receivedData = received.data as unknown as { text?: string; html?: string };
          messageText = receivedData.text || receivedData.html || "";
        }
      } catch (recvErr) {
        console.warn("[InboundWebhook] Could not fetch raw email via receiving.get:", recvErr);
      }
    }

    if (!messageText) {
      messageText = `[Inbound Email Received from ${fromHeader}]\nSubject: ${subject}\n(Full email content logged under Resend ID: ${emailId || "N/A"})`;
    }

    // Identify target lead:
    // 1. Direct tag in 'to' or 'subject'
    // 2. Client email matching in database
    const taggedLeadId = extractLeadIdFromInbound(toHeaders, subject);
    let targetLead = taggedLeadId ? await findLeadByEmailOrId(taggedLeadId) : null;

    if (!targetLead) {
      targetLead = await findLeadByEmailOrId(clientEmail);
    }

    if (!targetLead) {
      console.warn(`[InboundWebhook] No matching lead found for client email: ${clientEmail} or tag: ${taggedLeadId}`);
      return NextResponse.json({
        success: true,
        warning: `Received email from ${clientEmail}, but no matching active CRM lead was found.`
      });
    }

    // Persist incoming message to lead communication timeline
    const result = await addClientMessage(targetLead.id, {
      subject,
      content: messageText.trim(),
      sender: fromHeader || clientEmail,
      recipient: "info@elmiadmc.com",
      status: "delivered",
      messageId: emailId,
      direction: "inbound"
    });

    console.log(
      `[InboundWebhook] Successfully recorded client response from ${clientEmail} on lead ${targetLead.id}`
    );

    // Forward notification alert to company desk so team sees it in their regular email too
    if (resend) {
      try {
        await resend.emails.send({
          from: "ELMIA DMC System <notifications@elmiadmc.com>",
          to: ["info@elmiadmc.com"],
          replyTo: clientEmail,
          subject: `[Client Reply in CRM] ${targetLead.name} (${targetLead.company || "VIP"}): ${subject}`,
          html: `
            <div style="font-family: sans-serif; background-color: #0b0f17; color: #f8fafc; padding: 24px; border-radius: 8px;">
              <h2 style="color: #c5a880; margin-top: 0;">New Client Response Received in CRM</h2>
              <p><strong>Client:</strong> ${targetLead.name} (${clientEmail})</p>
              <p><strong>Lead Service:</strong> ${targetLead.service || targetLead.category}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr style="border-color: #1e293b; margin: 16px 0;" />
              <div style="background: #111827; padding: 16px; border-left: 3px solid #c5a880; border-radius: 4px; white-space: pre-wrap; font-size: 14px;">
${messageText}
              </div>
              <p style="margin-top: 20px;">
                <a href="https://elmiadmc.com/crm/${targetLead.category === "proposal" ? "proposals" : "contacts"}/${targetLead.id}" style="background-color: #c5a880; color: #000; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
                  View Conversation in CRM Platform →
                </a>
              </p>
            </div>
          `
        });
      } catch (fwdErr) {
        console.error("[InboundWebhook] Failed to forward email notification to info@elmiadmc.com:", fwdErr);
      }
    }

    return NextResponse.json({
      success: true,
      leadId: targetLead.id,
      messageId: result?.message?.id
    });
  } catch (err: unknown) {
    const errorStr = err instanceof Error ? err.message : String(err);
    console.error("[InboundWebhook] Error handling inbound email:", errorStr);
    return NextResponse.json(
      { success: false, error: errorStr },
      { status: 500 }
    );
  }
}
