import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About BgRemove",
  description:
    "Learn how BgRemove removes image backgrounds in your browser, what the transparent PNG contains, and how to review the result.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: "About BgRemove",
    description:
      "How BgRemove processes images in your browser and what to expect from a transparent PNG export.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About BgRemove",
    description:
      "How BgRemove processes images in your browser and what to expect from a transparent PNG export.",
  },
};

export default function AboutPage() {
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
          fontSize: "clamp(2rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "#0a0a0a",
          letterSpacing: "-0.02em",
          marginBottom: 24,
        }}
      >
        About <span style={{ color: "#EB4203" }}>BgRemove</span>
      </h1>

      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        BgRemove is a free online background remover. Choose a PNG, JPG, or
        WEBP image, process it in your browser, and download a transparent PNG
        without creating an account. BgRemove does not add a watermark.
      </p>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75, marginTop: 16 }}>
        <Link href="/#upload" style={{ color: "#EB4203", fontWeight: 600 }}>
          Open the background remover
        </Link>
      </p>

      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: "#0a0a0a",
          marginTop: 36,
          marginBottom: 12,
        }}
      >
        How it works
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        BgRemove uses an on-device model in your browser via WebAssembly. The
        selected image is processed in the browser rather than sent to the
        application server for removal. Your browser does request the website
        and model files needed to run the tool. The download is a PNG on a
        3840 × 2160 canvas; that canvas size does not add detail to a small
        source image.
      </p>

      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: "#0a0a0a",
          marginTop: 36,
          marginBottom: 12,
        }}
      >
        Who it&apos;s for
      </h2>
      <ul style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.8, paddingLeft: 22 }}>
        <li>People preparing product photos and listing images.</li>
        <li>Designers who need a transparent PNG cutout.</li>
        <li>People editing profile images, thumbnails, or presentations.</li>
        <li>People preparing document photos, subject to the issuing authority&apos;s rules.</li>
      </ul>

      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: "#0a0a0a",
          marginTop: 36,
          marginBottom: 12,
        }}
      >
        Pricing
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        BgRemove is free to use and does not require an account. The tool does
        not add a watermark to its PNG download.
      </p>

      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: "#0a0a0a",
          marginTop: 36,
          marginBottom: 12,
        }}
      >
        Review the result
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        Automatic cutouts can miss fine or low-contrast edges. Check the
        downloaded image at its intended size. If you are preparing a product
        listing or official document photo, check the destination&apos;s current
        requirements too. Read our{" "}
        <Link href="/privacy" style={{ color: "#EB4203" }}>
          privacy policy
        </Link>
        .
      </p>
    </main>
  );
}