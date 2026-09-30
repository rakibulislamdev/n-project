import Link from "next/link";
import { Alert02Icon, Home01Icon } from "hugeicons-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden transition-colors duration-200">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-primary/10 dark:bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/5 dark:bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Bar with Theme Toggle */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between z-10">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          NDA<span className="text-primary">Estates</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center z-10 max-w-2xl mx-auto w-full">
        {/* Glowing 404 Number */}
        <div className="relative mb-4 select-none">
          <span className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/70 to-foreground/20">
            404
          </span>
          <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card border border-border shadow-xl flex items-center justify-center">
            <Alert02Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or might have been relocated.
          Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-7 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 text-zinc-950 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Home01Icon className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 text-center text-xs text-muted-foreground z-10">
        <p>&copy; {new Date().getFullYear()} NDAEstates. All rights reserved.</p>
      </footer>
    </div>
  );
}
