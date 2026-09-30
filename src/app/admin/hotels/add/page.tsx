"use client";

import Link from "next/link";
import { ArrowLeft, Save, Building } from "lucide-react";
import { Button } from "../../../../components/ui/Button";

export default function AddHotelPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/hotels" className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">Add New Hotel Room</h1>
            <p className="text-slate-500 mt-1">Enter the hotel and room pricing details for agents to use.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/hotels">
            <Button variant="outline" className="bg-white">Cancel</Button>
          </Link>
          <Button variant="primary" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Save className="h-4 w-4" />
            Save Hotel Room
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-dashboard-border overflow-hidden">
        <div className="p-6 border-b border-dashboard-border flex items-center gap-3 bg-slate-50">
          <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Hotel Information</h2>
            <p className="text-sm text-slate-500">Basic details about the property.</p>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Location</label>
            <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
              <option value="">Select a location...</option>
              <option value="pattaya">Pattaya</option>
              <option value="phuket">Phuket</option>
              <option value="bangkok">Bangkok</option>
              <option value="samui">Koh Samui</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Hotel Name</label>
            <input 
              type="text" 
              placeholder="e.g., Sun City Hotel"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Grading</label>
            <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
              <option value="3">3 Star</option>
              <option value="4">4 Star</option>
              <option value="5">5 Star</option>
              <option value="unrated">Unrated / Boutique</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Validity Period</label>
            <input 
              type="text" 
              placeholder="e.g., 01 Nov 25 - 30 Apr 26"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-dashboard-border overflow-hidden">
        <div className="p-6 border-b border-dashboard-border bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">Room & Pricing Details</h2>
          <p className="text-sm text-slate-500 mt-1">Specify rates for a specific room type.</p>
        </div>
        
        <div className="p-8 space-y-8">
          {/* Room Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Room Type</label>
              <input 
                type="text" 
                placeholder="e.g., Deluxe Room"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Size (Sqm)</label>
              <input 
                type="text" 
                placeholder="e.g., 28 Sqm"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Room Rate SGL / DBL (THB)</label>
              <input 
                type="number" 
                placeholder="e.g., 1200"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Extra Beds */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Extra Bed Rate (THB)</label>
              <input 
                type="number" 
                placeholder="e.g., 600"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Extra Bed for Child (THB)</label>
              <input 
                type="number" 
                placeholder="e.g., 400"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Child ABF Rate (THB)</label>
              <input 
                type="number" 
                placeholder="e.g., 150"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-dashboard-border overflow-hidden">
        <div className="p-6 border-b border-dashboard-border bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">Policies & Extras</h2>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Indian Restaurant Nearby</label>
            <input 
              type="text" 
              placeholder="e.g., Dhan Kavi Restaurant (or N/A)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Joiner Policy</label>
            <input 
              type="text" 
              placeholder="e.g., Free, FOC"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Surcharges (New Year/Songkran)</label>
            <input 
              type="text" 
              placeholder="e.g., 300 thb Surcharge (24 Dec 25 - 03 Jan 26)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Remarks / Additional Notes</label>
            <textarea 
              rows={3}
              placeholder="e.g., Book by 31 Mar 26, Public holiday extra 350..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
