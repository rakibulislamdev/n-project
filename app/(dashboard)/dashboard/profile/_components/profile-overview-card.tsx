"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import { Camera01Icon, CallIcon, Shield02Icon, Loading03Icon } from "hugeicons-react";
import { toast } from "sonner";
import { uploadImageAction } from "@/app/actions/review";
import { updateProfileAction } from "@/app/actions/auth";

interface ProfileOverviewCardProps {
  user: User | null;
  onUserUpdate: (updatedUser: Partial<User>) => void;
}

export function ProfileOverviewCard({ user, onUserUpdate }: ProfileOverviewCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (userName?: string) => {
    if (!userName) return "AD";
    const parts = userName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return userName.substring(0, 2).toUpperCase();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImageAction(formData);
      if (res.success && res.url) {
        onUserUpdate({ profileImage: res.url });
        // Automatically persist avatar change to backend
        await updateProfileAction({ profileImage: res.url });
        toast.success("Profile photo updated successfully!");
      } else {
        toast.error(res.message || "Failed to upload image");
      }
    } catch {
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
        {/* Avatar with clean upload trigger */}
        <div className="relative shrink-0">
          <Avatar className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-border/80">
            <AvatarImage src={user?.profileImage || ""} className="object-cover" />
            <AvatarFallback className="text-lg font-bold bg-muted text-foreground">
              {getInitials(user?.name || "Admin")}
            </AvatarFallback>
          </Avatar>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            title="Change photo"
            className="absolute bottom-0 right-0 p-1.5 bg-primary text-black rounded-full shadow-xs hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 border-2 border-card"
            aria-label="Change photo"
          >
            {isUploading ? (
              <Loading03Icon className="w-3 h-3 animate-spin" />
            ) : (
              <Camera01Icon className="w-3 h-3" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              {user?.name || "Admin"}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground border border-border/80">
              <Shield02Icon className="w-3 h-3 text-primary" />
              {user?.role?.replace("_", " ") || "Super Admin"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {user?.email || "admin@example.com"}
          </p>
          {user?.phone && (
            <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1 pt-0.5">
              <CallIcon className="w-3.5 h-3.5" />
              <span>{user.phone}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
