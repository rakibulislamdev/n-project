"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { StarIcon, StarOutlineIcon, SafeInfoIcon, UploadIcon, SubmitIcon } from "@/lib/icons";

export function ReviewForm({
  file,
  setFile,
}: {
  file: File | null;
  setFile: (f: File | null) => void;
  preview: string | null;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Drag and drop state
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("Review submitted successfully!");
  };

  if (isSubmitted) {
    return (
      <div className="bg-background rounded-2xl shadow-xl w-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[600px] h-full font-inter text-center">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold italic text-foreground mb-4">Thanks you</h2>
        <p className="text-sm text-foreground/60 italic font-serif">For taking the time to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-2xl shadow-xl w-full p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col font-inter h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Write a Review</h2>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-foreground/60">
          <SafeInfoIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <p>Your information is safe and will<br />never be shared without permission.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 md:gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-foreground">Name <span className="text-red-500">*</span></label>
          <Input
            required
            placeholder="Enter your name"
            className="bg-background border border-border shadow-sm hover:border-border/80 h-10 sm:h-12 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary transition-colors text-sm"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-foreground">Email <span className="text-red-500">*</span></label>
          <Input
            required
            type="email"
            placeholder="Enter your email"
            className="bg-background border border-border shadow-sm hover:border-border/80 h-10 sm:h-12 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary transition-colors text-sm"
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-foreground">Your Rating <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
              >
                {(hoverRating || rating) >= star ? (
                  <StarIcon className="w-6 h-6 transition-colors duration-200 text-primary" />
                ) : (
                  <StarOutlineIcon className="w-6 h-6 transition-colors duration-200 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Review Textarea */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-semibold text-foreground">Your Review <span className="text-red-500">*</span></label>
          <Textarea
            required
            placeholder="Tell us about your experience..."
            className="bg-background border border-border shadow-sm hover:border-border/80 min-h-[120px] sm:min-h-[160px] resize-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary transition-colors pt-4 pb-8 text-sm"
            maxLength={500}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <span className="absolute bottom-3 right-3 text-[10px] text-foreground/40">
            {reviewText.length}/500
          </span>
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-foreground">Add a Photo (Optional)</label>
          <div
            className={`relative border border-dashed rounded-xl p-5 sm:p-8 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer group ${dragActive ? "border-primary bg-primary/5" : "border-border bg-secondary/20 hover:bg-secondary/40"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("photo-upload")?.click()}
          >
            <input
              id="photo-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleChange}
            />
            {file ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <UploadIcon className="w-8 h-8 text-primary transition-colors" />
                <p className="text-sm text-foreground/80 font-medium break-all px-4">{file.name}</p>
              </div>
            ) : (
              <>
                <UploadIcon className={`w-8 h-8 transition-colors ${dragActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground/60"}`} />
                <p className="text-sm text-foreground/80 font-medium">Click to upload <span className="font-normal text-foreground/60">or drag and drop</span></p>
                <p className="text-xs text-foreground/40">JPG, PNG, (Max 5MB)</p>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full h-12 sm:h-14 bg-foreground text-background hover:bg-foreground/90 mt-1 sm:mt-2 rounded-xl text-sm sm:text-base font-semibold group flex items-center justify-center gap-2">
          <SubmitIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          Submit Review
        </Button>
      </form>

      {/* Footer Typography */}
      <div className="mt-auto pt-6 sm:pt-8 text-center flex flex-col items-center justify-center">
        <h3 className="font-serif text-3xl sm:text-4xl font-bold italic text-foreground tracking-tight">Thanks you</h3>
        <p className="text-[11px] text-foreground/50 italic font-serif mt-1">For taking the time to share your experience!</p>
      </div>
    </div>
  );
}
