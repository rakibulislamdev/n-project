"use client";

import { useSidebarStore } from "@/lib/store/use-sidebar-store";
import { Home09Icon, Menu11Icon } from "hugeicons-react";

export function MobileTopbar() {
  const { toggleMobileOpen } = useSidebarStore();

  return (
    <div className="flex md:hidden items-center justify-between h-16 px-4 bg-[#121212] border-b border-zinc-800 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Home09Icon className="w-6 h-6 text-orange-500" />
        <span className="text-white font-bold text-[15px] tracking-wide">RealEstate</span>
      </div>

      <button
        onClick={toggleMobileOpen}
        className="text-zinc-400 hover:text-white p-2 -mr-2 rounded-lg hover:bg-zinc-800 transition-colors"
      >
        <Menu11Icon className="w-6 h-6" />
      </button>
    </div>
  );
}
