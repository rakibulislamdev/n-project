import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const user = cookieStore.get("user")?.value;

  if (token || user) {
    try {
      const parsedUser = user ? JSON.parse(user) : null;
      const role = parsedUser?.role?.toUpperCase() || "";
      if (role.includes("ADMIN")) {
        redirect("/dashboard");
      } else {
        redirect("/");
      }
    } catch {
      redirect("/dashboard");
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-zinc-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Create Account</h1>
        <p className="text-zinc-500 mt-2 text-sm">Join us to get started</p>
      </div>
      
      {/* Placeholder for signup form */}
      <div className="flex flex-col gap-4">
        <div className="h-10 bg-zinc-50 rounded-lg border border-zinc-200 animate-pulse"></div>
        <div className="h-10 bg-zinc-50 rounded-lg border border-zinc-200 animate-pulse"></div>
        <div className="h-10 bg-zinc-50 rounded-lg border border-zinc-200 animate-pulse"></div>
        <div className="h-12 bg-black rounded-full mt-4"></div>
      </div>
    </div>
  );
}
