import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileTopbar } from "@/components/dashboard/mobile-topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background font-inter">
      <Sidebar />
      <MobileTopbar />
      <main className="flex-1 bg-muted/10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
