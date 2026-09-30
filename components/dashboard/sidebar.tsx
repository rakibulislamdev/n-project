"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useReviewsStore } from "@/lib/store/use-reviews-store";
import { useSidebarStore } from "@/lib/store/use-sidebar-store";
import { useTheme } from "next-themes";
import {
  Home01Icon,
  Home09Icon,
  Building03Icon,
  StarIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  HourglassIcon,
  ValidationApprovalIcon,
  SidebarRightIcon,
  Logout01Icon,
  UserIcon,
  Settings02Icon,
  Sun01Icon,
  Moon02Icon,
  ComputerIcon,
} from "hugeicons-react";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);
  const { pendingReviews, approvedReviews } = useReviewsStore();
  const { isMobileOpen, setIsMobileOpen } = useSidebarStore();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    const { logoutAction } = await import("@/app/actions/auth");
    await logoutAction();
    router.push("/login");
    router.refresh();
  };

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
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: UserIcon,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings02Icon,
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

      {/* Sidebar - Always dark styled (#121212) in both light and dark mode */}
      <div
        className={`bg-[#121212] h-screen h-dvh flex flex-col text-zinc-400 py-6 border-r border-zinc-800 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 transform md:sticky md:top-0 md:translate-x-0 shrink-0 ${
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0"
        } ${isSidebarOpen ? "md:w-64" : "md:w-20"}`}
      >
        {/* Header */}
        <div className="relative mb-8 h-10 w-full overflow-hidden shrink-0">
          <Link
            href="/"
            className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3 cursor-pointer transition-all duration-300 ${
              isExpanded ? "opacity-100 w-[160px]" : "opacity-0 w-0 pointer-events-none"
            }`}
          >
            <Home09Icon className="w-6 h-6 text-primary shrink-0" />
            <span className="text-white font-bold text-[15px] tracking-wide whitespace-nowrap">
              NDA<span className="text-primary">Estates</span>
            </span>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-all duration-300 shrink-0 z-10 cursor-pointer ${
              isSidebarOpen ? "right-4" : "left-1/2 -translate-x-1/2"
            }`}
            aria-label="Toggle sidebar"
          >
            <SidebarRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
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
                    className={`flex items-center px-6 py-3 w-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#1e1e1e] border-l-[3px] border-primary text-white font-semibold"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/60 active:bg-zinc-800 border-l-[3px] border-transparent hover:border-zinc-700"
                    }`}
                  >
                    <item.icon className="w-[18px] h-[18px] shrink-0" />
                    <div
                      className={`flex items-center justify-between transition-all duration-300 overflow-hidden ${
                        isExpanded ? "max-w-[200px] w-full ml-3 opacity-100" : "max-w-0 ml-0 opacity-0"
                      }`}
                    >
                      <span className="font-medium text-[14px] whitespace-nowrap">{item.title}</span>
                      {isReviewsOpen ? (
                        <ArrowUp01Icon className="w-4 h-4 shrink-0 text-zinc-400" />
                      ) : (
                        <ArrowDown01Icon className="w-4 h-4 shrink-0 text-zinc-400" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isReviewsOpen && isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-1 mt-1 py-1 relative">
                      {/* Vertical line connecting children to parent */}
                      <div
                        className={`absolute left-[32px] top-0 bottom-6 w-px bg-zinc-800 transition-all duration-300 ${
                          isExpanded ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>

                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={`flex items-center py-2.5 transition-all duration-200 relative group cursor-pointer ${
                            pathname === subItem.href
                              ? "bg-[#1e1e1e] text-white font-semibold border-l-2 border-primary"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-medium border-l-2 border-transparent"
                          } ${isExpanded ? "pl-[50px] pr-6" : "pl-8 pr-6"}`}
                        >
                          {/* Horizontal branch line */}
                          <div
                            className={`absolute left-[32px] top-1/2 -translate-y-1/2 w-[10px] h-px bg-zinc-800 transition-all duration-300 ${
                              isExpanded ? "opacity-100" : "opacity-0"
                            }`}
                          ></div>

                          <subItem.icon className="w-[15px] h-[15px] shrink-0 text-zinc-400 group-hover:text-white transition-colors" />
                          <div
                            className={`flex items-center justify-between transition-all duration-300 overflow-hidden ${
                              isExpanded ? "w-full ml-3 opacity-100" : "w-0 ml-0 opacity-0"
                            }`}
                          >
                            <span className="text-[13px] whitespace-nowrap">{subItem.title}</span>
                            {subItem.count !== undefined && (
                              <span className="bg-zinc-800/90 group-hover:bg-zinc-700 text-[11px] font-bold px-2 py-0.5 rounded-full text-zinc-200 group-hover:text-white border border-zinc-700/60 shrink-0 transition-colors">
                                {subItem.count}
                              </span>
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
                className={`flex items-center px-6 py-3 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1e1e1e] border-l-[3px] border-primary text-white font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60 active:bg-zinc-800 border-l-[3px] border-transparent hover:border-zinc-700"
                }`}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span
                  className={`font-medium text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isExpanded ? "max-w-[120px] ml-3 opacity-100" : "max-w-0 ml-0 opacity-0"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Theme & Logout Section */}
        <div className="mt-auto px-4 pt-4 pb-2 border-t border-zinc-800/60 flex flex-col gap-2 shrink-0">
          {/* Sidebar Theme Switcher (styled seamlessly for dark sidebar) */}
          {mounted && (
            <div className="w-full">
              {isExpanded ? (
                <div className="flex items-center justify-between p-1 bg-zinc-900/90 rounded-xl border border-zinc-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      theme === "light"
                        ? "bg-zinc-800 text-amber-400 shadow-xs"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                    title="Light Mode"
                  >
                    <Sun01Icon className="w-3.5 h-3.5" />
                    <span>Light</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      theme === "dark"
                        ? "bg-zinc-800 text-amber-400 shadow-xs"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                    title="Dark Mode"
                  >
                    <Moon02Icon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("system")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      theme === "system"
                        ? "bg-zinc-800 text-zinc-100 shadow-xs"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                    title="System Default"
                  >
                    <ComputerIcon className="w-3.5 h-3.5" />
                    <span>Auto</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="w-full flex items-center justify-center py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-all cursor-pointer"
                  title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                >
                  {resolvedTheme === "dark" ? (
                    <Moon02Icon className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Sun01Icon className="w-5 h-5 text-amber-500" />
                  )}
                </button>
              )}
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 active:bg-red-500/20 group cursor-pointer"
          >
            <Logout01Icon className="w-[18px] h-[18px] shrink-0 text-zinc-400 group-hover:text-red-400 transition-colors" />
            <span
              className={`font-medium text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isExpanded ? "max-w-[120px] ml-3 opacity-100" : "max-w-0 ml-0 opacity-0"
              }`}
            >
              Log out
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
