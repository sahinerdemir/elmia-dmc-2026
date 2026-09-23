"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { 
  Trash2, 
  RotateCcw, 
  Search, 
  ChevronRight, 
  FileText, 
  Users, 
  AlertTriangle,
  Building2,
  Calendar,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Lead } from "@/types/crm";

export default function TrashPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isEmptying, setIsEmptying] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchTrashedLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/crm/leads");
      const data = await res.json();
      if (data.leads) {
        // Filter leads that are marked as trashed or archived
        setLeads(
          data.leads.filter(
            (l: Lead) => l.isTrashed || l.status === "archived" || l.status === "trashed"
          )
        );
      }
    } catch (e) {
      console.error("Failed to fetch trashed leads", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashedLeads();

    const handleFocus = () => fetchTrashedLeads();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleRestore = async (lead: Lead, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, action: "restore" })
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== lead.id));
        showNotice(`Restored "${lead.name}" back to ${lead.category === "proposal" ? "Proposals" : "Contacts"}.`);
      } else {
        alert("Failed to restore item.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handleDeletePermanently = async (lead: Lead, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!window.confirm(`Permanently delete "${lead.name}" from the database? This CANNOT be undone.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/crm/leads?id=${lead.id}&permanent=true`, {
        method: "DELETE"
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== lead.id));
        showNotice(`Permanently deleted "${lead.name}".`);
      } else {
        alert("Failed to permanently delete item.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handleEmptyTrash = async () => {
    if (leads.length === 0) return;
    if (
      !window.confirm(
        `Are you sure you want to permanently delete ALL ${leads.length} item(s) in the trash? This will purge them from the server forever.`
      )
    ) {
      return;
    }

    setIsEmptying(true);
    try {
      const res = await fetch("/api/crm/leads?action=empty-trash", {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads([]);
        showNotice(`Trash emptied successfully. ${data.count || 0} item(s) permanently removed.`);
      } else {
        alert("Failed to empty trash.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while emptying trash.");
    } finally {
      setIsEmptying(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads
      .filter((l) => {
        const matchesSearch =
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = categoryFilter === "all" || l.category === categoryFilter;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [leads, searchQuery, categoryFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#101912] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#27422c] flex items-center space-x-3 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-[#74b382] shrink-0" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] font-heading flex items-center">
            <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-red-600" />
            Trash
            {leads.length > 0 && (
              <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                {leads.length}
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Safely manage deleted proposals and contact inquiries. Restore them anytime or empty the trash permanently.
          </p>
        </div>

        {leads.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            disabled={isEmptying}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isEmptying ? "Emptying..." : "Empty Trash (Permanently)"}
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deleted items by name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735]"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] bg-white cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="proposal">Proposals Only</option>
            <option value="contact">Contacts Only</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#285735]"></div>
        </div>
      ) : leads.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <Trash2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Trash is Empty</h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            There are no deleted proposals or contact inquiries. When you delete records from Proposals or Contacts, they will be held here safely until you permanently empty the trash.
          </p>
          <div className="pt-2">
            <Link
              href="/crm/proposals"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-[#eaf4ec] text-[#285735] font-semibold text-xs hover:bg-[#d8edd9] transition-all"
            >
              Go to Proposals
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            lead.category === "proposal"
                              ? "bg-[#eaf4ec] text-[#285735]"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {lead.category}
                        </span>
                        <h3 className="font-bold text-gray-900 text-sm truncate">{lead.name}</h3>
                      </div>
                      {lead.company && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center truncate">
                          <Building2 className="w-3 h-3 mr-1 shrink-0" />
                          {lead.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#f4f7f4]/70 p-2.5 rounded-xl text-xs text-gray-700">
                    <div className="font-medium text-[#1a3822] truncate">
                      {lead.service || lead.topic || "General Inquiry"}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      Submitted: {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleRestore(lead)}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition-all active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                      Restore
                    </button>
                    <button
                      onClick={() => handleDeletePermanently(lead)}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-all active:scale-95"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                      Delete Forever
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm bg-white rounded-2xl border border-gray-100">
                No trashed items matched your filter.
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service / Topic</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            lead.category === "proposal"
                              ? "bg-[#eaf4ec] text-[#285735]"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {lead.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{lead.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{lead.company || lead.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{lead.service || lead.topic || "General Inquiry"}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{lead.dates || "No dates specified"}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleRestore(lead)}
                            title="Restore back to original folder"
                            className="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-sm"
                          >
                            <RotateCcw className="w-3.5 h-3.5 mr-1" />
                            Restore
                          </button>
                          <button
                            onClick={() => handleDeletePermanently(lead)}
                            title="Delete permanently from database"
                            className="inline-flex items-center px-3 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg text-xs font-semibold transition-all active:scale-95 shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Delete Forever
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No trashed items matched your filter.
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
