import type { Metadata } from "next";
import BgRemover from "./components/BgRemover";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Online Background Remover",
  description:
    "Remove an image background online for free. Process photos in your browser and download a transparent PNG—no account or watermark.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Free Online Background Remover — BgRemove",
    description:
      "Remove an image background online for free. Process it in your browser and download a transparent PNG, with no account or watermark.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Background Remover — BgRemove",
    description:
      "Remove an image background in your browser and download a transparent PNG. Free to use, no account or watermark.",
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
        "Supports PNG, JPG, WEBP",
      ],
      screenshot: `${SITE_URL}/og-image.png`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ],
    },
  ],
};

// ============ CONTENT DATA ============
const STEPS = [
  {
    n: "01",
    title: "Upload your image",
    desc: "Choose a PNG, JPG, or WEBP image from your device. No account is required.",
  },
  {
    n: "02",
    title: "AI removes the background",
    desc: "An on-device model creates a cutout in your browser. Processing time depends on the image and your device.",
  },
  {
    n: "03",
    title: "Download or edit the PNG",
    desc: "Download a transparent PNG on a 3840 × 2160 canvas, or open the editor to crop it and choose transparent, white, black, or brand-color backgrounds.",
  },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Remove a background online",
    desc: "Choose an image and let the browser-based model create a cutout. Processing time depends on your image and device.",
  },
  {
    icon: "🔒",
    title: "Image processing in your browser",
    desc: "The selected image is processed on your device rather than sent to BgRemove for background removal.",
  },
  {
    icon: "🖼️",
    title: "Transparent PNG download",
    desc: "Download a PNG on a 3840 × 2160 canvas. Upscaling a small source does not add image detail.",
  },
  {
    icon: "🆓",
    title: "Free to use, no account",
    desc: "Use the tool without creating an account. BgRemove does not add a watermark to the PNG.",
  },
  {
    icon: "📱",
    title: "Works everywhere",
    desc: "Desktop, tablet, or mobile — any modern browser. No app install required.",
  },
  {
    icon: "🎯",
    title: "Review the cutout",
    desc: "Results vary with the source image. Check fine edges and details before using the PNG in a final design.",
  },
];

const USE_CASES = [
  {
    title: "E-commerce product photos",
    desc: "Create a transparent cutout for a product listing, then check the marketplace's current image rules before publishing.",
  },
  {
    title: "ID card & passport photos",
    desc: "Prepare a cutout locally in your browser. Check the issuing authority's current photo rules for background color, framing, and dimensions before submitting.",
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
    desc: "Create cutouts for listing images and layouts. Review the result against the original before publishing.",
  },
  {
    title: "Personal projects",
    desc: "Profile pictures, stickers, invitations, school projects — anything where you want the subject to stand out on a clean background.",
  },
];

const FAQS = [
  {
    q: "Can I remove an image background online for free?",
    a: "Yes. BgRemove is free to use in your browser and does not require an account. The downloaded PNG has no BgRemove watermark.",
  },
  {
    q: "Is my image uploaded for processing?",
    a: "The selected image is processed in your browser using WebAssembly, rather than sent to BgRemove's application server. Your browser still requests the website and model files needed to run the tool.",
  },
  {
    q: "What does the downloaded PNG contain?",
    a: "By default, the cutout is centered on a 3840 × 2160 canvas with transparent space around it. If you choose a solid editor background, the PNG uses that color instead. Enlarging a small original does not restore missing detail.",
  },
  {
    q: "Can I add a white background instead of transparency?",
    a: "Yes. After processing, choose Edit & Crop and select White in the background controls. You can also keep the background transparent or choose black or the brand color.",
  },
  {
    q: "What image formats are supported?",
    a: "The tool accepts PNG, JPG, and WEBP images and downloads a PNG.",
  },
  {
    q: "Will the cutout preserve every fine edge?",
    a: "Results depend on the image, subject, contrast, and device. Inspect hair, translucent areas, and similar fine edges; no automatic remover can guarantee a perfect result for every photo.",
  },
  {
    q: "Can I use an edited photo for an ID or passport application?",
    a: "The tool can create a cutout, but photo rules vary by issuing authority and may restrict edits. Check the current official requirements before submitting an edited image.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// ============ PAGE ============
export default function Home() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                Choose an image, review the cutout, and download a transparent PNG.
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
                An online background remover that processes your selected
                image in your browser.
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
                What to Expect from the Download
              </h2>
              <p
                className="mx-auto mt-3 max-w-xl text-base"
                style={{ color: "#5a4a47" }}
              >
                A quick overview of what the tool does and what its output means.
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
                      What to know
                    </th>
                  </tr>
                </thead>
                <tbody style={{ color: "#3d2f2c" }}>
                  {[
                    ["Price", "Free to use", "No account required"],
                    ["Input formats", "PNG, JPG, WEBP", "Choose a supported image"],
                    ["Download", "PNG with transparent background", "No BgRemove watermark"],
                    ["Canvas", "3840 × 2160 pixels", "Upscaling does not add source detail"],
                    ["Image processing", "In your browser", "Website/model files still load in your browser"],
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
              Remove the background in your browser and download a transparent
              PNG, without creating an account.
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
                  title: "What to Look for in a Free Background Remover",
                  href: "/blog/best-free-background-remover-tools-2026",
                  desc: "Compare privacy, formats, output, and editing needs.",
                },
                {
                  title: "Transparent PNG Export Guide",
                  href: "/blog/4k-transparent-png-export-guide",
                  desc: "Understand canvas dimensions, transparency, and source detail.",
                },
                {
                  title: "Remove Background from ID Card Photo",
                  href: "/blog/remove-background-id-card-photo",
                  desc: "Check the issuing authority's photo rules before submitting an edit.",
                },
                {
                  title: "Remove Background from Product Photos",
                  href: "/blog/remove-background-from-product-photos",
                  desc: "Prepare a product cutout and review listing image requirements.",
                },
                {
                  title: "Remove a Background from Product Photos",
                  href: "/blog/remove-background-from-product-photos",
                  desc: "Prepare a product cutout and check listing requirements.",
                },
                {
                  title: "Privacy Policy",
                  href: "/privacy",
                  desc: "How selected images are processed in your browser.",
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