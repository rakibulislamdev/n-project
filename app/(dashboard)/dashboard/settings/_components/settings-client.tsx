"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Settings02Icon,
  Sun01Icon,
  Moon02Icon,
  ComputerIcon,
  Notification02Icon,
  Globe02Icon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function SettingsClient() {
  const { theme, setTheme } = useTheme();

  // Notification Preferences State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [propertyAlerts, setPropertyAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // Platform settings
  const [siteName, setSiteName] = useState("RealEstate Portal");
  const [supportEmail, setSupportEmail] = useState("support@realestate.com");
  const [currency, setCurrency] = useState("USD ($)");

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Preferences saved successfully!");
  };

  return (
    <div className="flex-1 flex flex-col bg-background min-h-screen">
      <PageHeader
        breadcrumbs={["DASHBOARD", "SETTINGS"]}
        title="Settings & Preferences"
        description="Customize your dashboard experience, themes, notifications, and general preferences."
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
                theme === "light"
                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                  : "border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-background"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <Sun01Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">Light Mode</span>
                  {theme === "light" && <CheckmarkCircle01Icon className="w-4 h-4 text-primary" />}
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
                theme === "dark"
                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                  : "border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-background"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-100">
                <Moon02Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">Dark Mode</span>
                  {theme === "dark" && <CheckmarkCircle01Icon className="w-4 h-4 text-primary" />}
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
                theme === "system"
                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                  : "border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-background"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                <ComputerIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">System Default</span>
                  {theme === "system" && <CheckmarkCircle01Icon className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Matches your OS setting</p>
              </div>
            </button>
          </div>
        </div>

        {/* Notifications & Alert Settings */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 pb-5 border-b border-border/60 mb-6">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Notification02Icon className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Notification Preferences</h3>
              <p className="text-xs text-muted-foreground">Manage how and when you receive system alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/50">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-semibold text-foreground block">Email Notifications</span>
                <span className="text-xs text-muted-foreground block">
                  Receive email alerts for important system events and user inquiries.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/50">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-semibold text-foreground block">New Review Alerts</span>
                <span className="text-xs text-muted-foreground block">
                  Get notified instantly when clients submit reviews waiting for approval.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={reviewAlerts}
                  onChange={(e) => setReviewAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/50">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-semibold text-foreground block">Property Inquiries</span>
                <span className="text-xs text-muted-foreground block">
                  Notify when a prospective client submits an inquiry on a listing.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={propertyAlerts}
                  onChange={(e) => setPropertyAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/50">
              <div className="space-y-0.5 pr-4">
                <span className="text-sm font-semibold text-foreground block">Weekly Performance Digest</span>
                <span className="text-xs text-muted-foreground block">
                  Receive a summary report of impressions, reviews, and leads every Monday.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* General Portal Settings */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 pb-5 border-b border-border/60 mb-6">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Globe02Icon className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">General Platform Settings</h3>
              <p className="text-xs text-muted-foreground">General parameters and contact defaults for the platform</p>
            </div>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="siteName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Platform Name
                </Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="h-11 bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Support Email
                </Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="h-11 bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Default Currency
              </Label>
              <Input
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="h-11 bg-background"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button type="submit" className="h-11 px-6 font-semibold shadow-xs">
                Save Platform Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
