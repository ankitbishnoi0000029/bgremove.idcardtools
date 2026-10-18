import type { Metadata } from "next";
import BgRemover from "./components/BgRemover";
import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_URL
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : "https://bgremove.idcardtools.com";

export const metadata: Metadata = {
  title: "bg remove – Remove Background from Image for Free",
  description:
    "Remove image backgrounds instantly with AI. 100% free, no signup. Runs entirely in your browser — export transparent 4K PNGs in seconds. No uploads, no watermark.",
  keywords:
    "remove background, background remover, remove bg, free background remover, AI background eraser, transparent PNG, 4K background removal, remove background from image",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "bg remove – Remove Background from Image for Free",
    description:
      "Remove image backgrounds instantly with AI. Free, no signup, 4K transparent PNG export. Runs 100% in your browser.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "bg remove – Remove Background from Image for Free",
    description:
      "Free AI background remover. 4K transparent PNG. No signup, no uploads.",
    images: ["/og-image.png"],
  },
};

// ============ STRUCTURED DATA ============
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: "BgRemove",
      url: SITE_URL,
      description:
        "Free AI-powered background remover. Runs entirely in your browser. Exports transparent 4K PNGs. No signup, no uploads, no watermark.",
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
        "Transparent PNG export at 4K",
        "100% client-side processing",
        "No signup or account required",
        "No watermarks",
        "Supports PNG, JPG, WEBP",
      ],
      screenshot: `${SITE_URL}/og-image.png`,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "BgRemove",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ],
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
        {
          "@type": "Question",
          name: "How long does background removal take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most images are processed in under 5 seconds on a modern browser. Large images may take slightly longer depending on your device.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the results commercially?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can use BgRemove outputs for personal and commercial projects. You are responsible for having the rights to the images you process.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a watermark on the output?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. BgRemove never adds a watermark. The transparent PNG is delivered exactly as processed, at full 4K resolution.",
          },
        },
      ],
    },
  ],
};

// ============ CONTENT DATA ============
const STEPS = [
  {
    n: "01",
    title: "Upload your image",
    desc: "Drag and drop a PNG, JPG, or WEBP file — or click to browse. No signup, no email, no account.",
  },
  {
    n: "02",
    title: "AI removes the background",
    desc: "An on-device AI model detects the subject and erases the background automatically in seconds. Everything runs locally — your image never leaves your browser.",
  },
  {
    n: "03",
    title: "Download your 4K PNG",
    desc: "Export a transparent PNG at 4K resolution (3840×2160). Use it on any background color, marketplace, or design tool.",
  },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "5-second removal",
    desc: "One click. No manual masking, no pixel-picking, no waiting for a server round-trip.",
  },
  {
    icon: "🔒",
    title: "100% private",
    desc: "Processing runs in your browser via WebAssembly. Your image is never uploaded to any server.",
  },
  {
    icon: "🖼️",
    title: "4K transparent output",
    desc: "Export at 3840×2160 with the alpha channel fully preserved. No resolution downgrade, no watermark.",
  },
  {
    icon: "🆓",
    title: "Free forever",
    desc: "No signup, no credit card, no feature lock. Unlimited images with no hidden limits.",
  },
  {
    icon: "📱",
    title: "Works everywhere",
    desc: "Desktop, tablet, or mobile — any modern browser. No app install required.",
  },
  {
    icon: "🎯",
    title: "Clean edges",
    desc: "AI handles hair, fur, and semi-transparent objects with precision — not just hard edges.",
  },
];

const USE_CASES = [
  {
    title: "E-commerce product photos",
    desc: "Amazon, Shopify, eBay, and Etsy require clean white or transparent backgrounds. Remove cluttered backdrops instantly and meet marketplace guidelines without hiring a retoucher.",
  },
  {
    title: "ID card & passport photos",
    desc: "Remove messy home backgrounds from ID photos privately — without uploading sensitive documents to a third-party server. Export transparent, then fill with white or blue as required.",
  },
  {
    title: "Social media & thumbnails",
    desc: "Cut out people or products for YouTube thumbnails, Instagram posts, and ad creatives. Drop the transparent PNG onto any brand background.",
  },
  {
    title: "Design & marketing assets",
    desc: "Isolate subjects for banners, presentations, mockups, and print materials. No Photoshop subscription required.",
  },
  {
    title: "Real estate & listings",
    desc: "Clean up product and property photos for listings, catalogs, and brochures with consistent, distraction-free backgrounds.",
  },
  {
    title: "Personal projects",
    desc: "Profile pictures, stickers, invitations, school projects — anything where you want the subject to stand out on a clean background.",
  },
];

