import { NextRequest, NextResponse } from "next/server";
import { addDriverApplication } from "@/lib/drivers-storage";
import { sendDriverNotificationEmail } from "@/lib/email-service";
import { checkSpam } from "@/lib/anti-spam";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      phone,
      email = "",
      origin,
      yearsInUS,
      drivingExperienceYears,
      licenseNumber,
      licenseState = "FL",
      hasChildren = false,
      childrenDetails = "",
      hasSSN = false,
      ssn = "",
      licenseFrontUrl,
      licenseBackUrl,
      notes = "",
      languages = "",
      vehicleExperience = "",
      hp_fax_number = "",
      _ts
    } = body;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Anti-Spam protection
    const spamCheck = checkSpam({
      honeypot: hp_fax_number,
      loadedAt: typeof _ts === "number" ? _ts : Number(_ts) || undefined,
      ip,
      name: `${firstName || ""} ${lastName || ""}`.trim(),
      email: email || "driver@elmiadmc.com",
      message: notes || ""
    });

    if (spamCheck.isSpam) {
      if (spamCheck.isRateLimited) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many submissions. Please wait a moment before trying again."
          },
          { status: 429 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "Application submitted successfully.",
        driverId: "filtered"
      });
    }

    // Required Field Validations
    if (!firstName || !firstName.trim()) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }

    if (!lastName || !lastName.trim()) {
      return NextResponse.json(
        { success: false, error: "Last name is required." },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!origin || !origin.trim()) {
      return NextResponse.json(
        { success: false, error: "Hometown / Country of origin is required." },
        { status: 400 }
      );
    }

    if (!licenseNumber || !licenseNumber.trim()) {
      return NextResponse.json(
        { success: false, error: "Driver's license number is required." },
        { status: 400 }
      );
    }

    if (!licenseFrontUrl || !licenseFrontUrl.trim()) {
      return NextResponse.json(
        { success: false, error: "Front driver's license document is required." },
        { status: 400 }
      );
    }

    if (!licenseBackUrl || !licenseBackUrl.trim()) {
      return NextResponse.json(
        { success: false, error: "Back driver's license document is required." },
        { status: 400 }
      );
    }

    // Save driver application
    const newDriver = await addDriverApplication({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      origin: origin.trim(),
      yearsInUS: String(yearsInUS || "").trim(),
      drivingExperienceYears: String(drivingExperienceYears || "").trim(),
      licenseNumber: licenseNumber.trim(),
      licenseState: String(licenseState || "FL").trim().toUpperCase(),
      hasChildren: Boolean(hasChildren),
      childrenDetails: childrenDetails.trim() || undefined,
      hasSSN: Boolean(hasSSN),
      ssn: ssn.trim() || undefined,
      licenseFrontUrl: licenseFrontUrl.trim(),
      licenseBackUrl: licenseBackUrl.trim(),
      notes: notes.trim() || undefined,
      languages: languages.trim() || undefined,
      vehicleExperience: vehicleExperience.trim() || undefined
    });

    // Notify company desk via Resend
    try {
      await sendDriverNotificationEmail(newDriver);
    } catch (emailErr) {
      console.error("[DriverApplyRoute] Email notification error:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Driver application submitted successfully.",
      driverId: newDriver.id
    });
  } catch (error) {
    console.error("[DriverApplyRoute] Error processing driver application:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process driver application." },
      { status: 500 }
    );
  }
}
