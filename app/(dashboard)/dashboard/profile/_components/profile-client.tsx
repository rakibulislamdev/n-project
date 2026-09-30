"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { User } from "@/types";
import { ProfileOverviewCard } from "./profile-overview-card";
import { PersonalInfoForm } from "./personal-info-form";
import { ChangePasswordForm } from "./change-password-form";

interface ProfileClientProps {
  initialUser: User | null;
}

export default function ProfileClient({ initialUser }: ProfileClientProps) {
  const [user, setUser] = useState<User | null>(initialUser);

  const handleUserUpdate = (updatedUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  };

  return (
    <div className="flex-1 flex flex-col bg-background min-h-full">
      <PageHeader
        breadcrumbs={["DASHBOARD", "PROFILE"]}
        title="Profile"
        description="Manage your account information and password."
      />

      <div className="px-4 md:px-8 pb-8 flex-1 space-y-5">
        {/* Top Profile Overview Card */}
        <ProfileOverviewCard user={user} onUserUpdate={handleUserUpdate} />

        {/* 2 Columns: Personal Information & Password */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <PersonalInfoForm user={user} onUserUpdate={handleUserUpdate} />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
