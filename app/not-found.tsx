import Link from "next/link";
import { Alert02Icon, Home01Icon } from "hugeicons-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9fafb] font-inter flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-white border border-zinc-100 shadow-[0px_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-full flex items-center justify-center mb-8">
        <Alert02Icon className="w-10 h-10 text-orange-500" />
      </div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">404 - Page Not Found</h1>
      <p className="text-zinc-500 font-medium max-w-md mx-auto mb-10 text-[15px]">
        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link
        href="/"
        className="bg-black hover:bg-zinc-800 text-white px-8 h-12 rounded-full font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all"
      >
        <Home01Icon className="w-5 h-5" />
        Return to Home
      </Link>
    </div>
  );
}
