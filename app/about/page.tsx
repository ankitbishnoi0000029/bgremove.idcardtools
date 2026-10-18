import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BgRemove — Free In-Browser Background Remover",
  description:
    "BgRemove is a free, private, in-browser AI background remover. Learn how it works, why it runs 100% locally, and who it's built for.",
  alternates: { canonical: "/about" },
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
        BgRemove is a free, browser-based AI background remover. Upload an
        image, get a transparent 4K PNG — without signing up, without a
        watermark, and without ever uploading your file to a server.
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
        BgRemove uses an on-device AI model that runs in your browser via
        WebAssembly. Your image is processed locally — it never leaves your
        device. The output is a transparent PNG at 4K resolution (3840×2160).
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
        Who it's for
      </h2>
      <ul style={{ color: "#3d2f2c", fontSize: 16, lineHeight: 1.8, paddingLeft: 22 }}>
        <li>E-commerce sellers who need clean product photos.</li>
        <li>Designers who need instant transparent PNGs.</li>
        <li>Anyone preparing ID card or passport photos privately.</li>
        <li>Content creators building thumbnails and banners.</li>
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
        BgRemove is free. There's no paid tier, no feature lock, and no
        watermark. If that ever changes, we'll say so clearly on this page.
      </p>
    </main>
  );
}