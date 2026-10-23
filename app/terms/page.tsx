import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using BgRemove, including your responsibility for source images and checking output suitability.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/terms`,
    title: "Terms of Service",
    description:
      "Terms for using BgRemove and checking the suitability of edited images.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service",
    description:
      "Terms for using BgRemove and checking the suitability of edited images.",
  },
};

export default function TermsPage() {
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
        Terms of Service
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
        Use of the service
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        BgRemove is provided free of charge, as-is, without warranty. You may
        use it for personal and commercial projects. You are responsible for the
        images you process and for confirming that you have permission to edit
        them. Automatic removal can produce imperfect results; you must review
        the exported image before relying on it.
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
        Prohibited uses
      </h2>
      <ul style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.8, paddingLeft: 22 }}>
        <li>Processing images you do not have rights to.</li>
        <li>Creating fraudulent ID documents or impersonating others.</li>
        <li>Any use that violates local law in your jurisdiction.</li>
      </ul>

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
        Official document photos
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        Photo requirements differ by document and issuing authority. Check the
        current official rules before submitting an edited ID or passport
        photo; BgRemove does not determine whether an image will be accepted.
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
        Changes
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        We may update these terms from time to time. Continued use of the
        service means you accept the current version.
      </p>
    </main>
  );
}