"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Filter,
  X,
  Award,
  TrendingUp,
  Eye,
  UserCheck,
  UserX,
  MoreVertical,
  Building2,
  DollarSign,
  FileCheck,
  Check,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface Agent {
  id: string;
  agencyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  tier: "Platinum" | "Gold" | "Silver" | "Bronze";
  status: "Active" | "Pending Verification" | "Suspended";
  bookingsCount: number;
  revenue: number;
  joinedDate: string;
  kycVerified: boolean;
  creditLimit: number;
}

const INITIAL_AGENTS: Agent[] = [
  {
    id: "AGT-1001",
    agencyName: "Royal Horizon Travel & Tours",
    contactName: "Michael Chang",
    email: "m.chang@royalhorizontravel.com",
    phone: "+65 6734 8920",
    country: "Singapore",
    tier: "Platinum",
    status: "Active",
    bookingsCount: 142,
    revenue: 128500,
    joinedDate: "2025-01-15",
    kycVerified: true,
    creditLimit: 50000,
  },
  {
    id: "AGT-1002",
    agencyName: "Siam Voyage Travel Co.",
    contactName: "Ananya Somchai",
    email: "ananya@siamvoyage.co.th",
    phone: "+66 2 458 9123",
    country: "Thailand",
    tier: "Gold",
    status: "Active",
    bookingsCount: 98,
    revenue: 84200,
    joinedDate: "2025-02-01",
    kycVerified: true,
    creditLimit: 25000,
  },
  {
    id: "AGT-1003",
    agencyName: "Pacific Oasis Holidays",
    contactName: "David Miller",
    email: "david@pacificoasis.com.au",
    phone: "+61 2 9876 5432",
    country: "Australia",
    tier: "Silver",
    status: "Pending Verification",
    bookingsCount: 12,
    revenue: 9500,
    joinedDate: "2025-03-10",
    kycVerified: false,
    creditLimit: 10000,
  },
  {
    id: "AGT-1004",
    agencyName: "Emirates Gateway Journeys",
    contactName: "Tariq Al-Mansoor",
    email: "tariq@egjourneys.ae",
    phone: "+971 4 321 8899",
    country: "UAE",
    tier: "Platinum",
    status: "Active",
    bookingsCount: 210,
    revenue: 195000,
    joinedDate: "2024-11-20",
    kycVerified: true,
    creditLimit: 75000,
  },
  {
    id: "AGT-1005",
    agencyName: "Indo Explorer Vacations",
    contactName: "Putri Rahayu",
    email: "putri@indoexplorer.co.id",
    phone: "+62 21 5544 3322",
    country: "Indonesia",
    tier: "Gold",
    status: "Pending Verification",
    bookingsCount: 5,
    revenue: 4100,
    joinedDate: "2025-03-22",
    kycVerified: false,
    creditLimit: 15000,
  },
  {
    id: "AGT-1006",
    agencyName: "Global Express Express Ltd",
    contactName: "James Wilson",
    email: "j.wilson@globalexpress.co.uk",
    phone: "+44 20 7946 0912",
    country: "United Kingdom",
    tier: "Silver",
    status: "Suspended",
    bookingsCount: 34,
    revenue: 28400,
    joinedDate: "2024-09-05",
    kycVerified: true,
    creditLimit: 0,
  },
];

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [tierFilter, setTierFilter] = useState<string>("All");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form State for new agent
  const [newAgent, setNewAgent] = useState({
    agencyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "Singapore",
    tier: "Silver" as Agent["tier"],
    creditLimit: 10000,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter Logic
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || agent.status === statusFilter;
    const matchesTier = tierFilter === "All" || agent.tier === tierFilter;

    return matchesSearch && matchesStatus && matchesTier;
  });

  // Calculate Metrics
  const totalAgentsCount = agents.length;
  const activeAgentsCount = agents.filter((a) => a.status === "Active").length;
  const pendingCount = agents.filter(
    (a) => a.status === "Pending Verification"
  ).length;
  const totalRevenue = agents.reduce((acc, a) => acc + a.revenue, 0);

  // Handlers
  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgent.agencyName || !newAgent.email || !newAgent.contactName) return;

    const created: Agent = {
      id: `AGT-${Math.floor(1000 + Math.random() * 9000)}`,
      agencyName: newAgent.agencyName,
      contactName: newAgent.contactName,
      email: newAgent.email,
      phone: newAgent.phone || "+65 6000 0000",
      country: newAgent.country,
      tier: newAgent.tier,
      status: "Pending Verification",
      bookingsCount: 0,
      revenue: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      kycVerified: false,
      creditLimit: Number(newAgent.creditLimit),
    };

    setAgents([created, ...agents]);
    setIsInviteModalOpen(false);
    setNewAgent({
      agencyName: "",
      contactName: "",
      email: "",
      phone: "",
      country: "Singapore",
      tier: "Silver",
      creditLimit: 10000,
    });
    showToast(`Invitation sent & agent profile created for ${created.agencyName}`);
  };

  const handleVerifyAgent = (id: string) => {
    setAgents(
      agents.map((a) =>
        a.id === id ? { ...a, status: "Active", kycVerified: true } : a
      )
    );
    if (selectedAgent && selectedAgent.id === id) {
      setSelectedAgent({
        ...selectedAgent,
        status: "Active",
        kycVerified: true,
      });
    }
    showToast("Agent KYC successfully verified and status updated to Active!");
  };

  const handleToggleStatus = (id: string, newStatus: Agent["status"]) => {
    setAgents(
      agents.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    setActiveMenuId(null);
    showToast(`Agent status updated to ${newStatus}`);
  };

  const getTierBadge = (tier: Agent["tier"]) => {
    switch (tier) {
      case "Platinum":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Gold":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Silver":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-amber-800/10 text-amber-900 border-amber-800/20";
    }
  };

  const getStatusBadge = (status: Agent["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 icon-emerald";
      case "Pending Verification":
        return "bg-amber-50 text-amber-700 border-amber-200 icon-amber";
      case "Suspended":
        return "bg-rose-50 text-rose-700 border-rose-200 icon-rose";
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
            Agent Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage, verify, and track performance of your B2B travel agency partners.
          </p>
        </div>
        <Button
          onClick={() => setIsInviteModalOpen(true)}
          variant="primary"
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Invite New Agent
        </Button>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-medium text-slate-500">
                Total Partners
              </span>
              <div className="text-2xl font-bold text-dashboard-fg mt-1">
                {totalAgentsCount}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
            <span className="text-emerald-600 font-medium flex items-center gap-0.5">
              <TrendingUp className="h-3.5 w-3.5" /> +12%
            </span>{" "}
            vs last month
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-medium text-slate-500">
                Active Agents
              </span>
              <div className="text-2xl font-bold text-dashboard-fg mt-1">
                {activeAgentsCount}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {Math.round((activeAgentsCount / totalAgentsCount) * 100)}% verified & operating
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-medium text-slate-500">
                Pending Verification
              </span>
              <div className="text-2xl font-bold text-dashboard-fg mt-1">
                {pendingCount}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-amber-600 font-medium mt-2">
            Requires document review
          </div>
        </div>

        <div className="rounded-xl border border-dashboard-border bg-white shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-medium text-slate-500">
                Total Platform Revenue
              </span>
              <div className="text-2xl font-bold text-dashboard-fg mt-1">
                ${totalRevenue.toLocaleString()}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-2">
            <TrendingUp className="h-3.5 w-3.5" /> Across all partner bookings
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-xl border border-dashboard-border bg-white shadow-sm overflow-hidden">
        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-dashboard-border flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search agency, contact, email, ID..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </div>

            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm outline-none focus:border-indigo-500 text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Suspended">Suspended</option>
            </select>

            {/* Tier Select */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm outline-none focus:border-indigo-500 text-slate-700"
            >
              <option value="All">All Tiers</option>
              <option value="Platinum">Platinum Tier</option>
              <option value="Gold">Gold Tier</option>
              <option value="Silver">Silver Tier</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100/70 text-xs uppercase text-slate-500 font-semibold border-b border-dashboard-border">
              <tr>
                <th className="px-6 py-3.5">Agency / ID</th>
                <th className="px-6 py-3.5">Contact Person</th>
                <th className="px-6 py-3.5">Tier & KYC</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Bookings / Revenue</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAgents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    <Users className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-base font-medium text-slate-700">
                      No travel agents found
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try resetting your search terms or filter criteria.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAgents.map((agent) => (
                  <tr
                    key={agent.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Agency Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-sm">
                          {agent.agencyName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 leading-tight">
                            {agent.agencyName}
                          </span>
                          <span className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                            <span className="font-mono text-slate-500">
                              {agent.id}
                            </span>
                            • <MapPin className="h-3 w-3" /> {agent.country}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Contact Person */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">
                          {agent.contactName}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {agent.email}
                        </span>
                      </div>
                    </td>

                    {/* Tier & KYC */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getTierBadge(
                            agent.tier
                          )}`}
                        >
                          {agent.tier}
                        </span>
                        {agent.kycVerified ? (
                          <span
                            className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium"
                            title="KYC Verified"
                          >
                            <ShieldCheck className="h-4 w-4" /> Verified
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium"
                            title="KYC Pending"
                          >
                            <Clock className="h-3.5 w-3.5" /> Pending KYC
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadge(
                          agent.status
                        )}`}
                      >
                        {agent.status === "Active" && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        )}
                        {agent.status === "Pending Verification" && (
                          <Clock className="h-3.5 w-3.5 text-amber-500" />
                        )}
                        {agent.status === "Suspended" && (
                          <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
                        )}
                        {agent.status}
                      </span>
                    </td>

                    {/* Performance */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">
                          ${agent.revenue.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5">
                          {agent.bookingsCount} completed bookings
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right relative">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedAgent(agent);
                            setIsDetailModalOpen(true);
                          }}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Profile & Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {agent.status === "Pending Verification" && (
                          <button
                            onClick={() => handleVerifyAgent(agent.id)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Verify Agent"
                          >
                            <FileCheck className="h-4 w-4" />
                          </button>
                        )}

                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveMenuId(
                                activeMenuId === agent.id ? null : agent.id
                              )
                            }
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {activeMenuId === agent.id && (
                            <div className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-slate-200 bg-white shadow-xl py-1 text-xs text-left">
                              <button
                                onClick={() => handleToggleStatus(agent.id, "Active")}
                                className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                              >
                                <UserCheck className="h-3.5 w-3.5 text-emerald-500" /> Mark Active
                              </button>
                              <button
                                onClick={() =>
                                  handleToggleStatus(agent.id, "Suspended")
                                }
                                className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2 text-rose-600"
                              >
                                <UserX className="h-3.5 w-3.5" /> Suspend Partner
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Agent Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-600" /> Invite New Travel Agency
              </h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Agency Name *
                </label>
                <input
                  type="text"
                  required
                  value={newAgent.agencyName}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, agencyName: e.target.value })
                  }
                  placeholder="e.g. Paramount Escapes Ltd"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAgent.contactName}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, contactName: e.target.value })
                    }
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Country *
                  </label>
                  <select
                    value={newAgent.country}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, country: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Singapore">Singapore</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Australia">Australia</option>
                    <option value="UAE">UAE</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="India">India</option>
                    <option value="Malaysia">Malaysia</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newAgent.email}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, email: e.target.value })
                    }
                    placeholder="sarah@paramountescapes.com"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={newAgent.phone}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, phone: e.target.value })
                    }
                    placeholder="+65 9123 4567"
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Partnership Tier
                  </label>
                  <select
                    value={newAgent.tier}
                    onChange={(e) =>
                      setNewAgent({
                        ...newAgent,
                        tier: e.target.value as Agent["tier"],
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Silver">Silver Tier</option>
                    <option value="Gold">Gold Tier</option>
                    <option value="Platinum">Platinum Tier</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Initial Credit Limit ($)
                  </label>
                  <input
                    type="number"
                    value={newAgent.creditLimit}
                    onChange={(e) =>
                      setNewAgent({
                        ...newAgent,
                        creditLimit: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
                >
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Agent Details & KYC Modal */}
      {isDetailModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {selectedAgent.agencyName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedAgent.agencyName}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedAgent.id} • Joined {selectedAgent.joinedDate}</p>
                </div>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 font-medium uppercase">Current Status</span>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{selectedAgent.status}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium uppercase">Partnership Tier</span>
                  <p className="text-sm font-semibold text-purple-700 mt-1">{selectedAgent.tier}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium uppercase">Credit Limit</span>
                  <p className="text-sm font-semibold text-slate-800 mt-1">${selectedAgent.creditLimit.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">
                  Contact Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>Contact: <strong>{selectedAgent.contactName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>Email: <strong>{selectedAgent.email}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>Phone: <strong>{selectedAgent.phone}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>Country: <strong>{selectedAgent.country}</strong></span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">
                  Verification & KYC Documents
                </h4>
                <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileCheck className="h-5 w-5 text-indigo-500" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Business Registration Certificate</p>
                        <p className="text-[11px] text-slate-400">PDF Document • Uploaded on signup</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Valid
                    </span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-indigo-500" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Travel License Verification</p>
                        <p className="text-[11px] text-slate-400">Government IATA / Tourism License</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Verified
                    </span>
                  </div>
                </div>
              </div>

              {selectedAgent.status === "Pending Verification" && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-xs font-medium text-amber-900">
                      This agent is currently awaiting KYC verification approval.
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      handleVerifyAgent(selectedAgent.id);
                      setIsDetailModalOpen(false);
                    }}
                    variant="primary"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2"
                  >
                    Approve & Verify
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
