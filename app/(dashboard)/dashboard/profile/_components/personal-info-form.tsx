"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
import {
  UserIcon,
  Mail01Icon,
  CallIcon,
  Shield02Icon,
  Loading03Icon,
} from "hugeicons-react";
import { toast } from "sonner";
import { updateProfileAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

interface PersonalInfoFormProps {
  user: User | null;
  onUserUpdate: (updatedUser: Partial<User>) => void;
}

export function PersonalInfoForm({ user, onUserUpdate }: PersonalInfoFormProps) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isSavingProfile, startProfileTransition] = useTransition();

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
        profileImage: user?.profileImage || null,
      });

      if (res.success) {
        toast.success(res.message || "Profile updated successfully");
        if (res.data) {
          onUserUpdate(res.data);
        } else {
          onUserUpdate({ name: name.trim(), phone: phone.trim() || null });
        }
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    });
  };

  return (
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
          {/* Full Name */}
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

          {/* Email Address */}
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

          {/* Phone Number */}
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

          {/* Role */}
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
  );
}
