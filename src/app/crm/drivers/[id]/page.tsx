"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, 
  Car, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Save, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Trash2, 
  MessageSquare, 
  FileText, 
  Eye, 
  Download, 
  Check, 
  Sparkles, 
  FileBadge,
  Archive
} from "lucide-react";
import { DriverApplication, DriverStatus } from "@/types/driver";

export default function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();

  const [driver, setDriver] = useState<DriverApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status & Note editing states
  const [status, setStatus] = useState<DriverStatus>("pending");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusSaved, setStatusSaved] = useState(false);

  const [notes, setNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  // Full-screen image modal
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/crm/drivers/${id}?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.driver) {
          setDriver(data.driver);
          setStatus(data.driver.status);
          setNotes(data.driver.notes || "");
        } else {
          setDriver(null);
        }
      } catch (err) {
        console.error("Failed to fetch driver details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriver();
  }, [id]);

  const handleStatusChange = async (newStatus: DriverStatus) => {
    setStatus(newStatus);
    setIsUpdatingStatus(true);
    setStatusSaved(false);
    try {
      const res = await fetch(`/api/crm/drivers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusSaved(true);
        if (driver) setDriver({ ...driver, status: newStatus });
        setTimeout(() => setStatusSaved(false), 2500);
      } else {
        alert(data.error || "Durum güncellenemedi.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Ağ hatası oluştu.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    setNotesSaved(false);
    try {
      const res = await fetch(`/api/crm/drivers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotesSaved(true);
        if (driver) setDriver({ ...driver, notes });
        setTimeout(() => setNotesSaved(false), 3000);
      } else {
        alert(data.error || "Notlar kaydedilemedi.");
      }
    } catch (err) {
      console.error("Notes save error:", err);
      alert("Ağ hatası oluştu.");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    if (!driver) return;
    if (!window.confirm(`"${driver.firstName} ${driver.lastName}" adlı şoförün başvurusunu kalıcı olarak silmek istediğinize emin misiniz?`)) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/crm/drivers/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/crm/drivers");
      } else {
        alert(data.error || "Silme işlemi başarısız oldu.");
        setIsDeleting(false);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Ağ hatası.");
      setIsDeleting(false);
    }
  };

  const formatCleanPhone = (phoneStr: string) => {
    return phoneStr.replace(/[^0-9]/g, "");
  };

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-2 border-[#285735] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Şoför başvurusu yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center py-20">
        <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Şoför Başvurusu Bulunamadı</h2>
        <p className="text-gray-500 mb-6 text-sm">İstenen şoför kaydı silinmiş veya mevcut değil.</p>
        <Link
          href="/crm/drivers"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#285735] hover:bg-[#1f4429] text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Şoför Listesine Dön
        </Link>
      </div>
    );
  }

  const cleanPhone = formatCleanPhone(driver.phone);
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("1") ? cleanPhone : `1${cleanPhone}`}`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

      {/* Top Back Nav & Delete Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/crm/drivers"
            className="text-gray-600 hover:text-gray-900 flex items-center text-sm font-semibold transition-colors py-1.5"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Şoför Başvurularına Dön
          </Link>
          {status === "rejected" && (
            <Link
              href="/crm/drivers/archive"
              className="text-rose-600 hover:text-rose-800 flex items-center text-sm font-semibold transition-colors py-1.5 border-l border-gray-300 pl-3"
            >
              <Archive className="w-3.5 h-3.5 mr-1" /> Arşive Git
            </Link>
          )}
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center px-3.5 py-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 text-xs font-bold transition-all disabled:opacity-50 shadow-xs cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          {isDeleting ? "Siliniyor..." : "Başvuruyu Sil"}
        </button>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#285735]/10 border border-[#285735]/20 flex items-center justify-center shrink-0 text-[#285735] font-bold text-xl">
              {driver.firstName?.charAt(0)}{driver.lastName?.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] font-heading">
                  {driver.firstName} {driver.lastName}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-gray-100 text-gray-600 border border-gray-200">
                  ID: {driver.id.slice(0, 8)}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Başvuru Tarihi: {new Date(driver.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  İkamet Adresi: <strong className="text-gray-800">{driver.address || driver.origin || "-"}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Status & Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Selector */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1.5">
              <span className="text-xs text-gray-500 pl-2 pr-1 font-medium">Durum:</span>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as DriverStatus)}
                disabled={isUpdatingStatus}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border outline-none cursor-pointer transition-colors ${
                  status === "pending"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : status === "reviewed"
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : status === "approved"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                <option value="pending">⏳ Beklemede</option>
                <option value="reviewed">🔍 İncelendi</option>
                <option value="approved">✅ Onaylandı</option>
                <option value="rejected">❌ Reddedildi</option>
              </select>
              {statusSaved && (
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium px-2">
                  <Check className="w-3.5 h-3.5" /> Kaydedildi
                </span>
              )}
            </div>

            {status === "rejected" && (
              <span className="text-[11px] text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl font-medium">
                📦 Bu başvuru Arşivdedir. Durumu değiştirdiğinizde aktif şoför listesine geri taşınacaktır.
              </span>
            )}

            {/* Direct Communication Buttons */}
            <a
              href={`tel:${driver.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#285735] hover:bg-[#1f4429] text-white transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              Ara
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href={`mailto:${driver.email}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              E-posta
            </a>
          </div>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Applicant Details & Operational Notes (2 cols) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Card 1: Personal & Contact Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-[#1a3822] mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
              <Users className="w-4 h-4 text-[#285735]" />
              Kişisel ve İletişim Bilgileri
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Ad Soyad</span>
                <span className="text-sm font-semibold text-gray-900">{driver.firstName} {driver.lastName}</span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Doğum Tarihi</span>
                <span className="text-sm font-semibold text-gray-900">{driver.dateOfBirth || "-"}</span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Telefon</span>
                <a href={`tel:${driver.phone}`} className="text-sm font-semibold text-[#285735] hover:underline">
                  {driver.phone}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">E-posta</span>
                <a href={`mailto:${driver.email}`} className="text-sm font-medium text-gray-800 hover:underline break-all">
                  {driver.email}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 sm:col-span-2">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">İkamet Adresi</span>
                <span className="text-sm font-semibold text-gray-900">{driver.address || driver.origin || "-"}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Driving Experience & Qualifications */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-[#1a3822] mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
              <Car className="w-4 h-4 text-[#285735]" />
              Sürüş ve Limuzin Deneyimi
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Profesyonel Sürüş Deneyimi</span>
                <span className="text-sm font-bold text-[#285735]">
                  {driver.professionalDrivingYears || driver.drivingExperienceYears || "-"} Yıl
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Chauffeur / Limuzin Deneyimi</span>
                <span className="text-sm font-bold text-teal-700">
                  {driver.chauffeurExperienceYears || "-"} Yıl
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 sm:col-span-2">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Daha Önce Limo Şirketinde Çalıştı mı?</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {driver.workedForLimoCompany ? "Evet" : "Hayır / Belirtilmedi"}
                  </span>
                  {driver.previousCompanyName && (
                    <span className="text-xs font-medium text-[#285735] bg-[#eaf4ec] px-2 py-0.5 rounded">
                      Firma: {driver.previousCompanyName}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 sm:col-span-2">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Müsaitlik &amp; Tercih Edilen Saatler</span>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {driver.availability && Array.isArray(driver.availability) && driver.availability.length > 0 ? (
                    driver.availability.map((opt) => (
                      <span key={opt} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                        {opt}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Belirtilmedi</span>
                  )}
                  {driver.preferredHours && (
                    <span className="px-2.5 py-1 rounded-lg bg-gray-200 text-gray-800 text-xs font-semibold">
                      Saat: {driver.preferredHours}
                    </span>
                  )}
                </div>
              </div>

              {driver.languages && (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 sm:col-span-2">
                  <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Konuştuğu Diller</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {Array.isArray(driver.languages) ? driver.languages.join(", ") : driver.languages}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: License & Chauffeur Registration Data */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-[#1a3822] mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
              <ShieldCheck className="w-4 h-4 text-[#285735]" />
              Ehliyet ve Chauffeur Registration Bilgileri
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Ehliyet Numarası &amp; Eyalet</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold text-gray-900 tracking-wider">
                    {driver.licenseNumber}
                  </span>
                  {driver.licenseState && (
                    <span className="text-xs px-2 py-0.5 rounded bg-[#eaf4ec] text-[#285735] font-bold border border-[#285735]/20">
                      {driver.licenseState}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Ehliyet Bitiş Tarihi</span>
                <span className="text-sm font-semibold text-gray-900">
                  {driver.licenseExpirationDate || "Belirtilmedi"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 sm:col-span-2">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-1">Chauffeur Registration</span>
                {driver.hasChauffeurRegistration ? (
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mevcut
                    </span>
                    <p className="text-sm text-gray-800 pt-1">
                      No: <span className="font-mono font-semibold">{driver.chauffeurRegistrationNumber || "-"}</span> • Bitiş: {driver.chauffeurRegistrationExpirationDate || "-"}
                    </p>
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <XCircle className="w-3.5 h-3.5 text-gray-400" /> Chauffeur Registration Belgesi Yok
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 4: Internal Operational Notes */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#1a3822] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#285735]" />
                Operasyonel İnceleme Notları
              </h2>
              {notesSaved && (
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <Check className="w-3.5 h-3.5" /> Notlar Kaydedildi
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 mb-3">
              Mülakat değerlendirmeleri, referans aramaları veya özel operasyon notları ekleyebilirsiniz.
            </p>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Örn: Telefon mülakatı yapıldı, İngilizcesi ve güzergah bilgisi çok iyi. Las Vegas ve F1 Miami haftasında aktif çalışabilir..."
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white resize-y transition-colors"
            />

            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#285735] hover:bg-[#1f4429] text-white transition-all disabled:opacity-50 shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                {isSavingNotes ? "Kaydediliyor..." : "Notu Kaydet"}
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Driver License & Chauffeur Reg Documents */}
        <div className="space-y-6">

          {/* License Documents Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
            <h2 className="text-base font-bold text-[#1a3822] flex items-center gap-2 pb-3 border-b border-gray-100">
              <ShieldCheck className="w-4 h-4 text-[#285735]" />
              Ehliyet Belgeleri
            </h2>

            {/* Front Photo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">Ön Yüz Fotoğrafı</span>
                {driver.licenseFrontUrl && (
                  <a
                    href={driver.licenseFrontUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#285735] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> İndir / Aç
                  </a>
                )}
              </div>

              {driver.licenseFrontUrl ? (
                <div 
                  onClick={() => setSelectedImage({ url: driver.licenseFrontUrl, title: `${driver.firstName} ${driver.lastName} - Ehliyet Ön Yüz` })}
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:border-[#285735] transition-all"
                >
                  <Image
                    src={driver.licenseFrontUrl}
                    alt="Ehliyet Ön Yüz"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="px-3 py-1.5 rounded-lg bg-black/75 text-white text-xs font-medium flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Büyüt
                    </span>
                  </div>
                </div>
              ) : (
                <div className="aspect-[16/10] rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  Ön yüz fotoğrafı yüklenmedi
                </div>
              )}
            </div>

            {/* Back Photo */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">Arka Yüz Fotoğrafı</span>
                {driver.licenseBackUrl && (
                  <a
                    href={driver.licenseBackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#285735] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> İndir / Aç
                  </a>
                )}
              </div>

              {driver.licenseBackUrl ? (
                <div 
                  onClick={() => setSelectedImage({ url: driver.licenseBackUrl, title: `${driver.firstName} ${driver.lastName} - Ehliyet Arka Yüz` })}
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:border-[#285735] transition-all"
                >
                  <Image
                    src={driver.licenseBackUrl}
                    alt="Ehliyet Arka Yüz"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="px-3 py-1.5 rounded-lg bg-black/75 text-white text-xs font-medium flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Büyüt
                    </span>
                  </div>
                </div>
              ) : (
                <div className="aspect-[16/10] rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  Arka yüz fotoğrafı yüklenmedi
                </div>
              )}
            </div>
          </div>

          {/* Chauffeur Registration Document Card (if uploaded) */}
          {(driver.chauffeurRegistrationFrontUrl || driver.chauffeurRegistrationBackUrl) && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="text-base font-bold text-[#1a3822] flex items-center gap-2">
                  <FileBadge className="w-4 h-4 text-[#285735]" />
                  Chauffeur Registration
                </h2>
                {driver.chauffeurRegistrationFrontUrl && (
                  <a
                    href={driver.chauffeurRegistrationFrontUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#285735] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> İndir / Aç
                  </a>
                )}
              </div>

              {driver.chauffeurRegistrationFrontUrl && (
                <div 
                  onClick={() => setSelectedImage({ url: driver.chauffeurRegistrationFrontUrl!, title: `${driver.firstName} ${driver.lastName} - Chauffeur Registration Belgesi` })}
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:border-[#285735] transition-all"
                >
                  <Image
                    src={driver.chauffeurRegistrationFrontUrl}
                    alt="Chauffeur Reg Document"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="px-3 py-1.5 rounded-lg bg-black/75 text-white text-xs font-medium flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Büyüt
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Checklist */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#285735]" />
              İnceleme Kontrol Listesi
            </h3>
            <ul className="text-xs space-y-2.5 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#285735] mt-1.5 shrink-0" />
                <span>Ehliyetteki isim başvuru bilgileriyle uyuşuyor mu?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#285735] mt-1.5 shrink-0" />
                <span>Ehliyetin son kullanma tarihi geçerli mi?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#285735] mt-1.5 shrink-0" />
                <span>Limuzin sürüş deneyimi VIP standartlarına uygun mu?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#285735] mt-1.5 shrink-0" />
                <span>Telefon / WhatsApp mülakatı gerçekleştirildi mi?</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Full-Screen Image Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white pb-3 px-1">
              <span className="text-sm font-semibold">{selectedImage.title}</span>
              <div className="flex items-center gap-3">
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Orijinal Boyut
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>

            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-black border border-gray-800">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
