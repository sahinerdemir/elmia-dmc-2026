"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Car, 
  Search, 
  Filter, 
  Download, 
  FileSpreadsheet, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Users
} from "lucide-react";
import { DriverApplication, DriverStatus } from "@/types/driver";

export default function CRMDriverListPage() {
  const [drivers, setDrivers] = useState<DriverApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DriverStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Selected driver for license image preview modal
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/crm/drivers");
      const data = await res.json();
      if (data.success && Array.isArray(data.drivers)) {
        setDrivers(data.drivers);
      }
    } catch (err) {
      console.error("Error fetching drivers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleStatusChange = async (id: string, newStatus: DriverStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/crm/drivers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDrivers((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
        );
      } else {
        alert(data.error || "Durum güncellenemedi.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Ağ hatası.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`"${name}" adlı şoförün başvurusunu silmek istediğinize emin misiniz?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/crm/drivers?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setDrivers((prev) => prev.filter((d) => d.id !== id));
      } else {
        alert("Silme işlemi başarısız oldu.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Ağ hatası.");
    }
  };

  // Filtered drivers
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      // Status filter
      if (statusFilter !== "all" && d.status !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullName = `${d.firstName} ${d.lastName}`.toLowerCase();
        const phone = d.phone.toLowerCase();
        const origin = d.origin.toLowerCase();
        const lic = d.licenseNumber.toLowerCase();
        const email = (d.email || "").toLowerCase();

        return (
          fullName.includes(q) ||
          phone.includes(q) ||
          origin.includes(q) ||
          lic.includes(q) ||
          email.includes(q)
        );
      }
      return true;
    });
  }, [drivers, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: drivers.length,
      pending: drivers.filter((d) => d.status === "pending").length,
      reviewed: drivers.filter((d) => d.status === "reviewed").length,
      approved: drivers.filter((d) => d.status === "approved").length,
      rejected: drivers.filter((d) => d.status === "rejected").length
    };
  }, [drivers]);

  const handleExportExcel = (format: "xls" | "csv" = "xls") => {
    window.location.href = `/api/crm/drivers/export?format=${format}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-[#285735]/10 text-[#285735]">
              <Car className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-[#1a3822] tracking-tight">
              Şoför Başvuruları (Chauffeur Recruitment)
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Web sitesi (elmiadmc.com/drivers) üzerinden gelen tüm profesyonel şoför başvuruları ve belgeleri.
          </p>
        </div>

        {/* Action Buttons: Excel Download & Refresh */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => handleExportExcel("xls")}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center space-x-2 cursor-pointer"
            title="Tüm şoför listesini Excel (.xls) olarak indir"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel İndir (.xls)</span>
          </button>

          <button
            onClick={() => handleExportExcel("csv")}
            className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
            title="CSV formatında indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={fetchDrivers}
            className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-xs transition-all border border-gray-200 cursor-pointer"
            title="Listeyi Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#285735]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div 
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "all" ? "bg-white border-[#285735] shadow-md ring-2 ring-[#285735]/10" : "bg-white border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-gray-400">Toplam Başvuru</div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">{stats.total}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("pending")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "pending" ? "bg-white border-amber-500 shadow-md ring-2 ring-amber-500/10" : "bg-white border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-amber-600 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> Bekleyenler
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{stats.pending}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("reviewed")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "reviewed" ? "bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10" : "bg-white border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-blue-600 flex items-center">
            <Eye className="w-3 h-3 mr-1" /> İncelenenler
          </div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{stats.reviewed}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("approved")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "approved" ? "bg-white border-emerald-600 shadow-md ring-2 ring-emerald-600/10" : "bg-white border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-emerald-600 flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Onaylananlar
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{stats.approved}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("rejected")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer col-span-2 sm:col-span-1 ${
            statusFilter === "rejected" ? "bg-white border-red-500 shadow-md ring-2 ring-red-500/10" : "bg-white border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-red-500 flex items-center">
            <XCircle className="w-3 h-3 mr-1" /> Reddedilenler
          </div>
          <div className="text-2xl font-extrabold text-red-500 mt-1">{stats.rejected}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İsim, telefon, şehir, ehliyet no ara..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#285735]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(["all", "pending", "reviewed", "approved", "rejected"] as const).map((st) => {
            const labels = {
              all: "Tümü",
              pending: "Bekleyen",
              reviewed: "İncelenen",
              approved: "Onaylanan",
              rejected: "Reddedilen"
            };
            const active = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-[#285735] text-white shadow-2xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {labels[st]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Drivers Table & Cards */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-[#285735]/20 border-t-[#285735] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-500 font-medium">Şoför başvuruları yükleniyor...</p>
          </div>
        ) : filteredDrivers.length === 0 ? (
          <div className="py-20 text-center px-4">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">Başvuru Bulunamadı</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
              Arama kriterlerinize uyan şoför başvurusu bulunmuyor veya henüz yeni bir başvuru yapılmadı.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px] font-bold">
                  <th className="py-3.5 px-4">Şoför &amp; Memleket</th>
                  <th className="py-3.5 px-4">İletişim</th>
                  <th className="py-3.5 px-4">Deneyim (ABD / Şoförlük)</th>
                  <th className="py-3.5 px-4">Ehliyet &amp; Eyalet</th>
                  <th className="py-3.5 px-4">Çocuk / SSN</th>
                  <th className="py-3.5 px-4 text-center">Ehliyet Belgeleri</th>
                  <th className="py-3.5 px-4">Tarih</th>
                  <th className="py-3.5 px-4">Durum</th>
                  <th className="py-3.5 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDrivers.map((driver) => {
                  const statusColors = {
                    pending: "bg-amber-50 text-amber-800 border-amber-200",
                    reviewed: "bg-blue-50 text-blue-800 border-blue-200",
                    approved: "bg-emerald-50 text-emerald-800 border-emerald-200",
                    rejected: "bg-red-50 text-red-800 border-red-200"
                  };

                  return (
                    <tr key={driver.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Name & Origin */}
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/crm/drivers/${driver.id}`}
                          className="font-bold text-gray-900 hover:text-[#285735] flex items-center group"
                        >
                          <span className="w-8 h-8 rounded-full bg-[#285735]/10 text-[#285735] font-bold flex items-center justify-center mr-2.5 shrink-0 group-hover:scale-105 transition-transform">
                            {driver.firstName.charAt(0)}{driver.lastName.charAt(0)}
                          </span>
                          <div>
                            <div className="text-xs sm:text-sm font-bold group-hover:underline">
                              {driver.firstName} {driver.lastName}
                            </div>
                            <div className="text-[11px] text-gray-400 font-normal flex items-center mt-0.5">
                              <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                              {driver.origin}
                            </div>
                          </div>
                        </Link>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <a
                            href={`tel:${driver.phone}`}
                            className="font-semibold text-gray-800 hover:text-[#285735] flex items-center"
                          >
                            <Phone className="w-3 h-3 mr-1 text-[#285735]" />
                            {driver.phone}
                          </a>
                          {driver.email && (
                            <a
                              href={`mailto:${driver.email}`}
                              className="text-[11px] text-gray-400 hover:text-gray-600 truncate block max-w-[150px]"
                            >
                              {driver.email}
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Experience */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-800">
                          {driver.drivingExperienceYears} Yıl Şoförlük
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {driver.yearsInUS} Yıl ABD&apos;de
                        </div>
                      </td>

                      {/* License */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-gray-800 font-bold">
                          {driver.licenseNumber}
                        </div>
                        <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-gray-100 text-gray-600">
                          {driver.licenseState || "FL"}
                        </span>
                      </td>

                      {/* Family & SSN */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              driver.hasChildren
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {driver.hasChildren ? "Çocuklu" : "Çocuksuz"}
                          </span>
                          <div>
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                driver.hasSSN
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {driver.hasSSN ? "SSN Mevcut" : "SSN Yok"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* License Images Thumbnails */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewImage({
                                url: driver.licenseFrontUrl,
                                title: `${driver.firstName} ${driver.lastName} — Ehliyet Ön Yüz`
                              })
                            }
                            className="relative w-11 h-7 rounded border border-gray-200 overflow-hidden hover:scale-105 transition-transform shadow-2xs group cursor-pointer"
                            title="Ön Yüzü Görüntüle"
                          >
                            <Image
                              src={driver.licenseFrontUrl}
                              alt="Ön Yüz"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center text-white text-[8px] font-bold">
                              ÖN
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setPreviewImage({
                                url: driver.licenseBackUrl,
                                title: `${driver.firstName} ${driver.lastName} — Ehliyet Arka Yüz`
                              })
                            }
                            className="relative w-11 h-7 rounded border border-gray-200 overflow-hidden hover:scale-105 transition-transform shadow-2xs group cursor-pointer"
                            title="Arka Yüzü Görüntüle"
                          >
                            <Image
                              src={driver.licenseBackUrl}
                              alt="Arka Yüz"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center text-white text-[8px] font-bold">
                              ARKA
                            </div>
                          </button>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                        {new Date(driver.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <div className="relative">
                          <select
                            disabled={updatingId === driver.id}
                            value={driver.status}
                            onChange={(e) =>
                              handleStatusChange(driver.id, e.target.value as DriverStatus)
                            }
                            className={`pl-2.5 pr-7 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#285735] ${
                              statusColors[driver.status]
                            }`}
                          >
                            <option value="pending">Bekliyor</option>
                            <option value="reviewed">İncelendi</option>
                            <option value="approved">Onaylandı</option>
                            <option value="rejected">Reddedildi</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Link
                            href={`/crm/drivers/${driver.id}`}
                            className="p-1.5 text-gray-500 hover:text-[#285735] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Detaylı Profili Aç"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(driver.id, `${driver.firstName} ${driver.lastName}`)
                            }
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Başvuruyu Sil"
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

      {/* License Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="bg-[#111827] border border-white/20 rounded-2xl max-w-2xl w-full p-5 text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h4 className="text-sm font-bold text-gray-200 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-[#c5a880]" />
                {previewImage.title}
              </h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <Image
                src={previewImage.url}
                alt={previewImage.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                Orijinal yüksek çözünürlüklü belge
              </span>
              <a
                href={previewImage.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs font-semibold text-[#c5a880] hover:underline"
              >
                Yeni Sekmede Orijinali Aç <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
