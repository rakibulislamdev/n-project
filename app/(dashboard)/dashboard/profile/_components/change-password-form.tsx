"use client";

import { useState, useTransition, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LockPasswordIcon,
  LockIcon,
  Key01Icon,
  ViewIcon,
  ViewOffSlashIcon,
  Loading03Icon,
} from "hugeicons-react";
import { toast } from "sonner";
import { changePasswordAction } from "@/app/actions/auth";

export function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, startPasswordTransition] = useTransition();

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
  );
}
