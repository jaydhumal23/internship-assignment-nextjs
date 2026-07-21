import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accredian Enterprise | Next-Gen Learning Solutions for Businesses",
  description: "Empower your teams with Accredian's customized training curricula, flexible delivery formats, and measurable impact tracking. Upskill your talent with our CAT framework.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" as="image" href="/hero-v2.png" />
        <link rel="preload" as="image" href="/cutiepro.png" />
        {/* ── Preconnect to external image CDNs ── */}
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <link rel="dns-prefetch" href="https://storage.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* ── Local images ── */}
        <link rel="preload" as="image" href="/var2.png" />
        <link rel="preload" as="image" href="/raj.png" />
        <link rel="preload" as="image" href="/wr.png" />

        {/* ── Accredian GCS company logos (Clients + Testimonials) ── */}
        <link rel="preload" as="image" href="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/rel.png" />
        <link rel="preload" as="image" href="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hcl.png" />
        <link rel="preload" as="image" href="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/ibm.png" />
        <link rel="preload" as="image" href="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/crif.png" />
        <link rel="preload" as="image" href="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/adp.svg" />
        <link rel="preload" as="image" href="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/bayer.svg" />

        {/* ── Unsplash card images (CourseSegmentation) ── */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&h=260&q=80" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=260&q=80" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=260&q=80" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
