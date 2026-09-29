import { getMeAction } from "@/app/actions/auth";
import ProfileClient from "./_components/profile-client";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const res = await getMeAction();
  const initialUser = res.success && res.data ? res.data : null;

  return <ProfileClient initialUser={initialUser} />;
}
