import { Button } from "@/components/ui/button";
import { ScrollDiv } from "@/components/scroll-animation";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, XIcon } from "@/lib/icons";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-background font-inter pb-8 pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full flex flex-col gap-10 md:gap-12">
        {/* CTA Banner */}
        <ScrollDiv 
          scale={0.95}
          duration={0.7}
          className="relative w-full rounded-2xl overflow-hidden min-h-[320px] flex items-center bg-muted"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/footer-image.svg"
              alt="City building looking up"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="relative z-10 w-full p-6 md:p-10 lg:p-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
                Have a story to share?
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Your Experience Matters
              </h2>
              <p className="text-sm text-foreground/80 mt-1 md:mt-2">
                Help others by sharing your experience. It only takes a minute.
              </p>
            </div>

            <Button variant="default" size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-medium">
              Write a Review
            </Button>
          </div>
        </ScrollDiv>

        {/* Bottom Footer */}
        <ScrollDiv 
          y={20}
          duration={0.5}
          delay={0.2}
          margin="0px"
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground pt-4"
        >
          <p>© {new Date().getFullYear()} Nader Ayoub. All rights reserved.</p>
          <div className="flex items-center gap-5 text-brand-dark">
            <a href="#" className="hover:text-foreground/70 transition-colors"><FacebookIcon className="w-4 h-4" /></a>
            <a href="#" className="hover:text-foreground/70 transition-colors"><InstagramIcon className="w-4 h-4" /></a>
            <a href="#" className="hover:text-foreground/70 transition-colors"><LinkedinIcon className="w-4 h-4" /></a>
            <a href="#" className="hover:text-foreground/70 transition-colors"><YoutubeIcon className="w-4 h-4" /></a>
            <a href="#" className="hover:text-foreground/70 transition-colors">
              <XIcon className="w-4 h-4" />
            </a>
          </div>
        </ScrollDiv>
      </div>
    </footer>
  );
}
