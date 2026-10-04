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
      dateOfBirth,
      phone,
      email,
      address,
      professionalDrivingYears,
      chauffeurExperienceYears,
      workedForLimoCompany = false,
      previousCompanyName = "",
      licenseNumber,
      licenseState = "FL",
      licenseExpirationDate,
      licenseFrontUrl,
      licenseBackUrl,
      hasChauffeurRegistration = false,
      chauffeurRegistrationNumber = "",
      chauffeurRegistrationExpirationDate = "",
      chauffeurRegistrationPhotoUrl = "",
      chauffeurRegistrationFrontUrl = "",
      chauffeurRegistrationBackUrl = "",
      availability = [],
      preferredHours = "Flexible",
      languages = [],
      notes = "",
      certified = false,
      // Legacy fields if passed
      origin = "",
      yearsInUS = "",
      drivingExperienceYears = "",
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
        { success: false, error: "First Name is required." },
        { status: 400 }
      );
    }

    if (!lastName || !lastName.trim()) {
      return NextResponse.json(
        { success: false, error: "Last Name is required." },
        { status: 400 }
      );
    }

    if (!dateOfBirth || !dateOfBirth.trim()) {
      return NextResponse.json(
        { success: false, error: "Date of Birth is required." },
        { status: 400 }
      );
    }

    const cleanedPhone = (phone || "").replace(/\D/g, "");
    if (!phone || cleanedPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit phone number (e.g. (555) 000-0000)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address with '@' and domain (e.g. name@domain.com)." },
        { status: 400 }
      );
    }

    if (!address || !address.trim()) {
      return NextResponse.json(
        { success: false, error: "Current Address is required." },
        { status: 400 }
      );
    }

    if (
      professionalDrivingYears === undefined ||
      professionalDrivingYears === null ||
      !String(professionalDrivingYears).trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Years of professional driving experience is required." },
        { status: 400 }
      );
    }

    if (
      chauffeurExperienceYears === undefined ||
      chauffeurExperienceYears === null ||
      !String(chauffeurExperienceYears).trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Years of chauffeur / limousine driving experience is required." },
        { status: 400 }
      );
    }

    if (!licenseNumber || !licenseNumber.trim()) {
      return NextResponse.json(
        { success: false, error: "Driver's License Number is required." },
        { status: 400 }
      );
    }

    if (!licenseState || !licenseState.trim()) {
      return NextResponse.json(
        { success: false, error: "Issuing State is required." },
        { status: 400 }
      );
    }

    if (!licenseExpirationDate || !licenseExpirationDate.trim()) {
      return NextResponse.json(
        { success: false, error: "Driver's License Expiration Date is required." },
        { status: 400 }
      );
    }

    if (!licenseFrontUrl || !licenseFrontUrl.trim()) {
      return NextResponse.json(
        { success: false, error: "Driver's License Front Photo is required." },
        { status: 400 }
      );
    }

    if (!licenseBackUrl || !licenseBackUrl.trim()) {
      return NextResponse.json(
        { success: false, error: "Driver's License Back Photo is required." },
        { status: 400 }
      );
    }

    if (!certified) {
      return NextResponse.json(
        { success: false, error: "Applicant certification is required before submission." },
        { status: 400 }
      );
    }

    // Save driver application
    const newDriver = await addDriverApplication({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dateOfBirth: dateOfBirth.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      professionalDrivingYears: String(professionalDrivingYears).trim(),
      chauffeurExperienceYears: String(chauffeurExperienceYears).trim(),
      workedForLimoCompany: Boolean(workedForLimoCompany),
      previousCompanyName: previousCompanyName ? previousCompanyName.trim() : undefined,
      licenseNumber: licenseNumber.trim().toUpperCase(),
      licenseState: String(licenseState || "FL").trim().toUpperCase(),
      licenseExpirationDate: licenseExpirationDate.trim(),
      licenseFrontUrl: licenseFrontUrl.trim(),
      licenseBackUrl: licenseBackUrl.trim(),
      hasChauffeurRegistration: Boolean(hasChauffeurRegistration),
      chauffeurRegistrationNumber: hasChauffeurRegistration && chauffeurRegistrationNumber ? chauffeurRegistrationNumber.trim() : undefined,
      chauffeurRegistrationExpirationDate: hasChauffeurRegistration && chauffeurRegistrationExpirationDate ? chauffeurRegistrationExpirationDate.trim() : undefined,
      chauffeurRegistrationFrontUrl: hasChauffeurRegistration ? (chauffeurRegistrationPhotoUrl?.trim() || chauffeurRegistrationFrontUrl?.trim() || undefined) : undefined,
      chauffeurRegistrationBackUrl: hasChauffeurRegistration && chauffeurRegistrationBackUrl ? chauffeurRegistrationBackUrl.trim() : undefined,
      availability: Array.isArray(availability) ? availability : [],
      preferredHours: String(preferredHours || "Flexible").trim(),
      languages: Array.isArray(languages) ? languages : (languages ? [String(languages)] : ["English"]),
      notes: notes ? notes.trim() : undefined,
      certified: Boolean(certified),
      // Legacy compatibility mapping
      origin: origin ? origin.trim() : "Not collected",
      yearsInUS: yearsInUS ? String(yearsInUS).trim() : "-",
      drivingExperienceYears: professionalDrivingYears ? String(professionalDrivingYears).trim() : (drivingExperienceYears || "-"),
      hasChildren: false,
      hasSSN: false
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
