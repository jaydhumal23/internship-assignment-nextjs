"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import AccredianEdge from "@/components/AccredianEdge";
import DomainExpertise from "@/components/DomainExpertise";
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

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onEnquireClick={openEnquireModal} />

        {/* Milestone Stats */}
        <Stats />

        {/* Brand Partnerships */}
        <Clients />

        {/* Accredian Value Propositions & Timeline */}
        <AccredianEdge />

        {/* Domain Expertise & CAT framework */}
        <DomainExpertise />

        {/* FAQs Accordion */}
        <FAQs />

        {/* Client Reviews */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Leads Capture Popup Form Modal */}
      <EnquiryModal isOpen={isEnquireModalOpen} onClose={closeEnquireModal} />
    </>
  );
}
