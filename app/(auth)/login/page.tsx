import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
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
