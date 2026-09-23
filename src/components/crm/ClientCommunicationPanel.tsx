"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  AlertCircle,
  FileCheck,
  Plane,
  PhoneCall,
  ChevronDown
} from "lucide-react";
import { Lead, ClientMessage } from "@/types/crm";

interface ClientCommunicationPanelProps {
  lead: Lead;
  onLeadUpdated: (updatedLead: Lead) => void;
}

export default function ClientCommunicationPanel({
  lead,
  onLeadUpdated
}: ClientCommunicationPanelProps) {
  const defaultSubject = `Re: [ELMIA DMC] ${
    lead.category === "proposal" ? "Proposal Request" : "Inquiry"
  } — ${lead.service || lead.topic || "Executive Concierge"}`;

  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const messages: ClientMessage[] = lead.messages || [];

  // Quick Response Templates
  const templates = [
    {
      label: "RFP Acknowledged",
      icon: FileCheck,
      subject: `[ELMIA DMC] Inquiry Received — ${lead.service || "Executive Concierge"}`,
      body: `Thank you for contacting ELMIA DMC.

We have received your request regarding ${lead.service || "our bespoke destination services"}${
        lead.dates ? ` for ${lead.dates}` : ""
      }. Our executive dispatch team is currently reviewing your requirements and preparing a customized itinerary and availability schedule.

Should you have any urgent timing adjustments or special VIP protocol requirements in the interim, please feel free to reply directly to this email or contact our dispatch desk at info@elmiadmc.com.`
    },
    {
      label: "Proposal & Pricing Ready",
      icon: Sparkles,
      subject: `[ELMIA DMC] Customized Proposal & Rates — ${lead.service || "VIP Travel"}`,
      body: `Thank you for your patience.

We are pleased to present our official luxury itinerary and service arrangement tailored specifically for ${
        lead.company || lead.name
      }. 

Our team has allocated dedicated priority vehicles and executive chauffeur dispatch to guarantee seamless punctuality and discretion throughout ${
        lead.dates || "your requested dates"
      }.

Please review the details and let us know if any adjustments or additions (such as private aviation tarmac staging or executive protection) are desired.`
    },
    {
      label: "FBO & Flight Manifest",
      icon: Plane,
      subject: `[ELMIA DMC] Flight Manifest & Ramp Details Needed`,
      body: `In order to finalize your tarmac staging and executive chauffeur coordination, could you kindly provide the following operational details when available:

1. Private Aviation Tail Number / Commercial Flight Number:
2. Arrival Airport & FBO Facility (e.g., OPF Signature, FXE, MIA, FLL):
3. Estimated Time of Arrival (ETA):
4. Final Passenger Count & Luggage Volume:

This allows our operations center to coordinate with ramp security and ensure your fleet is pre-staged 30 minutes prior to touchdown.`
    },
    {
      label: "Schedule Consultation",
      icon: PhoneCall,
      subject: `[ELMIA DMC] Executive Consultation Coordination`,
      body: `We would be delighted to coordinate a brief 10-minute briefing with our Senior Destination Operations Manager to walk through your schedule and answer any bespoke requests.

Please let us know what time window works best for you today or tomorrow, or feel free to call our dispatch desk directly at your convenience.`
    }
  ];

  const handleApplyTemplate = (template: typeof templates[0]) => {
    setSubject(template.subject);
    setMessage(template.body);
    setFeedback(null);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setFeedback({ type: "error", text: "Please enter a message before sending." });
      return;
    }

    if (!subject.trim()) {
      setFeedback({ type: "error", text: "Please enter an email subject." });
      return;
    }

    setIsSending(true);
    setFeedback(null);

    try {
      const res = await fetch(`/api/crm/leads/${lead.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          message: message.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.lead) {
        onLeadUpdated(data.lead);
        setMessage("");
        setFeedback({
          type: "success",
          text: `Message successfully delivered to ${lead.email} via info@elmiadmc.com.`
        });
        setTimeout(() => setFeedback(null), 6000);
      } else {
        setFeedback({
          type: "error",
          text: data.error || "Failed to deliver email. Please try again."
        });
      }
    } catch (err) {
      console.error("Communication send error:", err);
      setFeedback({
        type: "error",
        text: "Network connection error while transmitting message."
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-gray-100 gap-3 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#1a3822] flex items-center">
            <Mail className="w-5 h-5 mr-2 text-[#285735]" /> Client Communication
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Direct executive email transmission via <span className="font-semibold text-gray-800">info@elmiadmc.com</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
            Verified Sender Active
          </span>
          <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
            {messages.length} Sent
          </span>
        </div>
      </div>

      {/* Message Timeline (Past Communications) */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Communication History
        </h4>

        {messages.length === 0 ? (
          <div className="bg-[#f9faf9] rounded-2xl p-6 text-center border border-dashed border-gray-200">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-2 text-[#285735]">
              <Mail className="w-5 h-5" />
            </div>
            <h5 className="font-semibold text-gray-800 text-sm mb-1">
              No Direct Communications Yet
            </h5>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Use the composer below or select a quick response template to send an official luxury response to <strong className="text-gray-700">{lead.email}</strong>.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={msg.id || idx}
                className="bg-gray-50 hover:bg-[#f6f9f6] transition-colors rounded-2xl p-4 sm:p-5 border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#1a3822] text-xs sm:text-sm">
                      {msg.subject}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Delivered
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(msg.sentAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit"
                    })}
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 mb-2 font-mono">
                  From: {msg.sender} → To: {msg.recipient}
                </div>

                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Composer Section */}
      <div className="border-t border-gray-100 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Send Official Reply to Client
          </h4>
          <span className="text-[11px] text-gray-500">
            Recipient: <strong className="text-gray-800">{lead.name}</strong> ({lead.email})
          </span>
        </div>

        {/* Quick Templates Bar */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-gray-500 block mb-1.5">
            Quick Templates:
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {templates.map((tmpl, i) => {
              const Icon = tmpl.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="px-2.5 py-1.5 bg-gray-50 hover:bg-[#eaf1eb] text-gray-700 hover:text-[#1a3822] border border-gray-200 hover:border-[#74b382] rounded-lg text-xs font-medium transition-all flex items-center"
                >
                  <Icon className="w-3.5 h-3.5 mr-1.5 text-[#285735]" />
                  {tmpl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSendMessage} className="space-y-3.5">
          {/* Subject Line */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject line..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#285735]"
              required
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Message Body
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Write a tailored executive response to ${lead.name}...`}
              rows={6}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#285735] resize-y"
              required
            />
          </div>

          {/* Alerts / Feedback */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center ${
                feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 mr-2 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-red-600" />
              )}
              {feedback.text}
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <p className="text-[11px] text-gray-500 flex items-center">
              💡 Replies from the client will route directly to <span className="font-semibold text-gray-700 ml-1">info@elmiadmc.com</span>.
            </p>
            <button
              type="submit"
              disabled={isSending}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#285735] hover:bg-[#1a3822] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center shadow-md shadow-[#285735]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Transmitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send via info@elmiadmc.com
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
