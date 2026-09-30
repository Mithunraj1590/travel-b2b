import Link from "next/link";
import { Search, Bell, Shield } from "lucide-react";
import { Button } from "../ui/Button";

export function AdminTopHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-dashboard-border bg-dashboard-card px-6 ml-64">
      {/* Global Search */}
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search agents, destinations..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary transition-all"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">

        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-dashboard-foreground leading-tight">System Admin</span>
            <span className="text-xs text-indigo-500 font-medium">Superuser</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-indigo-100 overflow-hidden flex items-center justify-center text-indigo-600 font-bold">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
