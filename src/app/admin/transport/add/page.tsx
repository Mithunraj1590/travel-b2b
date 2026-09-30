"use client";

import Link from "next/link";
import { ArrowLeft, Save, MapPin } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export default function AddTransportPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/transport" className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">Add New Transfer Route</h1>
            <p className="text-slate-500 mt-1">Enter the route details and vehicle pricing.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/transport">
            <Button variant="outline" className="bg-white">Cancel</Button>
          </Link>
          <Button variant="primary" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Save className="h-4 w-4" />
            Save Transfer
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-dashboard-border overflow-hidden">
        <div className="p-6 border-b border-dashboard-border flex items-center gap-3 bg-slate-50">
          <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Route Details</h2>
            <p className="text-sm text-slate-500">Define the pickup and dropoff locations.</p>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">City</label>
            <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
              <option value="">Select a city...</option>
              <option value="bangkok">Bangkok</option>
              <option value="pattaya">Pattaya</option>
              <option value="phuket">Phuket</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Provider / Notes (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g., K. SUWAT, Thai smile"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Route Description</label>
            <input 
              type="text" 
              placeholder="e.g., BKK APT TO PTY HTL (incl Airp rep)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-dashboard-border overflow-hidden">
        <div className="p-6 border-b border-dashboard-border bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">Vehicle Pricing (THB)</h2>
          <p className="text-sm text-slate-500 mt-1">Leave a field empty if the vehicle is not available for this route.</p>
        </div>
        
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">CAR (2pax)</label>
            <input 
              type="number" 
              placeholder="e.g., 1200"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">INNOVA (4pax)</label>
            <input 
              type="number" 
              placeholder="e.g., 1400"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">VAN (9pax)</label>
            <input 
              type="number" 
              placeholder="e.g., 1600"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">HYUNDAI H1 (6pax)</label>
            <input 
              type="number" 
              placeholder="e.g., 2000"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
