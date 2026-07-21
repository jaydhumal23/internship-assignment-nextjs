# Accredian Enterprise Clone

Recreation of the Accredian Enterprise landing page (`https://enterprise.accredian.com/`) built using Next.js (App Router), TypeScript, and Tailwind CSS.

---

## 🚀 Setup Instructions

Follow these steps to run the project locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18.x or later) and npm installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
# Navigate to the project root directory
npm install
```

### 3. Run Development Server
Start the Next.js development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

### 4. Admin Leads Dashboard
To view, search, and export captured lead data, visit the Admin Panel route:
- URL: [http://localhost:3000/admin/leads](http://localhost:3000/admin/leads)

### 5. Production Build
Compile the application for deployment or verification:
```bash
npm run build
```

---

## 🎯 Approach Taken

1. **Analysis & Extraction**: Used a browser subagent to scrape the live URL `https://enterprise.accredian.com/`. Extracted text structure, accordion configurations, testimonial content, brand assets, and mobile hamburger dimensions.
2. **Global Styling**: Built custom brand color variables (`--brand-primary`, `--brand-accent`), ambient glowing blur backgrounds, and smooth scroll offsets directly inside a Tailwind CSS v4 environment.
3. **Responsive UI Architecture**: Developed reusable, responsive components inside `src/components/`:
   - **Header**: sticky nav bar, Intersection Observer active links, and mobile slide drawer.
   - **Hero**: bold gradients and pulse CTA triggers.
   - **Clients**: customized SVG brand logo panels.
   - **Domain & CAT**: modular tab selects and cards.
   - **Testimonials**: auto-cycling slideshow with slide indicators.
   - **FAQs**: category selector tabs with custom height grid rows animations.
   - **Enquiry Form**: modal form validating candidate entries client-side.
4. **Lead Storage API**: Implemented Next.js server-side validation routing. Successful requests are saved inside a JSON database file at `data/leads.json`.
5. **Admin panel**: Built `/admin/leads` to retrieve lead entries from the JSON database, display metrics, support searches/filters, and export to CSV.

---

## 🤖 AI Usage & Manual Improvements

As requested by the assignment rules, here is the breakdown of AI and manual efforts:

### Where AI Helped
- **Visual Mapping**: The browser subagent crawled the live reference website and returned sections descriptions and active element locations.
- **Boilerplate Generation**: Scaffolding basic React components, defining layout structures, and configuring TypeScript interfaces.
- **CSV Data Encoding**: Provided the client-side binary CSV encoding function used in the export button.

### What Was Manually Configured / Improved
- **Lucide Brand Icon Resolution**: Handled case-sensitive and deprecated brand icons in Lucide v4 by writing lightweight, inline SVG brand tags for Reliance, IBM, Twitter, Facebook, and LinkedIn.
- **Scroll Offset Coordination**: Added custom scroll paddings (`scroll-padding-top`) inside `globals.css` so that clicking anchor links scrolled exactly to the heading, rather than slipping behind the sticky navigation header.
- **Flexible Data Store**: Designed server-side logic in `/api/enquire` to dynamically check, create directories (`data/`), and safely write JSON arrays if the database file is initially missing or empty.
- **Active Section Highlighting**: Integrated custom `IntersectionObserver` configurations in `Header.tsx` to underline header items based on real-time scrolling viewports.

---

## ⭐ Future Enhancements (With More Time)
- **Database Integration**: Migrate the storage from a local JSON file (`leads.json`) to a production cloud database (such as PostgreSQL via Prisma, or MongoDB) with full ORM schemas.
- **Authenticating Admins**: Add middleware security (like NextAuth.js or Clerk) to protect the `/admin/leads` path so only verified company managers can access captured customer data.
- **Automated Email Followups**: Trigger notification mailers (using Resend or Nodemailer) to confirm submission details to both the candidate and the learning sales department.
