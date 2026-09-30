import { Users, FileText, Globe, Building } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">Admin Overview</h1>
        <p className="text-slate-500 mt-1">System status and platform performance at a glance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Agents", value: "142", trend: "+12% from last month", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Active Quotations", value: "854", trend: "+24% from last month", icon: FileText, color: "text-amber-600", bg: "bg-amber-100" },
          { label: "Total Destinations", value: "32", trend: "+2 this month", icon: Globe, color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "Partner Hotels", value: "418", trend: "+18 this month", icon: Building, color: "text-purple-600", bg: "bg-purple-100" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                <span className="text-2xl font-bold text-dashboard-fg mt-1">{stat.value}</span>
              </div>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="text-xs font-medium text-emerald-600 bg-emerald-50 self-start px-2 py-1 rounded-md">
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 min-h-[400px]">
            <h3 className="text-lg font-semibold text-dashboard-fg mb-4">Recent Agent Activity</h3>
            <div className="flex flex-col gap-4">
              <div className="text-sm text-slate-500 text-center py-10">
                Agent activity feed will appear here.
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 flex flex-col gap-8">
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 min-h-[400px]">
            <h3 className="text-lg font-semibold text-dashboard-fg mb-4">System Alerts</h3>
            <div className="flex flex-col gap-4">
              <div className="text-sm text-slate-500 text-center py-10">
                No active system alerts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
