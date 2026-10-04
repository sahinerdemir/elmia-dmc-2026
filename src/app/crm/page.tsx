"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  FileText, 
  Clock,
  ArrowRight,
  ChevronRight,
  Trash2,
  Car,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Lead } from "@/types/crm";
import { DriverApplication } from "@/types/driver";

export default function CRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [drivers, setDrivers] = useState<DriverApplication[]>([]);
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
        window.dispatchEvent(new Event("crm_records_updated"));
      } else {
        alert("Failed to move record to trash.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, driversRes] = await Promise.all([
          fetch("/api/crm/leads", { cache: "no-store" }),
          fetch(`/api/crm/drivers?t=${Date.now()}`, { cache: "no-store" })
        ]);

        if (leadsRes.ok) {
          const data = await leadsRes.json();
          if (data.leads) {
            setLeads(data.leads);
          }
        }

        if (driversRes.ok) {
          const dData = await driversRes.json();
          if (dData.drivers) {
            setDrivers(dData.drivers);
          }
        }
      } catch (e) {
        console.error("Failed to fetch dashboard data", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    const handleFocus = () => fetchData();
    const handleUpdate = () => fetchData();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("crm_records_updated", handleUpdate);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("crm_records_updated", handleUpdate);
    };
  }, []);

  const activeLeads = leads.filter((l) => !l.isTrashed && l.status !== "trashed" && l.status !== "rejected" && l.status !== "archived");
  const totalProposals = activeLeads.filter(l => l.category === "proposal").length;
  const totalContacts = activeLeads.filter(l => l.category === "contact").length;
  const unreadLeads = activeLeads.filter(l => l.status === "unread").length;

  const activeDrivers = drivers.filter((d) => d.status !== "rejected");
  const totalDrivers = activeDrivers.length;
  const pendingDrivers = activeDrivers.filter((d) => d.status === "pending" || !d.status).length;
  const totalActionNeeded = unreadLeads + pendingDrivers;
  
  const recentProposals = activeLeads
    .filter((l) => l.category === "proposal")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentContacts = activeLeads
    .filter((l) => l.category === "contact")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentDrivers = [...activeDrivers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getDriverStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">Approved</span>;
      case "reviewed":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">Reviewed</span>;
      case "pending":
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">Pending</span>;
    }
  };

  const getLeadStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">Unread</span>;
      case "read":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">Read</span>;
      case "responded":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">Responded</span>;
      case "converted":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">Converted</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-700 border border-gray-200">{status}</span>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] font-heading">Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Overview of ELMIA DMC proposals, contacts, and driver applications.</p>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="h-64 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid: 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link 
              href="/crm/proposals" 
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#285735]/40 active:scale-[0.99] transition-all group"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Total Proposals</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1a3822]">{totalProposals}</h3>
                <p className="text-[11px] text-gray-400 mt-1">Active client quotes</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#eaf4ec] flex items-center justify-center shrink-0 group-hover:bg-[#285735] transition-colors">
                <FileText className="w-6 h-6 text-[#285735] group-hover:text-white transition-colors" />
              </div>
            </Link>

            <Link 
              href="/crm/contacts" 
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#285735]/40 active:scale-[0.99] transition-all group"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Total Contacts</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1a3822]">{totalContacts}</h3>
                <p className="text-[11px] text-gray-400 mt-1">Inquiries & messages</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                <Users className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
            </Link>

            <Link 
              href="/crm/drivers" 
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#285735]/40 active:scale-[0.99] transition-all group"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Driver Applications</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1a3822]">{totalDrivers}</h3>
                <p className="text-[11px] text-amber-700 font-medium mt-1">
                  {pendingDrivers > 0 ? `${pendingDrivers} awaiting review` : "All reviewed"}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-colors">
                <Car className="w-6 h-6 text-amber-700 group-hover:text-white transition-colors" />
              </div>
            </Link>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Action Needed</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-red-600">{totalActionNeeded}</h3>
                <p className="text-[11px] text-gray-400 mt-1">
                  {unreadLeads} unread • {pendingDrivers} new drivers
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* Three-Box Activity Feed (1. Proposals, 2. Contacts, 3. Drivers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Box 1: Recent Proposals */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#285735]" />
                  <h2 className="text-sm sm:text-base font-bold text-[#1a3822]">Recent Proposals</h2>
                </div>
                <Link href="/crm/proposals" className="text-xs font-semibold text-[#285735] hover:underline flex items-center">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
              
              <div className="divide-y divide-gray-50 flex-1">
                {recentProposals.length > 0 ? recentProposals.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/crm/proposals/${lead.id}`}
                    className="p-4 hover:bg-gray-50/80 active:bg-gray-100 transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#eaf4ec] text-[#285735] flex items-center justify-center shrink-0 font-bold text-xs">
                        {lead.name?.charAt(0) || "P"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#285735] transition-colors">
                            {lead.name}
                          </h4>
                          {getLeadStatusBadge(lead.status)}
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {lead.service || lead.company || "Proposal Request"} • {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={(e) => handleDeleteLead(lead.id, lead.name, e)}
                        title="Move to Trash"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                )) : (
                  <div className="p-8 text-center text-gray-500 text-xs">
                    No proposals found.
                  </div>
                )}
              </div>
            </div>

            {/* Box 2: Recent Contacts */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <h2 className="text-sm sm:text-base font-bold text-[#1a3822]">Recent Contacts</h2>
                </div>
                <Link href="/crm/contacts" className="text-xs font-semibold text-[#285735] hover:underline flex items-center">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
              
              <div className="divide-y divide-gray-50 flex-1">
                {recentContacts.length > 0 ? recentContacts.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/crm/contacts/${lead.id}`}
                    className="p-4 hover:bg-gray-50/80 active:bg-gray-100 transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        {lead.name?.charAt(0) || "C"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#285735] transition-colors">
                            {lead.name}
                          </h4>
                          {getLeadStatusBadge(lead.status)}
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {lead.topic || lead.company || "General Contact"} • {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={(e) => handleDeleteLead(lead.id, lead.name, e)}
                        title="Move to Trash"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                )) : (
                  <div className="p-8 text-center text-gray-500 text-xs">
                    No contact inquiries found.
                  </div>
                )}
              </div>
            </div>

            {/* Box 3: Recent Driver Applications */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:col-span-2 lg:col-span-1">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4 text-amber-700" />
                  <h2 className="text-sm sm:text-base font-bold text-[#1a3822]">Recent Driver Applications</h2>
                </div>
                <Link href="/crm/drivers" className="text-xs font-semibold text-[#285735] hover:underline flex items-center">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
              
              <div className="divide-y divide-gray-50 flex-1">
                {recentDrivers.length > 0 ? recentDrivers.map((driver) => {
                  const years = driver.professionalDrivingYears || driver.drivingExperienceYears || 0;
                  return (
                    <Link
                      key={driver.id}
                      href={`/crm/drivers/${driver.id}`}
                      className="p-4 hover:bg-gray-50/80 active:bg-gray-100 transition-colors flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {driver.firstName?.[0]?.toUpperCase() || "D"}{driver.lastName?.[0]?.toUpperCase() || ""}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#285735] transition-colors">
                              {driver.firstName} {driver.lastName}
                            </h4>
                            {getDriverStatusBadge(driver.status)}
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {years} yrs exp • DL: {driver.licenseState || "US"} • {new Date(driver.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <span className="hidden sm:inline-block px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-700 group-hover:border-[#285735]/40 transition-colors">
                          Review
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                }) : (
                  <div className="p-8 text-center text-gray-500 text-xs flex flex-col items-center justify-center space-y-2">
                    <p>No driver applications received yet.</p>
                    <Link href="/drivers" target="_blank" className="text-xs text-[#285735] font-semibold hover:underline">
                      View Public Application Form &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
