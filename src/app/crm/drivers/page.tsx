"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Car, 
  Search, 
  Download, 
  FileSpreadsheet, 
  Eye, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  FileBadge,
  ChevronRight,
  Archive
} from "lucide-react";
import { DriverApplication, DriverStatus } from "@/types/driver";

export default function CRMDriverListPage() {
  const [drivers, setDrivers] = useState<DriverApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DriverStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Selected driver for document image preview modal
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/crm/drivers?t=${Date.now()}`, { cache: "no-store" });
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

    const handleFocus = () => fetchDrivers();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
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
    if (!window.confirm(`"${name}" adlı şoförün başvurusunu kalıcı olarak silmek istediğinize emin misiniz?`)) {
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

  // Active and Archive split
  const activeDrivers = useMemo(() => {
    return drivers.filter((d) => d.status !== "rejected");
  }, [drivers]);

  const archiveDrivers = useMemo(() => {
    return drivers.filter((d) => d.status === "rejected");
  }, [drivers]);

  // Filtered active drivers
  const filteredDrivers = useMemo(() => {
    return activeDrivers.filter((d) => {
      // Status filter
      if (statusFilter !== "all" && d.status !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullName = `${d.firstName || ""} ${d.lastName || ""}`.toLowerCase();
        const phone = (d.phone || "").toLowerCase();
        const lic = (d.licenseNumber || "").toLowerCase();
        const email = (d.email || "").toLowerCase();

        return (
          fullName.includes(q) ||
          phone.includes(q) ||
          lic.includes(q) ||
          email.includes(q)
        );
      }
      return true;
    });
  }, [activeDrivers, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    return {
      activeTotal: activeDrivers.length,
      pending: activeDrivers.filter((d) => d.status === "pending").length,
      reviewed: activeDrivers.filter((d) => d.status === "reviewed").length,
      approved: activeDrivers.filter((d) => d.status === "approved").length,
      rejected: archiveDrivers.length
    };
  }, [activeDrivers, archiveDrivers]);

  const handleExportExcel = (format: "xls" | "csv" = "xls") => {
    window.location.href = `/api/crm/drivers/export?status=active&format=${format}`;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-[#285735]/10 text-[#285735]">
              <Car className="w-6 h-6" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3822] tracking-tight font-heading">
              Şoför Başvuruları
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Web sitesi (elmiadmc.com/drivers) üzerinden gelen profesyonel şoför başvuruları.
          </p>
        </div>

        {/* Action Buttons & Tabs */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Navigation Tabs between Active & Archive */}
          <div className="flex items-center space-x-2 bg-gray-100/80 p-1 rounded-xl">
            <Link
              href="/crm/drivers"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-[#285735] shadow-xs"
            >
              Aktif Başvurular ({stats.activeTotal})
            </Link>
            <Link
              href="/crm/drivers/archive"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 transition-all flex items-center space-x-1.5"
            >
              <span>Arşiv ({stats.rejected})</span>
            </Link>
          </div>

          <button
            onClick={() => handleExportExcel("xls")}
            className="px-3.5 py-2 bg-[#285735] hover:bg-[#1f4429] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Aktif şoför listesini Excel (.xls) olarak indir"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel (.xls)</span>
          </button>

          <button
            onClick={() => handleExportExcel("csv")}
            className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer shadow-xs"
            title="CSV formatında indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={fetchDrivers}
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
          onClick={() => setStatusFilter("pending")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "pending" ? "bg-white border-amber-500 shadow-md ring-2 ring-amber-500/10" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
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
            statusFilter === "reviewed" ? "bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-blue-600">İncelenenler</div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{stats.reviewed}</div>
        </div>

        <div 
          onClick={() => setStatusFilter("approved")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "approved" ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/10" : "bg-white border-gray-200 hover:border-gray-300 shadow-xs"
          }`}
        >
          <div className="text-[11px] font-bold uppercase text-emerald-600">Onaylananlar</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{stats.approved}</div>
        </div>

        <Link 
          href="/crm/drivers/archive"
          className="p-4 rounded-2xl border transition-all bg-white border-rose-200 hover:border-rose-400 hover:shadow-md shadow-xs block group"
        >
          <div className="text-[11px] font-bold uppercase text-rose-600 flex items-center justify-between">
            <span>Arşiv (Red)</span>
            <ChevronRight className="w-3 h-3 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">{stats.rejected}</div>
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
            placeholder="İsim, telefon, e-posta veya ehliyet numarası ile ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] shadow-xs"
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DriverStatus | "all")}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#285735] bg-white cursor-pointer shadow-xs"
          >
            <option value="all">Tüm Aktifler</option>
            <option value="pending">⏳ Bekleyenler</option>
            <option value="reviewed">🔍 İncelenenler</option>
            <option value="approved">✅ Onaylananlar</option>
          </select>
        </div>
      </div>

      {/* Streamlined Clean Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
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
              Arama kriterlerinize uyan başvuru bulunmuyor veya henüz kayıtlı başvuru yok.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-4 px-5">Şoför</th>
                  <th className="py-4 px-5">Ehliyet &amp; Eyalet</th>
                  <th className="py-4 px-5">Deneyim &amp; Chauffeur Reg</th>
                  <th className="py-4 px-5 text-center">Belgeler</th>
                  <th className="py-4 px-5 text-right">Durum &amp; İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDrivers.map((driver) => {
                  return (
                    <tr key={driver.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* 1. Driver Name & Contact */}
                      <td className="py-4 px-5">
                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/crm/drivers/${driver.id}`}
                            className="w-10 h-10 rounded-full bg-[#285735]/10 text-[#285735] font-bold flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                          >
                            {driver.firstName?.charAt(0)}{driver.lastName?.charAt(0)}
                          </Link>
                          <div>
                            <Link
                              href={`/crm/drivers/${driver.id}`}
                              className="font-bold text-gray-900 text-sm hover:text-[#285735] transition-colors"
                            >
                              {driver.firstName} {driver.lastName}
                            </Link>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <a
                                href={`tel:${driver.phone}`}
                                className="text-xs text-gray-600 hover:text-[#285735] font-semibold flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3 text-[#285735]" />
                                {driver.phone}
                              </a>
                              {driver.email && (
                                <a
                                  href={`mailto:${driver.email}`}
                                  className="text-xs text-gray-400 hover:text-gray-700 truncate max-w-[170px]"
                                  title={driver.email}
                                >
                                  {driver.email}
                                </a>
                              )}
                            </div>
                            <span className="text-[10px] text-gray-400 block mt-0.5">
                              {new Date(driver.createdAt).toLocaleDateString("tr-TR", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. License & State */}
                      <td className="py-4 px-5">
                        <div className="font-mono text-gray-900 font-bold text-xs tracking-wider">
                          {driver.licenseNumber}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#eaf4ec] text-[#285735] border border-[#285735]/20">
                            {driver.licenseState || "FL"}
                          </span>
                          {driver.licenseExpirationDate && (
                            <span className="text-[11px] text-gray-500">
                              Bitiş: {driver.licenseExpirationDate}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 3. Experience & Chauffeur Reg */}
                      <td className="py-4 px-5">
                        <div className="font-semibold text-gray-800">
                          {driver.professionalDrivingYears || driver.drivingExperienceYears || "-"} Yıl Sürüş
                          {driver.chauffeurExperienceYears && (
                            <span className="text-gray-500 font-normal"> • {driver.chauffeurExperienceYears} Yıl Chauffeur</span>
                          )}
                        </div>
                        <div className="mt-1">
                          {driver.hasChauffeurRegistration ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <ShieldCheck className="w-3 h-3" /> Chauffeur Reg: Var
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500">
                              Chauffeur Reg: Yok
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 4. Document Thumbnails */}
                      <td className="py-4 px-5 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {/* License Front */}
                          {driver.licenseFrontUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewImage({
                                  url: driver.licenseFrontUrl,
                                  title: `${driver.firstName} ${driver.lastName} — Ehliyet Ön Yüz`
                                })
                              }
                              className="relative w-12 h-8 rounded-lg border border-gray-200 overflow-hidden hover:scale-105 transition-transform shadow-2xs group cursor-pointer bg-gray-100"
                              title="Ehliyet Ön Yüzü Büyüt"
                            >
                              <Image
                                src={driver.licenseFrontUrl}
                                alt="Ön Yüz"
                                fill
                                className="object-cover"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-black/35 group-hover:bg-transparent transition-colors flex items-center justify-center text-white text-[9px] font-bold">
                                ÖN
                              </div>
                            </button>
                          )}

                          {/* License Back */}
                          {driver.licenseBackUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewImage({
                                  url: driver.licenseBackUrl,
                                  title: `${driver.firstName} ${driver.lastName} — Ehliyet Arka Yüz`
                                })
                              }
                              className="relative w-12 h-8 rounded-lg border border-gray-200 overflow-hidden hover:scale-105 transition-transform shadow-2xs group cursor-pointer bg-gray-100"
                              title="Ehliyet Arka Yüzü Büyüt"
                            >
                              <Image
                                src={driver.licenseBackUrl}
                                alt="Arka Yüz"
                                fill
                                className="object-cover"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-black/35 group-hover:bg-transparent transition-colors flex items-center justify-center text-white text-[9px] font-bold">
                                ARKA
                              </div>
                            </button>
                          )}

                          {/* Chauffeur Reg Photo (if uploaded) */}
                          {driver.chauffeurRegistrationFrontUrl && (
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewImage({
                                  url: driver.chauffeurRegistrationFrontUrl!,
                                  title: `${driver.firstName} ${driver.lastName} — Chauffeur Registration Belgesi`
                                })
                              }
                              className="relative w-12 h-8 rounded-lg border border-emerald-300 overflow-hidden hover:scale-105 transition-transform shadow-2xs group cursor-pointer bg-emerald-50"
                              title="Chauffeur Registration Belgesi"
                            >
                              <Image
                                src={driver.chauffeurRegistrationFrontUrl}
                                alt="Reg Belgesi"
                                fill
                                className="object-cover"
                                unoptimized
                              />
                              <div className="absolute inset-0 bg-black/35 group-hover:bg-transparent transition-colors flex items-center justify-center text-white text-[8px] font-bold">
                                REG
                              </div>
                            </button>
                          )}
                        </div>
                      </td>

                      {/* 5. Status & Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <select
                            value={driver.status}
                            disabled={updatingId === driver.id}
                            onChange={(e) =>
                              handleStatusChange(driver.id, e.target.value as DriverStatus)
                            }
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer outline-none transition-colors ${
                              driver.status === "pending"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : driver.status === "reviewed"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : driver.status === "approved"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-rose-50 text-rose-800 border-rose-200"
                            }`}
                          >
                            <option value="pending">Beklemede</option>
                            <option value="reviewed">İncelendi</option>
                            <option value="approved">Onaylandı</option>
                            <option value="rejected">Reddedildi</option>
                          </select>

                          <Link
                            href={`/crm/drivers/${driver.id}`}
                            className="p-2 rounded-xl text-gray-500 hover:text-[#285735] hover:bg-gray-100 transition-colors"
                            title="Detayları Görüntüle"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(driver.id, `${driver.firstName} ${driver.lastName}`)
                            }
                            className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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

      {/* Full-Screen Document Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white pb-3 px-1">
              <span className="text-sm font-semibold">{previewImage.title}</span>
              <div className="flex items-center space-x-3">
                <a
                  href={previewImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Orijinal Boyut
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>

            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-black border border-gray-800">
              <Image
                src={previewImage.url}
                alt={previewImage.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
