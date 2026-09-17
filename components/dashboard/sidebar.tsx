"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useReviewsStore } from "@/lib/store/use-reviews-store";
import { useSidebarStore } from "@/lib/store/use-sidebar-store";
import {
  Home01Icon,
  Home09Icon,
  Building03Icon,
  StarIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  HourglassIcon,
  ValidationApprovalIcon,
  SidebarRightIcon
} from "hugeicons-react";

export function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);
  const { pendingReviews, approvedReviews } = useReviewsStore();
  const { isMobileOpen, setIsMobileOpen } = useSidebarStore();

  const isExpanded = isSidebarOpen || isMobileOpen;

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, setIsMobileOpen]);

  const NAV_ITEMS = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home01Icon,
      exact: true,
    },
    {
      title: "Properties",
      href: "/dashboard/properties",
      icon: Building03Icon,
    },
    {
      title: "Reviews",
      matchPath: "/reviews",
      icon: StarIcon,
      subItems: [
        { title: "Pending", href: "/dashboard/reviews/pending", count: pendingReviews.length, icon: HourglassIcon },
        { title: "Approved", href: "/dashboard/reviews/approved", count: approvedReviews.length, icon: ValidationApprovalIcon },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`bg-[#121212] min-h-screen flex flex-col text-zinc-400 py-6 border-r border-zinc-800 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0"} ${isSidebarOpen ? "md:w-64" : "md:w-20"}`}>
      {/* Header */}
      <div className="relative mb-10 h-10 w-full overflow-hidden">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 cursor-pointer transition-all duration-300 ${isExpanded ? "opacity-100 w-[160px]" : "opacity-0 w-0 pointer-events-none"}`}>
          <Home09Icon className="w-7 h-7 text-orange-500 shrink-0" />
          <span className="text-white font-bold text-[16px] tracking-wide whitespace-nowrap">RealEstate</span>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-all duration-300 shrink-0 z-10 ${isSidebarOpen ? "right-4" : "left-1/2 -translate-x-1/2"}`}
        >
          <SidebarRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 overflow-hidden">
        {NAV_ITEMS.map((item, index) => {
          if (item.subItems) {
            const isActive = pathname?.includes(item.matchPath || "");
            return (
              <div key={index} className="flex flex-col mt-2">
                <button
                  onClick={() => {
                    if (!isExpanded) {
                      setIsSidebarOpen(true);
                      setIsReviewsOpen(true);
                    } else {
                      setIsReviewsOpen(!isReviewsOpen);
                    }
                  }}
                  className={`flex items-center px-6 py-3 w-full transition-colors ${isActive ? "bg-[#1e1e1e] border-l-[3px] border-white text-white" : "hover:text-white border-l-[3px] border-transparent"}`}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  <div className={`flex items-center justify-between transition-all duration-300 overflow-hidden ${isExpanded ? "max-w-[200px] w-full ml-3 opacity-100" : "max-w-0 ml-0 opacity-0"}`}>
                    <span className="font-medium text-[14px] whitespace-nowrap">{item.title}</span>
                    {isReviewsOpen ? <ArrowUp01Icon className="w-4 h-4 shrink-0" /> : <ArrowDown01Icon className="w-4 h-4 shrink-0" />}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${(isReviewsOpen && isExpanded) ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="flex flex-col gap-1 mt-1 py-1 relative">
                    {/* Vertical line connecting children to parent (visible only when expanded) */}
                    <div className={`absolute left-[32px] top-0 bottom-6 w-px bg-zinc-800 transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}></div>

                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={`flex items-center py-2 transition-all duration-300 hover:text-white relative ${pathname === subItem.href ? "bg-[#1e1e1e] text-white font-medium" : "text-zinc-500 font-medium"} ${isExpanded ? "pl-[52px] pr-6" : "pl-8 pr-6"}`}
                      >
                        {/* Horizontal branch line (visible only when expanded) */}
                        <div className={`absolute left-[32px] top-1/2 -translate-y-1/2 w-[10px] h-px bg-zinc-800 transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}></div>

                        <subItem.icon className="w-[15px] h-[15px] shrink-0" />
                        <div className={`flex items-center justify-between transition-all duration-300 overflow-hidden ${isExpanded ? "w-full ml-3 opacity-100" : "w-0 ml-0 opacity-0"}`}>
                          <span className="text-[13px] whitespace-nowrap">{subItem.title}</span>
                          {subItem.count !== undefined && (
                            <span className="bg-zinc-800 text-[11px] font-bold px-2 py-0.5 rounded-full text-zinc-300 shrink-0">{subItem.count}</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          const isActive = item.exact ? pathname === item.href : pathname?.includes(item.href || "");

          return (
            <Link
              key={index}
              href={item.href || "#"}
              className={`flex items-center px-6 py-3 transition-colors hover:text-white ${isActive ? "bg-[#1e1e1e] border-l-[3px] border-white text-white" : "border-l-[3px] border-transparent"}`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              <span className={`font-medium text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ${isExpanded ? "max-w-[120px] ml-3 opacity-100" : "max-w-0 ml-0 opacity-0"}`}>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
    </>
  );
}
