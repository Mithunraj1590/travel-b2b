import Link from "next/link";
import { Plus, Search, Car } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export default function TransportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">Transport Management</h1>
          <p className="text-slate-500 mt-1">Manage transfer routes and vehicle pricing across all locations.</p>
        </div>
        <Link href="/admin/transport/add">
          <Button variant="primary" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
            Add New Transfer
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-dashboard-border flex items-center justify-between bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transfers by city or route..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-600">
              <option value="">All Cities</option>
              <option value="bangkok">Bangkok</option>
              <option value="pattaya">Pattaya</option>
              <option value="phuket">Phuket</option>
            </select>
          </div>
        </div>
        
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <Car className="h-8 w-8 text-indigo-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No transfers added yet</h3>
          <p className="text-slate-500 max-w-sm mb-6">
            Get started by adding your first transfer route to allow agents to include them in quotations.
          </p>
          <Link href="/admin/transport/add">
            <Button variant="primary" className="bg-indigo-600 hover:bg-indigo-700">
              Add Your First Transfer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
