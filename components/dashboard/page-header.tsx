"use client";

import { Notification02Icon, ArrowDown01Icon } from "hugeicons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useRef, useEffect } from "react";

interface PageHeaderProps {
  breadcrumbs: string[];
  title: string;
  description: string;
}

export function PageHeader({ breadcrumbs, title, description }: PageHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="px-8 py-6 flex justify-between items-start">
      <div>
        <div className="text-[11px] text-zinc-400 font-semibold tracking-wider mb-2 flex items-center gap-2">
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
        <h1 className="text-[28px] font-bold mb-1.5 text-zinc-900 tracking-tight">{title}</h1>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-6 mt-2">
        <button className="relative">
          <Notification02Icon className="w-6 h-6 text-zinc-500" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-zinc-50 p-1.5 -m-1.5 rounded-lg transition-colors select-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Avatar className="w-10 h-10 shadow-sm border border-zinc-100">
              <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
              <span className="font-bold text-zinc-900">Admin</span>
              <span className="text-xs text-zinc-400 font-medium">Super Admin</span>
            </div>
            <button className="text-zinc-400 ml-1">
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
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
