export default function BrandingPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div>
        <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">Agency Branding</h1>
        <p className="text-slate-500 mt-1">Customize how your quotations appear to customers.</p>
      </div>
      <div className="flex-1 rounded-xl border border-dashboard-border bg-white shadow-sm flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-dashboard-fg mb-2">Branding Module</h2>
          <p className="text-slate-500 max-w-md mx-auto">Upload your logo, set colors, and preview live PDFs. This module is currently under development.</p>
        </div>
      </div>
    </div>
  );
}
