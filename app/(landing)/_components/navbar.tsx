"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "#about" },
  { title: "Properties", href: "#properties" },
  { title: "Reviews", href: "#reviews" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // When the component mounts or URL changes, check the hash
    setActiveHash(window.location.hash);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      setActiveHash(href);
    } else {
      setActiveHash("");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 w-full z-50 py-6 font-inter">
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">Logo</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/" && pathname === "/" && !activeHash) ||
              (activeHash === link.href);

            return (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`transition-colors hover:text-primary ${isActive ? "text-primary font-semibold" : "text-foreground"
                  }`}
              >
                {link.title}
              </Link>
            );
          })}

          <Button className="rounded-full px-6 bg-foreground text-background">
            Contact me
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} />
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="12" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-background border-r border-border/50 z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <span className="text-xl font-bold tracking-tight">Logo</span>
                <button
                  className="p-2 -mr-2 text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-5">
                {navLinks.map((link) => {
                  const isActive =
                    (link.href === "/" && pathname === "/" && !activeHash) ||
                    (activeHash === link.href);

                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`text-base font-medium transition-colors hover:text-primary ${isActive ? "text-primary font-semibold" : "text-foreground"
                        }`}
                    >
                      {link.title}
                    </Link>
                  );
                })}

                <Button className="w-full rounded-full bg-foreground text-background mt-4 py-5 text-base">
                  Contact me
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
