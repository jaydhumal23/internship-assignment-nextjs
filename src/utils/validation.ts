/**
 * Centralized Form Validation Utilities
 * Shared between Next.js Client Components and API Route Handlers
 */

/**
 * Checks if a string is non-empty after trimming
 */
export function isNotEmpty(value: string | undefined | null): boolean {
  if (!value) return false;
  return value.trim().length > 0;
}

/**
 * Validates corporate email format
 */
export function isValidEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates phone digits length (7-12 characters, allowing numbers, spaces, and hyphens)
 * Note: Excludes the dial code prefix.
 */
export function isValidPhone(phone: string | undefined | null): boolean {
  if (!phone) return false;
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.trim());
}

interface EnquiryValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates the complete enquiry lead submission payload
 */
export function validateEnquiryPayload(data: any): EnquiryValidationResult {
  const errors: Record<string, string> = {};

  if (!data) {
    return {
      isValid: false,
      errors: { _global: "Payload is empty or missing." }
    };
  }

  // Name check
  if (!isNotEmpty(data.name)) {
    errors.name = "Full name is required";
  }

  // Email check
  if (!isNotEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone check
  if (!isNotEmpty(data.phone)) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }

  // Company check
  if (!isNotEmpty(data.company)) {
    errors.company = "Company name is required";
  }

  // Location check
  if (!isNotEmpty(data.location)) {
    errors.location = "Location is required";
  }

  // Rest of drop-down items validation
  if (!isNotEmpty(data.countryCode)) {
    errors.countryCode = "Country dial code is required";
  }
  if (!isNotEmpty(data.domain)) {
    errors.domain = "Domain of interest is required";
  }
  if (!isNotEmpty(data.candidates)) {
    errors.candidates = "Candidates range is required";
  }
  if (!isNotEmpty(data.deliveryMode)) {
    errors.deliveryMode = "Preferred delivery format is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
