import Link from "next/link";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "../ui/Button";

export function AgentTopHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-dashboard-border bg-dashboard-card px-6 ml-64">
      {/* Global Search */}
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search quotations..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary transition-all"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <Link href="/agent/quotations/create">
          <Button variant="primary" size="sm" className="gap-2 bg-[#2563eb] hover:bg-[#1d4ed8]">
            <Plus className="h-4 w-4" />
            Create Quotation
          </Button>
        </Link>
        
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-dashboard-foreground leading-tight">Sarah Jenkins</span>
            <span className="text-xs text-slate-500">Leisure Hoppers</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-500 font-bold">
            SJ
          </div>
        </div>
      </div>
    </header>
  );
}
