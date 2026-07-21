"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import AccredianEdge, { HowItWorks } from "@/components/AccredianEdge";
import DomainExpertise from "@/components/DomainExpertise";
import CourseSegmentation from "@/components/CourseSegmentation";
import WhoShouldJoin from "@/components/WhoShouldJoin";
import CatFramework from "@/components/CatFramework";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

const PATIENCE_MESSAGES = [
  "Reticulating splines...",
  "Baking pixels at 350°F...",
  "Untangling the internet...",
  "Assembling reality...",
  "Charging flux capacitors...",
  "Convincing electrons to behave...",
];

function Preloader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsFading(true);
      window.setTimeout(() => {
        setMessageIndex((i) => (i + 1) % PATIENCE_MESSAGES.length);
        setIsFading(false);
      }, 250);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (document.readyState === "complete") {
      requestAnimationFrame(() => {
        setIsLoading(false);
        window.setTimeout(() => setIsVisible(false), 900);
      });
      return;
    }

    const handleLoad = () => {
      setIsLoading(false);
      window.setTimeout(() => setIsVisible(false), 900);
    };

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!isVisible) return <>{children}</>;

  return (
    <div className="relative">
      <div
        className={[
          "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50 transition-opacity duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!isLoading}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="h-8 w-0.5 origin-center rounded-full bg-blue-600"
                style={{
                  animation: "line-bar 1.4s ease-in-out infinite",
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>

          <span
            className={[
              "min-h-[1em] text-[11px] font-medium tracking-[0.25em] uppercase text-slate-500 transition-opacity duration-250",
              isFading ? "opacity-0" : "opacity-100",
            ].join(" ")}
          >
            {PATIENCE_MESSAGES[messageIndex]}
          </span>
        </div>
      </div>

      <div
        className={[
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
        ].join(" ")}
        aria-hidden={isLoading}
      >
        {children}
      </div>

      <style>{`
        @keyframes line-bar {
          0%, 100% {
            transform: scaleY(0.35);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const [preselectedDomain, setPreselectedDomain] = useState<string | undefined>(undefined);

  const openEnquireModal = (domain?: string) => {
    if (domain && typeof domain === "string") {
      setPreselectedDomain(domain);
    } else {
      setPreselectedDomain(undefined);
    }
    setIsEnquireModalOpen(true);
  };
  const closeEnquireModal = () => {
    setIsEnquireModalOpen(false);
    setPreselectedDomain(undefined);
  };

  useEffect(() => {
    const imageUrls = ["/hero-v2.png", "/cutiepro.png"];

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    const preloadAssets = async () => {
      await Promise.all(imageUrls.map(preloadImage));
      window.dispatchEvent(new Event("load"));
    };

    void preloadAssets();
  }, []);

  return (
    <Preloader>
      <>
        {/* Navigation Header */}
        <Header onEnquireClick={openEnquireModal} />

        {/* Main Content Layout with Ambient Background Animations */}
        <main className="flex-grow relative overflow-hidden bg-[#FAFBFD]">
        
        {/* Sleek Constant Background Animations (z-0, pointer-events-none, sits behind content) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          {/* Vertical Shimmer Beams */}
          <div className="absolute left-[12%] top-0 bottom-0 w-[1px] bg-slate-200/25">
            <div className="absolute w-[1.5px] h-48 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent top-[-20%] animate-beam-slow-1" />
          </div>
          <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-slate-200/25">
            <div className="absolute w-[1.5px] h-48 bg-gradient-to-b from-transparent via-emerald-500/15 to-transparent top-[-20%] animate-beam-slow-2" />
          </div>
          <div className="absolute right-[12%] top-0 bottom-0 w-[1px] bg-slate-200/25">
            <div className="absolute w-[1.5px] h-48 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent top-[-20%] animate-beam-slow-3" />
          </div>

          {/* Drifting Glowing Blur Blobs */}
          <div className="absolute top-[8%] left-[10%] w-[35rem] h-[35rem] bg-blue-500/3.5 rounded-full blur-[100px] animate-float-slow" />
          <div className="absolute top-[35%] right-[5%] w-[40rem] h-[40rem] bg-purple-500/3 rounded-full blur-[110px] animate-float-reverse" />
          <div className="absolute bottom-[20%] left-[5%] w-[35rem] h-[35rem] bg-emerald-500/3.5 rounded-full blur-[100px] animate-float-slow" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 transform-gpu isolate">
          <Hero onEnquireClick={openEnquireModal} />
        </div>

        {/* Milestone Stats */}
        <div className="relative z-10 transform-gpu isolate">
          <Stats />
        </div>

        {/* Brand Partnerships */}
        <div className="relative z-10 transform-gpu isolate">
          <Clients />
        </div>

        {/* Accredian Value Propositions */}
        <div className="relative z-10 transform-gpu isolate">
          <AccredianEdge />
        </div>

        {/* Domain Expertise & CAT framework */}
        <div className="relative z-10 transform-gpu isolate">
          <DomainExpertise onEnquireClick={openEnquireModal} />
        </div>

        {/* Course Segmentation */}
        <div className="relative z-10 transform-gpu isolate">
          <CourseSegmentation />
        </div>

        {/* Who Should Join Cohorts */}
        <div className="relative z-10 transform-gpu isolate">
          <WhoShouldJoin />
        </div>

        {/* CAT Framework */}
        <div className="relative z-10 transform-gpu isolate">
          <CatFramework />
        </div>

        {/* How It Works Timeline */}
        <div className="relative z-10 transform-gpu isolate">
          <HowItWorks />
        </div>

        {/* Call to Action Banner */}
        <div className="relative z-10 transform-gpu isolate">
          <CtaBanner onEnquireClick={openEnquireModal} />
        </div>

        {/* FAQs Accordion */}
        <div className="relative z-10 transform-gpu isolate">
          <FAQs />
        </div>

        {/* Client Reviews */}
        <div className="relative z-10 transform-gpu isolate">
          <Testimonials />
        </div>
      </main>

      {/* Footer */}
      <Footer />

        {/* Leads Capture Popup Form Modal */}
        <EnquiryModal isOpen={isEnquireModalOpen} onClose={closeEnquireModal} initialDomain={preselectedDomain} />
      </>
    </Preloader>
  );
}
