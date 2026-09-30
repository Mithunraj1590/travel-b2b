import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { AdminTopHeader } from "../../components/layout/AdminTopHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AdminSidebar />
      <div className="flex flex-col min-h-screen">
        <AdminTopHeader />
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
