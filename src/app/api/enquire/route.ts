import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to store lead JSON data
const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "leads.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, countryCode, phone, company, domain, candidates, deliveryMode, city, country } = body;

    // Server-side validation
    if (!name || !email || !countryCode || !phone || !company || !domain || !candidates || !deliveryMode || !city || !country) {
      return NextResponse.json(
        { error: "All required fields must be filled out." },
        { status: 400 }
      );
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Phone validation
    if (!/^[0-9\s-()]{7,12}$/.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format. It should contain between 7 and 12 digits." },
        { status: 400 }
      );
    }

    // Initialize lead object
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      countryCode,
      phone: phone.trim(),
      company: company.trim(),
      domain,
      candidates,
      deliveryMode,
      city: city.trim(),
      country: country.trim(),
      createdAt: new Date().toISOString(),
    };

    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Read current leads or initialize empty array
    let leads = [];
    if (fs.existsSync(FILE_PATH)) {
      try {
        const fileContent = fs.readFileSync(FILE_PATH, "utf-8");
        leads = JSON.parse(fileContent || "[]");
      } catch (e) {
        // In case JSON is corrupt
        leads = [];
      }
    }

    // Append new lead
    leads.unshift(newLead); // Add to the top of list

    // Write back to file
    fs.writeFileSync(FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, message: "Enquiry logged successfully.", leadId: newLead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error during enquiry logging:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to save enquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return NextResponse.json([]);
    }
    const fileContent = fs.readFileSync(FILE_PATH, "utf-8");
    const leads = JSON.parse(fileContent || "[]");
    return NextResponse.json(leads);
  } catch (error) {
    console.error("API error during getting enquiries:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to load enquiries." },
      { status: 500 }
    );
  }
}
