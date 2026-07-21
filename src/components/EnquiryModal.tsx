"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    domain: "Tech",
    candidates: "10-50",
    deliveryMode: "Live Virtual",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (8-15 digits)";
    }
    
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.location.trim()) newErrors.location = "Location/City is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          domain: "Tech",
          candidates: "10-50",
          deliveryMode: "Live Virtual",
          location: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("A network error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-brand-primary text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-xl font-bold">Enquire Now</h3>
            <p className="text-xs text-white/80 mt-0.5">Let's build a customized learning solution for your enterprise.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto grow">
          {submitStatus === "success" ? (
            <div className="py-8 text-center flex flex-col items-center justify-center animate-slide-up">
              <CheckCircle2 className="w-16 h-16 text-brand-accent mb-4 animate-bounce" />
              <h4 className="text-2xl font-bold text-slate-800">Enquiry Submitted!</h4>
              <p className="text-slate-600 mt-2 max-w-sm">
                Thank you for reaching out. One of our enterprise learning advisors will contact you within 24 hours to discuss your needs.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-light text-white font-semibold rounded-lg shadow transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Corporate Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={`w-full px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.email ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555 0199"
                    className={`w-full px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Company / Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corporation"
                  className={`w-full px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.company ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                  }`}
                />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
              </div>

              {/* Domain & Count Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Domain of Interest
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary-light/20 focus:border-brand-primary-light transition-all"
                  >
                    <option value="Tech">Tech (Software, Cloud, DevOps)</option>
                    <option value="Non-Tech">Non-Tech (Product, Analytics)</option>
                    <option value="Emerging">Emerging Tech (GenAI, ML, Data Science)</option>
                    <option value="Senior">Senior / Executive Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Expected Candidates
                  </label>
                  <select
                    name="candidates"
                    value={formData.candidates}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary-light/20 focus:border-brand-primary-light transition-all"
                  >
                    <option value="10-50">10 to 50 employees</option>
                    <option value="51-100">51 to 100 employees</option>
                    <option value="100+">More than 100 employees</option>
                  </select>
                </div>
              </div>

              {/* Mode & Location Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Delivery
                  </label>
                  <select
                    name="deliveryMode"
                    value={formData.deliveryMode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary-light/20 focus:border-brand-primary-light transition-all"
                  >
                    <option value="Live Virtual">Live Virtual (Online)</option>
                    <option value="On-Site Physical">On-Site Classroom</option>
                    <option value="Hybrid">Hybrid Blended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Corporate Location / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, USA"
                    className={`w-full px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.location ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                    }`}
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
