import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { validateEnquiryPayload } from "@/utils/validation";
import { ADMIN_SESSION_COOKIE, verifyAdminToken } from "@/lib/admin-auth";

async function requireAdminSession(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminToken(token);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, countryCode, phone, company, domain, candidates, deliveryMode, location } = body;

    // Server-side validation using shared utility library
    const validation = validateEnquiryPayload(body);
    if (!validation.isValid) {
      const firstKey = Object.keys(validation.errors)[0];
      return NextResponse.json(
        { error: validation.errors[firstKey] },
        { status: 400 }
      );
    }

    const newLead = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      countryCode,
      phone: phone.trim(),
      company: company.trim(),
      domain,
      candidates: typeof candidates === "string" ? candidates.trim() : candidates,
      deliveryMode,
      location: location ? location.trim() : "",
      status: "In Talk", // Default initial sales status
      createdAt: new Date().toISOString(),
    };

    if (!clientPromise) {
      return NextResponse.json(
        { error: "Database configuration error. MongoDB URI not set." },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leads");
    
    const result = await collection.insertOne(newLead);
    const mongoLeadId = result.insertedId.toString();

    return NextResponse.json(
      { 
        success: true, 
        message: "Enquiry saved to MongoDB.", 
        leadId: mongoLeadId
      },
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

export async function GET(req: NextRequest) {
  try {
    const session = await requireAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access. Authentication required." },
        { status: 401 }
      );
    }

    if (!clientPromise) {
      return NextResponse.json(
        { error: "Database configuration error. MongoDB URI not set." },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leads");
    
    const leads = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    // Map _id object to id string for frontend ease
    const formattedLeads = leads.map(lead => ({
      id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      countryCode: lead.countryCode,
      phone: lead.phone,
      company: lead.company,
      domain: lead.domain,
      candidates: lead.candidates,
      deliveryMode: lead.deliveryMode,
      location: lead.location || `${lead.city || ""}${lead.city && lead.country ? ", " : ""}${lead.country || ""}` || "Unknown",
      status: lead.status || "In Talk", // Default for legacy data
      createdAt: lead.createdAt
    }));

    return NextResponse.json(formattedLeads);
  } catch (error) {
    console.error("API error during getting enquiries:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to load enquiries." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access. Authentication required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id and status." },
        { status: 400 }
      );
    }

    const allowedStatuses = ["In Talk", "Moved Forward", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      );
    }

    if (!clientPromise) {
      return NextResponse.json(
        { error: "Database configuration error. MongoDB URI not set." },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leads");

    // Convert string ID to MongoDB ObjectId safely
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid lead ID format." },
        { status: 400 }
      );
    }

    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Lead enquiry record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead status updated successfully." 
    });
  } catch (error) {
    console.error("API error during lead status update:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to update lead status." },
      { status: 500 }
    );
  }
}
