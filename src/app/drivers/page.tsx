"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Send,
  Camera,
  FileCheck2
} from "lucide-react";

export default function DriverApplicationPage() {
  const [formData, setFormData] = useState({
    // 1. Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    address: "",

    // 2. Driving Experience
    professionalDrivingYears: "",
    chauffeurExperienceYears: "",
    workedForLimoCompany: false,
    previousCompanyName: "",

    // 3. Driver's License — Required
    licenseNumber: "",
    licenseState: "FL",
    licenseExpirationDate: "",

    // 4. Chauffeur Registration — Optional
    hasChauffeurRegistration: false,
    chauffeurRegistrationNumber: "",
    chauffeurRegistrationExpirationDate: "",

    // 5. Availability
    availability: [] as string[],
    preferredHours: "Flexible",

    // 6. Languages
    languages: ["English"] as string[],
    otherLanguage: "",

    // 7. Additional Information
    notes: "",

    // 8. Applicant Certification
    certified: false
  });

  // License photos (Required: Front and Back)
  const [licenseFrontFile, setLicenseFrontFile] = useState<File | null>(null);
  const [licenseFrontPreview, setLicenseFrontPreview] = useState<string | null>(null);
  const [licenseBackFile, setLicenseBackFile] = useState<File | null>(null);
  const [licenseBackPreview, setLicenseBackPreview] = useState<string | null>(null);

  // Chauffeur Registration photo (Single photo showing registration number)
  const [chauffeurFile, setChauffeurFile] = useState<File | null>(null);
  const [chauffeurPreview, setChauffeurPreview] = useState<string | null>(null);

  const licenseFrontInputRef = useRef<HTMLInputElement>(null);
  const licenseBackInputRef = useRef<HTMLInputElement>(null);
  const chauffeurInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdDriverId, setCreatedDriverId] = useState<string>("");

  // Allowed file extensions & MIME types (Strict: JPG, PNG, PDF)
  const ALLOWED_EXTS = ["jpg", "jpeg", "png", "pdf"];
  const ALLOWED_MIMES = ["image/jpeg", "image/png", "application/pdf"];

  const validateFile = (file: File): boolean => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTS.includes(ext) && !ALLOWED_MIMES.includes(file.type)) {
      setErrorMsg("Invalid file format. Only JPG, PNG, and PDF files are accepted.");
      return false;
    }
    const MAX_SIZE = 12 * 1024 * 1024; // 12MB
    if (file.size > MAX_SIZE) {
      setErrorMsg("File exceeds the 12MB size limit.");
      return false;
    }
    return true;
  };

  // US Phone Number Masking (e.g. (305) 555-0199)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = "";
    if (digits.length === 0) {
      formatted = "";
    } else if (digits.length <= 3) {
      formatted = `(${digits}`;
    } else if (digits.length <= 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errorMsg && digits.length === 10) {
      setErrorMsg(null);
    }
  };

  // Helpers for multi-select
  const toggleAvailability = (option: string) => {
    setFormData((prev) => {
      const exists = prev.availability.includes(option);
      return {
        ...prev,
        availability: exists
          ? prev.availability.filter((item) => item !== option)
          : [...prev.availability, option]
      };
    });
  };

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => {
      const exists = prev.languages.includes(lang);
      return {
        ...prev,
        languages: exists
          ? prev.languages.filter((l) => l !== lang)
          : [...prev.languages, lang]
      };
    });
  };

  const handleFileUpload = async (file: File, side: string): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("side", side);

    const res = await fetch("/api/drivers/upload", {
      method: "POST",
      body: data
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.error || `Failed to upload ${file.name}.`);
    }

    const json = await res.json();
    if (!json.success || !json.url) {
      throw new Error(json.error || `Failed to upload ${file.name}.`);
    }

    return json.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Personal Information Validations
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMsg("Please enter your full first name and last name.");
      return;
    }

    if (!formData.dateOfBirth.trim()) {
      setErrorMsg("Please enter your date of birth.");
      return;
    }

    // Age validation (minimum 21 years old)
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (isNaN(dob.getTime()) || age < 21 || age > 95) {
      setErrorMsg("Applicant must be at least 21 years of age for chauffeur qualification.");
      return;
    }

    // Phone validation (10 digits)
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMsg("Please enter a complete 10-digit phone number (e.g. (555) 000-0000).");
      return;
    }

    // Email validation (must contain @ and valid domain)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    if (!formData.address.trim()) {
      setErrorMsg("Please enter your current address.");
      return;
    }

    // 2. Driving Experience Validations
    if (!formData.professionalDrivingYears.trim()) {
      setErrorMsg("Please specify how many years of professional driving experience you have.");
      return;
    }

    if (!formData.chauffeurExperienceYears.trim()) {
      setErrorMsg("Please specify how many years of chauffeur / limousine driving experience you have.");
      return;
    }

    // 3. Driver's License Validations
    if (!formData.licenseNumber.trim()) {
      setErrorMsg("Please enter your driver's license number.");
      return;
    }

    if (!formData.licenseState.trim()) {
      setErrorMsg("Please select the issuing state of your driver's license.");
      return;
    }

    if (!formData.licenseExpirationDate.trim()) {
      setErrorMsg("Please enter your driver's license expiration date.");
      return;
    }

    if (!licenseFrontFile) {
      setErrorMsg("Please upload clear photo of the FRONT of your driver's license.");
      return;
    }

    if (!licenseBackFile) {
      setErrorMsg("Please upload clear photo of the BACK of your driver's license.");
      return;
    }

    // 4. Certification Validation
    if (!formData.certified) {
      setErrorMsg("You must check the applicant certification box before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload Required License Files
      setUploadProgress("Uploading driver's license (front)...");
      const licenseFrontUrl = await handleFileUpload(licenseFrontFile, "license-front");

      setUploadProgress("Uploading driver's license (back)...");
      const licenseBackUrl = await handleFileUpload(licenseBackFile, "license-back");

      // Upload Optional Chauffeur Registration Photo (if provided)
      let chauffeurPhotoUrl = "";
      if (formData.hasChauffeurRegistration && chauffeurFile) {
        setUploadProgress("Uploading chauffeur registration photo...");
        chauffeurPhotoUrl = await handleFileUpload(chauffeurFile, "chauffeur-reg");
      }

      // Compile Languages list
      const finalLanguages = [...formData.languages];
      if (formData.otherLanguage.trim()) {
        finalLanguages.push(formData.otherLanguage.trim());
      }

      // Submit Payload
      setUploadProgress("Submitting application...");
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),

        professionalDrivingYears: formData.professionalDrivingYears.trim(),
        chauffeurExperienceYears: formData.chauffeurExperienceYears.trim(),
        workedForLimoCompany: Boolean(formData.workedForLimoCompany),
        previousCompanyName: formData.workedForLimoCompany ? formData.previousCompanyName.trim() : undefined,

        licenseNumber: formData.licenseNumber.trim().toUpperCase(),
        licenseState: formData.licenseState.trim().toUpperCase(),
        licenseExpirationDate: formData.licenseExpirationDate.trim(),
        licenseFrontUrl,
        licenseBackUrl,

        hasChauffeurRegistration: Boolean(formData.hasChauffeurRegistration),
        chauffeurRegistrationNumber: formData.hasChauffeurRegistration ? formData.chauffeurRegistrationNumber.trim() : undefined,
        chauffeurRegistrationExpirationDate: formData.hasChauffeurRegistration ? formData.chauffeurRegistrationExpirationDate.trim() : undefined,
        chauffeurRegistrationPhotoUrl: chauffeurPhotoUrl || undefined,

        availability: formData.availability,
        preferredHours: formData.preferredHours,
        languages: finalLanguages,
        notes: formData.notes.trim() || undefined,
        certified: true
      };

      const res = await fetch("/api/drivers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "An error occurred while submitting your application.");
      }

      setCreatedDriverId(result.driverId || "");
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMsg(errorMessage);
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  const availabilityOptions = [
    "Full Time",
    "Part Time",
    "Weekdays",
    "Weekends",
    "Flexible"
  ];

  const preferredHoursOptions = [
    "Day",
    "Evening",
    "Night",
    "Flexible"
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "Turkish",
    "Arabic",
    "French",
    "Russian",
    "Portuguese"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Subpage Header Banner */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 flex flex-col justify-center bg-[#0e1710] border-b border-[#1a3320] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/car-hero-img.jpg"
            alt="ELMIA DMC Executive Fleet"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1710] via-[#0e1710]/75 to-black/75" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <nav className="flex items-center space-x-2 text-xs text-white/70 mb-4">
            <Link href="/" className="hover:text-[#61CE70] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-[#61CE70] font-semibold">Driver Application</span>
          </nav>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-3 font-heading">
            Driver Application Form
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal max-w-2xl">
            Official application form for professional executive chauffeurs joining ELMIA DMC&apos;s VIP transportation and corporate logistics fleet.
          </p>
        </div>
      </section>

      {/* Main Light Form Section */}
      <section className="py-12 sm:py-16 bg-[#fcfdfc] border-t border-[#e7ede7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {isSuccess ? (
            /* Success State */
            <div className="bg-white border border-[#e5ece5] rounded-2xl p-8 sm:p-12 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#eaf4ec] border border-[#285735] flex items-center justify-center mx-auto mb-5 text-[#285735]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3822] mb-3">
                Application Submitted Successfully
              </h2>
              <p className="text-sm sm:text-base text-[#555555] max-w-md mx-auto leading-relaxed mb-6">
                Thank you, <strong className="text-[#1a3822]">{formData.firstName} {formData.lastName}</strong>. Your driver application and submitted documents have been received by our operations desk.
              </p>

              {createdDriverId && (
                <div className="bg-[#f8faf8] border border-gray-200 rounded-xl p-3.5 max-w-sm mx-auto mb-6 text-xs text-[#555555]">
                  Application Reference: <strong className="text-[#1a3822] font-mono">{createdDriverId.slice(0, 8)}</strong>
                </div>
              )}

              <p className="text-xs text-[#666666] mb-8 max-w-md mx-auto">
                Our operations team will review your qualifications and contact you via phone or email regarding next steps.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 bg-[#285735] hover:bg-[#1f4429] text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
                >
                  Return to Home
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      dateOfBirth: "",
                      phone: "",
                      email: "",
                      address: "",
                      professionalDrivingYears: "",
                      chauffeurExperienceYears: "",
                      workedForLimoCompany: false,
                      previousCompanyName: "",
                      licenseNumber: "",
                      licenseState: "FL",
                      licenseExpirationDate: "",
                      hasChauffeurRegistration: false,
                      chauffeurRegistrationNumber: "",
                      chauffeurRegistrationExpirationDate: "",
                      availability: [],
                      preferredHours: "Flexible",
                      languages: ["English"],
                      otherLanguage: "",
                      notes: "",
                      certified: false
                    });
                    setLicenseFrontFile(null);
                    setLicenseFrontPreview(null);
                    setLicenseBackFile(null);
                    setLicenseBackPreview(null);
                    setChauffeurFile(null);
                    setChauffeurPreview(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#f8faf8] hover:bg-gray-100 text-[#444444] border border-gray-200 font-semibold text-xs rounded-xl transition-all"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            /* Clean Light Form Card */
            <div className="bg-white border border-[#e5ece5] rounded-2xl p-6 sm:p-10 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. PERSONAL INFORMATION */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    1. Personal Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="(555) 000-0000"
                        maxLength={14}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm font-mono transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Current Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Street Address, City, State, ZIP Code"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. DRIVING EXPERIENCE */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    2. Driving Experience
                  </h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                          How many years of professional driving experience do you have? *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.professionalDrivingYears}
                          onChange={(e) => setFormData({ ...formData, professionalDrivingYears: e.target.value })}
                          placeholder="e.g. 5 years"
                          className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                          How many years of chauffeur / limousine driving experience do you have? *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.chauffeurExperienceYears}
                          onChange={(e) => setFormData({ ...formData, chauffeurExperienceYears: e.target.value })}
                          placeholder="e.g. 3 years"
                          className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Have you previously worked for a limousine, black car, executive transportation, or similar company? *
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, workedForLimoCompany: true })}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            formData.workedForLimoCompany
                              ? "bg-[#285735] text-white shadow-sm"
                              : "bg-[#f8faf8] text-[#555555] border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, workedForLimoCompany: false, previousCompanyName: "" })}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            !formData.workedForLimoCompany
                              ? "bg-[#285735] text-white shadow-sm"
                              : "bg-[#f8faf8] text-[#555555] border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          No
                        </button>
                      </div>

                      {formData.workedForLimoCompany && (
                        <div className="mt-4">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                            Previous Company / Employer Name
                          </label>
                          <input
                            type="text"
                            value={formData.previousCompanyName}
                            onChange={(e) => setFormData({ ...formData, previousCompanyName: e.target.value })}
                            placeholder="e.g. Carey Limousine, Empire CLS, etc."
                            className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. DRIVER'S LICENSE — REQUIRED */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-2">
                    3. Driver&apos;s License — Required
                  </h2>
                  <p className="text-xs text-[#666666] mb-5">
                    Please upload clear photos of the front and back of your current driver&apos;s license. (Accepted formats: JPG, PNG, PDF)
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Driver&apos;s License Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        placeholder="D123-456-78-900"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm font-mono transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Issuing State *
                      </label>
                      <select
                        value={formData.licenseState}
                        onChange={(e) => setFormData({ ...formData, licenseState: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all cursor-pointer"
                      >
                        <option value="FL">Florida (FL)</option>
                        <option value="NY">New York (NY)</option>
                        <option value="CA">California (CA)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="IL">Illinois (IL)</option>
                        <option value="NV">Nevada (NV)</option>
                        <option value="NJ">New Jersey (NJ)</option>
                        <option value="GA">Georgia (GA)</option>
                        <option value="OTHER">Other State</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Expiration Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.licenseExpirationDate}
                        onChange={(e) => setFormData({ ...formData, licenseExpirationDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* License Front & Back Photo Upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Front */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Driver&apos;s License Front Photo *
                      </label>
                      <input
                        ref={licenseFrontInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            if (validateFile(file)) {
                              setLicenseFrontFile(file);
                              setLicenseFrontPreview(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
                              setErrorMsg(null);
                            } else {
                              e.target.value = "";
                            }
                          }
                        }}
                        className="hidden"
                      />

                      {licenseFrontFile ? (
                        <div className="relative rounded-xl border border-gray-200 bg-[#f8faf8] p-3 flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white flex items-center justify-center">
                            {licenseFrontPreview ? (
                              <Image
                                src={licenseFrontPreview}
                                alt="License Front"
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <FileCheck2 className="w-6 h-6 text-[#285735]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#222222] truncate">
                              {licenseFrontFile.name}
                            </p>
                            <p className="text-[11px] text-[#285735] font-semibold flex items-center gap-1 mt-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Ready to upload
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setLicenseFrontFile(null);
                              setLicenseFrontPreview(null);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => licenseFrontInputRef.current?.click()}
                          className="w-full py-6 px-4 rounded-xl border border-dashed border-gray-300 hover:border-[#285735] bg-[#fbfcfb] hover:bg-[#f4f7f4] transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
                        >
                          <Camera className="w-6 h-6 text-gray-400 group-hover:text-[#285735] transition-colors" />
                          <span className="text-xs font-semibold text-[#444444] group-hover:text-[#1a3822]">
                            Upload Front Photo *
                          </span>
                          <span className="text-[11px] text-gray-400">
                            JPG, PNG, or PDF
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Back */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Driver&apos;s License Back Photo *
                      </label>
                      <input
                        ref={licenseBackInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            if (validateFile(file)) {
                              setLicenseBackFile(file);
                              setLicenseBackPreview(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
                              setErrorMsg(null);
                            } else {
                              e.target.value = "";
                            }
                          }
                        }}
                        className="hidden"
                      />

                      {licenseBackFile ? (
                        <div className="relative rounded-xl border border-gray-200 bg-[#f8faf8] p-3 flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white flex items-center justify-center">
                            {licenseBackPreview ? (
                              <Image
                                src={licenseBackPreview}
                                alt="License Back"
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <FileCheck2 className="w-6 h-6 text-[#285735]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#222222] truncate">
                              {licenseBackFile.name}
                            </p>
                            <p className="text-[11px] text-[#285735] font-semibold flex items-center gap-1 mt-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Ready to upload
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setLicenseBackFile(null);
                              setLicenseBackPreview(null);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => licenseBackInputRef.current?.click()}
                          className="w-full py-6 px-4 rounded-xl border border-dashed border-gray-300 hover:border-[#285735] bg-[#fbfcfb] hover:bg-[#f4f7f4] transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
                        >
                          <Camera className="w-6 h-6 text-gray-400 group-hover:text-[#285735] transition-colors" />
                          <span className="text-xs font-semibold text-[#444444] group-hover:text-[#1a3822]">
                            Upload Back Photo *
                          </span>
                          <span className="text-[11px] text-gray-400">
                            JPG, PNG, or PDF
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. CHAUFFEUR REGISTRATION — OPTIONAL */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-2">
                    4. Chauffeur Registration — Optional
                  </h2>
                  <p className="text-xs text-[#666666] mb-4">
                    If you currently have a Chauffeur Registration, please provide the information and upload a clear photo of the document showing your registration number.
                  </p>

                  <div className="mb-5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                      Do you currently have a Chauffeur Registration?
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasChauffeurRegistration: true })}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          formData.hasChauffeurRegistration
                            ? "bg-[#285735] text-white shadow-sm"
                            : "bg-[#f8faf8] text-[#555555] border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ 
                            ...formData, 
                            hasChauffeurRegistration: false,
                            chauffeurRegistrationNumber: "",
                            chauffeurRegistrationExpirationDate: ""
                          });
                          setChauffeurFile(null);
                          setChauffeurPreview(null);
                        }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          !formData.hasChauffeurRegistration
                            ? "bg-[#285735] text-white shadow-sm"
                            : "bg-[#f8faf8] text-[#555555] border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {formData.hasChauffeurRegistration && (
                    <div className="space-y-5 p-5 bg-[#f8faf8] rounded-xl border border-gray-200 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                            Chauffeur Registration Number
                          </label>
                          <input
                            type="text"
                            value={formData.chauffeurRegistrationNumber}
                            onChange={(e) => setFormData({ ...formData, chauffeurRegistrationNumber: e.target.value })}
                            placeholder="e.g. CR-987654"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] text-sm font-mono transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                            Expiration Date
                          </label>
                          <input
                            type="date"
                            value={formData.chauffeurRegistrationExpirationDate}
                            onChange={(e) => setFormData({ ...formData, chauffeurRegistrationExpirationDate: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-[#222222] focus:outline-none focus:border-[#285735] text-sm transition-all cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Single Chauffeur Registration Photo Upload */}
                      <div className="pt-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                          Chauffeur Registration Photo (Showing Registration Number)
                        </label>
                        <input
                          ref={chauffeurInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              if (validateFile(file)) {
                                setChauffeurFile(file);
                                setChauffeurPreview(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
                                setErrorMsg(null);
                              } else {
                                e.target.value = "";
                              }
                            }
                          }}
                          className="hidden"
                        />

                        {chauffeurFile ? (
                          <div className="relative rounded-xl border border-gray-200 bg-white p-3 flex items-center gap-3">
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-[#f8faf8] flex items-center justify-center">
                              {chauffeurPreview ? (
                                <Image
                                  src={chauffeurPreview}
                                  alt="Registration Document"
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <FileCheck2 className="w-6 h-6 text-[#285735]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-[#222222] truncate">
                                {chauffeurFile.name}
                              </p>
                              <p className="text-[11px] text-[#285735] font-semibold flex items-center gap-1 mt-0.5">
                                <CheckCircle2 className="w-3 h-3" /> Attached
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setChauffeurFile(null);
                                setChauffeurPreview(null);
                              }}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => chauffeurInputRef.current?.click()}
                            className="w-full py-5 px-4 rounded-xl border border-dashed border-gray-300 hover:border-[#285735] bg-white hover:bg-gray-50 transition-all flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
                          >
                            <Camera className="w-5 h-5 text-gray-400" />
                            <span className="text-xs font-semibold text-[#444444]">
                              Upload Registration Document Photo
                            </span>
                            <span className="text-[11px] text-gray-400">
                              JPG, PNG, or PDF
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. AVAILABILITY */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    5. Availability
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        When are you available to work? (Select all that apply)
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {availabilityOptions.map((opt) => {
                          const isSelected = formData.availability.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => toggleAvailability(opt)}
                              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#285735] text-white border-[#285735] shadow-sm"
                                  : "bg-[#f8faf8] text-[#555555] border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Preferred Working Hours
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {preferredHoursOptions.map((hr) => {
                          const isSelected = formData.preferredHours === hr;
                          return (
                            <button
                              key={hr}
                              type="button"
                              onClick={() => setFormData({ ...formData, preferredHours: hr })}
                              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#285735] text-white border-[#285735] shadow-sm"
                                  : "bg-[#f8faf8] text-[#555555] border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              {hr}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. LANGUAGES */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    6. Languages
                  </h2>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                      Languages Spoken (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2.5 mb-3">
                      {languageOptions.map((lang) => {
                        const isSelected = formData.languages.includes(lang);
                        return (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => toggleLanguage(lang)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#285735] text-white border-[#285735] shadow-sm"
                                : "bg-[#f8faf8] text-[#555555] border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            {lang}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      value={formData.otherLanguage}
                      onChange={(e) => setFormData({ ...formData, otherLanguage: e.target.value })}
                      placeholder="Other language(s)..."
                      className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                    />
                  </div>
                </div>

                {/* 7. ADDITIONAL INFORMATION — OPTIONAL */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    7. Additional Information — Optional
                  </h2>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                      Additional Information / Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      placeholder="Vehicle experience (Escalade, S-Class, Sprinter), airport/FBO familiarity, or any additional qualifications..."
                      className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all resize-y"
                    />
                  </div>
                </div>

                {/* 8. APPLICANT CERTIFICATION / SUBMIT */}
                <div className="pt-6 border-t border-[#e7ede7] space-y-6">
                  <div className="p-4 rounded-xl bg-[#f8faf8] border border-gray-200 flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="certified"
                      required
                      checked={formData.certified}
                      onChange={(e) => setFormData({ ...formData, certified: e.target.checked })}
                      className="mt-1 w-4 h-4 text-[#285735] rounded border-gray-300 focus:ring-[#285735] cursor-pointer"
                    />
                    <label htmlFor="certified" className="text-xs text-[#444444] leading-relaxed cursor-pointer select-none">
                      I certify that the information provided in this application is accurate and complete. I understand that the company may review the information and documents I provide as part of the driver application and qualification process. *
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[#666666]">
                      * Required fields must be completed.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.certified}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#285735] hover:bg-[#1f4429] text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{uploadProgress || "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
