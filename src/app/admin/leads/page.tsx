"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, Mail, Phone, Calendar, Download, RefreshCw, 
  Search, ShieldAlert, CheckCircle, Database, ChevronLeft, 
  MapPin, Server, Activity, Laptop, Building2, HelpCircle,
  Lock, User, LogOut, ChevronDown
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
  status: string;
  createdAt: string;
}

export default function AdminLeads() {
  // Session authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active status dropdown row ID tracker
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [isHeaderStatusFilterOpen, setIsHeaderStatusFilterOpen] = useState(false);

  // Leads state variables
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Validate active login status
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check");
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
        if (data.isAuthenticated) {
          fetchLeads();
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  // Dynamic island scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/enquire");
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
        setFilteredLeads(data);
      } else if (response.status === 401) {
        setIsAuthenticated(false);
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
    // Secret URL parameter gate check
    const params = new URLSearchParams(window.location.search);
    if (params.get("secret") !== "8282") {
      // Instantly redirect unauthorized URL discoveries back to homepage
      window.location.href = "/";
      return;
    }
    
    checkAuth();
  }, []);

  // Close dropdowns on outside window clicks
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownId(null);
      setIsHeaderStatusFilterOpen(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Filter and search calculations
  useEffect(() => {
    if (!isAuthenticated) return;
    let result = leads;

    if (domainFilter !== "all") {
      result = result.filter((lead) => lead.domain === domainFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.company.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.city.toLowerCase().includes(term) ||
          lead.country.toLowerCase().includes(term) ||
          lead.status.toLowerCase().includes(term)
      );
    }

    setFilteredLeads(result);
    setCurrentPage(1); // Reset pagination index on search / filter updates
  }, [searchTerm, domainFilter, statusFilter, leads, isAuthenticated]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!usernameInput.trim() || !passwordInput.trim()) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput.trim()
        })
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Authentication failed.");
      }
    } catch (err) {
      setLoginError("Failed to authenticate. Try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        setIsAuthenticated(false);
        setLeads([]);
        setFilteredLeads([]);
        setUsernameInput("");
        setPasswordInput("");
      }
    } catch (err) {
      console.error("Logout request error:", err);
    }
  };

  // Update lead sales status in database
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/enquire", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus })
      });

      if (res.ok) {
        setLeads(prevLeads =>
          prevLeads.map(lead =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update lead status.");
      }
    } catch (err) {
      setError("Communication error. Failed to update status.");
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ["ID", "Name", "Email", "Country Code", "Phone", "Company", "Domain", "Candidates Count", "Delivery Mode", "City", "Country", "Status", "Submission Time"];
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
      lead.status,
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

  // Statistic calculation variables
  const totalLeads = leads.length;
  const techLeadsCount = leads.filter((l) => l.domain === "Tech").length;
  const emergingLeadsCount = leads.filter((l) => l.domain === "Emerging").length;
  const virtualDeliveryCount = leads.filter((l) => l.deliveryMode === "Live Virtual").length;

  // Pagination computations
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  // Database connection is active when loaded
  const isDbActive = leads.length > 0;

  const getAvatarDetails = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const charCode = name.charCodeAt(0) || 65;
    const gradients = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-violet-500 to-fuchsia-600",
      "from-rose-500 to-pink-600",
    ];
    const gradient = gradients[charCode % gradients.length];
    return { initials, gradient };
  };

  // 1. Authorization status mounting loader
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex flex-col items-center justify-center gap-3 select-none relative overflow-hidden">
        {/* Same aurora background as login */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 blur-[120px]" style={{animation:"floatA 18s ease-in-out infinite"}} />
          <div className="absolute bottom-[-15%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-indigo-400/15 blur-[100px]" style={{animation:"floatB 22s ease-in-out infinite"}} />
          <div className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-violet-400/10 blur-[80px]" style={{animation:"floatC 26s ease-in-out infinite"}} />
        </div>
        <style>{`
          @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.08)} 66%{transform:translate(-30px,50px) scale(0.95)} }
          @keyframes floatB { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-70px,30px) scale(1.1)} 66%{transform:translate(40px,-60px) scale(0.92)} }
          @keyframes floatC { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,-40px) scale(1.05)} }
        `}</style>
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500 tracking-wide animate-pulse">Securing session...</p>
        </div>
      </div>
    );
  }

  // 2. Authentication required: Render centered login form card
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#F0F4FF] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">

        {/* ── Animated aurora orbs ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large primary orb — top-left */}
          <div
            className="absolute top-[-12%] left-[-8%] w-[55vw] h-[55vw] rounded-full bg-blue-400/25 blur-[130px]"
            style={{animation:"floatA 20s ease-in-out infinite"}}
          />
          {/* Indigo orb — bottom-right */}
          <div
            className="absolute bottom-[-15%] right-[-8%] w-[50vw] h-[50vw] rounded-full bg-indigo-400/20 blur-[110px]"
            style={{animation:"floatB 25s ease-in-out infinite"}}
          />
          {/* Violet accent orb — center-right */}
          <div
            className="absolute top-[35%] right-[5%] w-[32vw] h-[32vw] rounded-full bg-violet-400/15 blur-[90px]"
            style={{animation:"floatC 30s ease-in-out infinite"}}
          />
          {/* Emerald accent orb — bottom-left */}
          <div
            className="absolute bottom-[5%] left-[10%] w-[28vw] h-[28vw] rounded-full bg-cyan-400/12 blur-[80px]"
            style={{animation:"floatD 22s ease-in-out infinite"}}
          />
        </div>

        {/* ── Animated dot-grid overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            animation: "gridDrift 60s linear infinite",
          }}
        />

        {/* ── Diagonal beam lines (data-flow) ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          {[0,1,2,3,4,5,6,7].map(i => (
            <line
              key={i}
              x1={`${i * 15 - 5}%`} y1="0%"
              x2={`${i * 15 + 40}%`} y2="100%"
              stroke="#3b82f6" strokeWidth="1"
              style={{animation:`beamFade 4s ease-in-out infinite`, animationDelay:`${i * 0.5}s`}}
            />
          ))}
        </svg>

        {/* Keyframes */}
        <style>{`
          @keyframes floatA {
            0%,100% { transform: translate(0,0) scale(1); }
            33%      { transform: translate(80px,-60px) scale(1.1); }
            66%      { transform: translate(-40px,70px) scale(0.93); }
          }
          @keyframes floatB {
            0%,100% { transform: translate(0,0) scale(1); }
            33%      { transform: translate(-90px,40px) scale(1.12); }
            66%      { transform: translate(50px,-80px) scale(0.9); }
          }
          @keyframes floatC {
            0%,100% { transform: translate(0,0) scale(1); }
            50%      { transform: translate(-60px,-50px) scale(1.08); }
          }
          @keyframes floatD {
            0%,100% { transform: translate(0,0) scale(1); }
            40%      { transform: translate(70px,-30px) scale(1.06); }
            80%      { transform: translate(-20px,60px) scale(0.96); }
          }
          @keyframes gridDrift {
            from { background-position: 0 0; }
            to   { background-position: 320px 320px; }
          }
          @keyframes beamFade {
            0%,100% { opacity: 0; }
            50%      { opacity: 1; }
          }
        `}</style>

        {/* Back navigation */}
        <Link 
          href="/" 
          className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          Back to Homepage
        </Link>

        {/* Main login card container */}
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative z-10 animate-slide-up">
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-black text-brand-primary tracking-tight">accredian</span>
              <span className="px-1.5 py-0.5 bg-brand-primary/5 text-[9px] font-extrabold text-brand-primary uppercase rounded tracking-wider border border-brand-primary/10">
                Enterprise
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight mt-3">Administrator Access</h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Enter your dashboard access credentials to proceed.</p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4.5">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Username / Email ID
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="admin"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-250 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-650/15 focus:border-blue-600 transition-all focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-250 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-650/15 focus:border-blue-600 transition-all focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-600/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                  Verify credentials
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // 3. User authenticated successfully: Render lead manager interface
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">

      {/* Dynamic Island Navbar */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out border bg-white/85 backdrop-blur-md ${
          isScrolled
            ? "top-3 w-[95%] max-w-[1400px] rounded-2xl py-2 px-8 shadow-lg border-blue-100/40"
            : "top-4 w-[95%] max-w-[1400px] rounded-2xl py-3.5 px-8 shadow-sm border-slate-200/60"
        }`}
      >
        <div className="flex items-center justify-between gap-4">

          {/* Left — logo + title */}
          <div className="flex items-center gap-3.5">
            <Link href="/" className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-700 transition-colors border border-slate-200/50 bg-white">
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-brand-primary tracking-tight">accredian</span>
                <span className={`px-1.5 py-0.5 text-[9px] font-extrabold text-brand-primary uppercase rounded tracking-wider border transition-all duration-500 ${
                  isScrolled ? "bg-brand-primary/5 border-brand-primary/10" : "bg-brand-primary/10 border-brand-primary/10"
                }`}>
                  Enterprise
                </span>
              </div>
              <h1 className="text-base font-black text-slate-900 leading-tight">Upskilling Leads Manager</h1>
            </div>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              title="Refresh database"
              className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className={`bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/15 hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                isScrolled ? "px-4 py-2 rounded-full" : "px-4 py-2 rounded-xl"
              }`}
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              Export Database
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer text-slate-500"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <main className="max-w-[1400px] mx-auto px-4 pt-28 pb-8 w-full space-y-8 flex-grow">
        
        {error && (
          <div className="p-4.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm flex items-start gap-3 shadow-xs">
            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Stats Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            /* Skeleton stat cards */
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-5.5 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-slate-200 animate-pulse" />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="h-2 w-20 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-8 w-10 bg-slate-200 rounded-lg animate-pulse mt-1" />
                  </div>
                  <div className="w-11 h-11 bg-slate-100 rounded-xl animate-pulse" />
                </div>
                <div className="h-2 w-36 bg-slate-100 rounded-full animate-pulse mt-4" />
              </div>
            ))
          ) : (
            <>
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5.5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-600" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Total Leads</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{totalLeads}</h3>
                  </div>
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Users className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-[10px] text-slate-450 mt-3 font-semibold">Registered pipeline enquiries</div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5.5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-650" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Tech Domain</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{techLeadsCount}</h3>
                  </div>
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Database className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-[10px] text-slate-455 mt-3 font-semibold">Software, Cloud, Architecture</div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5.5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-purple-600" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Emerging Tech</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{emergingLeadsCount}</h3>
                  </div>
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <Database className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-[10px] text-slate-455 mt-3 font-semibold">AI, ML, Generative Models</div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5.5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-655" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Virtual Online</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">{virtualDeliveryCount}</h3>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="text-[10px] text-slate-455 mt-3 font-semibold">Online webinars / cohorts</div>
              </div>
            </>
          )}
        </div>

        {/* Database Search & Clickable filter tabs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5.5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
              <input
                type="text"
                placeholder="Search leads by name, email, company, city, country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 hover:border-slate-250 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/15 focus:border-blue-600 transition-all focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 w-full lg:w-auto items-center justify-start lg:justify-end">
              <span className="text-xs font-bold text-slate-455 mr-1.5 hidden md:inline">Domain:</span>
              {[
                { label: "All Enquiries", value: "all" },
                { label: "Tech Core", value: "Tech" },
                { label: "Non-Tech", value: "Non-Tech" },
                { label: "Emerging Tech", value: "Emerging" },
                { label: "Executive", value: "Senior" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setDomainFilter(tab.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    domainFilter === tab.value
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Database Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          {isLoading ? (
            /* Skeleton loading — mirrors real table layout */
            <div className="overflow-x-auto">
              {/* Skeleton table header */}
              <div className="bg-slate-50/70 border-b border-slate-200 px-6 py-4 flex items-center gap-12">
                {["w-28", "w-24", "w-20", "w-16", "w-24", "w-16", "w-20", "w-24"].map((w, i) => (
                  <div key={i} className={`h-2.5 ${w} bg-slate-200 rounded-full animate-pulse`} />
                ))}
              </div>
              {/* Skeleton rows */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 px-6 py-5 border-b border-slate-100"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Avatar skeleton */}
                  <div className="flex items-center gap-3 min-w-[160px]">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse shrink-0" />
                    <div className="flex flex-col gap-1.5">
                      <div className="h-3 w-24 bg-slate-200 rounded-full animate-pulse" />
                      <div className="h-2 w-20 bg-slate-100 rounded-full animate-pulse" />
                      <div className="h-2 w-16 bg-slate-100 rounded-full animate-pulse" />
                    </div>
                  </div>
                  {/* Company */}
                  <div className="flex flex-col gap-1.5 min-w-[120px]">
                    <div className="h-2.5 w-20 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-2 w-28 bg-slate-100 rounded-full animate-pulse" />
                  </div>
                  {/* Domain badge */}
                  <div className="h-6 w-14 bg-slate-200 rounded-lg animate-pulse" />
                  {/* Candidates */}
                  <div className="h-2.5 w-10 bg-slate-200 rounded-full animate-pulse ml-2" />
                  {/* Delivery format badge */}
                  <div className="h-7 w-24 bg-slate-200 rounded-full animate-pulse" />
                  {/* Status badge */}
                  <div className="h-6 w-28 bg-slate-200 rounded-lg animate-pulse" />
                  {/* Location */}
                  <div className="flex flex-col gap-1.5 ml-auto">
                    <div className="h-2.5 w-20 bg-slate-200 rounded-full animate-pulse" />
                    <div className="h-2 w-12 bg-slate-100 rounded-full animate-pulse" />
                  </div>
                  {/* Date */}
                  <div className="h-2.5 w-28 bg-slate-200 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto min-h-[320px] pb-16">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
                    <th className="px-6 py-4 align-top whitespace-nowrap">Lead Candidate</th>
                    <th className="px-6 py-4 align-top whitespace-nowrap">Company Details</th>
                    <th className="px-6 py-4 align-top whitespace-nowrap">Domain Focus</th>
                    <th className="px-6 py-4 align-top whitespace-nowrap">Candidates</th>
                    <th className="px-6 py-4 align-top whitespace-nowrap">Delivery Format</th>
                    <th className="px-6 py-4 align-top select-none whitespace-nowrap w-44">
                      <div className="flex flex-col items-start gap-1.5">
                        <span>Status</span>
                        <div className="relative inline-block text-left normal-case">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsHeaderStatusFilterOpen(!isHeaderStatusFilterOpen);
                            }}
                            className={`px-2 py-1 text-[9px] font-extrabold rounded-lg border focus:outline-none flex items-center justify-start gap-1 w-[9rem] shadow-sm transition-all hover:bg-opacity-80 select-none cursor-pointer ${
                              statusFilter === "all"
                                ? "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                                : statusFilter === "Moved Forward"
                                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                : statusFilter === "Rejected"
                                ? "bg-rose-50 border-rose-100 text-rose-700"
                                : "bg-blue-50 border-blue-100 text-blue-700"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              statusFilter === "all"
                                ? "bg-slate-400"
                                : statusFilter === "Moved Forward"
                                ? "bg-emerald-500 animate-pulse"
                                : statusFilter === "Rejected"
                                ? "bg-rose-500"
                                : "bg-blue-500 animate-pulse"
                            }`} />
                            <span>{statusFilter === "all" ? "All" : statusFilter}</span>
                            <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                          </button>

                          {isHeaderStatusFilterOpen && (
                            <div
                              className="absolute left-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {[
                                { value: "all", label: "All Statuses", color: "text-slate-600 bg-slate-50/50", dot: "bg-slate-400" },
                                { value: "In Talk", label: "In Talk", color: "text-blue-600 bg-blue-50/40", dot: "bg-blue-500" },
                                { value: "Moved Forward", label: "Moved Forward", color: "text-emerald-600 bg-emerald-50/40", dot: "bg-emerald-500" },
                                { value: "Rejected", label: "Rejected", color: "text-rose-600 bg-rose-50/40", dot: "bg-rose-500" }
                              ].map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => {
                                    setStatusFilter(opt.value);
                                    setIsHeaderStatusFilterOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer ${
                                    statusFilter === opt.value ? `${opt.color}` : "text-slate-600"
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${opt.dot}`} />
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-4 align-top whitespace-nowrap">Location</th>
                    <th className="px-6 py-4 align-top whitespace-nowrap text-right">Registered On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {paginatedLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-355 border border-slate-100 shadow-inner mx-auto">
                            <Database className="w-6 h-6 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-800 text-base">No Matching Enquiries</p>
                            <p className="text-xs text-slate-500 mt-1">Try adjusting your search queries or category filters.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedLeads.map((lead) => {
                      const avatar = getAvatarDetails(lead.name);
                      
                      const isVirtual = lead.deliveryMode === "Live Virtual";
                      const isPhysical = lead.deliveryMode === "On-Site Physical";

                      return (
                        <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        
                        <td className="px-6 py-4.5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatar.gradient} text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0 select-none`}>
                              {avatar.initials}
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-900">{lead.name}</div>
                              <div className="flex flex-col gap-0.5 text-xs text-slate-500 mt-0.5">
                                <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors font-semibold">
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  {lead.email}
                                </a>
                                <span className="flex items-center gap-1 font-mono">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  {lead.countryCode} {lead.phone}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4.5">
                          <span className="font-bold text-slate-800">{lead.company}</span>
                          <span className="block text-[10px] text-slate-450 uppercase font-bold tracking-wider mt-0.5">Corporate Partner</span>
                        </td>

                        <td className="px-6 py-4.5">
                          <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-lg border ${
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

                        <td className="px-6 py-4.5 font-mono text-slate-650">
                          <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200 text-xs font-bold">
                            {lead.candidates}
                          </span>
                        </td>

                        <td className="px-6 py-4.5">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border ${
                            isVirtual 
                              ? "bg-blue-50 border-blue-100 text-blue-700"
                              : isPhysical
                              ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                              : "bg-purple-50 border-purple-100 text-purple-700"
                          }`}>
                            {isVirtual ? (
                              <Laptop className="w-3 h-3 text-blue-500" />
                            ) : isPhysical ? (
                              <Building2 className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <HelpCircle className="w-3 h-3 text-purple-500" />
                            )}
                            {lead.deliveryMode}
                          </div>
                        </td>

                        {/* Custom Dropdown Selector */}
                        <td className="px-6 py-4.5 whitespace-nowrap">
                          <div className="relative inline-block text-left">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdownId(activeDropdownId === lead.id ? null : lead.id);
                              }}
                              className={`px-3 py-1.5 text-xs font-extrabold rounded-xl border focus:outline-none flex items-center gap-1.5 shadow-sm transition-all hover:bg-opacity-80 select-none cursor-pointer ${
                                lead.status === "Moved Forward"
                                  ? "bg-emerald-50 border-emerald-100 text-emerald-700 hover:border-emerald-250"
                                  : lead.status === "Rejected"
                                  ? "bg-rose-50 border-rose-100 text-rose-700 hover:border-rose-250"
                                  : "bg-blue-50 border-blue-100 text-blue-700 hover:border-blue-250"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                lead.status === "Moved Forward"
                                  ? "bg-emerald-500 animate-pulse"
                                  : lead.status === "Rejected"
                                  ? "bg-rose-500"
                                  : "bg-blue-500 animate-pulse"
                              }`} />
                              <span>{lead.status}</span>
                              <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                            </button>

                            {activeDropdownId === lead.id && (
                              <div 
                                className="absolute left-0 mt-1.5 w-36 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-slide-up"
                                onClick={(e) => e.stopPropagation()} // Prevent click-through closing
                              >
                                {[
                                  { value: "In Talk", label: "In Talk", color: "text-blue-600 bg-blue-50/40", dot: "bg-blue-500" },
                                  { value: "Moved Forward", label: "Moved Forward", color: "text-emerald-600 bg-emerald-50/40", dot: "bg-emerald-500" },
                                  { value: "Rejected", label: "Rejected", color: "text-rose-600 bg-rose-50/40", dot: "bg-rose-500" }
                                ].map((opt) => (
                                  <button
                                    key={opt.value}
                                    onClick={() => {
                                      handleStatusChange(lead.id, opt.value);
                                      setActiveDropdownId(null);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer ${
                                      lead.status === opt.value ? `${opt.color}` : "text-slate-600"
                                    }`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full ${opt.dot}`} />
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4.5">
                          <div className="flex items-center gap-1 text-slate-700 font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{lead.city}</span>
                          </div>
                          <span className="block text-[10px] text-slate-450 font-bold uppercase tracking-wider pl-4.5 mt-0.5">
                            {lead.country}
                          </span>
                        </td>

                        <td className="px-6 py-4.5 whitespace-nowrap text-right text-slate-500 font-semibold font-mono text-xs">
                          <div className="flex items-center justify-end gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {new Date(lead.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
                </tbody>
              </table>
              
              {/* Pagination Controls Footer */}
              {filteredLeads.length > 0 && (
                <div className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
                  <div className="text-xs text-slate-500 font-semibold">
                    Showing <span className="font-extrabold text-slate-700">{startIndex + 1}</span> to{" "}
                    <span className="font-extrabold text-slate-700">
                      {Math.min(startIndex + itemsPerPage, filteredLeads.length)}
                    </span>{" "}
                    of <span className="font-extrabold text-slate-700">{filteredLeads.length}</span> entries
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-slate-50 text-slate-600 border border-slate-200/60 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed select-none"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-1 px-2">
                      <span className="text-xs text-slate-500 font-bold">
                        Page <span className="font-extrabold text-slate-700">{currentPage}</span> of{" "}
                        <span className="font-extrabold text-slate-700">{totalPages}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-slate-50 text-slate-600 border border-slate-200/60 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed select-none"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
