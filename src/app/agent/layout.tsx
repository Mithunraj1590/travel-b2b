import { AgentSidebar } from "../../components/layout/AgentSidebar";
import { AgentTopHeader } from "../../components/layout/AgentTopHeader";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AgentSidebar />
      <div className="flex flex-col min-h-screen">
        <AgentTopHeader />
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
