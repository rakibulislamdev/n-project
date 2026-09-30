"use client";

import { useState, useRef, useTransition, useMemo } from "react";
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
  UserIcon,
  LockPasswordIcon,
  Loading03Icon,
  Shield02Icon,
  LockIcon,
  Key01Icon,
  ViewIcon,
  ViewOffSlashIcon,
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
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!newPassword) return { score: 0, label: "Empty", color: "bg-zinc-200 dark:bg-zinc-800" };
    let score = 0;
    if (newPassword.length >= 6) score++;
    if (newPassword.length >= 10) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500", text: "text-red-500" };
    if (score === 2) return { score: 2, label: "Fair", color: "bg-amber-500", text: "text-amber-500" };
    if (score === 3) return { score: 3, label: "Good", color: "bg-blue-500", text: "text-blue-500" };
    return { score: 4, label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" };
  }, [newPassword]);

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
        setProfileImage(res.url);
        toast.success("Avatar uploaded! Click 'Save Changes' to apply.");
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
        newPassword,
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
    <div className="flex-1 flex flex-col bg-background min-h-full">
      <PageHeader
        breadcrumbs={["DASHBOARD", "PROFILE"]}
        title="Profile"
        description="Manage your account information and password."
      />

      <div className="px-4 md:px-8 pb-8 flex-1 space-y-5">
        {/* Simple & Clean Profile Card */}
        <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
            {/* Avatar with clean upload trigger */}
            <div className="relative shrink-0">
              <Avatar className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-border/80">
                <AvatarImage src={profileImage || ""} className="object-cover" />
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

        {/* 2 Columns: Personal Information & Password */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Left Column: Personal Details Card */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col h-full">
            <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <UserIcon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Personal Information</h3>
                <p className="text-xs text-muted-foreground">Update your personal details</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-medium text-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                    <Input
                      id="fullName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="pl-10 h-10 bg-background border-border shadow-xs hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary rounded-md transition-colors text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail01Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                    <Input
                      id="email"
                      value={user?.email || ""}
                      disabled
                      className="pl-10 h-10 bg-muted/40 border-border/60 cursor-not-allowed text-muted-foreground rounded-md text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-medium text-foreground">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <CallIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="pl-10 h-10 bg-background border-border shadow-xs hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary rounded-md transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-xs font-medium text-foreground">
                    Role
                  </Label>
                  <div className="relative">
                    <Shield02Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                    <Input
                      id="role"
                      value={user?.role?.replace("_", " ") || "SUPER ADMIN"}
                      disabled
                      className="pl-10 h-10 bg-muted/40 border-border/60 cursor-not-allowed text-muted-foreground uppercase font-medium rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-auto flex justify-end">
                <Button
                  type="submit"
                  disabled={isSavingProfile}
                  className="h-10 px-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-all cursor-pointer"
                >
                  {isSavingProfile ? (
                    <>
                      <Loading03Icon className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Password Card */}
          <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col h-full">
            <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <LockPasswordIcon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Change Password</h3>
                <p className="text-xs text-muted-foreground">Update your login password</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Current Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="currentPassword" className="text-xs font-medium text-foreground">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Key01Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                    <Input
                      id="currentPassword"
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-10 bg-background border-border shadow-xs hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary rounded-md transition-colors text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      title={showOldPassword ? "Hide password" : "Show password"}
                    >
                      {showOldPassword ? (
                        <ViewOffSlashIcon className="w-4 h-4" />
                      ) : (
                        <ViewIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="newPassword" className="text-xs font-medium text-foreground">
                    New Password
                  </Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="pl-10 pr-10 h-10 bg-background border-border shadow-xs hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary rounded-md transition-colors text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      title={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? (
                        <ViewOffSlashIcon className="w-4 h-4" />
                      ) : (
                        <ViewIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {newPassword && (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Strength:</span>
                        <span className={`font-semibold ${passwordStrength.text}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 h-1 w-full">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-full rounded-full transition-all duration-300 ${
                              passwordStrength.score >= step
                                ? passwordStrength.color
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-medium text-foreground">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="pl-10 pr-10 h-10 bg-background border-border shadow-xs hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary rounded-md transition-colors text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      title={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <ViewOffSlashIcon className="w-4 h-4" />
                      ) : (
                        <ViewIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-auto flex justify-end">
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  variant="outline"
                  className="w-full sm:w-auto h-10 px-6 font-semibold border-border hover:bg-secondary cursor-pointer rounded-md"
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
        </div>
      </div>
    </div>
  );
}
