"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { StarIcon, StarOutlineIcon, SafeInfoIcon, UploadIcon, SubmitIcon } from "@/lib/icons";
import { Cancel01Icon } from "hugeicons-react";
import { submitReviewAction, uploadImageAction, uploadMultipleImagesAction } from "@/app/actions/review";

export function ReviewForm({
  file,
  setFile,
  preview,
}: {
  file: File | null;
  setFile: (f: File | null) => void;
  preview: string | null;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyFiles, setPropertyFiles] = useState<File[]>([]);
  const [propertyPreviews, setPropertyPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = propertyFiles.map((f) => URL.createObjectURL(f));
    setPropertyPreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [propertyFiles]);

  // Drag and drop state for primary photo
  const [dragActive, setDragActive] = useState(false);
  // Drag and drop state for property photos
  const [propDragActive, setPropDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handlePropDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setPropDragActive(true);
    } else if (e.type === "dragleave") {
      setPropDragActive(false);
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

  const handlePropDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPropDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setPropertyFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePropChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setPropertyFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    setIsSubmitting(true);
    
    try {
      let photoUrl = "";
      let propertyPhotoUrls: string[] = [];

      // 1. Upload primary image if exists
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        
        const uploadRes = await uploadImageAction(formData);
        
        if (uploadRes.success) {
          photoUrl = uploadRes.url;
        } else {
          toast.error(uploadRes.message || "Failed to upload image");
          setIsSubmitting(false);
          return;
        }
      }

      // 1.5 Upload property images if exist
      if (propertyFiles.length > 0) {
        const formData = new FormData();
        propertyFiles.forEach(f => {
          formData.append("images", f); 
        });
        
        const uploadRes = await uploadMultipleImagesAction(formData);
        if (uploadRes.success && uploadRes.urls) {
          propertyPhotoUrls = uploadRes.urls;
        } else {
          toast.error(uploadRes.message || "Failed to upload property images");
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Submit Review
      const payload = {
        name,
        email,
        rating,
        review: reviewText,
        photo: photoUrl || undefined,
        propertyImages: propertyPhotoUrls.length > 0 ? propertyPhotoUrls : undefined
      };

      const submitRes = await submitReviewAction(payload);

      if (submitRes.success) {
        toast.success(submitRes.message || "Review submitted successfully!");
        setIsSubmitted(true);
      } else {
        toast.error(submitRes.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label className="text-xs font-semibold text-foreground">Upload your photo (Optional)</label>
          <div
            className={`relative border border-dashed rounded-xl p-3 sm:p-4 flex items-center justify-center transition-colors cursor-pointer group ${dragActive ? "border-primary bg-primary/5" : "border-border bg-secondary/20 hover:bg-secondary/40"
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
            {file && preview ? (
              <div className="flex items-center gap-3 w-full">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary group/image">
                  <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      className="p-1 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        // Also clear the file input value so selecting the same file again triggers onChange
                        const input = document.getElementById("photo-upload") as HTMLInputElement;
                        if (input) input.value = "";
                      }}
                    >
                      <Cancel01Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-[10px] sm:text-xs text-foreground/50 mt-0.5">Click or drag to change</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UploadIcon className={`w-5 h-5 transition-colors ${dragActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground/60"}`} />
                <p className="text-xs sm:text-sm text-foreground/80 font-medium">
                  Click to upload <span className="font-normal text-foreground/60 hidden sm:inline">or drag and drop</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Property Photo Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-foreground">Upload property photo (Optional)</label>
          <div
            className={`relative border border-dashed rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center transition-colors cursor-pointer group ${propDragActive ? "border-primary bg-primary/5" : "border-border bg-secondary/20 hover:bg-secondary/40"
              }`}
            onDragEnter={handlePropDrag}
            onDragLeave={handlePropDrag}
            onDragOver={handlePropDrag}
            onDrop={handlePropDrop}
            onClick={() => document.getElementById("property-photo-upload")?.click()}
          >
            <input
              id="property-photo-upload"
              type="file"
              multiple
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handlePropChange}
            />
            {propertyPreviews.length > 0 ? (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-foreground/80 font-medium">
                    {propertyFiles.length} {propertyFiles.length === 1 ? 'file' : 'files'} selected
                  </p>
                  <p className="text-[10px] sm:text-xs text-foreground/50">Click to add/change</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full">
                  {propertyPreviews.map((url, i) => (
                    <div key={i} className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-secondary group/prop">
                      <img src={url} alt={`Property preview ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/prop:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          type="button"
                          className="p-1 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPropertyFiles(prev => prev.filter((_, idx) => idx !== i));
                          }}
                        >
                          <Cancel01Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UploadIcon className={`w-5 h-5 transition-colors ${propDragActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground/60"}`} />
                <p className="text-xs sm:text-sm text-foreground/80 font-medium">
                  Click to upload <span className="font-normal text-foreground/60 hidden sm:inline">or drag and drop</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 sm:h-14 bg-foreground text-background hover:bg-foreground/90 mt-1 sm:mt-2 rounded-xl text-sm sm:text-base font-semibold group flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>
              Submitting...
            </span>
          ) : (
            <>
              <SubmitIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              Submit Review
            </>
          )}
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
