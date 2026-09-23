import { Resend } from "resend";
import { Lead } from "@/types/crm";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Target recipient address (info@elmiadmc.com)
const PRIMARY_RECIPIENT = process.env.NOTIFICATION_EMAIL || "info@elmiadmc.com";
// Fallback recipient when Resend domain is in sandbox test mode
const FALLBACK_TEST_RECIPIENT = "erdemirs@gmail.com";

// Sender address: verified domain on Resend
const DEFAULT_SENDER =
  process.env.NOTIFICATION_FROM || "ELMIA DMC Inbound <notifications@elmiadmc.com>";

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  deliveredTo?: string;
  warning?: string;
  error?: string;
}

/**
 * Sends a luxury HTML notification email to info@elmiadmc.com whenever a new lead is submitted.
 * Designed with reply-to pointing directly to the client's email.
 */
export async function sendLeadNotificationEmail(
  lead: Lead
): Promise<SendEmailResult> {
  if (!resend) {
    console.warn("[EmailService] Resend API key is missing. Skipping email notification.");
    return { success: false, error: "Resend API key not configured" };
  }

  const isProposal = lead.category === "proposal";
  const priorityBadge =
    lead.priority === "vip"
      ? "★ VIP PRIORITY"
      : lead.priority === "high"
      ? "HIGH PRIORITY"
      : "NORMAL";

  const priorityColor =
    lead.priority === "vip"
      ? "#eab308" // Gold/Yellow
      : lead.priority === "high"
      ? "#f97316" // Orange
      : "#94a3b8"; // Slate

  const subject = isProposal
    ? `[ELMIA DMC] ${lead.priority === "vip" ? "⭐ " : ""}New Proposal Request: ${lead.name}${
        lead.company ? ` (${lead.company})` : ""
      }`
    : `[ELMIA DMC] New Contact Message: ${lead.name}${
        lead.topic ? ` — ${lead.topic}` : ""
      }`;

  const crmUrl = `https://elmiadmc.com/crm/${
    isProposal ? "proposals" : "contacts"
  }`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f17; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #182234 0%, #0b0f17 100%); border-bottom: 2px solid #c5a880;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #c5a880; font-weight: 700; display: block; margin-bottom: 6px;">
                      ELMIA DMC • DISPATCH INGESTION
                    </span>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                      ${isProposal ? "New Luxury Proposal Request" : "New Client Inquiry"}
                    </h1>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; background-color: ${priorityColor}22; color: ${priorityColor}; border: 1px solid ${priorityColor}66;">
                      ${priorityBadge}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Overview -->
          <tr>
            <td style="padding: 28px 32px;">
              <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; width: 35%; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Client Name</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; font-weight: 600; color: #ffffff; font-size: 15px;">${lead.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email Address</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #c5a880; font-size: 14px;">
                    <a href="mailto:${lead.email}" style="color: #c5a880; text-decoration: none; font-weight: 500;">${lead.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Phone / WhatsApp</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #ffffff; font-size: 14px;">
                    ${lead.phone ? `<a href="tel:${lead.phone}" style="color: #e2e8f0; text-decoration: none;">${lead.phone}</a>` : `<span style="color: #64748b;">Not provided</span>`}
                  </td>
                </tr>
                ${lead.company ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Company / Organization</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #ffffff; font-size: 14px; font-weight: 500;">${lead.company}</td>
                </tr>` : ""}
                ${lead.service ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Requested Service</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #38bdf8; font-size: 14px; font-weight: 600;">${lead.service}</td>
                </tr>` : ""}
                ${lead.dates ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Travel / Event Dates</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #ffffff; font-size: 14px;">${lead.dates}</td>
                </tr>` : ""}
                ${lead.groupSize ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Group Size</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #ffffff; font-size: 14px;">${lead.groupSize}</td>
                </tr>` : ""}
                ${lead.topic ? `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Inquiry Topic</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #1f2937; color: #ffffff; font-size: 14px;">${lead.topic}</td>
                </tr>` : ""}
              </table>

              <!-- Message / Scope -->
              <div style="background-color: #0d121c; border: 1px solid #1e293b; border-left: 3px solid #c5a880; border-radius: 6px; padding: 18px 20px; margin-bottom: 28px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a880; font-weight: 700; margin-bottom: 8px;">
                  Message & Scope of Requirement
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;">
                  ${lead.message || "No additional notes provided by client."}
                </div>
              </div>

              <!-- Quick Action Button -->
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${crmUrl}" style="display: inline-block; background: linear-gradient(135deg, #c5a880 0%, #a48458 100%); color: #0a0d12; font-weight: 700; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 14px rgba(197, 168, 128, 0.35);">
                      Open Lead in CRM Platform →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer with Direct Reply Tip -->
          <tr>
            <td style="padding: 20px 32px; background-color: #0b0f17; border-top: 1px solid #1f2937; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #94a3b8;">
                💡 <strong>Direct Reply Enabled:</strong> Simply hit <em style="color: #ffffff;">Reply</em> in your email client to respond directly to <strong>${lead.name}</strong> (${lead.email}).
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                ELMIA DMC 2026 • Destination Management & VIP Protocol • Miami, FL
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  // Try sending to the primary recipient (info@elmiadmc.com)
  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_SENDER,
      to: [PRIMARY_RECIPIENT],
      replyTo: lead.email,
      subject,
      html: htmlContent
    });

    if (!error && data?.id) {
      console.log(`[EmailService] Notification successfully delivered to ${PRIMARY_RECIPIENT} (ID: ${data.id})`);
      return { success: true, messageId: data.id, deliveredTo: PRIMARY_RECIPIENT };
    }

    // Check if error is due to unverified domain sandbox mode in Resend
    const errorMessage = error?.message || "Unknown error";
    console.warn(`[EmailService] Primary delivery to ${PRIMARY_RECIPIENT} failed: ${errorMessage}`);

    if (
      errorMessage.includes("testing emails to your own email address") ||
      errorMessage.includes("resend.com/domains")
    ) {
      console.log(`[EmailService] Resend sandbox mode detected. Falling back to account email (${FALLBACK_TEST_RECIPIENT})...`);
      
      const fallbackResult = await resend.emails.send({
        from: DEFAULT_SENDER,
        to: [FALLBACK_TEST_RECIPIENT],
        replyTo: lead.email,
        subject: `[Sandbox Notice] ${subject}`,
        html: `
          <div style="background: #eab308; color: #000; padding: 12px 16px; font-weight: bold; border-radius: 6px; margin-bottom: 20px; font-family: sans-serif;">
            ⚠️ Resend Test Mode: Domain <u>elmiadmc.com</u> is not yet verified in Resend. To receive alerts directly at <strong>info@elmiadmc.com</strong>, verify the domain at <a href="https://resend.com/domains" style="color: #000; text-decoration: underline;">resend.com/domains</a>.
          </div>
          ${htmlContent}
        `
      });

      if (!fallbackResult.error && fallbackResult.data?.id) {
        console.log(`[EmailService] Fallback alert delivered to ${FALLBACK_TEST_RECIPIENT} (ID: ${fallbackResult.data.id})`);
        return {
          success: true,
          messageId: fallbackResult.data.id,
          deliveredTo: FALLBACK_TEST_RECIPIENT,
          warning: "Delivered to account email because domain elmiadmc.com is pending verification in Resend."
        };
      }
    }

    return { success: false, error: errorMessage };
  } catch (err: unknown) {
    const errorStr = err instanceof Error ? err.message : String(err);
    console.error("[EmailService] Unexpected error sending email notification:", errorStr);
    return { success: false, error: errorStr };
  }
}
