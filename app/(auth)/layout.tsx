import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft01Icon } from "hugeicons-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors duration-200 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 dark:bg-primary/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 right-0 w-80 h-80 bg-primary/5 dark:bg-primary/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            NDA<span className="text-primary">Estates</span>
          </Link>
          <span className="text-border hidden sm:inline">|</span>
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
          >
            <ArrowLeft01Icon className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Centered Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-center text-xs text-muted-foreground z-10">
        <p>&copy; {new Date().getFullYear()} NDAEstates. All rights reserved.</p>
      </footer>
    </div>
  );
}
