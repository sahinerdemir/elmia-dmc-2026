"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Eye, 
  Building2, 
  Calendar,
  Trash2,
  Archive,
  RefreshCw,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react";
import { Lead, LeadStatus } from "@/types/crm";

export default function ContactsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [archiveCount, setArchiveCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/crm/leads", { cache: "no-store" });
      const data = await res.json();
      if (data.leads) {
        const contactLeads = data.leads.filter(
          (l: Lead) => l.category === "contact" && !l.isTrashed && l.status !== "trashed"
        );
        const active = contactLeads.filter(
          (l: Lead) => l.status !== "rejected" && l.status !== "archived"
        );
        const archived = contactLeads.filter(
          (l: Lead) => l.status === "rejected" || l.status === "archived"
        );
        setLeads(active);
        setArchiveCount(archived.length);
      }
    } catch (e) {
      console.error("Failed to fetch leads", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();

    const handleFocus = () => fetchLeads();
    const handleUpdate = () => fetchLeads();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("crm_records_updated", handleUpdate);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("crm_records_updated", handleUpdate);
    };
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        if (newStatus === "archived" || newStatus === "rejected") {
          // Move from active list to archive
          setLeads((prev) => prev.filter((l) => l.id !== id));
          setArchiveCount((prev) => prev + 1);
        } else {
          setLeads((prev) =>
            prev.map((l) => (l.id === id ? { ...l, status: newStatus as LeadStatus } : l))
          );
        }
        window.dispatchEvent(new Event("crm_records_updated"));
      } else {
        alert("Durum güncellenemedi.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Ağ hatası.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteLead = async (id: string, name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Move contact inquiry from "${name}" to Trash? You can restore it anytime from the Trash folder.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/crm/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        window.dispatchEvent(new Event("crm_records_updated"));
      } else {
        alert("Failed to move contact inquiry to trash.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error.");
    }
  };

  // Filtered active contacts
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          (l.company && l.company.toLowerCase().includes(q)) ||
          (l.email && l.email.toLowerCase().includes(q)) ||
          (l.phone && l.phone.toLowerCase().includes(q)) ||
          (l.topic && l.topic.toLowerCase().includes(q)) ||
          (l.message && l.message.toLowerCase().includes(q))
        );
      }
      return true;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [leads, searchQuery, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    return {
      activeTotal: leads.length,
      unread: leads.filter((l) => l.status === "unread").length,
      read: leads.filter((l) => l.status === "read").length,
      responded: leads.filter((l) => l.status === "responded" || l.status === "converted").length,
      archived: archiveCount
    };
  }, [leads, archiveCount]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] tracking-tight font-heading">
              İletişim Talepleri (Contacts)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Web sitesi üzerinden gelen genel iletişim, acente ortaklığı ve kurumsal sorular.
          </p>
        </div>

        {/* Action Buttons & Tabs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-2 bg-gray-100/80 p-1 rounded-xl">
            <Link
              href="/crm/contacts"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-[#285735] shadow-xs"
            >
              Aktif Talepler ({stats.activeTotal})
            </Link>
            <Link
              href="/crm/contacts/archive"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 transition-all flex items-center space-x-1.5"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Arşiv ({stats.archived})</span>
            </Link>
          </div>

          <button
            onClick={fetchLeads}
            className="p-2 bg-white hover:bg-gray-50 text-gray-600 rounded-xl text-xs transition-all border border-gray-200 cursor-pointer shadow-xs"
            title="Listeyi Yenile"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#285735]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div 
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "all" ? "bg-white border-[#285735] shadow-md ring-2 ring-[#285735]/10" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-gray-400">Toplam Aktif</div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">{stats.activeTotal}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("unread")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "unread" ? "bg-white border-red-500 shadow-md ring-2 ring-red-500/10" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-red-600 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> Bekleyenler
          </div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">{stats.unread}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("read")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "read" ? "bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-blue-600 flex items-center">
            <Eye className="w-3 h-3 mr-1" /> İncelenenler
          </div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{stats.read}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("responded")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "responded" ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/10" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-emerald-600 flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Yanıtlananlar
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{stats.responded}</div>
        </div>

        <Link 
          href="/crm/contacts/archive"
          className="p-4 rounded-2xl border transition-all bg-white border-rose-200 hover:border-rose-400 hover:shadow-md shadow-xs block group"
        >
          <div className="text-[11px] font-bold uppercase text-rose-600 flex items-center justify-between">
            <span>Arşiv (Red)</span>
            <ChevronRight className="w-3 h-3 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">{stats.archived}</div>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İsim, şirket, konu, e-posta veya mesaj metni ile ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] shadow-xs"
          />
        </div>

        <div className="w-full sm:w-52">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] bg-white cursor-pointer shadow-xs font-medium text-gray-700"
          >
            <option value="all">Tüm Aktifler</option>
            <option value="unread">⏳ Okunmadı / Beklemede</option>
            <option value="read">🔍 Okundu (İnceleniyor)</option>
            <option value="responded">✉️ Yanıtlandı</option>
            <option value="converted">🏆 Çözüldü (Converted)</option>
          </select>
        </div>
      </div>

      {/* Streamlined Clean Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-[#285735]/20 border-t-[#285735] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-500 font-medium">İletişim talepleri yükleniyor...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center px-4">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">İletişim Talebi Bulunamadı</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              Arama kriterlerinize uyan iletişim talebi bulunmuyor veya henüz kayıtlı talep yok.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-4 px-5">Gönderen</th>
                  <th className="py-4 px-5">Konu / Şirket</th>
                  <th className="py-4 px-5">Mesaj İçeriği</th>
                  <th className="py-4 px-5 text-right">Durum &amp; İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => {
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* 1. Sender Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/crm/contacts/${lead.id}`}
                            className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                          >
                            {lead.name?.charAt(0) || "C"}
                          </Link>
                          <div>
                            <Link
                              href={`/crm/contacts/${lead.id}`}
                              className="font-bold text-gray-900 text-sm hover:text-[#285735] transition-colors block"
                            >
                              {lead.name}
                            </Link>
                            <div className="flex items-center gap-2 text-gray-500 text-[11px] mt-0.5">
                              <span>{lead.email}</span>
                              {lead.phone && (
                                <>
                                  <span>•</span>
                                  <span>{lead.phone}</span>
                                </>
                              )}
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1">
                              {new Date(lead.createdAt).toLocaleDateString("tr-TR", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Topic & Company */}
                      <td className="py-4 px-5">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {lead.topic || "Genel İletişim"}
                        </span>
                        {lead.company && (
                          <div className="text-gray-600 text-[11px] mt-1.5 flex items-center gap-1 font-medium">
                            <Building2 className="w-3 h-3 text-gray-400" />
                            {lead.company}
                          </div>
                        )}
                      </td>

                      {/* 3. Message Preview */}
                      <td className="py-4 px-5 max-w-sm">
                        <p className="text-gray-600 line-clamp-2 text-xs italic">
                          &ldquo;{lead.message || "Mesaj detayı girilmedi."}&rdquo;
                        </p>
                      </td>

                      {/* 4. Status & Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer outline-none transition-colors ${
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
                            <option value="read">🔍 Okundu</option>
                            <option value="responded">✉️ Yanıtlandı</option>
                            <option value="converted">🏆 Çözüldü</option>
                            <option value="archived">❌ Reddedildi (Arşiv)</option>
                          </select>

                          <Link
                            href={`/crm/contacts/${lead.id}`}
                            className="p-2 rounded-xl text-gray-500 hover:text-[#285735] hover:bg-gray-100 transition-colors"
                            title="Detayları Görüntüle"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={(e) => handleDeleteLead(lead.id, lead.name, e)}
                            className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Çöp Kutusuna Taşı"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
