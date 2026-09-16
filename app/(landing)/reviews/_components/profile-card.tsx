import Image from "next/image";
import { ProfileHomeIcon, ProfileStarIcon, ProfileTrustedIcon } from "@/lib/icons";

export function ProfileCard({ previewImage }: { previewImage?: string | null }) {
  return (
    <div className="bg-background rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-auto md:mx-0 flex flex-col font-inter h-full">
      {/* Photo */}
      <div className="relative w-full min-h-[450px] flex-1 bg-secondary">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Uploaded Preview"
            className="w-full h-full object-cover object-top absolute inset-0"
          />
        ) : (
          <Image
            src="/review-page-avatar.png"
            alt="Nader Ayoub"
            fill
            className="object-cover object-top"
          />
        )}
      </div>

      {/* Details */}
      <div className="p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-foreground tracking-tight">Nader Ayoub</h3>
          <p className="text-sm text-foreground/60">Real Estate Professional</p>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed">
          I'm committed to providing the best real estate experience, whether you're buying, selling, or investing. Your feedback helps me improve and gives others the confidence to work with me.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 py-6 border-y border-border/50">
          <div className="flex flex-col items-center text-center gap-1">
            <ProfileHomeIcon className="w-8 h-8 text-foreground mb-1" />
            <span className="text-base font-bold text-foreground">1k+</span>
            <span className="text-[10px] uppercase tracking-wider text-foreground/60">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1 px-2 border-x border-border/50">
            <ProfileStarIcon className="w-8 h-8 text-foreground mb-1" />
            <span className="text-base font-bold text-foreground">5.0</span>
            <span className="text-[10px] uppercase tracking-wider text-foreground/60">Average Rating</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <ProfileTrustedIcon className="w-8 h-8 text-foreground mb-1" />
            <span className="text-base font-bold text-foreground">Trusted</span>
            <span className="text-[10px] uppercase tracking-wider text-foreground/60">Across the City</span>
          </div>
        </div>

        {/* Quote & Signature */}
        <div className="flex flex-col gap-4 pt-2">
          <p className="text-sm text-foreground/80 italic">
            "Real estate is more than properties, it's about people."
          </p>
          <div className="self-end mt-2">
            {/* Signature Placeholder using cursive font */}
            <span className="font-serif text-3xl text-foreground/80 italic">N. Ayoub</span>
          </div>
        </div>
      </div>
    </div>
  );
}
