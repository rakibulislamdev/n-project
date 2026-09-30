"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import {
  Sun01Icon,
  Moon02Icon,
  ComputerIcon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function SettingsClient() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-background min-h-full">
      <PageHeader
        breadcrumbs={["DASHBOARD", "SETTINGS"]}
        title="Settings & Preferences"
        description="Customize your dashboard experience and theme appearance."
      />

      <div className="px-4 md:px-8 pb-12 max-w-5xl w-full space-y-8">
        {/* Appearance & Theme Section */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 pb-5 border-b border-border/60 mb-6">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Sun01Icon className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Appearance</h3>
              <p className="text-xs text-muted-foreground">Select your interface theme preference</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => {
                setTheme("light");
                toast.success("Light theme activated");
              }}
              className={`p-4 rounded-xl border text-left flex flex-col items-start gap-3 transition-all cursor-pointer ${
                mounted && theme === "light"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-background"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <Sun01Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">Light Mode</span>
                  {mounted && theme === "light" && <CheckmarkCircle01Icon className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Clean, bright interface</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme("dark");
                toast.success("Dark theme activated");
              }}
              className={`p-4 rounded-xl border text-left flex flex-col items-start gap-3 transition-all cursor-pointer ${
                mounted && theme === "dark"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-background"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-100">
                <Moon02Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">Dark Mode</span>
                  {mounted && theme === "dark" && <CheckmarkCircle01Icon className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Sleek, low-glare aesthetic</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme("system");
                toast.success("System theme activated");
              }}
              className={`p-4 rounded-xl border text-left flex flex-col items-start gap-3 transition-all cursor-pointer ${
                mounted && theme === "system"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-background"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <ComputerIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">System Default</span>
                  {mounted && theme === "system" && <CheckmarkCircle01Icon className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Matches your OS setting</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
