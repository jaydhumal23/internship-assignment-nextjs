"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import AccredianEdge from "@/components/AccredianEdge";
import DomainExpertise from "@/components/DomainExpertise";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

export default function Home() {
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);

  const openEnquireModal = () => setIsEnquireModalOpen(true);
  const closeEnquireModal = () => setIsEnquireModalOpen(false);

  return (
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
        <div className="relative z-10">
          <Hero onEnquireClick={openEnquireModal} />
        </div>

        {/* Milestone Stats */}
        <div className="relative z-10">
          <Stats />
        </div>

        {/* Brand Partnerships */}
        <div className="relative z-10">
          <Clients />
        </div>

        {/* Accredian Value Propositions & Timeline */}
        <div className="relative z-10">
          <AccredianEdge />
        </div>

        {/* Domain Expertise & CAT framework */}
        <div className="relative z-10">
          <DomainExpertise />
        </div>

        {/* Call to Action Banner */}
        <div className="relative z-10">
          <CtaBanner onEnquireClick={openEnquireModal} />
        </div>

        {/* FAQs Accordion */}
        <div className="relative z-10">
          <FAQs />
        </div>

        {/* Client Reviews */}
        <div className="relative z-10">
          <Testimonials />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Leads Capture Popup Form Modal */}
      <EnquiryModal isOpen={isEnquireModalOpen} onClose={closeEnquireModal} />
    </>
  );
}
