"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  FileText, 
  Clock,
  ArrowRight,
  ChevronRight,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { Lead } from "@/types/crm";

export default function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteLead = async (id: string, name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Move "${name}" to Trash? You can restore it anytime from the Trash folder.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/crm/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      } else {
        alert("Failed to move record to trash.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error.");
    }
  };

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/crm/leads");
        const data = await res.json();
        if (data.leads) {
          setLeads(data.leads);
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

  const activeLeads = leads.filter((l) => !l.isTrashed && l.status !== "trashed");
  const totalProposals = activeLeads.filter(l => l.category === "proposal").length;
  const totalContacts = activeLeads.filter(l => l.category === "contact").length;
  const unreadLeads = activeLeads.filter(l => l.status === "unread").length;
  
  const recentLeads = [...activeLeads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] font-heading">Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Overview of ELMIA DMC leads and requests.</p>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Link 
              href="/crm/proposals" 
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#285735]/40 active:scale-[0.99] transition-all"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Total Proposals</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1a3822]">{totalProposals}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#eaf4ec] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-[#285735]" />
              </div>
            </Link>

            <Link 
              href="/crm/contacts" 
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#285735]/40 active:scale-[0.99] transition-all"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Total Contacts</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1a3822]">{totalContacts}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </Link>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Unread Items</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-red-600">{unreadLeads}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-base sm:text-lg font-bold text-[#1a3822]">Recent Activity</h2>
              <Link href="/crm/proposals" className="text-xs sm:text-sm font-semibold text-[#285735] hover:underline flex items-center">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
            
            <div className="divide-y divide-gray-50">
              {recentLeads.length > 0 ? recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/crm/${lead.category === "proposal" ? "proposals" : "contacts"}/${lead.id}`}
                  className="p-4 sm:p-6 hover:bg-gray-50/80 active:bg-gray-100 transition-colors flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                    <div className={`w-10 h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
                      lead.category === "proposal" ? "bg-[#eaf4ec] text-[#285735]" : "bg-blue-50 text-blue-600"
                    }`}>
                      {lead.category === "proposal" ? <FileText className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#285735] transition-colors">
                          {lead.name}
                        </h4>
                        {lead.status === "unread" && (
                          <span className="inline-block w-2 h-2 rounded-full bg-red-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {lead.company ? `${lead.company} • ` : ""}{new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={(e) => handleDeleteLead(lead.id, lead.name, e)}
                      title="Move to Trash"
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="hidden sm:inline-block px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700">
                      View
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              )) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No recent activity found.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
