import type { Metadata, Viewport } from "next";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const SITE_NAME = process.env.NEXT_PUBLIC_NAME ?? "bgremove";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Online Background Remover — BgRemove",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Remove an image background online for free. BgRemove processes your selected image in your browser and exports a transparent PNG. No account or watermark.",
  applicationName: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Free Online Background Remover — BgRemove",
    description:
      "Remove an image background online for free. Process it in your browser and export a transparent PNG, with no account or watermark.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BgRemove — AI Background Remover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Background Remover — BgRemove",
    description:
      "Remove an image background in your browser and download a transparent PNG. Free to use, no account or watermark.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff1ef" },
    { media: "(prefers-color-scheme: dark)", color: "#fff1ef" },
  ],
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "A browser-based tool for removing image backgrounds and exporting transparent PNGs.",
      inLanguage: "en-US",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: "BgRemove",
      url: SITE_URL,
      description:
        "A free online background remover that processes selected images in the browser and exports transparent PNGs.",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Background Removal",
      operatingSystem: "Any (Web Browser)",
      browserRequirements: "Requires JavaScript and WebAssembly",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "AI background removal",
        "Transparent PNG export",
        "Browser-based image processing",
        "No account required",
      ],
      screenshot: `${SITE_URL}/og-image.png`,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      style={{ backgroundColor: "#fff1ef" }}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `html,body{background-color:#fff1ef;color:#0a0a0a;}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>

      <body
        style={{ backgroundColor: "#fff1ef", color: "#0a0a0a" }}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}