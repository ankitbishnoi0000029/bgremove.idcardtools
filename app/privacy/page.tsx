import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "BgRemove processes images entirely in your browser. We do not upload, store, or share your images. Read the full privacy policy.",
  alternates: { canonical: "/privacy" },
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
        <strong>Last updated:</strong> {new Date().toLocaleDateString()}
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
        Images are not uploaded
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        BgRemove processes images entirely in your browser using WebAssembly.
        Your images are never transmitted to any server, never stored, and never
        shared with third parties.
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
        Analytics
      </h2>
      <p style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.75 }}>
        We may use privacy-friendly, cookie-free analytics to understand which
        pages are popular. These analytics do not track individual users and do
        not collect images or image content.
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
        Questions? Reach out via the GitHub link in the footer.
      </p>
    </main>
  );
}