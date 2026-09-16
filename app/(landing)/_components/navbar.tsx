"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "#about" },
  { title: "Properties", href: "#properties" },
  { title: "Reviews", href: "#reviews" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

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
  };

  return (
    <header className="absolute top-0 w-full z-50 py-6 font-inter">
      <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">Logo</div>
        
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
                className={`transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
          
          <Button className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/80">
            Contact me
          </Button>
        </nav>
      </div>
    </header>
  );
}
