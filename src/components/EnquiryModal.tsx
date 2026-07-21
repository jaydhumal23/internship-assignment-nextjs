"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { validateEnquiryPayload } from "@/utils/validation";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Complete list of global country codes
const countryCodes = [
  { code: "+91", label: "IN (+91)", name: "India" },
  { code: "+1", label: "US/CA (+1)", name: "United States/Canada" },
  { code: "+44", label: "UK (+44)", name: "United Kingdom" },
  { code: "+61", label: "AU (+61)", name: "Australia" },
  { code: "+65", label: "SG (+65)", name: "Singapore" },
  { code: "+971", label: "AE (+971)", name: "United Arab Emirates" },
  { code: "+49", label: "DE (+49)", name: "Germany" },
  { code: "+33", label: "FR (+33)", name: "France" },
  { code: "+81", label: "JP (+81)", name: "Japan" },
  { code: "+31", label: "NL (+31)", name: "Netherlands" },
  { code: "+39", label: "IT (+39)", name: "Italy" },
  { code: "+34", label: "ES (+34)", name: "Spain" },
  { code: "+41", label: "CH (+41)", name: "Switzerland" },
  { code: "+46", label: "SE (+46)", name: "Sweden" },
  { code: "+47", label: "NO (+47)", name: "Norway" },
  { code: "+45", label: "DK (+45)", name: "Denmark" },
  { code: "+358", label: "FI (+358)", name: "Finland" },
  { code: "+353", label: "IE (+353)", name: "Ireland" },
  { code: "+32", label: "BE (+32)", name: "Belgium" },
  { code: "+43", label: "AT (+43)", name: "Austria" },
  { code: "+64", label: "NZ (+64)", name: "New Zealand" },
  { code: "+852", label: "HK (+852)", name: "Hong Kong" },
  { code: "+82", label: "KR (+82)", name: "South Korea" },
  { code: "+86", label: "CN (+86)", name: "China" },
  { code: "+60", label: "MY (+60)", name: "Malaysia" },
  { code: "+62", label: "ID (+62)", name: "Indonesia" },
  { code: "+66", label: "TH (+66)", name: "Thailand" },
  { code: "+63", label: "PH (+63)", name: "Philippines" },
  { code: "+84", label: "VN (+84)", name: "Vietnam" },
  { code: "+90", label: "TR (+90)", name: "Turkey" },
  { code: "+966", label: "SA (+966)", name: "Saudi Arabia" },
  { code: "+974", label: "QA (+974)", name: "Qatar" },
  { code: "+965", label: "KW (+965)", name: "Kuwait" },
  { code: "+968", label: "OM (+968)", name: "Oman" },
  { code: "+973", label: "BH (+973)", name: "Bahrain" },
  { code: "+972", label: "IL (+972)", name: "Israel" },
  { code: "+27", label: "ZA (+27)", name: "South Africa" },
  { code: "+20", label: "EG (+20)", name: "Egypt" },
  { code: "+234", label: "NG (+234)", name: "Nigeria" },
  { code: "+254", label: "KE (+254)", name: "Kenya" },
  { code: "+212", label: "MA (+212)", name: "Morocco" },
  { code: "+55", label: "BR (+55)", name: "Brazil" },
  { code: "+52", label: "MX (+52)", name: "Mexico" },
  { code: "+54", label: "AR (+54)", name: "Argentina" },
  { code: "+56", label: "CL (+56)", name: "Chile" },
  { code: "+57", label: "CO (+57)", name: "Colombia" },
  { code: "+51", label: "PE (+51)", name: "Peru" },
  { code: "+7", label: "RU (+7)", name: "Russia" },
  { code: "+380", label: "UA (+380)", name: "Ukraine" },
  { code: "+48", label: "PL (+48)", name: "Poland" },
  { code: "+420", label: "CZ (+420)", name: "Czech Republic" },
  { code: "+36", label: "HU (+36)", name: "Hungary" },
  { code: "+40", label: "RO (+40)", name: "Romania" },
  { code: "+30", label: "GR (+30)", name: "Greece" },
  { code: "+351", label: "PT (+351)", name: "Portugal" },
  { code: "+92", label: "PK (+92)", name: "Pakistan" },
  { code: "+880", label: "BD (+880)", name: "Bangladesh" },
  { code: "+94", label: "LK (+94)", name: "Sri Lanka" },
  { code: "+977", label: "NP (+977)", name: "Nepal" },
  { code: "+95", label: "MM (+95)", name: "Myanmar" },
  { code: "+886", label: "TW (+886)", name: "Taiwan" },
  { code: "+381", label: "RS (+381)", name: "Serbia" },
  { code: "+385", label: "HR (+385)", name: "Croatia" },
  { code: "+359", label: "BG (+359)", name: "Bulgaria" },
  { code: "+370", label: "LT (+370)", name: "Lithuania" },
  { code: "+371", label: "LV (+371)", name: "Latvia" },
  { code: "+372", label: "EE (+372)", name: "Estonia" },
  { code: "+352", label: "LU (+352)", name: "Luxembourg" },
  { code: "+354", label: "IS (+354)", name: "Iceland" },
  { code: "+356", label: "MT (+356)", name: "Malta" },
  { code: "+386", label: "SI (+386)", name: "Slovenia" },
  { code: "+382", label: "ME (+382)", name: "Montenegro" },
  { code: "+389", label: "MK (+389)", name: "North Macedonia" },
  { code: "+355", label: "AL (+355)", name: "Albania" },
  { code: "+376", label: "AD (+376)", name: "Andorra" },
  { code: "+506", label: "CR (+506)", name: "Costa Rica" },
  { code: "+507", label: "PA (+507)", name: "Panama" },
  { code: "+502", label: "GT (+502)", name: "Guatemala" },
  { code: "+503", label: "SV (+503)", name: "El Salvador" },
  { code: "+504", label: "HN (+504)", name: "Honduras" },
  { code: "+505", label: "NI (+505)", name: "Nicaragua" },
  { code: "+591", label: "BO (+591)", name: "Bolivia" },
  { code: "+593", label: "EC (+593)", name: "Ecuador" },
  { code: "+595", label: "PY (+595)", name: "Paraguay" },
  { code: "+598", label: "UY (+598)", name: "Uruguay" },
  { code: "+58", label: "VE (+58)", name: "Venezuela" }
];

