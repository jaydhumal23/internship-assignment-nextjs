"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { validateEnquiryPayload } from "@/utils/validation";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: string;
}

// Helper to generate flag emoji from ISO 2-letter code
const getFlagEmoji = (isoCode: string): string => {
  const codePoints = isoCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Complete list of global country codes with ISO keys for flag rendering
const countryCodes = [
  { code: "+91", name: "India", iso: "IN" },
  { code: "+1", name: "United States", iso: "US" },
  { code: "+1", name: "Canada", iso: "CA" },
  { code: "+44", name: "United Kingdom", iso: "GB" },
  { code: "+61", name: "Australia", iso: "AU" },
  { code: "+65", name: "Singapore", iso: "SG" },
  { code: "+971", name: "United Arab Emirates", iso: "AE" },
  { code: "+49", name: "Germany", iso: "DE" },
  { code: "+33", name: "France", iso: "FR" },
  { code: "+81", name: "Japan", iso: "JP" },
  { code: "+31", name: "Netherlands", iso: "NL" },
  { code: "+39", name: "Italy", iso: "IT" },
  { code: "+34", name: "Spain", iso: "ES" },
  { code: "+41", name: "Switzerland", iso: "CH" },
  { code: "+46", name: "Sweden", iso: "SE" },
  { code: "+47", name: "Norway", iso: "NO" },
  { code: "+45", name: "Denmark", iso: "DK" },
  { code: "+358", name: "Finland", iso: "FI" },
  { code: "+353", name: "Ireland", iso: "IE" },
  { code: "+32", name: "Belgium", iso: "BE" },
  { code: "+43", name: "Austria", iso: "AT" },
  { code: "+64", name: "New Zealand", iso: "NZ" },
  { code: "+852", name: "Hong Kong", iso: "HK" },
  { code: "+82", name: "South Korea", iso: "KR" },
  { code: "+86", name: "China", iso: "CN" },
  { code: "+60", name: "Malaysia", iso: "MY" },
  { code: "+62", name: "Indonesia", iso: "ID" },
  { code: "+66", name: "Thailand", iso: "TH" },
  { code: "+63", name: "Philippines", iso: "PH" },
  { code: "+84", name: "Vietnam", iso: "VN" },
  { code: "+90", name: "Turkey", iso: "TR" },
  { code: "+966", name: "Saudi Arabia", iso: "SA" },
  { code: "+974", name: "Qatar", iso: "QA" },
  { code: "+965", name: "Kuwait", iso: "KW" },
  { code: "+968", name: "Oman", iso: "OM" },
  { code: "+973", name: "Bahrain", iso: "BH" },
  { code: "+972", name: "Israel", iso: "IL" },
  { code: "+27", name: "South Africa", iso: "ZA" },
  { code: "+20", name: "Egypt", iso: "EG" },
  { code: "+234", name: "Nigeria", iso: "NG" },
  { code: "+254", name: "Kenya", iso: "KE" },
  { code: "+212", name: "Morocco", iso: "MA" },
  { code: "+55", name: "Brazil", iso: "BR" },
  { code: "+52", name: "Mexico", iso: "MX" },
  { code: "+54", name: "Argentina", iso: "AR" },
  { code: "+56", name: "Chile", iso: "CL" },
  { code: "+57", name: "Colombia", iso: "CO" },
  { code: "+51", name: "Peru", iso: "PE" },
  { code: "+7", name: "Russia", iso: "RU" },
  { code: "+380", name: "Ukraine", iso: "UA" },
  { code: "+48", name: "Poland", iso: "PL" },
  { code: "+420", name: "Czech Republic", iso: "CZ" },
  { code: "+36", name: "Hungary", iso: "HU" },
  { code: "+40", name: "Romania", iso: "RO" },
  { code: "+30", name: "Greece", iso: "GR" },
  { code: "+351", name: "Portugal", iso: "PT" },
  { code: "+92", name: "Pakistan", iso: "PK" },
  { code: "+880", name: "Bangladesh", iso: "BD" },
  { code: "+94", name: "Sri Lanka", iso: "LK" },
  { code: "+977", name: "Nepal", iso: "NP" },
  { code: "+95", name: "Myanmar", iso: "MM" },
  { code: "+886", name: "Taiwan", iso: "TW" },
  { code: "+381", name: "Serbia", iso: "RS" },
  { code: "+385", name: "Croatia", iso: "HR" },
  { code: "+359", name: "Bulgaria", iso: "BG" },
  { code: "+370", name: "Lithuania", iso: "LT" },
  { code: "+371", name: "Latvia", iso: "LV" },
  { code: "+372", name: "Estonia", iso: "EE" },
  { code: "+352", name: "Luxembourg", iso: "LU" },
  { code: "+354", name: "Iceland", iso: "IS" },
  { code: "+356", name: "Malta", iso: "MT" },
  { code: "+386", name: "Slovenia", iso: "SI" },
  { code: "+382", name: "Montenegro", iso: "ME" },
  { code: "+389", name: "North Macedonia", iso: "MK" },
  { code: "+355", name: "Albania", iso: "AL" },
  { code: "+376", name: "Andorra", iso: "AD" },
  { code: "+506", name: "Costa Rica", iso: "CR" },
  { code: "+507", name: "Panama", iso: "PA" },
  { code: "+502", name: "Guatemala", iso: "GT" },
  { code: "+503", name: "El Salvador", iso: "SV" },
  { code: "+504", name: "Honduras", iso: "HN" },
  { code: "+505", name: "Nicaragua", iso: "NI" },
  { code: "+591", name: "Bolivia", iso: "BO" },
  { code: "+593", name: "Ecuador", iso: "EC" },
  { code: "+595", name: "Paraguay", iso: "PY" },
  { code: "+598", name: "Uruguay", iso: "UY" },
  { code: "+58", name: "Venezuela", iso: "VE" }
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

export default function EnquiryModal({ isOpen, onClose, initialDomain }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    company: "",
    domain: "Product Management",
    candidates: "",
    deliveryMode: "Online",
    location: "",
  });

  const [customDomain, setCustomDomain] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Custom searchable phone country code select state
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [phoneSearchQuery, setPhoneSearchQuery] = useState("");

  const filteredCountries = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(phoneSearchQuery.toLowerCase()) ||
      c.code.includes(phoneSearchQuery)
  );

  const selectedCountryData = countryCodes.find((c) => c.code === formData.countryCode);

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

  // Synchronize initial domain if passed from outside
  useEffect(() => {
    if (initialDomain && isOpen) {
      setFormData((prev) => ({ ...prev, domain: initialDomain }));
    }
  }, [initialDomain, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const finalDomain = formData.domain === "Other" ? customDomain.trim() : formData.domain;

    const validation = validateEnquiryPayload({
      ...formData,
      domain: finalDomain,
    });

    const clientErrors: Record<string, string> = { ...validation.errors };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

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
      location: formData.location
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
          domain: "Product Management",
          candidates: "",
          deliveryMode: "Online",
          location: "",
        });
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row md:h-[650px] max-h-[90vh]">

        {/* Left Side Image Column */}
        <div className="hidden md:block w-1/2 relative bg-slate-100 shrink-0">
          <img
            src="/wr.png"
            alt="Corporate Training Consultancy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form Column */}
        <div className="w-full md:w-1/2 flex flex-col bg-white relative max-h-full overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-8 pb-4 flex justify-between items-center shrink-0">
            <div>
              <h3 className="text-2xl font-black text-slate-805 tracking-tight">Enquire Now</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Form Fields container */}
          <div className="px-8 pb-8 overflow-y-auto grow scrollbar-thin">
            {submitStatus === "success" ? (
              <div className="py-16 text-center flex flex-col items-center justify-center animate-slide-up h-full">
                <CheckCircle2 className="w-16 h-16 text-brand-accent mb-4 animate-bounce" />
                <h4 className="text-2xl font-bold text-slate-805">Enquiry Submitted!</h4>
                <p className="text-slate-650 mt-2 max-w-sm text-sm leading-relaxed">
                  Thank you for reaching out. One of our enterprise learning advisors will contact you within 24 hours to discuss your needs.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-750 text-xs font-semibold flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className={`w-full py-2 bg-transparent text-slate-800 text-sm focus:outline-none transition-all placeholder-slate-400 border-b ${errors.name
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-600"
                      }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className={`w-full py-2 bg-transparent text-slate-800 text-sm focus:outline-none transition-all placeholder-slate-400 border-b ${errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-600"
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Selector row */}
                <div>
                  <div className="flex items-end gap-3 pb-0.5">

                    {/* Custom searchable phone code dropdown */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                        className="flex items-center gap-1.5 py-2 border-b border-slate-200 text-slate-800 text-sm bg-transparent focus:outline-none hover:border-blue-600 cursor-pointer select-none"
                      >
                        <span>{selectedCountryData ? getFlagEmoji(selectedCountryData.iso) : "🇮🇳"}</span>
                        <span>{formData.countryCode}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                      </button>

                      {isPhoneDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsPhoneDropdownOpen(false)}
                          />
                          <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 flex flex-col gap-1.5 animate-slide-up">
                            <input
                              type="text"
                              value={phoneSearchQuery}
                              onChange={(e) => setPhoneSearchQuery(e.target.value)}
                              placeholder="Search country..."
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-650/10 focus:border-blue-600"
                            />
                            <div className="max-h-48 overflow-y-auto flex flex-col gap-0.5 scrollbar-thin">
                              {filteredCountries.map((c) => (
                                <button
                                  key={`${c.iso}-${c.code}`}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, countryCode: c.code }));
                                    setIsPhoneDropdownOpen(false);
                                    setPhoneSearchQuery("");
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-2 text-left text-xs rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-semibold"
                                >
                                  <span className="text-base leading-none">{getFlagEmoji(c.iso)}</span>
                                  <span className="flex-1 truncate">{c.name}</span>
                                  <span className="text-slate-400 font-bold">{c.code}</span>
                                </button>
                              ))}
                              {filteredCountries.length === 0 && (
                                <div className="text-center py-4 text-xs text-slate-400 font-semibold">
                                  No countries found
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className={`flex-1 min-w-0 py-2 bg-transparent text-slate-800 text-sm focus:outline-none transition-all placeholder-slate-400 border-b ${errors.phone
                          ? "border-red-300 focus:border-red-500"
                          : "border-slate-200 focus:border-blue-600"
                        }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className={`w-full py-2 bg-transparent text-slate-800 text-sm focus:outline-none transition-all placeholder-slate-400 border-b ${errors.company
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-600"
                      }`}
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>

                {/* Domain Selector */}
                <div>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className={`w-full py-2 bg-transparent text-slate-800 text-sm focus:outline-none transition-all border-b cursor-pointer ${errors.domain
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-600"
                      }`}
                  >
                    <option value="" disabled>Select Domain</option>
                    <option value="Product Management">Product Management</option>
                    <option value="CFO">CFO</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Human Resource">Human Resource</option>
                    <option value="Strategy & Leadership">Strategy & Leadership</option>
                    <option value="General Management">General Management</option>
                    <option value="Digital Transformation">Digital Transformation</option>
                    <option value="Business Management">Business Management</option>
                    <option value="Finance">Finance</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Senior Management">Senior Management</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Other">Other</option>
                  </select>

                  {/* Custom Domain conditional input */}
                  {formData.domain === "Other" && (
                    <div className="mt-3 animate-fade-in">
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
                        className={`w-full py-2 bg-transparent text-slate-850 text-sm focus:outline-none transition-all placeholder-slate-400 border-b ${errors.customDomain ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-blue-600"
                          }`}
                      />
                      {errors.customDomain && <p className="text-red-500 text-xs mt-1">{errors.customDomain}</p>}
                    </div>
                  )}
                </div>

                {/* Expected Candidates */}
                <div>
                  <input
                    type="text"
                    name="candidates"
                    value={formData.candidates}
                    onChange={handleChange}
                    placeholder="Enter No. of candidates"
                    className={`w-full py-2 bg-transparent text-slate-800 text-sm focus:outline-none transition-all placeholder-slate-400 border-b ${errors.candidates
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-600"
                      }`}
                  />
                  {errors.candidates && <p className="text-red-500 text-xs mt-1">{errors.candidates}</p>}
                </div>

                {/* Preferred Delivery Method */}
                <div>
                  <select
                    name="deliveryMode"
                    value={formData.deliveryMode}
                    onChange={handleChange}
                    className="w-full py-2 bg-transparent text-slate-805 text-sm focus:outline-none transition-all border-b border-slate-200 focus:border-blue-600 cursor-pointer"
                  >
                    <option value="" disabled>Select Mode of Delivery *</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Eg: Gurgaon, Delhi, India"
                    className={`w-full py-2 bg-transparent text-slate-800 text-sm focus:outline-none transition-all placeholder-slate-400 border-b ${errors.location
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-600"
                      }`}
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
