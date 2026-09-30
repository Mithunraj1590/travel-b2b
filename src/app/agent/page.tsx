import { StatsCards } from "../../widgets/dashboard/StatsCards";
import { RecentQuotationsTable } from "../../widgets/dashboard/RecentQuotationsTable";

export default function AgentDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, Sarah. Here's what's happening today.</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RecentQuotationsTable />
        </div>
        <div className="xl:col-span-1 flex flex-col gap-8">
          


          {/* Upcoming Trips Widget */}
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6">
            <h3 className="text-lg font-semibold text-dashboard-fg mb-5">Upcoming Trips</h3>
            <div className="flex flex-col gap-5">
              {[
                { id: "QT-2024-081", title: "Phuket Luxury Escape", date: "Oct 15 - Oct 22, 2024", days: "4 days" },
                { id: "QT-2024-075", title: "Bangkok City Tour", date: "Oct 20 - Oct 25, 2024", days: "9 days" },
              ].map((trip, i) => (
                <div key={i} className="flex flex-col gap-1 pb-5 border-b border-dashboard-border last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-dashboard-primary">{trip.id}</p>
                    <p className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">In {trip.days}</p>
                  </div>
                  <p className="text-sm text-dashboard-fg font-semibold mt-1">{trip.title}</p>
                  <p className="text-xs text-slate-500">{trip.date}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
