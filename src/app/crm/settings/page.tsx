"use client";

import React, { useState } from "react";
import { Settings, Lock, Mail, Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setIsUpdating(true);

    try {
      const res = await fetch("/api/crm/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update password." });
      }
    } catch {
      setMessage({ type: "error", text: "A network error occurred." });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] font-heading flex items-center">
          <Settings className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-[#285735]" />
          Admin Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage your operations desk preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="md:col-span-1">
          <h3 className="text-base sm:text-lg font-bold text-[#1a3822]">Security</h3>
          <p className="text-xs text-gray-500 mt-1">Update your master admin password.</p>
          <div className="mt-3 p-3.5 bg-yellow-50 rounded-xl border border-yellow-100">
             <p className="text-[11px] text-yellow-800 leading-relaxed">
               <strong>Note:</strong> Password changes are stored on the server. If deploying to serverless environments (like Vercel), remember to set the <code>CRM_PASSWORD</code> environment variable.
             </p>
          </div>
        </div>
        <div className="md:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            {message.text && (
              <div className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-medium border ${
                message.type === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
              }`}>
                {message.type === "error" ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                <span>{message.text}</span>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Current Password</label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password" 
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">New Password (Min 8 Chars)</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password" 
                required
                minLength={8}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] transition-all" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isUpdating} 
              className="w-full sm:w-auto px-6 py-3 bg-[#285735] hover:bg-[#346c43] active:scale-95 text-white rounded-xl text-sm font-bold flex items-center justify-center transition-all disabled:opacity-70 mt-2"
            >
              <Lock className="w-4 h-4 mr-2" /> 
              {isUpdating ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="md:col-span-1">
          <h3 className="text-base sm:text-lg font-bold text-[#1a3822]">Email Integration</h3>
          <p className="text-xs text-gray-500 mt-1">Phase 2: Configure incoming and outgoing SMTP/IMAP settings.</p>
        </div>
        <div className="md:col-span-2 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
          <div className="space-y-4 opacity-50 pointer-events-none">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">SMTP Server (Outgoing)</label>
              <input type="text" value="smtp.elmiadmc.com" disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">IMAP Server (Incoming)</label>
              <input type="text" value="imap.elmiadmc.com" disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
            </div>
            <button disabled className="w-full sm:w-auto px-5 py-3 bg-[#285735] text-white rounded-xl text-sm font-bold flex items-center justify-center">
              <Save className="w-4 h-4 mr-2" /> Save Integration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
