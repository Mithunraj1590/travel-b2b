import { MoreHorizontal, FileDown, Eye } from "lucide-react";
import { Button } from "../../components/ui/Button";

const recentQuotations = [
  { id: "QT-2024-081", customer: "Michael Chen", destination: "Phuket, Thailand", date: "Oct 15 - Oct 22, 2024", amount: "$3,450", status: "Sent" },
  { id: "QT-2024-080", customer: "Sarah Williams", destination: "Koh Samui, Thailand", date: "Nov 02 - Nov 09, 2024", amount: "$5,200", status: "Draft" },
  { id: "QT-2024-079", customer: "David Miller", destination: "Chiang Mai, Thailand", date: "Dec 10 - Dec 18, 2024", amount: "$2,850", status: "Accepted" },
  { id: "QT-2024-078", customer: "Emma Thompson", destination: "Bangkok & Phuket", date: "Jan 05 - Jan 15, 2025", amount: "$6,100", status: "Sent" },
  { id: "QT-2024-077", customer: "James Wilson", destination: "Krabi, Thailand", date: "Feb 12 - Feb 19, 2025", amount: "$4,300", status: "Draft" },
];

export function RecentQuotationsTable() {
  return (
    <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
      <div className="border-b border-dashboard-border px-6 py-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-dashboard-fg">Recent Quotations</h3>
        <Button variant="outline" size="sm" className="h-9">View All</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-dashboard-border">
            <tr>
              <th className="px-6 py-4 font-semibold">Quotation ID</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Destination</th>
              <th className="px-6 py-4 font-semibold">Travel Date</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashboard-border">
            {recentQuotations.map((quotation) => (
              <tr key={quotation.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-dashboard-primary">{quotation.id}</td>
                <td className="px-6 py-4 font-medium text-dashboard-fg">{quotation.customer}</td>
                <td className="px-6 py-4">{quotation.destination}</td>
                <td className="px-6 py-4 text-slate-500">{quotation.date}</td>
                <td className="px-6 py-4 font-medium text-dashboard-fg">{quotation.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      quotation.status === "Sent"
                        ? "bg-blue-50 text-blue-700"
                        : quotation.status === "Accepted"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {quotation.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-slate-400">
                    <button className="hover:text-dashboard-primary transition-colors p-1"><Eye className="w-4 h-4" /></button>
                    <button className="hover:text-dashboard-primary transition-colors p-1"><FileDown className="w-4 h-4" /></button>
                    <button className="hover:text-dashboard-primary transition-colors p-1"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