const FAQS = [
  {
    q: "Is BgRemove really free?",
    a: "Yes. BgRemove is 100% free with no signup, no watermark, and no hidden limits. You can remove backgrounds and download transparent 4K PNGs at no cost.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All processing happens locally in your browser using WebAssembly. Your image never leaves your device and is never uploaded to any server.",
  },
  {
    q: "What output resolution do I get?",
    a: "BgRemove exports transparent PNGs at 4K resolution (3840×2160), preserving the original aspect ratio and centering the subject on a transparent canvas.",
  },
  {
    q: "Does BgRemove work on mobile?",
    a: "Yes. BgRemove works in any modern browser on desktop, tablet, and mobile. No app install is required.",
  },
  {
    q: "What image formats are supported?",
    a: "You can upload PNG, JPG, and WEBP images. The output is always a transparent PNG.",
  },
  {
    q: "How long does background removal take?",
    a: "Most images are processed in under 5 seconds on a modern browser. Large images may take slightly longer depending on your device.",
  },
  {
    q: "Can I use the results commercially?",
    a: "Yes. You can use BgRemove outputs for personal and commercial projects. You are responsible for having the rights to the images you process.",
  },
  {
    q: "Is there a watermark on the output?",
    a: "No. BgRemove never adds a watermark. The transparent PNG is delivered exactly as processed, at full 4K resolution.",
  },
];

