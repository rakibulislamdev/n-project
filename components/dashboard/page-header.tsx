"use client";

import { Notification02Icon, ArrowDown01Icon } from "hugeicons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  breadcrumbs: string[];
  title: string;
  description: string;
}

export function PageHeader({ breadcrumbs, title, description }: PageHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const { getMeAction } = await import("@/app/actions/auth");
      const res = await getMeAction();
      if (res.success && res.data) {
        setUser(res.data);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return "AD";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    const { logoutAction } = await import("@/app/actions/auth");
    await logoutAction();
    router.push("/login"); // Adjust this route if your login page is different
    router.refresh();
  };

  return (
    <header className="px-4 md:px-8 py-6 flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-zinc-400 font-semibold tracking-wider mb-2 flex flex-wrap items-center gap-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb}>
              <span className={index === breadcrumbs.length - 1 ? "text-zinc-700" : ""}>
                {crumb.toUpperCase()}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="text-zinc-300">{">"}</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-[24px] md:text-[28px] font-bold mb-1.5 text-zinc-900 tracking-tight truncate">{title}</h1>
        <p className="text-zinc-500 text-sm truncate">{description}</p>
      </div>
      <div className="flex items-center gap-4 md:gap-6 shrink-0 -mt-3 md:-mt-4">
        <button className="relative">
          <Notification02Icon className="w-6 h-6 text-zinc-500" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-zinc-50 p-1.5 -m-1.5 rounded-lg transition-colors select-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Avatar className="w-10 h-10 shadow-sm border border-zinc-200">
              <AvatarImage src={user?.profileImage || ""} />
              <AvatarFallback className="font-semibold text-[15px] text-white bg-slate-800">
                {getInitials(user?.name || "Admin")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col text-sm">
              <span className="font-bold text-zinc-900">{user?.name || "Admin"}</span>
              <span className="text-xs text-zinc-400 font-medium">{user?.role?.replace("_", " ") || "Super Admin"}</span>
            </div>
            <button className="hidden md:block text-zinc-400 ml-1">
              <ArrowDown01Icon className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-zinc-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <button className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-black font-medium transition-colors">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-black font-medium transition-colors">
                Settings
              </button>
              <div className="h-px bg-zinc-100 my-1 mx-2"></div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
