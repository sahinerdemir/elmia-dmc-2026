import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/leads-storage";
import { checkSpam } from "@/lib/anti-spam";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      category = "proposal",
      name,
      email,
      phone = "",
      company = "",
      service = "",
      groupSize = "",
      dates = "",
      topic = "",
      message = "",
      notes = "",
      hp_fax_number = "",
      _ts
    } = body;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Silent spam and honeypot protection
    const spamCheck = checkSpam({
      honeypot: hp_fax_number,
      loadedAt: typeof _ts === "number" ? _ts : Number(_ts) || undefined,
      ip,
      name,
      email,
      message: message || notes || ""
    });

    if (spamCheck.isSpam) {
      if (spamCheck.isRateLimited) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many submissions. Please wait a moment or call our dispatch desk directly."
          },
          { status: 429 }
        );
      }

      console.warn(
        `[Anti-Spam] Dropped spam submission: ${spamCheck.reason} (IP: ${ip})`
      );
      // Return 200 success to the bot so it doesn't rotate proxies or attempt evasion
      return NextResponse.json({
        success: true,
        message: "Submission received successfully.",
        leadId: "filtered"
      });
    }

    // Validate mandatory fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required." },
        { status: 400 }
      );
    }

    const effectiveMessage = (message || notes || "").trim();

    // Determine priority
    let priority: "normal" | "high" | "vip" = "normal";
    const textToCheck = `${service} ${effectiveMessage} ${company}`.toLowerCase();
    if (
      textToCheck.includes("vip") ||
      textToCheck.includes("diplomatic") ||
      textToCheck.includes("fbo") ||
      textToCheck.includes("tarmac") ||
      textToCheck.includes("yacht")
    ) {
      priority = "vip";
    } else if (
      textToCheck.includes("corporate") ||
      textToCheck.includes("summit") ||
      textToCheck.includes("chauffeur") ||
      (groupSize && groupSize.includes("10+"))
    ) {
      priority = "high";
    }

    const createdLead = await addLead({
      category: category === "contact" ? "contact" : "proposal",
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      service: service.trim() || undefined,
      groupSize: groupSize.trim() || undefined,
      dates: dates.trim() || undefined,
      topic: topic.trim() || undefined,
      message: effectiveMessage,
      priority
    });

    return NextResponse.json({
      success: true,
      message: "Submission received successfully.",
      leadId: createdLead.id
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process submission." },
      { status: 500 }
    );
  }
}
