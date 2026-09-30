import Link from "next/link";
import { LayoutDashboard, FileText, Palette, User, LifeBuoy } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/agent", icon: LayoutDashboard },
  { name: "Quotations", href: "/agent/quotations", icon: FileText },
  { name: "Branding", href: "/agent/branding", icon: Palette },
  { name: "Profile", href: "/agent/profile", icon: User },
];

export function AgentSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-dashboard-border bg-dashboard-card">
      <div className="flex h-16 items-center px-6 border-b border-dashboard-border">
        <span className="text-xl font-bold text-dashboard-primary tracking-tight">Leisure Hoppers</span>
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-64px)] py-4">
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-dashboard-primary transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="px-3">
          <Link
            href="/agent/support"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-dashboard-primary transition-colors"
          >
            <LifeBuoy className="h-5 w-5" />
            Support
          </Link>
        </div>
      </div>
    </aside>
  );
}
