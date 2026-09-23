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
  RotateCcw
} from "lucide-react";
import { Lead, LeadStatus } from "@/types/crm";

export default function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Note editing state
  const [note, setNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const [statusSaved, setStatusSaved] = useState(false);

  const handleMoveToTrash = async () => {
    if (!lead) return;
    if (!window.confirm(`Move contact inquiry from "${lead.name}" to Trash? You can restore it anytime.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/crm/leads?id=${lead.id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        router.push("/crm/contacts");
      } else {
        alert("Failed to move contact inquiry to trash.");
        setIsDeleting(false);
      }
    } catch (err) {
      console.error("Trash error:", err);
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
        setLead({ ...lead, isTrashed: false, status: lead.previousStatus || "unread" });
        alert("Contact inquiry restored successfully.");
      } else {
        alert("Failed to restore contact inquiry.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handleDeletePermanently = async () => {
    if (!lead) return;
    if (!window.confirm(`Permanently delete contact inquiry from "${lead.name}"? This CANNOT be undone.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/crm/leads?id=${lead.id}&permanent=true`, {
        method: "DELETE"
      });
      if (res.ok) {
        router.push("/crm/trash");
      } else {
        alert("Failed to permanently delete contact inquiry.");
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
        const res = await fetch("/api/crm/leads");
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

  const handleUpdateStatus = async (newStatus: LeadStatus) => {
    if (!lead) return;
    const prevStatus = lead.status;
    setLead({ ...lead, status: newStatus });
    setStatusSaved(false);
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, status: newStatus })
      });
      if (res.ok) {
        setStatusSaved(true);
        setTimeout(() => setStatusSaved(false), 3000);
      } else {
        setLead({ ...lead, status: prevStatus });
      }
    } catch (e) {
      console.error(e);
      setLead({ ...lead, status: prevStatus });
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

  if (isLoading) {
    return (
      <div className="p-8 sm:p-12 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#285735]"></div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Contact Not Found</h2>
        <Link href="/crm/contacts" className="text-[#285735] hover:underline mt-4 inline-block font-semibold">
          Return to Contacts
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Top Back Nav & Actions */}
      <div className="flex items-center justify-between">
        <Link 
          href={lead.isTrashed || lead.status === "trashed" ? "/crm/trash" : "/crm/contacts"} 
          className="text-gray-600 hover:text-gray-900 active:scale-95 flex items-center text-sm font-semibold transition-all py-1.5"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> {lead.isTrashed || lead.status === "trashed" ? "Back to Trash" : "Back to Contacts"}
        </Link>
        {!(lead.isTrashed || lead.status === "trashed") && (
          <button
            onClick={handleMoveToTrash}
            disabled={isDeleting}
            className="inline-flex items-center px-3.5 py-2 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 text-xs font-bold transition-all active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            {isDeleting ? "Moving..." : "Move to Trash"}
          </button>
        )}
      </div>

      {/* Trashed Alert Banner */}
      {(lead.isTrashed || lead.status === "trashed") && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-amber-800 text-sm font-medium">
            <Trash2 className="w-5 h-5 text-amber-600 shrink-0" />
            <span>This contact inquiry is currently in the <strong>Trash</strong> folder.</span>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleRestore}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Restore Contact
            </button>
            <button
              onClick={handleDeletePermanently}
              disabled={isDeleting}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl border border-red-200 bg-white text-red-600 hover:bg-red-50 text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Delete Forever
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Main Column: Client & Request Details */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6 border-b border-gray-100 pb-5">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-[#1a3822] font-heading break-words">
                  {lead.name}
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  {lead.company || "Individual Client"}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Submitted</div>
                <div className="text-xs sm:text-sm font-medium text-gray-700">{new Date(lead.createdAt).toLocaleString()}</div>
              </div>
            </div>

            {/* Quick Contact & Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="space-y-1 bg-gray-50/70 p-3.5 rounded-xl sm:bg-transparent sm:p-0">
                <span className="text-[11px] font-bold uppercase text-gray-400 flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-gray-500 shrink-0" /> Email
                </span>
                <a href={`mailto:${lead.email}`} className="text-sm font-semibold text-[#285735] hover:underline break-all block">
                  {lead.email}
                </a>
              </div>
              <div className="space-y-1 bg-gray-50/70 p-3.5 rounded-xl sm:bg-transparent sm:p-0">
                <span className="text-[11px] font-bold uppercase text-gray-400 flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-gray-500 shrink-0" /> Phone
                </span>
                <a href={`tel:${lead.phone}`} className="text-sm font-semibold text-gray-900 hover:underline block">
                  {lead.phone || "Not provided"}
                </a>
              </div>
              <div className="space-y-1 bg-gray-50/70 p-3.5 rounded-xl sm:bg-transparent sm:p-0">
                <span className="text-[11px] font-bold uppercase text-gray-400 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-500 shrink-0" /> Requested Dates
                </span>
                <div className="text-sm font-medium text-gray-900">{lead.dates || "Flexible / Not specified"}</div>
              </div>
              <div className="space-y-1 bg-gray-50/70 p-3.5 rounded-xl sm:bg-transparent sm:p-0">
                <span className="text-[11px] font-bold uppercase text-gray-400 flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-gray-500 shrink-0" /> Group Size
                </span>
                <div className="text-sm font-medium text-gray-900">{lead.groupSize || "Not specified"}</div>
              </div>
            </div>

            {/* Request Message */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 mb-1.5 flex items-center">
                <FileText className="w-3.5 h-3.5 mr-1.5 text-gray-500 shrink-0" /> Requested Service
              </span>
              <div className="text-base sm:text-lg font-bold text-[#1a3822] mb-4">{lead.service || "General Contact"}</div>
              
              <span className="text-[11px] font-bold uppercase text-gray-400 mb-1.5 flex items-center">
                <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-gray-500 shrink-0" /> Additional Notes from Client
              </span>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {lead.message || "No additional message provided."}
              </p>
            </div>
          </div>

          {/* Email Communication Panel (Phase 2 Placeholder) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
            <h3 className="text-base sm:text-lg font-bold text-[#1a3822] mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-[#285735]" /> Client Communication
            </h3>
            
            <div className="bg-[#f4f7f4] rounded-2xl p-5 sm:p-6 text-center border border-[#e5ece5] mb-5">
              <Sparkles className="w-7 h-7 text-[#285735] mx-auto mb-2" />
              <h4 className="font-bold text-[#1a3822] text-sm mb-1">Email Integration (Phase 2)</h4>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Direct reply via info@elmiadmc.com and bi-directional thread history will be accessible right inside this view.
              </p>
            </div>

            <div className="space-y-3">
              <textarea 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] min-h-[100px] resize-y"
                placeholder="Write a reply to the client (Coming soon)..."
                disabled
              ></textarea>
              <div className="flex justify-end">
                <button disabled className="w-full sm:w-auto px-5 py-2.5 bg-gray-200 text-gray-500 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center cursor-not-allowed">
                  <Send className="w-4 h-4 mr-2" /> Send via info@elmiadmc.com
                </button>
              </div>
            </div>
          </div>
          
        </div>

        {/* Sidebar / Tools Column */}
        <div className="space-y-5 sm:space-y-6">
          
          {/* Status Management */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 text-gray-900">
            <h3 className="text-xs font-bold mb-3 uppercase tracking-wider text-gray-400">Lead Status</h3>
            <div className="relative mb-2">
              <select 
                value={lead.status}
                onChange={(e) => handleUpdateStatus(e.target.value as LeadStatus)}
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#285735] appearance-none cursor-pointer"
              >
                <option value="unread">Unread</option>
                <option value="read">Read (In Progress)</option>
                <option value="responded">Responded</option>
                <option value="converted">Converted (Won)</option>
                <option value="archived">Archived</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <p className={`text-[11px] font-medium h-4 transition-colors ${statusSaved ? "text-emerald-600" : "text-gray-400"}`}>
              {statusSaved ? "✓ Status saved successfully." : "Select to save immediately."}
            </p>
          </div>

          {/* Internal Notes */}
          <div className="bg-[#111b13] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white shadow-xl">
            <h3 className="text-base sm:text-lg font-bold mb-2 font-heading flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#74b382]" /> Internal Notes
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Visible strictly to dispatch operations team.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-[#0c1810] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#74b382] min-h-[140px] sm:min-h-[180px] resize-y mb-3"
              placeholder="Add operation notes, chauffeur assignments, pricing notes..."
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#74b382] font-medium h-4">
                {noteSaved ? "Notes saved." : ""}
              </span>
              <button
                onClick={handleSaveNote}
                disabled={isSavingNote}
                className="px-4 py-2.5 bg-[#285735] hover:bg-[#346c43] active:scale-95 text-white rounded-xl text-xs font-bold transition-all flex items-center disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                {isSavingNote ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