// Pre-defined list of countries and their major business cities for corporate training
const countriesData: Record<string, string[]> = {
  "India": ["Bengaluru", "Mumbai", "Delhi NCR", "Pune", "Hyderabad", "Chennai", "Other"],
  "United States": ["New York", "San Francisco", "Chicago", "Austin", "Seattle", "Boston", "Other"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh", "Other"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Other"],
  "Singapore": ["Singapore", "Other"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Other"],
  "Germany": ["Berlin", "Munich", "Frankfurt", "Hamburg", "Other"],
  "France": ["Paris", "Lyon", "Marseille", "Other"],
  "Japan": ["Tokyo", "Osaka", "Kyoto", "Other"],
  "Other": ["Other"]
};

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    company: "",
    domain: "Tech",
    candidates: "10-50",
    deliveryMode: "Live Virtual",
    country: "India",
    city: "Bengaluru",
  });

  const [customCountry, setCustomCountry] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [customDomain, setCustomDomain] = useState("");

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
    const finalCountry = formData.country === "Other" ? customCountry.trim() : formData.country;
    const finalCity = (formData.city === "Other" || formData.country === "Other") ? customCity.trim() : formData.city;
    const finalDomain = formData.domain === "Other" ? customDomain.trim() : formData.domain;

    const validation = validateEnquiryPayload({
      ...formData,
      domain: finalDomain,
      country: finalCountry,
      city: finalCity
    });

    const clientErrors: Record<string, string> = { ...validation.errors };

    // Remap custom field errors to custom visual inputs in client UI
    if (formData.country === "Other" && validation.errors.country) {
      clientErrors.customCountry = validation.errors.country;
      delete clientErrors.country;
    }
    if ((formData.city === "Other" || formData.country === "Other") && validation.errors.city) {
      clientErrors.customCity = validation.errors.city;
      delete clientErrors.city;
    }
    if (formData.domain === "Other" && validation.errors.domain) {
      clientErrors.customDomain = "Please specify your domain of interest";
      delete clientErrors.domain;
    }

    setErrors(clientErrors);
    return Object.keys(clientErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "phone") {
      // Keep only numbers and restrict to 10 digits maximum
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const defaultCity = countriesData[selectedCountry]?.[0] || "Other";
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      city: defaultCity
    }));

    // Clear validation errors for city/country selectors
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.country;
      delete copy.city;
      delete copy.customCountry;
      delete copy.customCity;
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Resolve final names
    const finalCountry = formData.country === "Other" ? customCountry.trim() : formData.country;
    const finalCity = (formData.city === "Other" || formData.country === "Other") ? customCity.trim() : formData.city;
    const finalDomain = formData.domain === "Other" ? customDomain.trim() : formData.domain;

    const payload = {
      name: formData.name,
      email: formData.email,
      countryCode: formData.countryCode,
      phone: formData.phone,
      company: formData.company,
      domain: finalDomain,
      candidates: formData.candidates,
      deliveryMode: formData.deliveryMode,
      country: finalCountry,
      city: finalCity
    };

    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          phone: "",
          company: "",
          domain: "Tech",
          candidates: "10-50",
          deliveryMode: "Live Virtual",
          country: "India",
          city: "Bengaluru",
        });
        setCustomCountry("");
        setCustomCity("");
        setCustomDomain("");
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

  const showCustomCountryInput = formData.country === "Other";
  const showCustomCityInput = formData.city === "Other" || formData.country === "Other";

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
                  <div className="flex gap-2 min-w-0">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="px-2 py-2 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary-light/20 focus:border-brand-primary-light bg-white shrink-0 w-24 overflow-y-auto"
                    >
                      {countryCodes.map((c) => (
                        <option key={`${c.code}-${c.label}`} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className={`flex-1 min-w-0 px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.phone ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                      }`}
                    />
                  </div>
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
                    className={`w-full px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 bg-white transition-all ${
                      errors.domain ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                    }`}
                  >
                    <option value="Tech">Technology & Engineering</option>
                    <option value="Non-Tech">Product & Business Analytics</option>
                    <option value="Emerging">Emerging Technologies (AI/ML)</option>
                    <option value="Senior">Executive Leadership</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  {/* Custom Domain conditional input */}
                  {formData.domain === "Other" && (
                    <div className="mt-2 animate-fade-in">
                      <input
                        type="text"
                        value={customDomain}
                        onChange={(e) => {
                          setCustomDomain(e.target.value);
                          if (errors.customDomain) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.customDomain;
                              return copy;
                            });
                          }
                        }}
                        placeholder="e.g., Financial Operations"
                        className={`w-full px-3 py-2 border bg-white rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.customDomain ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                        }`}
                      />
                      {errors.customDomain && <p className="text-red-500 text-xs mt-1">{errors.customDomain}</p>}
                    </div>
                  )}
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

              {/* Preferred Delivery Method Row */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Delivery Method
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

              {/* Country & City Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className={`w-full px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 bg-white transition-all ${
                      errors.country ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                    }`}
                  >
                    {Object.keys(countriesData).map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={formData.country === "Other"}
                    className={`w-full px-3 py-2 border rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 bg-white transition-all disabled:bg-slate-50 disabled:text-slate-400 ${
                      errors.city ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                    }`}
                  >
                    {(countriesData[formData.country] || ["Other"]).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              {/* Custom Country & City Text Inputs (Conditional Row) */}
              {(showCustomCountryInput || showCustomCityInput) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4.5 rounded-xl border border-slate-150 animate-fade-in">
                  {showCustomCountryInput && (
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Specify Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customCountry}
                        onChange={(e) => {
                          setCustomCountry(e.target.value);
                          if (errors.customCountry) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.customCountry;
                              return copy;
                            });
                          }
                        }}
                        placeholder="e.g., Canada"
                        className={`w-full px-3 py-2 border bg-white rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.customCountry ? "border-red-300 focus:ring-red-100" : "border-slate-250 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                        }`}
                      />
                      {errors.customCountry && <p className="text-red-500 text-xs mt-1">{errors.customCountry}</p>}
                    </div>
                  )}

                  {showCustomCityInput && (
                    <div className={showCustomCountryInput ? "" : "col-span-2"}>
                      <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Specify City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customCity}
                        onChange={(e) => {
                          setCustomCity(e.target.value);
                          if (errors.customCity) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.customCity;
                              return copy;
                            });
                          }
                        }}
                        placeholder="e.g., Toronto"
                        className={`w-full px-3 py-2 border bg-white rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.customCity ? "border-red-300 focus:ring-red-100" : "border-slate-250 focus:ring-brand-primary-light/20 focus:border-brand-primary-light"
                        }`}
                      />
                      {errors.customCity && <p className="text-red-500 text-xs mt-1">{errors.customCity}</p>}
                    </div>
                  )}
                </div>
              )}

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
