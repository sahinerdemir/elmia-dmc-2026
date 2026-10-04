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
  ExternalLink,
  MessageSquare,
  FileText,
  Eye,
  EyeOff,
  Download,
  Check,
  Send,
  Sparkles
} from "lucide-react";
import { DriverApplication, DriverStatus } from "@/types/driver";

export default function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();

  const [driver, setDriver] = useState<DriverApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSSN, setShowSSN] = useState(false);

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
        const res = await fetch(`/api/crm/drivers/${id}`);
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
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Şoför başvurusu yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <AlertCircle className="w-16 h-16 text-rose-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Şoför Başvurusu Bulunamadı</h2>
          <p className="text-slate-400 mb-6">İstenen şoför kaydı silinmiş veya mevcut değil.</p>
          <Link
            href="/crm/drivers"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Şoför Listesine Dön
          </Link>
        </div>
      </div>
    );
  }

  const cleanPhone = formatCleanPhone(driver.phone);
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("1") ? cleanPhone : `1${cleanPhone}`}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Back and Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/crm/drivers"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Şoför Başvurularına Dön
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {isDeleting ? "Siliniyor..." : "Başvuruyu Sil"}
            </button>
          </div>
        </div>

        {/* Main Header Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Car className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-white">
                    {driver.firstName} {driver.lastName}
                  </h1>
                  <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-slate-800 text-slate-400 border border-slate-700">
                    ID: {driver.id.slice(0, 8)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Başvuru: {new Date(driver.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    Memleket / Köken: <strong className="text-slate-200">{driver.origin}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Selector */}
              <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-xl p-1.5">
                <span className="text-xs text-slate-400 pl-2 pr-1 font-medium">Durum:</span>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value as DriverStatus)}
                  disabled={isUpdatingStatus}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border outline-none cursor-pointer transition-colors ${
                    status === "pending"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : status === "reviewed"
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      : status === "approved"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  }`}
                >
                  <option value="pending" className="bg-slate-900 text-amber-300">⏳ Beklemede</option>
                  <option value="reviewed" className="bg-slate-900 text-blue-300">🔍 İncelendi</option>
                  <option value="approved" className="bg-slate-900 text-emerald-300">✅ Onaylandı</option>
                  <option value="rejected" className="bg-slate-900 text-rose-300">❌ Reddedildi</option>
                </select>
                {statusSaved && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium px-2">
                    <Check className="w-3.5 h-3.5" /> Kaydedildi
                  </span>
                )}
              </div>

              {/* Direct Communication Buttons */}
              <a
                href={`tel:${driver.phone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shadow-emerald-900/30"
              >
                <Phone className="w-3.5 h-3.5" />
                Ara
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href={`mailto:${driver.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
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

            {/* Card: Personal & Experience Info */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Kişisel & Tecrübe Bilgileri
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block mb-1">Ad Soyad</span>
                  <span className="text-sm font-semibold text-white">{driver.firstName} {driver.lastName}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block mb-1">Telefon</span>
                  <a href={`tel:${driver.phone}`} className="text-sm font-semibold text-emerald-400 hover:underline">
                    {driver.phone}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block mb-1">E-posta</span>
                  <a href={`mailto:${driver.email}`} className="text-sm font-medium text-slate-200 hover:underline break-all">
                    {driver.email}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block mb-1">Nereli Olduğu (Memleket / Köken)</span>
                  <span className="text-sm font-semibold text-white">{driver.origin}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block mb-1">Amerika&apos;da Yaşama Süresi</span>
                  <span className="text-sm font-semibold text-emerald-400">
                    {driver.yearsInUS} Yıl
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block mb-1">Şoförlük Tecrübesi</span>
                  <span className="text-sm font-semibold text-teal-400">
                    {driver.drivingExperienceYears} Yıl Aktif
                  </span>
                </div>

                {driver.languages && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-xs text-slate-500 block mb-1">Konuştuğu Diller</span>
                    <span className="text-sm text-slate-200">{driver.languages}</span>
                  </div>
                )}

                {driver.vehicleExperience && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-xs text-slate-500 block mb-1">Araç Deneyimi</span>
                    <span className="text-sm text-slate-200">{driver.vehicleExperience}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Card: Legal & Family Status */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Yasal Belgeler & Aile Durumu
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* License Number & State */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block mb-1">Ehliyet Numarası & Eyalet</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-white tracking-wider">
                      {driver.licenseNumber}
                    </span>
                    {driver.licenseState && (
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        {driver.licenseState}
                      </span>
                    )}
                  </div>
                </div>

                {/* SSN Status */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block mb-1">SSN (Social Security Number)</span>
                  {driver.hasSSN ? (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Var
                        </span>
                        <span className="text-sm font-mono text-slate-300">
                          {showSSN ? (driver.ssn || "Belirtilmedi") : (driver.ssn ? `***-**-${driver.ssn.slice(-4)}` : "Mevcut")}
                        </span>
                      </div>
                      {driver.ssn && (
                        <button
                          type="button"
                          onClick={() => setShowSSN(!showSSN)}
                          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                          title={showSSN ? "SSN Gizle" : "SSN Göster"}
                        >
                          {showSSN ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <XCircle className="w-3.5 h-3.5 text-slate-500" /> Yok / Başvurulmadı
                    </span>
                  )}
                </div>

                {/* Children Details */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 sm:col-span-2">
                  <span className="text-xs text-slate-500 block mb-1">Çocuk Durumu</span>
                  {driver.hasChildren ? (
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Çocuğu Var
                      </span>
                      {driver.childrenDetails ? (
                        <p className="text-sm text-slate-300 mt-1 pl-5 border-l-2 border-emerald-500/40">
                          {driver.childrenDetails}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500 pl-5">Detay belirtilmemiş.</p>
                      )}
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <XCircle className="w-3.5 h-3.5 text-slate-500" /> Çocuğu Yok
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card: Internal Notes */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Operasyonel İnceleme Notları
                </h2>
                {notesSaved && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <Check className="w-3.5 h-3.5" /> Notlar Kaydedildi
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 mb-3">
                Mülakat değerlendirmeleri, referans aramaları, müsaitlik durumu veya özel notlar ekleyebilirsiniz.
              </p>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Örn: Telefon mülakatı yapıldı, İngilizcesi ve güzergah bilgisi çok iyi. Las Vegas CES ve Formula 1 dönemlerinde tam zamanlı çalışabilir..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-y transition-colors"
              />

              <div className="flex justify-end mt-3">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all disabled:opacity-50 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSavingNotes ? "Kaydediliyor..." : "Notu Kaydet"}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Driver License Photos & Quick Verification (1 col) */}
          <div className="space-y-6">

            {/* License Photos Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Ehliyet Belgeleri
              </h2>

              {/* Front Photo */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Ön Yüz Fotoğrafı</span>
                  {driver.licenseFrontUrl && (
                    <a
                      href={driver.licenseFrontUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> İndir / Aç
                    </a>
                  )}
                </div>

                {driver.licenseFrontUrl ? (
                  <div 
                    onClick={() => setSelectedImage({ url: driver.licenseFrontUrl, title: `${driver.firstName} ${driver.lastName} - Ehliyet Ön Yüz` })}
                    className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-all"
                  >
                    <Image
                      src={driver.licenseFrontUrl}
                      alt="Ehliyet Ön Yüz"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-medium flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Büyüt
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[16/10] rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
                    Ön yüz fotoğrafı yüklenmedi
                  </div>
                )}
              </div>

              {/* Back Photo */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Arka Yüz Fotoğrafı</span>
                  {driver.licenseBackUrl && (
                    <a
                      href={driver.licenseBackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> İndir / Aç
                    </a>
                  )}
                </div>

                {driver.licenseBackUrl ? (
                  <div 
                    onClick={() => setSelectedImage({ url: driver.licenseBackUrl, title: `${driver.firstName} ${driver.lastName} - Ehliyet Arka Yüz` })}
                    className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-all"
                  >
                    <Image
                      src={driver.licenseBackUrl}
                      alt="Ehliyet Arka Yüz"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-medium flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Büyüt
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[16/10] rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
                    Arka yüz fotoğrafı yüklenmedi
                  </div>
                )}
              </div>
            </div>

            {/* Quick Verification Checklist */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                İnceleme Kontrol Listesi
              </h3>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Ehliyetteki isim başvuru ismiyle uyuşuyor mu?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Ehliyetin son kullanma tarihi geçerli mi?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Amerika şoförlük tecrübesi VIP standartlarına uygun mu?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Telefon ve WhatsApp üzerinden teyit sağlandı mı?</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Full-Screen Image Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
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
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Kapat (ESC)
                </button>
              </div>
            </div>

            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
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
