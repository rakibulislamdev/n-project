import { Notification02Icon, ArrowDown01Icon } from "hugeicons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface PageHeaderProps {
  breadcrumbs: string[];
  title: string;
  description: string;
}

export function PageHeader({ breadcrumbs, title, description }: PageHeaderProps) {
  return (
    <header className="px-8 py-6 flex justify-between items-start">
      <div>
        <div className="text-[10px] text-zinc-400 font-bold tracking-widest mb-2 flex items-center gap-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb}>
              <span className={index === breadcrumbs.length - 1 ? "text-zinc-800" : ""}>
                {crumb.toUpperCase()}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="text-zinc-300">{">"}</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-3xl font-extrabold mb-2 text-zinc-900 tracking-tight">{title}</h1>
        <p className="text-zinc-400 text-sm font-medium">{description}</p>
      </div>
      <div className="flex items-center gap-6 mt-2">
        <button className="relative">
          <Notification02Icon className="w-6 h-6 text-zinc-500" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 shadow-sm border border-zinc-100">
            <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-bold text-zinc-900">Admin</span>
            <span className="text-xs text-zinc-400 font-medium">Super Admin</span>
          </div>
          <button className="text-zinc-400 ml-1">
            <ArrowDown01Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
