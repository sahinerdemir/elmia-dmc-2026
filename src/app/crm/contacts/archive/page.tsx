"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  ChevronRight, 
  Building2, 
  Calendar,
  Trash2,
  Archive,
  RefreshCw
} from "lucide-react";
import { Lead, LeadStatus } from "@/types/crm";

export default function ContactsArchivePage() {
  const [archivedLeads, setArchivedLeads] = useState<Lead[]>([]);
  const [activeCount, setActiveCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/crm/leads");
      const data = await res.json();
      if (data.leads) {
        const contactLeads = data.leads.filter(
          (l: Lead) => l.category === "contact" && !l.isTrashed && l.status !== "trashed"
        );
        const archived = contactLeads.filter(
          (l: Lead) => l.status === "rejected" || l.status === "archived"
        );
        const active = contactLeads.filter(
          (l: Lead) => l.status !== "rejected" && l.status !== "archived"
        );
        setArchivedLeads(archived);
        setActiveCount(active.length);
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
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        // If changed to a non-archived status, it leaves archive and goes back to active contacts!
        if (newStatus !== "rejected" && newStatus !== "archived") {
          setArchivedLeads((prev) => prev.filter((l) => l.id !== id));
          setActiveCount((prev) => prev + 1);
        } else {
          setArchivedLeads((prev) =>
            prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
          );
        }
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
        setArchivedLeads((prev) => prev.filter((l) => l.id !== id));
      } else {
        alert("Failed to move contact inquiry to trash.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error.");
    }
  };

  const filteredLeads = useMemo(() => {
    return archivedLeads.filter((l) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) || 
        (l.company && l.company.toLowerCase().includes(q)) ||
        (l.email && l.email.toLowerCase().includes(q))
      );
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [archivedLeads, searchQuery]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                <Archive className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] font-heading tracking-tight">
                İletişim Talepleri — Arşiv
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Reddedilen veya arşive kaldırılan iletişim talepleri. Durumu &quot;Reddedildi&quot; haricinde bir değere değiştirirseniz otomatik olarak ana listeye geri taşınır.
            </p>
          </div>

          {/* Navigation Tabs between Active & Archive */}
          <div className="flex items-center space-x-2 bg-gray-100/80 p-1 rounded-xl shrink-0">
            <Link
              href="/crm/contacts"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 transition-all flex items-center space-x-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Aktif Talepler ({activeCount})</span>
            </Link>
            <Link
              href="/crm/contacts/archive"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-rose-700 shadow-xs border border-rose-200/50"
            >
              Arşiv ({archivedLeads.length})
            </Link>
          </div>
        </div>
        
        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Arşivde ara (isim, firma, e-posta)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735]"
            />
          </div>

          <button
            onClick={fetchLeads}
            className="px-3 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-medium transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
            title="Listeyi Yenile"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#285735]" : ""}`} />
            <span>Yenile</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 flex justify-center bg-white rounded-2xl sm:rounded-3xl border border-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#285735]"></div>
        </div>
      ) : (
        <>
          {/* Mobile Card List View (Shown on screens < md) */}
          <div className="block md:hidden space-y-3">
            {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
              <div 
                key={lead.id}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-colors"
              >
                <Link href={`/crm/contacts/${lead.id}`} className="block">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{lead.name}</h3>
                      {lead.company && (
                        <p className="text-xs text-gray-500 truncate flex items-center mt-0.5">
                          <Building2 className="w-3.5 h-3.5 mr-1 shrink-0" />
                          {lead.company}
                        </p>
                      )}
                    </div>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0">
                      Reddedildi
                    </span>
                  </div>

                  <div className="bg-[#f4f7f4]/70 p-2.5 rounded-xl text-xs text-gray-700 mb-2">
                    <div className="font-medium text-[#1a3822] truncate">{lead.topic || lead.service || "General Inquiry"}</div>
                    {lead.dates && (
                      <div className="text-gray-500 mt-0.5 flex items-center text-[11px]">
                        <Calendar className="w-3 h-3 mr-1 shrink-0" />
                        {lead.dates}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>

                    {/* Quick Restore Dropdown */}
                    <select
                      value={lead.status === "rejected" ? "rejected" : "archived"}
                      disabled={updatingId === lead.id}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className="text-xs font-semibold px-2 py-1 bg-white border border-rose-200 text-rose-700 rounded-lg cursor-pointer outline-none"
                    >
                      <option value="archived">❌ Reddedildi (Arşiv)</option>
                      <option value="unread">↺ Unread (Geri Al)</option>
                      <option value="read">↺ Read (Geri Al)</option>
                      <option value="responded">↺ Responded (Geri Al)</option>
                      <option value="converted">↺ Converted (Geri Al)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-1 border-t border-gray-50">
                    <button
                      onClick={(e) => handleDeleteLead(lead.id, lead.name, e)}
                      title="Move to Trash"
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      href={`/crm/contacts/${lead.id}`}
                      className="font-semibold text-[#285735] text-xs flex items-center"
                    >
                      Review <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-gray-500 text-sm bg-white rounded-2xl border border-gray-100">
                Arşivde iletişim talebi bulunmuyor.
              </div>
            )}
          </div>

          {/* Desktop Table View (Shown on md and up) */}
          <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Topic / Need</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Durum &amp; Geri Al</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{lead.company || lead.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{lead.topic || lead.service || "General Inquiry"}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{lead.dates || "No dates specified"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <select
                          value={lead.status === "rejected" ? "rejected" : "archived"}
                          disabled={updatingId === lead.id}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="text-xs font-semibold px-2.5 py-1.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg cursor-pointer outline-none transition-colors hover:border-rose-300"
                          title="Durumu değiştirerek aktif listeye geri taşıyabilirsiniz"
                        >
                          <option value="archived">❌ Reddedildi (Arşivde)</option>
                          <option value="unread">↺ Unread olarak Geri Al</option>
                          <option value="read">↺ Read olarak Geri Al</option>
                          <option value="responded">↺ Responded olarak Geri Al</option>
                          <option value="converted">↺ Converted olarak Geri Al</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center justify-end space-x-2">
                        <Link 
                          href={`/crm/contacts/${lead.id}`}
                          className="inline-flex items-center justify-center px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-[#285735] hover:text-white hover:border-[#285735] transition-all shadow-sm"
                        >
                          Open <ChevronRight className="w-3 h-3 ml-1" />
                        </Link>
                        <button
                          onClick={(e) => handleDeleteLead(lead.id, lead.name, e)}
                          title="Move to Trash"
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Arşivde iletişim talebi bulunmuyor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
