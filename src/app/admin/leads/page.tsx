"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, Mail, Phone, Calendar, Download, RefreshCw, 
  Search, ShieldAlert, CheckCircle, Database, ChevronLeft 
} from "lucide-react";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  domain: string;
  candidates: string;
  deliveryMode: string;
  city: string;
  country: string;
  createdAt: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/enquire");
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
        setFilteredLeads(data);
      } else {
        setError("Failed to retrieve enquiries database.");
      }
    } catch (err) {
      setError("Failed to communicate with api backend.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter and search computation
  useEffect(() => {
    let result = leads;

    if (domainFilter !== "all") {
      result = result.filter((lead) => lead.domain === domainFilter);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.company.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.city.toLowerCase().includes(term) ||
          lead.country.toLowerCase().includes(term)
      );
    }

    setFilteredLeads(result);
  }, [searchTerm, domainFilter, leads]);

  // Export to CSV Function
  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ["ID", "Name", "Email", "Country Code", "Phone", "Company", "Domain", "Candidates Count", "Delivery Mode", "City", "Country", "Submission Time"];
    const rows = leads.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.countryCode,
      lead.phone,
      lead.company,
      lead.domain,
      lead.candidates,
      lead.deliveryMode,
      lead.city,
      lead.country,
      lead.createdAt,
    ]);

    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `accredian_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Statistic calculation
  const totalLeads = leads.length;
  const techLeadsCount = leads.filter((l) => l.domain === "Tech").length;
  const emergingLeadsCount = leads.filter((l) => l.domain === "Emerging").length;
  const virtualDeliveryCount = leads.filter((l) => l.deliveryMode === "Live Virtual").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-brand-primary flex items-center gap-2">
                Leads Dashboard
                <span className="px-1.5 py-0.5 bg-brand-primary/5 text-[10px] font-bold text-brand-primary uppercase rounded tracking-wider border border-brand-primary/10">
                  Admin Panel
                </span>
              </h1>
              <p className="text-xs text-slate-500">Monitor and manage all corporate upskilling enquiries.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors cursor-pointer"
              title="Refresh leads database"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-light text-white text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Error notification banner */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Statistic Cards Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Total Enquiries</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{totalLeads}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Tech Domain</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{techLeadsCount}</h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Emerging Tech</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{emergingLeadsCount}</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Virtual Delivery</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">{virtualDeliveryCount}</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Database Search & Filtering controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Search by candidate name, company, email, city, country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <span className="text-xs font-semibold text-slate-500">Filter Domain:</span>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary-light/20"
            >
              <option value="all">All Domains</option>
              <option value="Tech">Tech</option>
              <option value="Non-Tech">Non-Tech</option>
              <option value="Emerging">Emerging Tech</option>
              <option value="Senior">Senior Leadership</option>
            </select>
          </div>
        </div>

        {/* Lead Table Data Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-primary rounded-full animate-spin"></div>
              <p className="text-sm text-slate-500">Retrieving enquiries database...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-2">
              <Database className="w-12 h-12 text-slate-350" />
              <p className="font-bold text-slate-700">No matching leads found.</p>
              <p className="text-xs text-slate-550">Try altering your domain filters or search query terms.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                    <th className="px-6 py-4">Submission Date</th>
                    <th className="px-6 py-4">Lead Name</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Domain Focus</th>
                    <th className="px-6 py-4">Count</th>
                    <th className="px-6 py-4">Format & Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Submission Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500 flex items-center gap-1.5 mt-1 border-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(lead.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>

                      {/* Name & Contact */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="flex flex-col sm:flex-row sm:gap-3 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {lead.countryCode} {lead.phone}
                          </span>
                        </div>
                      </td>

                      {/* Company */}
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {lead.company}
                      </td>

                      {/* Domain Tag */}
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg border ${
                          lead.domain === "Tech" 
                            ? "bg-blue-50 border-blue-100 text-blue-700"
                            : lead.domain === "Emerging"
                            ? "bg-purple-50 border-purple-100 text-purple-700"
                            : lead.domain === "Senior"
                            ? "bg-amber-50 border-amber-100 text-amber-700"
                            : "bg-emerald-50 border-emerald-100 text-emerald-700"
                        }`}>
                          {lead.domain}
                        </span>
                      </td>

                      {/* Candidates Count */}
                      <td className="px-6 py-4 font-mono font-bold text-slate-600">
                        {lead.candidates}
                      </td>

                      {/* Delivery Mode & Location */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{lead.deliveryMode}</div>
                        <div className="text-xs text-slate-550 mt-0.5">{lead.city}, {lead.country}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
