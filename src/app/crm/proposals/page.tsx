"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, 
  Search, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Eye, 
  Building2, 
  Calendar,
  Trash2
} from "lucide-react";
import { Lead } from "@/types/crm";

export default function ProposalsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleDeleteLead = async (id: string, name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Move proposal from "${name}" to Trash? You can restore it anytime from the Trash folder.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/crm/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      } else {
        alert("Failed to move proposal to trash.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error.");
    }
  };

  useEffect(() => {
    async function fetchLeads() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/crm/leads");
        const data = await res.json();
        if (data.leads) {
          setLeads(
            data.leads.filter(
              (l: Lead) => l.category === "proposal" && !l.isTrashed && l.status !== "trashed"
            )
          );
        }
      } catch (e) {
        console.error("Failed to fetch leads", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeads();

    const handleFocus = () => fetchLeads();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch = 
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [leads, searchQuery, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1"><Clock className="w-3 h-3"/> Unread</span>;
      case "read":
        return <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1"><Eye className="w-3 h-3"/> Read</span>;
      case "responded":
        return <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Responded</span>;
      case "converted":
        return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Converted</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-[11px] font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] font-heading flex items-center">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-[#285735]" />
            Proposals
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage all service and event proposal requests.</p>
        </div>
        
        {/* Search & Filter Bar (Mobile-friendly stacked or side-by-side) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name, company, email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735]"
            />
          </div>
          <div className="w-full sm:w-48">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] bg-white cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
              <option value="converted">Converted</option>
            </select>
          </div>
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
                <Link href={`/crm/proposals/${lead.id}`} className="block">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{lead.name}</h3>
                      {lead.company && (
                        <p className="text-xs text-gray-500 truncate flex items-center mt-0.5">
                          <Building2 className="w-3 h-3 mr-1 shrink-0" />
                          {lead.company}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0">
                      {getStatusBadge(lead.status)}
                    </div>
                  </div>

                  <div className="bg-[#f4f7f4]/70 p-2.5 rounded-xl text-xs text-gray-700 mb-2">
                    <div className="font-medium text-[#1a3822] truncate">{lead.service || "General Inquiry"}</div>
                    {lead.dates && (
                      <div className="text-gray-500 mt-0.5 flex items-center text-[11px]">
                        <Calendar className="w-3 h-3 mr-1 shrink-0" />
                        {lead.dates}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                  <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => handleDeleteLead(lead.id, lead.name, e)}
                      title="Move to Trash"
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      href={`/crm/proposals/${lead.id}`}
                      className="font-semibold text-[#285735] flex items-center"
                    >
                      Review <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-gray-500 text-sm bg-white rounded-2xl border border-gray-100">
                No proposals found.
              </div>
            )}
          </div>

          {/* Desktop Table View (Shown on md and up) */}
          <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service Needed</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
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
                      <div className="text-sm text-gray-700">{lead.service || "General Inquiry"}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{lead.dates || "No dates specified"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center justify-end space-x-2">
                        <Link 
                          href={`/crm/proposals/${lead.id}`}
                          className="inline-flex items-center justify-center px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-[#285735] hover:text-white hover:border-[#285735] transition-all shadow-sm"
                        >
                          Open <ChevronRight className="w-3 h-3 ml-1" />
                        </Link>
                        <button
                          onClick={(e) => handleDeleteLead(lead.id, lead.name, e)}
                          title="Move to Trash"
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No proposals found matching your criteria.
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
