"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  onEnquireClick: () => void;
}

const navItems = [
  { label: "Home", id: "home" },
  { label: "Stats", id: "stats" },
  { label: "Clients", id: "clients" },
  { label: "Accredian Edge", id: "accredian-edge" },
  { label: "CAT", id: "cat-framework" },
  { label: "How It Works", id: "how-it-works" },
  { label: "FAQs", id: "faqs" },
  { label: "Testimonials", id: "testimonials" },
];

export default function Header({ onEnquireClick }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for header transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll highlighting active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section is in viewport
      threshold: 0.15,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveSection(id);
    }
  };

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-xs ${
          isScrolled
            ? "top-3 w-[95%] max-w-6xl rounded-2xl py-2 px-8 shadow-md border-blue-100/30"
            : "top-4 w-[95%] max-w-6xl rounded-2xl py-3.5 px-8"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer select-none" 
            onClick={() => handleNavClick("home")}
          >
            <span className="text-xl sm:text-2xl font-black text-brand-primary tracking-tight">
              accredian<span className="text-brand-accent">.</span>
            </span>
            <span className={`hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[9px] font-bold text-brand-primary uppercase rounded-md tracking-wider transition-all duration-500 ${
              isScrolled ? "bg-brand-primary/5 border border-brand-primary/10" : "bg-brand-primary/10"
            }`}>
              Enterprise
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer ${
                  activeSection === item.id
                    ? "bg-blue-600/10 text-blue-600"
                    : "text-slate-650 hover:text-blue-650 hover:bg-slate-100/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onEnquireClick}
              className={`bg-gradient-to-r from-[#2A75E6] to-[#4F46E5] hover:from-[#1d4ed8] hover:to-[#4338ca] text-white font-extrabold text-xs shadow-md shadow-blue-500/10 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer ${
                isScrolled ? "px-4.5 py-2.5 rounded-full" : "px-5 py-2.5 rounded-xl"
              }`}
            >
              Enquire Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onEnquireClick}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-sm transition-all cursor-pointer"
            >
              Enquire
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 max-w-full bg-white shadow-2xl border-l border-slate-150 flex flex-col p-6 transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <span className="text-xl font-black text-brand-primary tracking-tight">
            accredian<span className="text-brand-accent">.</span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 text-slate-500 hover:text-slate-800 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col gap-1.5 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                activeSection === item.id
                  ? "bg-blue-600/10 text-blue-600 font-bold border-l-4 border-blue-600 pl-3"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Drawer Action */}
        <div className="pt-6 border-t border-slate-100 mt-auto">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onEnquireClick();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Enquire Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
