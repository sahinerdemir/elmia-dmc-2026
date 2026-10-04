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
  FileText,
  Send,
  Camera
} from "lucide-react";

export default function DriverApplicationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    origin: "",
    yearsInUS: "",
    drivingExperienceYears: "",
    licenseNumber: "",
    licenseState: "FL",
    hasChildren: false,
    childrenDetails: "",
    hasSSN: true,
    ssn: "",
    notes: ""
  });

  // License photos upload state
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdDriverId, setCreatedDriverId] = useState<string>("");

  const handleFrontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFrontFile(file);
      setFrontPreview(URL.createObjectURL(file));
      setErrorMsg(null);
    }
  };

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBackFile(file);
      setBackPreview(URL.createObjectURL(file));
      setErrorMsg(null);
    }
  };

  const uploadFile = async (file: File, side: "front" | "back"): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("side", side);

    const res = await fetch("/api/drivers/upload", {
      method: "POST",
      body: data
    });

    if (!res.ok) {
      throw new Error(`Ehliyet ${side === "front" ? "ön" : "arka"} yüzü yüklenemedi.`);
    }

    const json = await res.json();
    if (!json.success || !json.url) {
      throw new Error(json.error || `Ehliyet ${side === "front" ? "ön" : "arka"} yüzü yüklenemedi.`);
    }

    return json.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validations
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMsg("Lütfen adınızı ve soyadınızı eksiksiz giriniz.");
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMsg("Lütfen geçerli bir telefon numarası giriniz.");
      return;
    }

    if (!formData.origin.trim()) {
      setErrorMsg("Lütfen aslen nereli olduğunuzu belirtiniz.");
      return;
    }

    if (!formData.yearsInUS.trim()) {
      setErrorMsg("Lütfen kaç yıldır Amerika'da yaşadığınızı belirtiniz.");
      return;
    }

    if (!formData.drivingExperienceYears.trim()) {
      setErrorMsg("Lütfen kaç yıldır şoförlük yaptığınızı belirtiniz.");
      return;
    }

    if (!formData.licenseNumber.trim()) {
      setErrorMsg("Lütfen ehliyet numaranızı giriniz.");
      return;
    }

    if (!frontFile) {
      setErrorMsg("Lütfen ehliyetinizin ön yüz fotoğrafını yükleyiniz.");
      return;
    }

    if (!backFile) {
      setErrorMsg("Lütfen ehliyetinizin arka yüz fotoğrafını yükleyiniz.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Upload Front Photo
      setUploadProgress("Ehliyet ön yüz fotoğrafı yükleniyor...");
      const frontUrl = await uploadFile(frontFile, "front");

      // Step 2: Upload Back Photo
      setUploadProgress("Ehliyet arka yüz fotoğrafı yükleniyor...");
      const backUrl = await uploadFile(backFile, "back");

      // Step 3: Submit Application Data
      setUploadProgress("Başvuru kaydediliyor...");
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        origin: formData.origin.trim(),
        yearsInUS: formData.yearsInUS.trim(),
        drivingExperienceYears: formData.drivingExperienceYears.trim(),
        licenseNumber: formData.licenseNumber.trim().toUpperCase(),
        licenseState: formData.licenseState.trim().toUpperCase() || "FL",
        hasChildren: Boolean(formData.hasChildren),
        childrenDetails: formData.hasChildren ? formData.childrenDetails.trim() : undefined,
        hasSSN: Boolean(formData.hasSSN),
        ssn: formData.hasSSN && formData.ssn.trim() ? formData.ssn.trim() : undefined,
        licenseFrontUrl: frontUrl,
        licenseBackUrl: backUrl,
        notes: formData.notes.trim() || undefined
      };

      const res = await fetch("/api/drivers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Başvuru gönderilirken bir hata oluştu.");
      }

      setCreatedDriverId(result.driver?.id || "");
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Ağ bağlantısı hatası. Lütfen tekrar deneyiniz.";
      setErrorMsg(errorMessage);
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

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
            <span className="text-[#61CE70] font-semibold">Şoför Başvurusu</span>
          </nav>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-3 font-heading">
            Şoför Başvuru Formu
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal max-w-2xl">
            Elmia DMC bünyesindeki VIP transfer ve kurumsal delegasyon operasyonlarımızda görev alacak profesyonel şoförler için başvuru formu.
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
                Başvurunuz Alındı
              </h2>
              <p className="text-sm sm:text-base text-[#555555] max-w-md mx-auto leading-relaxed mb-6">
                Sayın <strong className="text-[#1a3822]">{formData.firstName} {formData.lastName}</strong>, şoför başvurunuz ve ehliyet belgeleriniz operasyon ekibimize iletilmiştir.
              </p>

              {createdDriverId && (
                <div className="bg-[#f8faf8] border border-gray-200 rounded-xl p-3.5 max-w-sm mx-auto mb-6 text-xs text-[#555555]">
                  Başvuru Referans Numarası: <strong className="text-[#1a3822] font-mono">{createdDriverId.slice(0, 8)}</strong>
                </div>
              )}

              <p className="text-xs text-[#666666] mb-8 max-w-md mx-auto">
                Operasyon yöneticilerimiz başvurunuzu inceledikten sonra telefon veya e-posta üzerinden sizinle iletişime geçecektir.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 bg-[#285735] hover:bg-[#1f4429] text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
                >
                  Ana Sayfaya Dön
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      phone: "",
                      email: "",
                      origin: "",
                      yearsInUS: "",
                      drivingExperienceYears: "",
                      licenseNumber: "",
                      licenseState: "FL",
                      hasChildren: false,
                      childrenDetails: "",
                      hasSSN: true,
                      ssn: "",
                      notes: ""
                    });
                    setFrontFile(null);
                    setFrontPreview(null);
                    setBackFile(null);
                    setBackPreview(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#f8faf8] hover:bg-gray-100 text-[#444444] border border-gray-200 font-semibold text-xs rounded-xl transition-all"
                >
                  Yeni Başvuru Doldur
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

                {/* Section 1: Kişisel ve İletişim Bilgileri */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    Kişisel ve İletişim Bilgileri
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Adı *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Örn: Ahmet"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Soyadı *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Örn: Yılmaz"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Telefon Numarası *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        E-posta Adresi
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ornek@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Nereli Olduğu (Memleket / Şehir / Ülke) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        placeholder="Örn: İstanbul, Türkiye veya Bakü, Azerbaycan"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Amerika ve Şoförlük Deneyimi */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    Amerika ve Şoförlük Deneyimi
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Kaç Yıldır Amerika&apos;da Yaşıyorsunuz? *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.yearsInUS}
                        onChange={(e) => setFormData({ ...formData, yearsInUS: e.target.value })}
                        placeholder="Örn: 4 yıl"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Kaç Yıldır Şoförlük İşi Yapıyorsunuz? *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.drivingExperienceYears}
                        onChange={(e) => setFormData({ ...formData, drivingExperienceYears: e.target.value })}
                        placeholder="Örn: 5 yıl"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Aile ve Yasal Durum */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    Aile ve Yasal Durum
                  </h2>
                  <div className="space-y-5">
                    {/* Çocuk Durumu */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Çocuğunuz Var mı?
                      </label>
                      <div className="flex items-center gap-3 mb-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hasChildren: false, childrenDetails: "" })}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            !formData.hasChildren
                              ? "bg-[#285735] text-white shadow-sm"
                              : "bg-[#f8faf8] text-[#555555] border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Hayır, Yok
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hasChildren: true })}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            formData.hasChildren
                              ? "bg-[#285735] text-white shadow-sm"
                              : "bg-[#f8faf8] text-[#555555] border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Evet, Var
                        </button>
                      </div>

                      {formData.hasChildren && (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={formData.childrenDetails}
                            onChange={(e) => setFormData({ ...formData, childrenDetails: e.target.value })}
                            placeholder="Çocuk sayısı veya yaşları (Örn: 2 çocuk, 4 ve 7 yaşlarında)"
                            className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                          />
                        </div>
                      )}
                    </div>

                    {/* SSN Durumu */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        SSN (Social Security Number) Var mı?
                      </label>
                      <div className="flex items-center gap-3 mb-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hasSSN: true })}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            formData.hasSSN
                              ? "bg-[#285735] text-white shadow-sm"
                              : "bg-[#f8faf8] text-[#555555] border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Evet, Var
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, hasSSN: false, ssn: "" })}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            !formData.hasSSN
                              ? "bg-[#285735] text-white shadow-sm"
                              : "bg-[#f8faf8] text-[#555555] border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          Hayır, Yok
                        </button>
                      </div>

                      {formData.hasSSN && (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={formData.ssn}
                            onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                            placeholder="SSN Numarası (Örn: 000-00-0000)"
                            className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 4: Ehliyet Bilgileri ve Fotoğraf Yükleme */}
                <div>
                  <h2 className="text-base font-bold text-[#1a3822] pb-3 border-b border-[#e7ede7] mb-5">
                    Ehliyet Bilgileri ve Belgeler
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Ehliyet Numarası *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        placeholder="Örn: D123-456-78-900"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm font-mono transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Verildiği Eyalet *
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
                        <option value="OTHER">Diğer Eyalet</option>
                      </select>
                    </div>
                  </div>

                  {/* Fotoğraf Yükleme Alanı */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Ön Yüz */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Ehliyet Ön Yüzü *
                      </label>
                      <input
                        ref={frontInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFrontFileChange}
                        className="hidden"
                      />

                      {frontPreview ? (
                        <div className="relative rounded-xl border border-gray-200 bg-[#f8faf8] p-3 flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                            <Image
                              src={frontPreview}
                              alt="Ehliyet Ön Yüz"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#222222] truncate">
                              {frontFile?.name}
                            </p>
                            <p className="text-[11px] text-[#285735] font-semibold flex items-center gap-1 mt-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Yüklendi
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFrontFile(null);
                              setFrontPreview(null);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Kaldır"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => frontInputRef.current?.click()}
                          className="w-full py-6 px-4 rounded-xl border border-dashed border-gray-300 hover:border-[#285735] bg-[#fbfcfb] hover:bg-[#f4f7f4] transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
                        >
                          <Camera className="w-6 h-6 text-gray-400 group-hover:text-[#285735] transition-colors" />
                          <span className="text-xs font-semibold text-[#444444] group-hover:text-[#1a3822]">
                            Ön Yüz Fotoğrafı Seç
                          </span>
                          <span className="text-[11px] text-gray-400">
                            JPG, PNG veya PDF
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Arka Yüz */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                        Ehliyet Arka Yüzü *
                      </label>
                      <input
                        ref={backInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleBackFileChange}
                        className="hidden"
                      />

                      {backPreview ? (
                        <div className="relative rounded-xl border border-gray-200 bg-[#f8faf8] p-3 flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                            <Image
                              src={backPreview}
                              alt="Ehliyet Arka Yüz"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#222222] truncate">
                              {backFile?.name}
                            </p>
                            <p className="text-[11px] text-[#285735] font-semibold flex items-center gap-1 mt-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Yüklendi
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setBackFile(null);
                              setBackPreview(null);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Kaldır"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => backInputRef.current?.click()}
                          className="w-full py-6 px-4 rounded-xl border border-dashed border-gray-300 hover:border-[#285735] bg-[#fbfcfb] hover:bg-[#f4f7f4] transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
                        >
                          <Camera className="w-6 h-6 text-gray-400 group-hover:text-[#285735] transition-colors" />
                          <span className="text-xs font-semibold text-[#444444] group-hover:text-[#1a3822]">
                            Arka Yüz Fotoğrafı Seç
                          </span>
                          <span className="text-[11px] text-gray-400">
                            JPG, PNG veya PDF
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 5: Ek Notlar */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                    Ek Notlar veya Belirtmek İstedikleriniz (Opsiyonel)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="Kullandığınız araç modelleri, müsaitlik saatleriniz veya eklemek istediğiniz diğer detaylar..."
                    className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all resize-y"
                  />
                </div>

                {/* Submit Button & Progress */}
                <div className="pt-4 border-t border-[#e7ede7] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#666666]">
                    * İşaretli alanların doldurulması zorunludur.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#285735] hover:bg-[#1f4429] text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{uploadProgress || "Gönderiliyor..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Başvuruyu Gönder</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
