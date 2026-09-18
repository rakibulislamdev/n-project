"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../_components/navbar";
import { ProfileCard } from "./_components/profile-card";
import { ReviewForm } from "./_components/review-form";
import { Footer } from "../_components/footer";

export default function ReviewsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">
      {/* Background Image / Blur */}
      <div 
        className="absolute top-0 left-0 w-full h-[600px] z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/review-page-image.svg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <Navbar />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-36 md:pt-44 lg:pt-48 pb-8 md:pb-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-sans">
            Your <span className="italic font-serif font-light">Feedback</span> Means a Lot
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-foreground/70 max-w-2xl font-inter px-2">
            If you've worked with me, I'd to hear about your experience. Your review helps me
            grow and supports others in making confident decisions.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-stretch justify-center">
          {/* Left Column: Profile Card */}
          <div className="w-full md:w-[340px] lg:w-[400px] flex-shrink-0 flex flex-col">
            <ProfileCard />
          </div>

          {/* Right Column: Review Form */}
          <div className="w-full md:flex-1 max-w-2xl flex flex-col">
            <ReviewForm file={file} setFile={setFile} preview={preview} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
