import { PageHeader } from "@/components/dashboard/page-header";
import { Building03Icon } from "hugeicons-react";

export default function PropertiesPage() {
  return (
    <div className="flex-1 flex flex-col min-h-full">
      <PageHeader
        breadcrumbs={["PROPERTIES", "ALL PROPERTIES"]}
        title="Properties"
        description="Manage your real estate listings and property details."
      />
      <div className="flex-1 flex items-center justify-center p-8 pb-32">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs rounded-2xl flex flex-col items-center justify-center text-center p-12 max-w-md w-full">
          <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 rounded-full flex items-center justify-center mb-6">
            <Building03Icon className="w-8 h-8 text-zinc-500 dark:text-zinc-400" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Coming Soon</h2>
          <p className="text-[13px] text-zinc-600 dark:text-zinc-400 font-medium">The property management module is currently under development. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
}
