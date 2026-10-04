"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Car, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  Sparkles,
  ArrowRight,
  Clock,
  X,
  Lock
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
    languages: "Türkçe, English",
    vehicleExperience: "",
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

    if (!formData.licenseNumber.trim()) {
      setErrorMsg("Lütfen ehliyet numaranızı giriniz.");
      return;
    }

    if (!frontFile) {
      setErrorMsg("Lütfen ehliyetinizin ÖN yüzünün fotoğrafını yükleyiniz.");
      return;
    }

    if (!backFile) {
      setErrorMsg("Lütfen ehliyetinizin ARKA yüzünün fotoğrafını yükleyiniz.");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress("Ehliyet fotoğrafları yükleniyor...");

    try {
      // 1. Upload front & back files
      const licenseFrontUrl = await uploadFile(frontFile, "front");
      setUploadProgress("Ehliyet arka yüzü yükleniyor...");
      const licenseBackUrl = await uploadFile(backFile, "back");

      setUploadProgress("Başvuru kaydediliyor...");

      // 2. Submit application
      const payload = {
        ...formData,
        licenseFrontUrl,
        licenseBackUrl,
        _ts: Date.now()
      };

      const res = await fetch("/api/drivers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setIsSuccess(true);
        setCreatedDriverId(resData.driverId);
      } else {
        setErrorMsg(resData.error || "Başvuru sırasında bir hata oluştu. Lütfen tekrar deneyiniz.");
      }
    } catch (err: unknown) {
      const errStr = err instanceof Error ? err.message : String(err);
      console.error("Driver submit error:", errStr);
      setErrorMsg(errStr || "Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="min-h-screen bg-[#070b0e] text-[#e2e8f0]">
      {/* Top Brand Navigation Bar */}
      <nav className="border-b border-white/10 bg-[#090f14]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-36 h-10">
              <Image
                src="/images/elmia-dmc-logo.png"
                alt="ELMIA DMC"
                fill
                className="object-contain filter brightness-0 invert opacity-95"
                priority
              />
            </div>
          </Link>
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Chauffeur Portal
            </span>
            <Link
              href="/contact"
              className="hidden sm:inline-block text-gray-300 hover:text-white transition-colors text-xs font-medium"
            >
              Dispatch Desk →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#13221b] via-[#070b0e] to-[#070b0e] opacity-70 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#285735]/30 border border-[#285735] text-[#74b382] text-xs font-bold uppercase tracking-widest mb-6">
            <Car className="w-4 h-4 mr-1 text-[#c5a880]" />
            ELMIA DMC • ŞOFÖR BAŞVURU FORMU
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">
            Executive Chauffeur <br className="hidden sm:block" />
            <span className="text-[#c5a880]">Ekibimize Katılın</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Miami, South Florida ve ülke genelinde VIP delegasyonlar, kurumsal zirveler ve özel havacılık (FBO) transferlerinde görev alacak profesyonel şoförler arıyoruz.
          </p>

          {/* Highlights / Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-2xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-[#c5a880] text-xs font-bold uppercase">Lüks Filo</div>
              <div className="text-xs text-gray-300 font-medium">Escalade, S-Class, Sprinter</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-[#c5a880] text-xs font-bold uppercase">Prestijli İşler</div>
              <div className="text-xs text-gray-300 font-medium">FBO, Zirve & VIP Protokol</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-[#c5a880] text-xs font-bold uppercase">Hızlı Ödeme</div>
              <div className="text-xs text-gray-300 font-medium">Düzenli ve Yüksek Kazanç</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-[#c5a880] text-xs font-bold uppercase">Güvenilirlik</div>
              <div className="text-xs text-gray-300 font-medium">Kurumsal DMC Altyapısı</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        {isSuccess ? (
          /* Success Screen */
          <div className="bg-[#0e171b] border border-[#285735] rounded-3xl p-8 sm:p-12 text-center shadow-2xl animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#285735]/30 border-2 border-[#74b382] flex items-center justify-center mx-auto mb-6 text-[#74b382]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Başvurunuz Başarıyla Alındı!
            </h2>
            <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed mb-6">
              Sayın <strong className="text-white">{formData.firstName} {formData.lastName}</strong>, şoför başvurunuz ve ehliyet belgeleriniz operasyon merkezimize iletilmiştir.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-md mx-auto mb-8 text-xs text-gray-300 space-y-1.5 text-left font-mono">
              <div><span className="text-gray-500">Başvuru Referansı:</span> {createdDriverId}</div>
              <div><span className="text-gray-500">İletişim Telefonu:</span> {formData.phone}</div>
              <div><span className="text-gray-500">Ehliyet No:</span> {formData.licenseNumber} ({formData.licenseState})</div>
            </div>

            <p className="text-xs text-gray-400 mb-8 max-w-md mx-auto">
              Operasyon ekibimiz başvurunuzu inceledikten sonra telefon veya WhatsApp üzerinden sizinle en kısa sürede iletişime geçecektir.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3 bg-[#c5a880] hover:bg-[#b0926a] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Ana Sayfaya Dön
              </Link>
              <button
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
                    languages: "Türkçe, English",
                    vehicleExperience: "",
                    notes: ""
                  });
                  setFrontFile(null);
                  setFrontPreview(null);
                  setBackFile(null);
                  setBackPreview(null);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all"
              >
                Yeni Başvuru Doldur
              </button>
            </div>
          </div>
        ) : (
          /* Application Form Card */
          <form
            onSubmit={handleSubmit}
            className="bg-[#0b1216] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {/* Error Notification */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* SECTION 1: Kişisel Bilgiler */}
            <div>
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-5">
                <User className="w-4 h-4 text-[#c5a880]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  1. Kişisel & İletişim Bilgileri
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Adınız <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Örn: Ahmet"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Soyadınız <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Örn: Yılmaz"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Telefon / WhatsApp <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (305) 000-0000"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ornek@gmail.com"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Nerelisiniz? (Ülke / Şehir) <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="Örn: Türkiye / İstanbul"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Kaç Yıldır Amerika&apos;da Yaşıyorsunuz? <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.yearsInUS}
                    onChange={(e) => setFormData({ ...formData, yearsInUS: e.target.value })}
                    placeholder="Örn: 5 yıl"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Aile & Yasal Bilgiler */}
            <div>
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-5">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  2. Aile & Kimlik Bilgileri
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Çocuk Bilgisi */}
                <div className="bg-[#111c23] border border-white/10 rounded-2xl p-4">
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Çocuğunuz Var mı?
                  </label>
                  <div className="flex items-center space-x-4 mb-3">
                    <label className="inline-flex items-center space-x-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="hasChildren"
                        checked={formData.hasChildren === true}
                        onChange={() => setFormData({ ...formData, hasChildren: true })}
                        className="text-[#c5a880] focus:ring-[#c5a880]"
                      />
                      <span>Evet</span>
                    </label>
                    <label className="inline-flex items-center space-x-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="hasChildren"
                        checked={formData.hasChildren === false}
                        onChange={() => setFormData({ ...formData, hasChildren: false, childrenDetails: "" })}
                        className="text-[#c5a880] focus:ring-[#c5a880]"
                      />
                      <span>Hayır</span>
                    </label>
                  </div>

                  {formData.hasChildren && (
                    <input
                      type="text"
                      value={formData.childrenDetails}
                      onChange={(e) => setFormData({ ...formData, childrenDetails: e.target.value })}
                      placeholder="Çocuk sayısı ve yaşları (Örn: 2 çocuk, 6 ve 9 yaş)"
                      className="w-full bg-[#0a1217] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a880]"
                    />
                  )}
                </div>

                {/* SSN Bilgisi */}
                <div className="bg-[#111c23] border border-white/10 rounded-2xl p-4">
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    SSN Numaranız Var mı?
                  </label>
                  <div className="flex items-center space-x-4 mb-3">
                    <label className="inline-flex items-center space-x-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="hasSSN"
                        checked={formData.hasSSN === true}
                        onChange={() => setFormData({ ...formData, hasSSN: true })}
                        className="text-[#c5a880] focus:ring-[#c5a880]"
                      />
                      <span>Evet (Var)</span>
                    </label>
                    <label className="inline-flex items-center space-x-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="hasSSN"
                        checked={formData.hasSSN === false}
                        onChange={() => setFormData({ ...formData, hasSSN: false, ssn: "" })}
                        className="text-[#c5a880] focus:ring-[#c5a880]"
                      />
                      <span>Hayır (Yok)</span>
                    </label>
                  </div>

                  {formData.hasSSN && (
                    <input
                      type="text"
                      value={formData.ssn}
                      onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                      placeholder="SSN Numaranız (Örn: ***-**-1234 veya tam no)"
                      className="w-full bg-[#0a1217] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a880]"
                    />
                  )}
                  <p className="text-[10px] text-gray-500 mt-1 flex items-center">
                    <Lock className="w-3 h-3 mr-1 text-gray-400" /> Bilgileriniz gizli ve güvenli tutulur.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: Sürüş Deneyimi & Ehliyet Bilgileri */}
            <div>
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-5">
                <Award className="w-4 h-4 text-[#c5a880]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  3. Sürüş Deneyimi & Ehliyet Bilgileri
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Kaç Yıldır Şoförlük Yapıyorsunuz? <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.drivingExperienceYears}
                    onChange={(e) => setFormData({ ...formData, drivingExperienceYears: e.target.value })}
                    placeholder="Örn: 8 yıl"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Ehliyet Numarası <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="Örn: Y450-891-23-456-0"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Ehliyet Eyaleti (State)
                  </label>
                  <input
                    type="text"
                    value={formData.licenseState}
                    onChange={(e) => setFormData({ ...formData, licenseState: e.target.value })}
                    placeholder="FL (Florida), NY, etc."
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Konuştuğunuz Diller & Tecrübeli Olduğunuz Araçlar
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleExperience}
                    onChange={(e) => setFormData({ ...formData, vehicleExperience: e.target.value })}
                    placeholder="Örn: Escalade ESV, S-Class, Sprinter, Suburban (Diller: Türkçe, İngilizce)"
                    className="w-full bg-[#111c23] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: Ehliyet Fotoğrafları (Önlü / Arkalı) */}
            <div>
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-2">
                <FileText className="w-4 h-4 text-[#c5a880]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  4. Ehliyet Fotoğrafı (Önlü ve Arkalı) <span className="text-[#c5a880]">*</span>
                </h3>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Lütfen ehliyetinizin hem ön hem de arka yüzünün net çekilmiş birer fotoğrafını yükleyiniz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Ehliyet Ön Yüz */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center justify-between">
                    <span>Ehliyet ÖN Yüzü <span className="text-[#c5a880]">*</span></span>
                    {frontFile && <span className="text-[11px] text-[#74b382] font-normal">✓ Seçildi</span>}
                  </label>

                  <input
                    type="file"
                    ref={frontInputRef}
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={handleFrontFileChange}
                  />

                  {frontPreview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-[#c5a880]/50 bg-black/50 h-44 group">
                      <Image
                        src={frontPreview}
                        alt="Ehliyet Ön Yüz"
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                        <button
                          type="button"
                          onClick={() => frontInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium"
                        >
                          Değiştir
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFrontFile(null);
                            setFrontPreview(null);
                          }}
                          className="p-1.5 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg text-xs"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-gray-300">
                        Ön Yüz
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => frontInputRef.current?.click()}
                      className="w-full h-44 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#c5a880] bg-[#111c23]/60 hover:bg-[#111c23] transition-all flex flex-col items-center justify-center p-4 text-center group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-[#c5a880]/20 flex items-center justify-center text-gray-400 group-hover:text-[#c5a880] mb-2 transition-colors">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-[#c5a880]">
                        Ön Yüzü Yükle
                      </span>
                      <span className="text-[11px] text-gray-500 mt-1">
                        Fotoğraf çekin veya galeriden seçin (PNG, JPG)
                      </span>
                    </button>
                  )}
                </div>

                {/* Ehliyet Arka Yüz */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center justify-between">
                    <span>Ehliyet ARKA Yüzü <span className="text-[#c5a880]">*</span></span>
                    {backFile && <span className="text-[11px] text-[#74b382] font-normal">✓ Seçildi</span>}
                  </label>

                  <input
                    type="file"
                    ref={backInputRef}
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={handleBackFileChange}
                  />

                  {backPreview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-[#c5a880]/50 bg-black/50 h-44 group">
                      <Image
                        src={backPreview}
                        alt="Ehliyet Arka Yüz"
                        fill
                        className="object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                        <button
                          type="button"
                          onClick={() => backInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium"
                        >
                          Değiştir
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBackFile(null);
                            setBackPreview(null);
                          }}
                          className="p-1.5 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg text-xs"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-gray-300">
                        Arka Yüz
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => backInputRef.current?.click()}
                      className="w-full h-44 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#c5a880] bg-[#111c23]/60 hover:bg-[#111c23] transition-all flex flex-col items-center justify-center p-4 text-center group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-[#c5a880]/20 flex items-center justify-center text-gray-400 group-hover:text-[#c5a880] mb-2 transition-colors">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-[#c5a880]">
                        Arka Yüzü Yükle
                      </span>
                      <span className="text-[11px] text-gray-500 mt-1">
                        Fotoğraf çekin veya galeriden seçin (PNG, JPG)
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 5: Ek Notlar */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Eklemek İstediğiniz Notlar veya Özel Durumlar
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Örn: Hafta sonları ve gece vardiyalarında da çalışabilirim. Kendi temiz takım elbisem mevcuttur."
                className="w-full bg-[#111c23] border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c5a880] resize-y"
              />
            </div>

            {/* Submit Action Bar */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#c5a880] to-[#b0926a] hover:from-[#d4b78f] hover:to-[#c5a880] text-black font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-[#c5a880]/20 transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3" />
                    <span>{uploadProgress || "Başvuru Gönderiliyor..."}</span>
                  </>
                ) : (
                  <>
                    <span>Başvuruyu Tamamla &amp; Gönder</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-gray-500 mt-3">
                🔒 Bilgileriniz ELMIA DMC bünyesinde gizli tutulur ve sadece şoförlük operasyonları değerlendirmesinde kullanılır.
              </p>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
