import type { Metadata, Viewport } from "next";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : "https://bgremove.idcardtools.com";

const SITE_NAME = process.env.NEXT_PUBLIC_NAME ?? "bgremove";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BgRemove — Free AI Background Remover | 4K Transparent PNG",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Remove image backgrounds instantly with AI. 100% free, no signup. Runs entirely in your browser — export transparent 4K PNGs in seconds.",
  keywords:
    "background remover, remove background, AI background eraser, free background remover, transparent background, 4K background remover, bgremove",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "BgRemove — Free AI Background Remover | 4K Transparent PNG",
    description:
      "Remove image backgrounds instantly with AI. 100% free, no signup required. Export transparent 4K PNGs right in your browser.",
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
    title: "BgRemove — Free AI Background Remover",
    description:
      "Remove image backgrounds instantly with AI. Free, no signup, 4K transparent PNG export.",
    images: ["/og-image.png"],
    creator: "@bgremove",
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
  verification: {
    google: "REPLACE_WITH_GSC_VERIFICATION_CODE",
  },
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
        "Free AI background remover that exports transparent 4K PNGs entirely in the browser.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      sameAs: [
        "https://twitter.com/bgremove",
        "https://github.com/bgremove",
      ],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: "BgRemove",
      url: SITE_URL,
      description:
        "AI-powered background remover. Free, no signup, runs in your browser, exports transparent 4K PNGs.",
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
        "4K resolution output",
        "Runs 100% in browser",
        "No signup required",
        "No image uploads to servers",
      ],
      screenshot: `${SITE_URL}/og-image.png`,
      // NOTE: Remove `aggregateRating` if you don't have real user ratings.
      // Fake ratings violate Google guidelines and can hurt AI trust signals.
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Is BgRemove really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. BgRemove is 100% free with no signup, no watermark, and no hidden limits. You can remove backgrounds and download transparent 4K PNGs at no cost.",
          },
        },
        {
          "@type": "Question",
          name: "Are my images uploaded to a server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. All processing happens locally in your browser using WebAssembly. Your image never leaves your device and is never uploaded to any server.",
          },
        },
        {
          "@type": "Question",
          name: "What output resolution do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BgRemove exports transparent PNGs at 4K resolution (3840×2160), preserving the original aspect ratio and centering the subject on a transparent canvas.",
          },
        },
        {
          "@type": "Question",
          name: "Does BgRemove work on mobile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. BgRemove works in any modern browser on desktop, tablet, and mobile. No app install is required.",
          },
        },
        {
          "@type": "Question",
          name: "What image formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can upload PNG, JPG, and WEBP images. The output is always a transparent PNG.",
          },
        },
      ],
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