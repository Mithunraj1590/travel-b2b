import Link from "next/link";
import { Plus, Search, Filter, FileDown, Eye, Copy, Pencil } from "lucide-react";
import { Button } from "../../../components/ui/Button";

const allQuotations = [
  { id: "QT-2024-081", customer: "Michael Chen", destination: "Phuket, Thailand", date: "Oct 15 - Oct 22, 2024", amount: "$3,450", status: "Sent", created: "Today" },
  { id: "QT-2024-080", customer: "Sarah Williams", destination: "Koh Samui, Thailand", date: "Nov 02 - Nov 09, 2024", amount: "$5,200", status: "Draft", created: "Yesterday" },
  { id: "QT-2024-079", customer: "David Miller", destination: "Chiang Mai, Thailand", date: "Dec 10 - Dec 18, 2024", amount: "$2,850", status: "Accepted", created: "Oct 01, 2024" },
  { id: "QT-2024-078", customer: "Emma Thompson", destination: "Bangkok & Phuket", date: "Jan 05 - Jan 15, 2025", amount: "$6,100", status: "Sent", created: "Sep 28, 2024" },
  { id: "QT-2024-077", customer: "James Wilson", destination: "Krabi, Thailand", date: "Feb 12 - Feb 19, 2025", amount: "$4,300", status: "Draft", created: "Sep 25, 2024" },
  { id: "QT-2024-076", customer: "Olivia Davis", destination: "Pattaya, Thailand", date: "Mar 01 - Mar 07, 2025", amount: "$2,100", status: "Archived", created: "Sep 15, 2024" },
  { id: "QT-2024-075", customer: "Liam Johnson", destination: "Hua Hin, Thailand", date: "Mar 10 - Mar 20, 2025", amount: "$4,800", status: "Accepted", created: "Sep 10, 2024" },
];

export default function QuotationsPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">Quotations</h1>
          <p className="text-slate-500 mt-1">Manage and track all your customer travel quotations.</p>
        </div>
        <Link href="/agent/quotations/create">
          <Button variant="primary" className="gap-2 bg-[#2563eb] hover:bg-[#1d4ed8]">
            <Plus className="h-4 w-4" />
            Create Quotation
          </Button>
        </Link>
      </div>

      <div className="flex-1 rounded-xl border border-dashboard-border bg-white shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-dashboard-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID or Customer..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary transition-all"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 h-9 border-slate-200">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="flex rounded-lg bg-slate-100 p-1">
                <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white text-dashboard-fg shadow-sm">All</button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-500 hover:text-dashboard-fg transition-colors">Draft</button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-500 hover:text-dashboard-fg transition-colors">Sent</button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-500 hover:text-dashboard-fg transition-colors">Archived</button>
             </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-dashboard-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Quotation ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Destination</th>
                <th className="px-6 py-4 font-semibold">Travel Date</th>
                <th className="px-6 py-4 font-semibold">Created</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashboard-border">
              {allQuotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-dashboard-primary">{quotation.id}</td>
                  <td className="px-6 py-4 font-medium text-dashboard-fg">{quotation.customer}</td>
                  <td className="px-6 py-4">{quotation.destination}</td>
                  <td className="px-6 py-4 text-slate-500">{quotation.date}</td>
                  <td className="px-6 py-4 text-slate-500">{quotation.created}</td>
                  <td className="px-6 py-4 font-medium text-dashboard-fg">{quotation.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        quotation.status === "Sent"
                          ? "bg-blue-50 text-blue-700"
                          : quotation.status === "Accepted"
                          ? "bg-emerald-50 text-emerald-700"
                          : quotation.status === "Archived"
                          ? "bg-slate-100 text-slate-500"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {quotation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="hover:bg-slate-200 rounded-md text-slate-500 p-1.5 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button className="hover:bg-slate-200 rounded-md text-slate-500 p-1.5 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button className="hover:bg-slate-200 rounded-md text-slate-500 p-1.5 transition-colors" title="Duplicate"><Copy className="w-4 h-4" /></button>
                      <button className="hover:bg-slate-200 rounded-md text-slate-500 p-1.5 transition-colors" title="Download PDF"><FileDown className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-dashboard-border flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
           <p>Showing 1 to 7 of 42 quotations</p>
           <div className="flex gap-1">
             <Button variant="outline" size="sm" className="h-8 px-3 border-slate-200" disabled>Previous</Button>
             <Button variant="outline" size="sm" className="h-8 px-3 border-slate-200">Next</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
