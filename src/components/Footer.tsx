"use client";

import React from "react";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={scrollToTop}>
              <span className="text-2xl font-black text-white tracking-tight">
                accredian<span className="text-brand-accent">.</span>
              </span>
              <span className="ml-2 px-1.5 py-0.5 bg-white/10 text-[9px] font-bold text-white uppercase rounded tracking-wider">
                Enterprise
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              An enterprise learning partner dedicated to upskilling software teams, analysts, and leaders in modern software workflows, cloud platforms, and generative AI.
            </p>
            {/* Social media links */}
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Specializations Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-200">Upskilling Tracks</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#cat-framework" className="hover:text-white transition-colors">Software Engineering</a></li>
              <li><a href="#cat-framework" className="hover:text-white transition-colors">Cloud Computing & DevOps</a></li>
              <li><a href="#cat-framework" className="hover:text-white transition-colors">Generative AI Production</a></li>
              <li><a href="#cat-framework" className="hover:text-white transition-colors">Product Management</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Whitepapers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-200">Corporate Contact</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                <a href="mailto:enterprise@accredian.com" className="hover:text-white transition-colors truncate">enterprise@accredian.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-brand-accent shrink-0 mt-0.5" />
                <span>Sector 48, Sohna Road,<br />Gurugram, Haryana, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Accredian. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
