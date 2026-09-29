"use client";

import { useState, useRef, useTransition } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
import {
  Camera01Icon,
  Mail01Icon,
  CallIcon,
  SecurityCheckIcon,
  CheckmarkCircle01Icon,
  UserIcon,
  LockPasswordIcon,
  Loading03Icon,
} from "hugeicons-react";
import { toast } from "sonner";
import { updateProfileAction, changePasswordAction } from "@/app/actions/auth";
import { uploadImageAction } from "@/app/actions/review";
import { useRouter } from "next/navigation";

interface ProfileClientProps {
  initialUser: User | null;
}

export default function ProfileClient({ initialUser }: ProfileClientProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingProfile, startProfileTransition] = useTransition();

  // Password change state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, startPasswordTransition] = useTransition();

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

    // Check size limit (max 5MB)
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
        setProfileImage(res.url);
        toast.success("Avatar uploaded! Save changes to apply.");
      } else {
        toast.error(res.message || "Failed to upload image");
      }
    } catch {
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    startProfileTransition(async () => {
      const res = await updateProfileAction({
        name: name.trim(),
        phone: phone.trim() || undefined,
        profileImage: profileImage || null,
      });

      if (res.success) {
        toast.success(res.message || "Profile updated successfully");
        if (res.data) {
          setUser((prev) => (prev ? { ...prev, ...res.data } : null));
        }
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword) {
      toast.error("Current password is required");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    startPasswordTransition(async () => {
      const res = await changePasswordAction({
        oldPassword,
        currentPassword: oldPassword,
        newPassword,
        confirmPassword,
      });

      if (res.success) {
        toast.success(res.message || "Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.message || "Failed to change password");
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-background min-h-screen">
      <PageHeader
        breadcrumbs={["DASHBOARD", "PROFILE"]}
        title="Admin Profile"
        description="Manage your personal details, credentials and security settings."
      />

      <div className="px-4 md:px-8 pb-12 max-w-5xl w-full">
        {/* Profile Card Header */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 shadow-xs mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Avatar with upload button */}
            <div className="relative group shrink-0">
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-4 ring-primary/20 shadow-md">
                <AvatarImage src={profileImage || ""} className="object-cover" />
                <AvatarFallback className="text-2xl font-bold bg-zinc-900 text-white">
                  {getInitials(user?.name || "Admin")}
                </AvatarFallback>
              </Avatar>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                title="Change Avatar"
                className="absolute bottom-1 right-1 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <Loading03Icon className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera01Icon className="w-4 h-4" />
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

            {/* User basic info badge */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
                <h2 className="text-2xl font-bold text-foreground truncate">
                  {user?.name || "Admin User"}
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckmarkCircle01Icon className="w-3.5 h-3.5" />
                  {user?.isActive !== false ? "Active" : "Inactive"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-foreground border border-primary/30">
                  {user?.role?.replace("_", " ") || "SUPER ADMIN"}
                </span>
              </div>

              <p className="text-muted-foreground text-sm flex items-center justify-center sm:justify-start gap-2 mb-3">
                <Mail01Icon className="w-4 h-4 text-muted-foreground/70" />
                {user?.email || "admin@example.com"}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <SecurityCheckIcon className="w-4 h-4 text-primary" />
                  <span>Account Verified: {user?.isVerified ? "Yes" : "Verified"}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center gap-1.5">
                    <CallIcon className="w-4 h-4 text-primary" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Info Form */}
          <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-5 border-b border-border/60 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <UserIcon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
                <p className="text-xs text-muted-foreground">Update your personal profile details</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="h-11 bg-background"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Email Address (Read-only)
                </Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="h-11 bg-muted/40 cursor-not-allowed text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="h-11 bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Role
                </Label>
                <Input
                  id="role"
                  value={user?.role?.replace("_", " ") || "SUPER ADMIN"}
                  disabled
                  className="h-11 bg-muted/40 cursor-not-allowed text-muted-foreground uppercase"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSavingProfile}
                  className="h-11 px-6 font-semibold shadow-xs"
                >
                  {isSavingProfile ? (
                    <>
                      <Loading03Icon className="w-4 h-4 mr-2 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-card border border-border/80 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-5 border-b border-border/60 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <LockPasswordIcon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Security & Password</h3>
                  <p className="text-xs text-muted-foreground">Ensure your account uses a strong password</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 bg-background"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="h-11 bg-background"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 bg-background"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isChangingPassword}
                    variant="outline"
                    className="h-11 px-6 font-semibold border-border hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {isChangingPassword ? (
                      <>
                        <Loading03Icon className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <div className="mt-8 pt-4 border-t border-border/60 text-xs text-muted-foreground">
              <p>💡 Tip: Use a combination of uppercase letters, numbers, and symbols to ensure maximum safety.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
