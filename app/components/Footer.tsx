"use client";

import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { label: "Background Remover", href: "/" },
      { label: "4K Export", href: "/#upload" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      {
        label: "How to Remove BG Free",
        href: "/blog/how-to-remove-image-background-free",
      },
      {
        label: "Choosing a Free Background Remover",
        href: "/blog/best-free-background-remover-tools-2026",
      },
      {
        label: "Transparent PNG Guide",
        href: "/blog/4k-transparent-png-export-guide",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com/bgremove",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.99 0 1.98.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.38-5.26 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/bgremove",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid rgba(235, 66, 3, 0.18)",
        background: "linear-gradient(180deg, rgba(255,241,239,0) 0%, rgba(235,66,3,0.04) 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="blob pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #EB4203, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="blob pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #0a0a0a, transparent 70%)", animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 py-14 sm:px-8">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 select-none"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-lg text-white
                           transition-all duration-300
                           group-hover:rotate-[-8deg] group-hover:scale-110
                           group-hover:shadow-[0_6px_18px_rgba(235,66,3,0.5)]"
                style={{ background: "linear-gradient(135deg, #EB4203, #0a0a0a)" }}
              >
                ✂
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#0a0a0a",
                }}
              >
                Bg<span style={{ color: "#EB4203" }}>Remove</span>
              </span>
            </Link>

            <p
              className="mt-4 max-w-[280px] text-sm leading-relaxed"
              style={{ color: "#5a4a47" }}
            >
              Free online background remover. Process the selected image in your browser and download a transparent PNG without an account or watermark.
            </p>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["100% Free", "No Signup", "Client-Side"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    background: "rgba(235, 66, 3, 0.10)",
                    color: "#EB4203",
                    border: "1px solid rgba(235, 66, 3, 0.22)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

         
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-4 text-xs font-bold uppercase tracking-wider"
                style={{ color: "#0a0a0a" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="group relative inline-block text-sm transition-colors duration-300"
                      style={{ color: "#5a4a47" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#EB4203";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#5a4a47";
                      }}
                    >
                      {link.label}
                      <span
                        className="pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] w-0 rounded-full
                                   transition-all duration-300 group-hover:w-full"
                        style={{ background: "#EB4203" }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="my-8 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(235,66,3,0.25), transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p
            className="text-xs"
            style={{ color: "#8a7a77" }}
          >
            © {year} BgRemove · Built with care · No uploads, no tracking
          </p>
          <p
            className="text-xs"
            style={{ color: "#8a7a77" }}
          >
            Browser-based image processing · <span style={{ color: "#EB4203", fontWeight: 600 }}>Transparent PNG export</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
