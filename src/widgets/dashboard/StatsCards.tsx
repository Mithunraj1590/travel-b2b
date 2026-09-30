import { FileText, Clock, Send, BarChart2 } from "lucide-react";

const stats = [
  { name: "Total Quotations", value: "248", icon: FileText, change: "+12%", changeType: "positive" },
  { name: "Draft Quotations", value: "14", icon: Clock, change: "-2", changeType: "neutral" },
  { name: "Sent Quotations", value: "86", icon: Send, change: "+18%", changeType: "positive" },
  { name: "Monthly Volume", value: "$42,500", icon: BarChart2, change: "+24%", changeType: "positive" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="rounded-xl border border-dashboard-border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold text-dashboard-fg">{stat.value}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-dashboard-primary">
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span
              className={`font-medium ${
                stat.changeType === "positive" ? "text-emerald-600" : "text-slate-500"
              }`}
            >
              {stat.change}
            </span>
            <span className="ml-2 text-slate-500">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
