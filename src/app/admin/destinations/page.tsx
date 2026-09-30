"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  Plus,
  Globe,
  Building,
  Car,
  Star,
  CheckCircle2,
  X,
  Filter,
  LayoutGrid,
  List,
  Compass,
  Edit,
  Trash2,
  Eye,
  Plane,
  TrendingUp,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  imageUrl: string;
  hotelsCount: number;
  transportRoutesCount: number;
  toursCount: number;
  airportCode: string;
  currency: string;
  status: "Active" | "Draft";
  isFeatured: boolean;
}

const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: "DEST-101",
    name: "Pattaya",
    country: "Thailand",
    region: "Southeast Asia",
    tagline: "Vibrant coastal getaway & luxury resorts",
    description: "Famous for beautiful beaches, water sports, vibrant walking street, and world-class island hopping tours.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    hotelsCount: 142,
    transportRoutesCount: 28,
    toursCount: 45,
    airportCode: "UTP / BKK",
    currency: "THB (฿)",
    status: "Active",
    isFeatured: true,
  },
  {
    id: "DEST-102",
    name: "Phuket",
    country: "Thailand",
    region: "Southeast Asia",
    tagline: "Pearl of the Andaman ocean & tropical islands",
    description: "Thailand's largest island known for pristine white sand beaches, Phi Phi island day trips, and luxury beach clubs.",
    imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
    hotelsCount: 185,
    transportRoutesCount: 35,
    toursCount: 62,
    airportCode: "HKT",
    currency: "THB (฿)",
    status: "Active",
    isFeatured: true,
  },
  {
    id: "DEST-103",
    name: "Bangkok",
    country: "Thailand",
    region: "Southeast Asia",
    tagline: "Grand temples, street food & bustling city life",
    description: "The capital of Thailand offering rich cultural heritage, floating markets, rooftop bars, and endless shopping.",
    imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    hotelsCount: 210,
    transportRoutesCount: 40,
    toursCount: 50,
    airportCode: "BKK / DMK",
    currency: "THB (฿)",
    status: "Active",
    isFeatured: true,
  },
  {
    id: "DEST-104",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    tagline: "Island of the Gods, lush terraces & spiritual retreats",
    description: "Tropical paradise famed for iconic rice paddies, volcanic mountains, sacred temples, and serene surf beaches.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    hotelsCount: 165,
    transportRoutesCount: 22,
    toursCount: 38,
    airportCode: "DPS",
    currency: "IDR (Rp)",
    status: "Active",
    isFeatured: true,
  },
  {
    id: "DEST-105",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    tagline: "Futuristic skyscrapers, desert safaris & luxury shopping",
    description: "Global metropolis known for ultra-modern architecture, luxury shopping, desert dunes, and lively nightlife.",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    hotelsCount: 120,
    transportRoutesCount: 30,
    toursCount: 40,
    airportCode: "DXB",
    currency: "AED (د.إ)",
    status: "Active",
    isFeatured: true,
  },
  {
    id: "DEST-106",
    name: "Singapore",
    country: "Singapore",
    region: "Southeast Asia",
    tagline: "Garden city in a futuristic skyline",
    description: "Global financial hub boasting Gardens by the Bay, iconic Marina Bay Sands, cultural enclaves, and safety.",
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    hotelsCount: 95,
    transportRoutesCount: 18,
    toursCount: 25,
    airportCode: "SIN",
    currency: "SGD ($)",
    status: "Active",
    isFeatured: false,
  },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    country: "Thailand",
    region: "Southeast Asia",
    tagline: "",
    description: "",
    imageUrl: "",
    airportCode: "",
    currency: "THB (฿)",
    status: "Active" as Destination["status"],
    isFeatured: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtering
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.airportCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry = countryFilter === "All" || dest.country === countryFilter;
    const matchesStatus = statusFilter === "All" || dest.status === statusFilter;

    return matchesSearch && matchesCountry && matchesStatus;
  });

  // Calculate stats
  const totalCount = destinations.length;
  const featuredCount = destinations.filter((d) => d.isFeatured).length;
  const totalHotels = destinations.reduce((sum, d) => sum + d.hotelsCount, 0);
  const totalRoutes = destinations.reduce((sum, d) => sum + d.transportRoutesCount, 0);

  // Handlers
  const handleToggleFeatured = (id: string) => {
    setDestinations(
      destinations.map((d) =>
        d.id === id ? { ...d, isFeatured: !d.isFeatured } : d
      )
    );
    showToast("Updated featured status!");
  };

  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.country) return;

    const defaultImages = [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    ];

    if (editingDestination) {
      setDestinations(
        destinations.map((d) =>
          d.id === editingDestination.id
            ? {
                ...d,
                ...formData,
                imageUrl: formData.imageUrl || d.imageUrl,
              }
            : d
        )
      );
      showToast(`Updated destination: ${formData.name}`);
    } else {
      const newDest: Destination = {
        id: `DEST-${Math.floor(100 + Math.random() * 900)}`,
        name: formData.name,
        country: formData.country,
        region: formData.region,
        tagline: formData.tagline || `Discover the beauty of ${formData.name}`,
        description: formData.description || `Explore top hotels, transport, and tours in ${formData.name}.`,
        imageUrl: formData.imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)],
        hotelsCount: 0,
        transportRoutesCount: 0,
        toursCount: 0,
        airportCode: formData.airportCode.toUpperCase() || "INTL",
        currency: formData.currency,
        status: formData.status,
        isFeatured: formData.isFeatured,
      };
      setDestinations([newDest, ...destinations]);
      showToast(`Added new destination: ${newDest.name}`);
    }

    setIsAddModalOpen(false);
    setEditingDestination(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      country: "Thailand",
      region: "Southeast Asia",
      tagline: "",
      description: "",
      imageUrl: "",
      airportCode: "",
      currency: "THB (฿)",
      status: "Active",
      isFeatured: false,
    });
  };

  const handleEditClick = (dest: Destination) => {
    setEditingDestination(dest);
    setFormData({
      name: dest.name,
      country: dest.country,
      region: dest.region,
      tagline: dest.tagline,
      description: dest.description,
      imageUrl: dest.imageUrl,
      airportCode: dest.airportCode,
      currency: dest.currency,
      status: dest.status,
      isFeatured: dest.isFeatured,
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      setDestinations(destinations.filter((d) => d.id !== id));
      showToast(`Destination ${name} removed.`);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-white shadow-2xl transition-all">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-fg tracking-tight">
            Destinations Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage travel hubs, assign hotels & transport routes, and highlight top destinations.
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setEditingDestination(null);
            setIsAddModalOpen(true);
          }}
          variant="primary"
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add New Destination
        </Button>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-medium text-slate-500">
                Active Destinations
              </span>
              <div className="text-2xl font-bold text-dashboard-fg mt-1">
                {totalCount}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Globe className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Spanning across 4 global regions
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-medium text-slate-500">
                Featured Locations
              </span>
              <div className="text-2xl font-bold text-dashboard-fg mt-1">
                {featuredCount}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
              <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
            </div>
          </div>
          <div className="text-xs text-amber-600 font-medium mt-2">
            Highlighted on agent portals
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-medium text-slate-500">
                Partner Hotels Linked
              </span>
              <div className="text-2xl font-bold text-dashboard-fg mt-1">
                {totalHotels}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Building className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Across all active destinations
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-medium text-slate-500">
                Transport Fleets Active
              </span>
              <div className="text-2xl font-bold text-dashboard-fg mt-1">
                {totalRoutes}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <Car className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-2">
            <TrendingUp className="h-3.5 w-3.5" /> Full coverage for transfers
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search destination, country, airport..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm outline-none focus:border-indigo-500 text-slate-700"
            >
              <option value="All">All Countries</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
              <option value="United Arab Emirates">UAE</option>
              <option value="Singapore">Singapore</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm outline-none focus:border-indigo-500 text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashboard-border bg-white p-12 text-center text-slate-500">
              <Compass className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-semibold text-slate-700">
                No destinations matched your criteria
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try modifying your search filter or add a new destination.
              </p>
            </div>
          ) : (
            filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group rounded-2xl border border-dashboard-border bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image & Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-900/70 text-white backdrop-blur-md flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-indigo-400" /> {dest.country}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        onClick={() => handleToggleFeatured(dest.id)}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                          dest.isFeatured
                            ? "bg-amber-400 text-slate-900 shadow-md"
                            : "bg-slate-900/40 text-white hover:bg-slate-900/80"
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-xl font-bold leading-tight drop-shadow-md">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-slate-200 font-medium flex items-center gap-2 mt-0.5">
                        <span><Plane className="inline h-3 w-3" /> {dest.airportCode}</span>
                        <span>•</span>
                        <span>{dest.currency}</span>
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col gap-4">
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                      {dest.tagline}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div>
                        <span className="block text-xs text-slate-400">Hotels</span>
                        <span className="text-sm font-bold text-slate-800">{dest.hotelsCount}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-slate-400">Fleet</span>
                        <span className="text-sm font-bold text-slate-800">{dest.transportRoutesCount}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-slate-400">Tours</span>
                        <span className="text-sm font-bold text-slate-800">{dest.toursCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                      dest.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {dest.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(dest)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                      title="Edit Destination"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(dest.id, dest.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100/70 text-xs uppercase text-slate-500 font-semibold border-b border-dashboard-border">
              <tr>
                <th className="px-6 py-3.5">Destination</th>
                <th className="px-6 py-3.5">Country / Airport</th>
                <th className="px-6 py-3.5">Linked Resources</th>
                <th className="px-6 py-3.5">Featured</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDestinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="h-10 w-14 object-cover rounded-lg border border-slate-200"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">{dest.name}</span>
                        <span className="text-xs text-slate-400">{dest.tagline}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-800">{dest.country}</span>
                      <span className="text-xs text-slate-500 font-mono">
                        {dest.airportCode} • {dest.currency}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-600 font-medium">
                      {dest.hotelsCount} Hotels • {dest.transportRoutesCount} Fleet
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleFeatured(dest.id)}
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        dest.isFeatured
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-50 text-slate-400 border-slate-200"
                      }`}
                    >
                      <Star className={`h-3.5 w-3.5 ${dest.isFeatured ? "fill-amber-400 text-amber-500" : ""}`} />
                      {dest.isFeatured ? "Featured" : "Standard"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                        dest.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {dest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(dest)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(dest.id, dest.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe className="h-5 w-5 text-indigo-600" />
                {editingDestination ? `Edit Destination: ${editingDestination.name}` : "Add New Travel Destination"}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDestination} className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Pattaya"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Thailand"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Tropical paradise & luxury island tours"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a brief summary for B2B agents..."
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Airport Code
                  </label>
                  <input
                    type="text"
                    value={formData.airportCode}
                    onChange={(e) => setFormData({ ...formData, airportCode: e.target.value })}
                    placeholder="e.g. BKK"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Local Currency
                  </label>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    placeholder="e.g. THB (฿)"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-400" /> Featured Destination
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase text-slate-500">Status:</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Destination["status"] })}
                    className="rounded-lg border border-slate-200 py-1 px-2 text-xs outline-none focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
                >
                  {editingDestination ? "Update Destination" : "Save Destination"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
