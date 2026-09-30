import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
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
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-zinc-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Welcome Back</h1>
        <p className="text-zinc-500 mt-2 text-sm">Sign in to your account</p>
      </div>
      
      <LoginForm />
    </div>
  );
}
