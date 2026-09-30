import { ArrowLeft, Save, FileText, Check, Plus, ChevronDown, Calendar, Users, MapPin, Building, Car, Navigation } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/Button";

export default function CreateQuotationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/agent/quotations" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">Create Quotation</h1>
            <p className="text-slate-500 text-sm mt-0.5">Build a new travel itinerary and quotation.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white border-slate-200">
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button variant="primary" className="gap-2 bg-[#2563eb] hover:bg-[#1d4ed8]">
            <Check className="w-4 h-4" />
            Generate Quotation
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-8">
        {/* Main Form Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* SECTION 1: Customer Details */}
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-dashboard-border px-6 py-4 flex items-center gap-2 bg-slate-50/50">
              <Users className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-dashboard-fg">1. Customer Details</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Customer Name</label>
                <input type="text" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" placeholder="+1 234 567 890" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Nationality</label>
                <input type="text" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" placeholder="e.g. American" />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Internal Notes (Optional)</label>
                <textarea className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary min-h-[80px]" placeholder="VIP customer, prefers luxury resorts..."></textarea>
              </div>
            </div>
          </div>

          {/* SECTION 2: Trip Details */}
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-dashboard-border px-6 py-4 flex items-center gap-2 bg-slate-50/50">
              <MapPin className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold text-dashboard-fg">2. Trip Details</h2>
            </div>
            <div className="p-6 grid grid-cols-3 gap-6">
              <div className="col-span-3 flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Destination</label>
                <input type="text" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" placeholder="e.g. Phuket, Thailand" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Travel Dates</label>
                <input type="text" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" placeholder="Select dates..." />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm font-medium text-slate-700">Adults</label>
                  <input type="number" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" defaultValue={2} min={1} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm font-medium text-slate-700">Children</label>
                  <input type="number" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" defaultValue={0} min={0} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Currency</label>
                <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary bg-white">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>THB (฿)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: Hotels */}
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-dashboard-border px-6 py-4 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-dashboard-fg">3. Hotels</h2>
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200">
                <Plus className="w-3 h-3" /> Add Hotel
              </Button>
            </div>
            <div className="p-6">
              <div className="rounded-lg border border-slate-200 p-4 bg-slate-50 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2 col-span-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Destination</label>
                    <input type="text" className="rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-dashboard-primary" defaultValue="Phuket" />
                  </div>
                  <div className="flex flex-col gap-2 col-span-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Hotel Name</label>
                    <input type="text" className="rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-dashboard-primary" placeholder="Search hotels..." />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Room Type</label>
                    <input type="text" className="rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-dashboard-primary" placeholder="e.g. Deluxe Ocean View" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Meal Plan</label>
                    <select className="rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-dashboard-primary bg-white">
                      <option>Room Only</option>
                      <option>Bed & Breakfast</option>
                      <option>Half Board</option>
                      <option>Full Board</option>
                      <option>All Inclusive</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Nights</label>
                    <input type="number" className="rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-dashboard-primary" defaultValue={3} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Rooms</label>
                    <input type="number" className="rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-dashboard-primary" defaultValue={1} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Transfers */}
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-dashboard-border px-6 py-4 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-dashboard-fg">4. Transfers</h2>
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200">
                <Plus className="w-3 h-3" /> Add Transfer
              </Button>
            </div>
            <div className="p-6 text-center py-10">
               <p className="text-sm text-slate-500">No transfers added yet.</p>
            </div>
          </div>

          {/* SECTION 5: Tours & Activities */}
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-dashboard-border px-6 py-4 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-dashboard-fg">5. Tours & Activities</h2>
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200">
                <Plus className="w-3 h-3" /> Add Activity
              </Button>
            </div>
            <div className="p-6 text-center py-10">
               <p className="text-sm text-slate-500">No activities added yet.</p>
            </div>
          </div>
          
          {/* SECTION 6: Itinerary Builder */}
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-dashboard-border px-6 py-4 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-dashboard-fg">6. Itinerary Builder</h2>
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200">
                <Plus className="w-3 h-3" /> Add Day
              </Button>
            </div>
            <div className="p-6 flex flex-col gap-6">
               <div className="relative pl-8 border-l-2 border-slate-200 ml-4 pb-2">
                  <div className="absolute w-4 h-4 bg-dashboard-primary rounded-full -left-[9px] top-0 border-4 border-white shadow-sm"></div>
                  <div className="flex flex-col gap-3 -mt-1.5">
                    <input type="text" className="font-bold text-dashboard-fg bg-transparent border-b border-transparent hover:border-slate-300 focus:border-dashboard-primary outline-none transition-colors" defaultValue="Day 1: Arrival in Phuket" />
                    <textarea className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary min-h-[60px]" placeholder="Description of the day's events..."></textarea>
                  </div>
               </div>
               <div className="relative pl-8 border-l-2 border-slate-200 ml-4">
                  <div className="absolute w-4 h-4 bg-slate-300 rounded-full -left-[9px] top-0 border-4 border-white shadow-sm"></div>
                  <div className="flex flex-col gap-3 -mt-1.5">
                    <input type="text" className="font-bold text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-dashboard-primary outline-none transition-colors" placeholder="Day 2 Title" />
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar (Quotation Summary) */}
        <div className="w-[340px] sticky top-[88px] flex flex-col gap-6">
          <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-dashboard-border px-6 py-4 bg-slate-50/50">
              <h3 className="font-semibold text-dashboard-fg">Quotation Summary</h3>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Hotels Cost</span>
                <span className="font-medium text-dashboard-fg">$0.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Transfers Cost</span>
                <span className="font-medium text-dashboard-fg">$0.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Activities Cost</span>
                <span className="font-medium text-dashboard-fg">$0.00</span>
              </div>
              
              <div className="h-px bg-slate-200 my-2"></div>
              
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-dashboard-fg">Subtotal</span>
                <span className="text-dashboard-fg">$0.00</span>
              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-xs font-semibold text-slate-500 uppercase">Markup Type</label>
                <div className="flex rounded-lg bg-slate-100 p-1">
                  <button className="flex-1 py-1.5 text-xs font-semibold rounded-md bg-white text-dashboard-fg shadow-sm">Percentage (%)</button>
                  <button className="flex-1 py-1.5 text-xs font-medium rounded-md text-slate-500 hover:text-dashboard-fg transition-colors">Fixed Amt</button>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-500 uppercase">Markup Value (%)</label>
                <input type="number" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-dashboard-primary focus:ring-1 focus:ring-dashboard-primary" defaultValue={10} min={0} />
              </div>
            </div>

            <div className="bg-slate-50 p-6 border-t border-dashboard-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-bold text-dashboard-fg">Grand Total</span>
                <span className="text-xl font-bold text-dashboard-primary">$0.00</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button variant="primary" className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]">Generate Quotation</Button>
                <Button variant="outline" className="w-full bg-white border-slate-200">Preview PDF</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