// ============ PAGE ============
export default function Home() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />

      <main className="overflow-x-hidden">
        

        {/* ============ UPLOAD TOOL ============ */}
        <section id="upload">
          <BgRemover />
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section
          id="how-it-works"
          className="px-4 py-20 sm:px-6"
          style={{ background: "#ffe6e1" }}
        >
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2
                className="text-3xl font-black tracking-tight sm:text-4xl"
                style={{ color: "#0a0a0a" }}
              >
                How to Remove Background from an Image
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base"
                style={{ color: "#5a4a47" }}
              >
                Three steps. Under 10 seconds. No editing skills needed.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="rounded-2xl border bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderColor: "rgba(235,66,3,0.18)" }}
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
                    style={{ background: "#EB4203" }}
                  >
                    {step.n}
                  </div>
                  <h3
                    className="mb-2 text-lg font-bold"
                    style={{ color: "#0a0a0a" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#5a4a47" }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2
                className="text-3xl font-black tracking-tight sm:text-4xl"
                style={{ color: "#0a0a0a" }}
              >
                Why Use BgRemove?
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base"
                style={{ color: "#5a4a47" }}
              >
                The fastest, most private way to remove image backgrounds
                online.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB4203] hover:shadow-lg"
                  style={{ borderColor: "rgba(235,66,3,0.15)" }}
                >
                  <div className="mb-3 text-2xl transition-transform duration-300 group-hover:scale-110">
                    {f.icon}
                  </div>
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ color: "#0a0a0a" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#5a4a47" }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ USE CASES ============ */}
        <section
          className="px-4 py-20 sm:px-6"
          style={{ background: "#ffe6e1" }}
        >
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-12 text-center">
              <h2
                className="text-3xl font-black tracking-tight sm:text-4xl"
                style={{ color: "#0a0a0a" }}
              >
                What Can You Use It For?
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base"
                style={{ color: "#5a4a47" }}
              >
                From e-commerce listings to ID photos — background removal for
                every use case.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {USE_CASES.map((u) => (
                <div
                  key={u.title}
                  className="rounded-2xl bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ border: "1px solid rgba(235,66,3,0.15)" }}
                >
                  <h3
                    className="mb-2 text-base font-bold"
                    style={{ color: "#0a0a0a" }}
                  >
                    {u.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#5a4a47" }}
                  >
                    {u.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ COMPARISON / TRUST ============ */}
        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-12 text-center">
              <h2
                className="text-3xl font-black tracking-tight sm:text-4xl"
                style={{ color: "#0a0a0a" }}
              >
                How BgRemove Compares
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base"
                style={{ color: "#5a4a47" }}
              >
                Most free tools upload your image or add a watermark. BgRemove
                does neither.
              </p>
            </div>

            <div
              className="overflow-hidden rounded-2xl border bg-white/70"
              style={{ borderColor: "rgba(235,66,3,0.18)" }}
            >
              <table className="w-full text-left text-sm">
                <thead>
                  <tr style={{ background: "rgba(235,66,3,0.08)" }}>
                    <th className="px-5 py-4 font-bold" style={{ color: "#0a0a0a" }}>
                      Feature
                    </th>
                    <th className="px-5 py-4 font-bold" style={{ color: "#EB4203" }}>
                      BgRemove
                    </th>
                    <th className="px-5 py-4 font-semibold" style={{ color: "#5a4a47" }}>
                      Typical Free Tools
                    </th>
                  </tr>
                </thead>
                <tbody style={{ color: "#3d2f2c" }}>
                  {[
                    ["Price", "Free", "Free (limited)"],
                    ["Signup required", "No", "Often yes"],
                    ["Watermark", "None", "Often yes"],
                    ["Output resolution", "4K (3840×2160)", "Downgraded"],
                    ["Image uploads to server", "Never", "Usually yes"],
                    ["Processing location", "Your browser", "Remote server"],
                    ["Works offline after load", "Yes", "No"],
                  ].map(([feature, ours, theirs], i) => (
                    <tr
                      key={feature}
                      style={{
                        borderTop: "1px solid rgba(235,66,3,0.10)",
                        background: i % 2 === 0 ? "rgba(255,255,255,0.5)" : "transparent",
                      }}
                    >
                      <td className="px-5 py-3.5 font-medium">{feature}</td>
                      <td className="px-5 py-3.5 font-bold" style={{ color: "#EB4203" }}>
                        {ours}
                      </td>
                      <td className="px-5 py-3.5">{theirs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section
          id="faq"
          className="px-4 py-20 sm:px-6"
          style={{ background: "#ffe6e1" }}
        >
          <div className="mx-auto max-w-[800px]">
            <div className="mb-12 text-center">
              <h2
                className="text-3xl font-black tracking-tight sm:text-4xl"
                style={{ color: "#0a0a0a" }}
              >
                Frequently Asked Questions
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base"
                style={{ color: "#5a4a47" }}
              >
                Everything you need to know about removing backgrounds with
                BgRemove.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border bg-white/70 transition-all duration-300 open:shadow-md"
                  style={{ borderColor: "rgba(235,66,3,0.18)" }}
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold sm:text-base"
                    style={{ color: "#0a0a0a" }}
                  >
                    {faq.q}
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition-transform duration-300 group-open:rotate-45"
                      style={{
                        background: "rgba(235,66,3,0.12)",
                        color: "#EB4203",
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "#5a4a47" }}
                  >
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            <p
              className="mt-8 text-center text-sm"
              style={{ color: "#8a7a77" }}
            >
              Still have questions?{" "}
              <Link
                href="/about"
                className="font-semibold underline"
                style={{ color: "#EB4203" }}
              >
                Learn more about BgRemove
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="px-4 py-20 sm:px-6">
          <div
            className="mx-auto max-w-[800px] rounded-3xl px-6 py-14 text-center sm:px-12"
            style={{
              background:
                "linear-gradient(135deg, #EB4203 0%, #c23300 60%, #0a0a0a 100%)",
            }}
          >
            <h2
              className="text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Ready to remove your background?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-white/80">
              Upload an image and get a transparent 4K PNG in seconds. Free, no
              signup, no uploads.
            </p>
            <a
              href="#upload"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
              style={{ color: "#EB4203" }}
            >
              Upload Image Now
            </a>
          </div>
        </section>

        {/* ============ INTERNAL LINKS (SEO) ============ */}
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-[1100px]">
            <h2
              className="mb-4 text-xl font-bold"
              style={{ color: "#0a0a0a" }}
            >
              Learn more
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "How to Remove Image Background for Free",
                  href: "/blog/how-to-remove-image-background-free",
                  desc: "Step-by-step guide with no signup required.",
                },
                {
                  title: "Best Free Background Remover Tools 2026",
                  href: "/blog/best-free-background-remover-tools-2026",
                  desc: "We tested 7 tools — here's how they compare.",
                },
                {
                  title: "4K Transparent PNG Export Guide",
                  href: "/blog/4k-transparent-png-export-guide",
                  desc: "Everything about 3840×2160 transparent output.",
                },
                {
                  title: "Remove Background from ID Card Photo",
                  href: "/blog/remove-background-id-card-photo",
                  desc: "Private, print-ready ID photo backgrounds.",
                },
                {
                  title: "About BgRemove",
                  href: "/about",
                  desc: "How it works and who it's for.",
                },
                {
                  title: "Privacy Policy",
                  href: "/privacy",
                  desc: "Your images never leave your device.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-xl border bg-white/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#EB4203] hover:shadow-md"
                  style={{ borderColor: "rgba(235,66,3,0.15)" }}
                >
                  <div
                    className="text-sm font-semibold transition-colors duration-300 group-hover:text-[#EB4203]"
                    style={{ color: "#0a0a0a" }}
                  >
                    {link.title}
                  </div>
                  <div className="mt-1 text-xs" style={{ color: "#5a4a47" }}>
                    {link.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}