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

  // Monitor scroll for header background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in the middle of the viewport
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
      // Update hash in URL
      window.history.pushState(null, "", `#${id}`);
      setActiveSection(id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glassmorphism shadow-md py-3"
            : "bg-white/95 border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick("home")}>
              <span className="text-2xl font-black text-brand-primary tracking-tight">
                accredian<span className="text-brand-accent">.</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 bg-brand-primary/5 text-[10px] font-bold text-brand-primary uppercase rounded tracking-wider border border-brand-primary/10">
                Enterprise
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? "text-brand-primary"
                      : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary rounded-full animate-fade-in" />
                  )}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={onEnquireClick}
                className="px-5 py-2 bg-brand-primary hover:bg-brand-primary-light text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Enquire Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={onEnquireClick}
                className="px-3.5 py-1.5 bg-brand-primary hover:bg-brand-primary-light text-white font-bold text-xs rounded-md shadow-sm transition-all cursor-pointer"
              >
                Enquire
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
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
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 max-w-full bg-white shadow-2xl border-l border-slate-100 flex flex-col p-6 transition-transform duration-300 ease-in-out lg:hidden ${
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
        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                activeSection === item.id
                  ? "bg-brand-primary/5 text-brand-primary border-l-4 border-brand-primary pl-3"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
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
            className="w-full flex items-center justify-center gap-2 py-3 bg-brand-primary hover:bg-brand-primary-light text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Enquire Now
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </>
  );
}
