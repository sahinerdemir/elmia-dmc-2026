"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  Trash2
} from "lucide-react";

export default function CRMSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // If we are on the login page, don't render the sidebar or mobile nav
  if (pathname === "/crm/login") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/crm/auth", { method: "DELETE" });
      router.push("/crm/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/crm", icon: LayoutDashboard },
    { name: "Proposals", href: "/crm/proposals", icon: FileText },
    { name: "Contacts", href: "/crm/contacts", icon: Users },
    { name: "Trash", href: "/crm/trash", icon: Trash2 },
    { name: "Settings", href: "/crm/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top App Bar (Native App Style) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0c1810] text-white flex items-center justify-between px-4 z-40 border-b border-white/10 shadow-md">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-1 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link href="/crm" className="relative w-28 h-8">
          <Image
            src="/images/elmia-dmc-logo.png"
            alt="ELMIA DMC"
            fill
            className="object-contain filter brightness-0 invert opacity-95"
            priority
          />
        </Link>

        <button
          onClick={handleLogout}
          className="p-2 -mr-1 rounded-xl text-red-400 hover:bg-white/5 active:scale-95 transition-all"
          title="Logout"
          aria-label="Secure Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Slide-Over Drawer Backdrop */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-Over Drawer */}
      <div className={`md:hidden fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#0c1810] text-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="relative w-28 h-8">
            <Image
              src="/images/elmia-dmc-logo.png"
              alt="ELMIA DMC"
              fill
              className="object-contain filter brightness-0 invert opacity-90"
            />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-[#a0a0a0]">
          Operations Portal
        </div>

        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/crm" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#285735] text-white font-semibold shadow-sm" 
                    : "text-[#a0a0a0] hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#74b382]"}`} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? "text-white/70" : "text-white/20"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3.5 w-full rounded-xl text-red-400 hover:bg-red-500/10 active:scale-98 transition-all text-left font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Secure Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0c1810] text-white flex-col min-h-screen border-r border-white/5 sticky top-0 h-screen shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center justify-center">
          <div className="relative w-32 h-10">
            <Image
              src="/images/elmia-dmc-logo.png"
              alt="ELMIA DMC"
              fill
              className="object-contain filter brightness-0 invert opacity-90"
            />
          </div>
        </div>
        
        <div className="px-6 py-6 text-xs font-bold uppercase tracking-wider text-[#a0a0a0] mb-2">
          Operations Desk
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/crm" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#285735] text-white font-semibold shadow-sm" 
                    : "text-[#a0a0a0] hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#74b382]"}`} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-[#a0a0a0] hover:bg-white/5 hover:text-white transition-all text-left"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-sm">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (App-like fixed footer) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0c1810]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-2 z-40">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/crm" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? "text-[#74b382] font-semibold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#74b382]" : "text-gray-400"}`} />
              <span className="text-[10px] mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
