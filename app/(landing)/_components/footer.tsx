import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-background font-inter pb-8 pt-16">
      <div className="max-w-7xl mx-auto px-8 w-full flex flex-col gap-12">
        {/* CTA Banner */}
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[320px] flex items-center bg-muted">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/footer-image.svg" 
              alt="City building looking up" 
              fill 
              className="object-cover object-center" 
              priority
            />
          </div>
          
          <div className="relative z-10 w-full p-10 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
                Have a story to share?
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Your Experience Matters
              </h2>
              <p className="text-sm text-foreground/80 mt-2">
                Help others by sharing your experience. It only takes a minute.
              </p>
            </div>
            
            <Button variant="default" size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-medium">
              Write a Review
            </Button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground pt-4">
          <p>© 2026 Nader Ayoub. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Youtube className="w-4 h-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
