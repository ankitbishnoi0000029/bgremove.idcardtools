import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how BgRemove processes selected images in your browser and what requests your browser makes when loading the tool.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy`,
    title: "Privacy Policy",
    description:
      "How BgRemove processes selected images in your browser and what requests are needed to load the tool.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description:
      "How BgRemove processes selected images in your browser and what requests are needed to load the tool.",
  },
};

export default function PrivacyPage() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "120px 20px 80px",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          fontWeight: 700,
          color: "#0a0a0a",
          marginBottom: 20,
        }}
      >
        Privacy Policy
      </h1>

      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        <strong>Last updated:</strong> October 24, 2026
      </p>

      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#0a0a0a",
          marginTop: 32,
          marginBottom: 10,
        }}
      >
        Image processing
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        The selected image is processed in your browser using WebAssembly; the
        application does not send it to BgRemove&apos;s server for background
        removal. Your browser does make requests to load the site and the
        model files the tool needs. The image is held in browser memory while
        you use the tool; you can reset the editor or close the page when done.
      </p>

      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#0a0a0a",
          marginTop: 32,
          marginBottom: 10,
        }}
      >
        Network requests
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        Loading this website and its image-processing model requires your
        browser to request files from the site&apos;s host. This is separate from
        processing the selected image. Refer to your browser and hosting
        provider&apos;s privacy information for details about ordinary network
        requests.
      </p>

      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#0a0a0a",
          marginTop: 32,
          marginBottom: 10,
        }}
      >
        Contact
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        Questions about image handling? Review the{" "}
        <a href="/about" style={{ color: "#EB4203" }}>
          About page
        </a>
        .
      </p>
    </main>
  );
}