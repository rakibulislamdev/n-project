"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useReviewsStore } from "@/lib/store/use-reviews-store";
import { 
  Home01Icon, 
  Home09Icon,
  Building03Icon, 
  StarIcon, 
  ArrowUp01Icon, 
  ArrowDown01Icon 
} from "hugeicons-react";

export function Sidebar() {
  const pathname = usePathname();
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);
  const { pendingReviews, approvedReviews } = useReviewsStore();

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
        { title: "Pending", href: "/dashboard/reviews/pending", count: pendingReviews.length },
        { title: "Approved", href: "/dashboard/reviews/approved", count: approvedReviews.length },
      ],
    },
  ];

  return (
    <div className="w-64 bg-[#121212] min-h-screen flex flex-col text-zinc-400 py-6 border-r border-zinc-800">
      {/* Logo */}
      <div className="px-6 mb-10 flex items-center gap-3 cursor-pointer">
        <Home09Icon className="w-8 h-8 text-orange-500" />
        <span className="text-white font-medium text-lg tracking-wide">RealEstate</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map((item, index) => {
          if (item.subItems) {
            const isActive = pathname?.includes(item.matchPath || "");
            return (
              <div key={index} className="flex flex-col mt-2">
                <button 
                  onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                  className={`flex items-center justify-between px-6 py-3 transition-colors ${isActive ? "bg-[#1e1e1e] border-l-[3px] border-white text-white" : "hover:text-white border-l-[3px] border-transparent"}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-[15px]">{item.title}</span>
                  </div>
                  {isReviewsOpen ? (
                    <ArrowUp01Icon className="w-4 h-4" />
                  ) : (
                    <ArrowDown01Icon className="w-4 h-4" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isReviewsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="flex flex-col gap-1 mt-1 py-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex}
                        href={subItem.href} 
                        className={`flex items-center justify-between pl-14 pr-6 py-2 hover:text-white transition-colors ${pathname === subItem.href ? "bg-[#1e1e1e] text-white font-medium" : ""}`}
                      >
                        <span className="text-[14px]">{subItem.title}</span>
                        {subItem.count !== undefined && (
                          <span className="bg-zinc-800 text-[10px] px-2 py-0.5 rounded-full text-zinc-300">{subItem.count}</span>
                        )}
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
              className={`flex items-center gap-3 px-6 py-3 transition-colors hover:text-white ${isActive ? "bg-[#1e1e1e] border-l-[3px] border-white text-white" : "border-l-[3px] border-transparent"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-[15px]">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
