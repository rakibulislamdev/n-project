import { PageHeader } from "@/components/dashboard/page-header";
import { Building03Icon } from "hugeicons-react";

export default function PropertiesPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PageHeader
        breadcrumbs={["PROPERTIES", "ALL PROPERTIES"]}
        title="Properties"
        description="Manage your real estate listings and property details."
      />
      <div className="flex-1 flex items-center justify-center p-8 pb-32">
        <div className="bg-white border border-zinc-100 shadow-sm rounded-2xl flex flex-col items-center justify-center text-center p-12 max-w-md w-full">
          <div className="w-16 h-16 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center mb-6">
            <Building03Icon className="w-8 h-8 text-zinc-400" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Coming Soon</h2>
          <p className="text-[13px] text-zinc-500 font-medium">The property management module is currently under development. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
}
