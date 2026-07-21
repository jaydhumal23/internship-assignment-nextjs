"use client";

import React from "react";

const logoItems = [
  // Reliance
  (
    <div key="reliance" className="h-14 sm:h-24 md:h-40 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <img
        src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/rel.png"
        alt="Reliance"
        className="object-contain w-14 h-14 sm:w-24 sm:h-24 md:w-24 md:h-24"
      />
    </div>
  ),
  // HCL
  (
    <div key="hcl" className="h-14 sm:h-24 md:h-40 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <img
        src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hcl.png"
        alt="HCL"
        className="object-contain w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40"
      />
    </div>
  ),
  // IBM
  (
    <div key="ibm" className="h-14 sm:h-24 md:h-40 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <img
        src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/ibm.png"
        alt="IBM"
        className="object-contain w-14 h-14 sm:w-24 sm:h-24 md:w-24 md:h-24"
      />
    </div>
  ),
  // CRIF
  (
    <div key="crif" className="h-14 sm:h-24 md:h-40 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <img
        src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/crif.png"
        alt="CRIF"
        className="object-contain w-14 h-14 sm:w-24 sm:h-24 md:w-24 md:h-24"
      />
    </div>
  ),
  // ADP
  (
    <div key="adp" className="h-14 sm:h-24 md:h-40 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <img
        src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/adp.svg"
        alt="ADP"
        className="object-contain w-14 h-14 sm:w-24 sm:h-24 md:w-24 md:h-24"
      />
    </div>
  ),
  // Bayer
  (
    <div key="bayer" className="h-14 sm:h-24 md:h-40 flex items-center justify-center filter grayscale contrast-200 hover:grayscale-0 hover:contrast-100 transition-all duration-300 shrink-0">
      <img
        src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/bayer.svg"
        alt="Bayer"
        className="object-contain w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24"
      />
    </div>
  ),
];

export default function Clients() {
  return (
    <section id="clients" className="py-16 bg-slate-50 border-b border-slate-100 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold text-brand-primary-light uppercase tracking-widest">
            Corporate Partnerships
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Empowering professionals in world-class organizations through targeted corporate bootcamps.
          </p>
        </div>

        {/* Brand Marquee Flow */}
        <div className="relative w-full overflow-hidden mask-fade-edges mt-4">

          <style>{`
            @keyframes marquee {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-marquee {
              animation: marquee 65s linear infinite;
            }
            .mask-fade-edges {
              mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
            }
          `}</style>

          <div className="flex items-center gap-16 w-max animate-marquee py-2 opacity-75">

            {/* Set 1 */}
            <div className="flex items-center gap-16 shrink-0">
              {logoItems}
            </div>

            {/* Set 2 (Duplicate for seamless continuous loop) */}
            <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
              {logoItems.map((logo, index) => React.cloneElement(logo, { key: `dup-${index}` }))}
            </div>

            {/* Set 2 (Duplicate for seamless continuous loop) */}
            <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
              {logoItems.map((logo, index) => React.cloneElement(logo, { key: `dup-${index}` }))}
            </div>
            {/* Set 2 (Duplicate for seamless continuous loop) */}
            <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
              {logoItems.map((logo, index) => React.cloneElement(logo, { key: `dup-${index}` }))}
            </div>
            {/* Set 2 (Duplicate for seamless continuous loop) */}
            <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
              {logoItems.map((logo, index) => React.cloneElement(logo, { key: `dup-${index}` }))}
            </div>
            {/* Set 2 (Duplicate for seamless continuous loop) */}
            <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
              {logoItems.map((logo, index) => React.cloneElement(logo, { key: `dup-${index}` }))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
