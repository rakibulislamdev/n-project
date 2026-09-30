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
    <div className="w-full max-w-md p-6 sm:p-8 bg-card text-card-foreground rounded-2xl shadow-xl border border-border transition-colors">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground mt-2 text-sm">Sign in to your admin account</p>
      </div>
      
      <LoginForm />
    </div>
  );
}
