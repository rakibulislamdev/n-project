"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun01Icon, Moon02Icon } from "hugeicons-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-muted border border-border animate-pulse ${className}`} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-card hover:bg-muted text-foreground border border-border transition-colors cursor-pointer shadow-xs ${className}`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun01Icon className="w-4 h-4 text-primary transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon02Icon className="w-4 h-4 text-foreground transition-transform duration-200" />
      )}
    </button>
  );
}
