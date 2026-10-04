"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  FileText,
  MessageSquare,
  Save,
  CheckCircle2,
  Clock,
  Eye,
  Sparkles,
  Send,
  ChevronDown,
  Trash2,
  RotateCcw,
  Archive,
  Check,
  AlertCircle
} from "lucide-react";
import { Lead, LeadStatus } from "@/types/crm";
import ClientCommunicationPanel from "@/components/crm/ClientCommunicationPanel";

export default function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  // Note editing state
  const [note, setNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [statusSaved, setStatusSaved] = useState(false);

  const handleMoveToTrash = async () => {
    if (!lead) return;
    if (!window.confirm(`Move proposal from "${lead.name}" to Trash? You can restore it anytime.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/crm/leads?id=${lead.id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        window.dispatchEvent(new Event("crm_records_updated"));
        router.push("/crm/proposals");
      } else {
        alert("Failed to move proposal to trash.");
        setIsDeleting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
      setIsDeleting(false);
    }
  };

  const handleRestore = async () => {
    if (!lead) return;
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, action: "restore" })
      });
      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
        window.dispatchEvent(new Event("crm_records_updated"));
      } else {
        alert("Failed to restore proposal.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handleDeletePermanently = async () => {
    if (!lead) return;
    if (!window.confirm(`Permanently delete proposal from "${lead.name}"? This CANNOT be undone.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/crm/leads?id=${lead.id}&permanent=true`, {
        method: "DELETE"
      });
      if (res.ok) {
        window.dispatchEvent(new Event("crm_records_updated"));
        router.push("/crm/trash");
      } else {
        alert("Failed to permanently delete proposal.");
        setIsDeleting(false);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error.");
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    async function fetchLead() {
      try {
        const res = await fetch("/api/crm/leads", { cache: "no-store" });
        const data = await res.json();
        if (data.leads) {
          const found = data.leads.find((l: Lead) => l.id === id);
          if (found) {
            setLead(found);
            setNote(found.internalNotes || "");
            
            // Auto-mark as read if unread
            if (found.status === "unread") {
              await fetch("/api/crm/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: found.id, status: "read" })
              });
              setLead({ ...found, status: "read" });
              window.dispatchEvent(new Event("crm_records_updated"));
            }
          }
        }
      } catch (e) {
        console.error("Failed to fetch lead", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLead();
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!lead) return;
    const prevStatus = lead.status;
    const optimisticStatus = newStatus === "archived" ? "rejected" : (newStatus as LeadStatus);
    setLead({ ...lead, status: optimisticStatus });
    setStatusSaved(false);
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, status: newStatus })
      });
      if (res.ok) {
        setStatusSaved(true);
        window.dispatchEvent(new Event("crm_records_updated"));
        setTimeout(() => setStatusSaved(false), 3000);
      } else {
        setLead({ ...lead, status: prevStatus });
      }
    } catch (e) {
      console.error(e);
      setLead({ ...lead, status: prevStatus });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNote = async () => {
    if (!lead) return;
    setIsSavingNote(true);
    setNoteSaved(false);
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, internalNotes: note })
      });
      if (res.ok) {
        setLead({ ...lead, internalNotes: note });
        setNoteSaved(true);
        setTimeout(() => setNoteSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingNote(false);
    }
  };

  const formatCleanPhone = (phoneStr?: string) => {
    if (!phoneStr) return "";
    return phoneStr.replace(/[^0-9]/g, "");
  };

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-2 border-[#285735] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Teklif talebi yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center py-20">
        <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Teklif Talebi Bulunamadı</h2>
        <p className="text-gray-500 mb-6 text-sm">İstenen teklif kaydı silinmiş veya mevcut değil.</p>
        <Link
          href="/crm/proposals"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#285735] hover:bg-[#1f4429] text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Teklif Listesine Dön
        </Link>
      </div>
    );
  }

  const cleanPhone = formatCleanPhone(lead.phone);
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith("1") ? cleanPhone : `1${cleanPhone}`}` : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

      {/* Top Back Nav & Delete Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link 
            href={lead.isTrashed || lead.status === "trashed" ? "/crm/trash" : "/crm/proposals"} 
            className="text-gray-600 hover:text-gray-900 active:scale-95 flex items-center text-sm font-semibold transition-all py-1.5"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> {lead.isTrashed || lead.status === "trashed" ? "Çöp Kutusuna Dön" : "Teklif Taleplerine Dön"}
          </Link>
          {(lead.status === "archived" || lead.status === "rejected") && !lead.isTrashed && (
            <Link
              href="/crm/proposals/archive"
              className="text-rose-600 hover:text-rose-800 active:scale-95 flex items-center text-sm font-semibold transition-all py-1.5 border-l border-gray-300 pl-3"
            >
              <Archive className="w-3.5 h-3.5 mr-1" /> Arşive Git
            </Link>
          )}
        </div>

        {!(lead.isTrashed || lead.status === "trashed") && (
          <button
            onClick={handleMoveToTrash}
            disabled={isDeleting}
            className="inline-flex items-center px-3.5 py-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 text-xs font-bold transition-all active:scale-95 disabled:opacity-50 shadow-xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            {isDeleting ? "Taşınıyor..." : "Çöp Kutusuna Taşı"}
          </button>
        )}
      </div>

      {/* Trashed Alert Banner */}
      {(lead.isTrashed || lead.status === "trashed") && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-amber-800 text-sm font-medium">
            <Trash2 className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Bu teklif talebi şu anda <strong>Çöp Kutusunda</strong> bulunuyor.</span>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleRestore}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Teklifi Geri Yükle
            </button>
            <button
              onClick={handleDeletePermanently}
              disabled={isDeleting}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Kalıcı Olarak Sil
            </button>
          </div>
        </div>
      )}

      {/* Main Header Card (Matching Drivers Detail Header) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#285735]/10 border border-[#285735]/20 flex items-center justify-center shrink-0 text-[#285735] font-bold text-xl">
              {lead.name?.charAt(0) || "P"}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] font-heading">
                  {lead.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-gray-100 text-gray-600 border border-gray-200">
                  ID: {lead.id.slice(0, 12)}
                </span>
                {lead.priority === "vip" && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wider">
                    VIP Müşteri
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Gönderim: {new Date(lead.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
                {lead.company && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    Şirket: <strong className="text-gray-800">{lead.company}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Status & Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Selector */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1.5">
              <span className="text-xs text-gray-500 pl-2 pr-1 font-medium">Durum:</span>
              <select
                value={lead.status === "rejected" ? "archived" : lead.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                disabled={isUpdatingStatus}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border outline-none cursor-pointer transition-colors ${
                  lead.status === "unread"
                    ? "bg-red-50 text-red-800 border-red-200"
                    : lead.status === "read"
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : lead.status === "responded"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : lead.status === "converted"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                <option value="unread">⏳ Okunmadı</option>
                <option value="read">🔍 Okundu (İnceleniyor)</option>
                <option value="responded">✉️ Yanıtlandı</option>
                <option value="converted">🏆 Kazanıldı (Converted)</option>
                <option value="archived">❌ Reddedildi (Arşiv)</option>
              </select>
              {statusSaved && (
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium px-2">
                  <Check className="w-3.5 h-3.5" /> Kaydedildi
                </span>
              )}
            </div>

            {/* Direct Communication Buttons */}
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#285735] hover:bg-[#1f4429] text-white transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                Ara
              </a>
            )}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            )}
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              E-posta
            </a>
          </div>
        </div>

        {(lead.status === "archived" || lead.status === "rejected") && (
          <div className="mt-4 text-[12px] text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-xl font-medium flex items-center justify-between">
            <span>📦 Bu teklif talebi Arşivdedir. Durumu değiştirdiğinizde aktif teklifler listesine geri taşınacaktır.</span>
            <Link href="/crm/proposals/archive" className="font-bold underline ml-2">Arşivi Görüntüle &rarr;</Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Main Column: Proposal & Request Details */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-[#1a3822] font-heading border-b border-gray-100 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#285735]" /> Talep Detayları
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Talep Edilen Hizmet</span>
                <span className="text-sm font-bold text-gray-900">{lead.service || "Genel Teklif"}</span>
              </div>

              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Grup Büyüklüğü</span>
                <span className="text-sm font-bold text-gray-900">{lead.groupSize ? `${lead.groupSize} Kişi` : "Belirtilmedi"}</span>
              </div>

              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Tarihler / Süre</span>
                <span className="text-sm font-bold text-gray-900">{lead.dates || "Belirtilmedi"}</span>
              </div>

              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">İletişim Bilgisi</span>
                <span className="text-sm font-bold text-gray-900">{lead.email}</span>
                {lead.phone && <span className="text-xs text-gray-500 block mt-0.5">{lead.phone}</span>}
              </div>
            </div>

            {/* Message Box */}
            <div className="bg-[#fcfdfc] border border-gray-200/80 rounded-2xl p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Müşteri Mesajı / Özel İstekler</span>
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {lead.message || "Mesaj detayı girilmemiş."}
              </p>
            </div>
          </div>

          {/* Client Communication Panel (Outbound email thread) */}
          <ClientCommunicationPanel
            lead={lead}
            onLeadUpdated={(updated) => setLead(updated)}
          />
          
        </div>

        {/* Sidebar / Internal Notes Column */}
        <div className="space-y-5 sm:space-y-6">
          
          {/* Internal Notes */}
          <div className="bg-[#111b13] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl">
            <h3 className="text-base sm:text-lg font-bold mb-2 font-heading flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#74b382]" /> Operasyonel Notlar
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Yalnızca şirket içi operasyon ekibi tarafından görüntülenebilir.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-[#0c1810] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#74b382] min-h-[140px] sm:min-h-[180px] resize-y mb-3"
              placeholder="Fiyatlandırma detayları, araç tahsis notları veya özel talepler..."
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#74b382] font-medium h-4">
                {noteSaved ? "Notlar kaydedildi." : ""}
              </span>
              <button
                onClick={handleSaveNote}
                disabled={isSavingNote}
                className="px-4 py-2.5 bg-[#285735] hover:bg-[#346c43] active:scale-95 text-white rounded-xl text-xs font-bold transition-all flex items-center disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                {isSavingNote ? "Kaydediliyor..." : "Notları Kaydet"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
