"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out
        ${scrolled ? "py-2.5" : "py-4"}
        ${mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
      `}
      style={{
        backgroundColor: scrolled ? "rgba(255, 241, 239, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(235, 66, 3, 0.15)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 8px 30px rgba(235, 66, 3, 0.06)" : "none",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 select-none">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-lg text-white
                       transition-all duration-300 ease-out
                       group-hover:rotate-[-8deg] group-hover:scale-110
                       group-hover:shadow-[0_8px_22px_rgba(235,66,3,0.45)]"
            style={{ background: "linear-gradient(135deg, #EB4203, #0a0a0a)" }}
          >
            ✂
          </div>
          <span
            className="text-lg font-bold tracking-tight sm:text-xl"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#0a0a0a",
            }}
          >
            Bg<span style={{ color: "#EB4203" }}>Remove</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-lg px-3.5 py-2 text-sm font-medium
                         transition-colors duration-300"
              style={{ color: "#3d2f2c" }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#EB4203]">
                {link.label}
              </span>
              <span
                className="pointer-events-none absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full
                           transition-all duration-300 ease-out group-hover:w-[60%]"
                style={{ background: "#EB4203" }}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/#upload"
            className="group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white
                       transition-all duration-300 ease-out
                       hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(235,66,3,0.35)]
                       active:translate-y-0 active:scale-[0.98]"
            style={{ background: "#EB4203" }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Upload Image
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
                         from-transparent via-white/40 to-transparent
                         transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 md:hidden"
          style={{ color: "#0a0a0a" }}
        >
          <div className="relative h-4 w-5">
            <span
              className="absolute left-0 h-[2px] w-full rounded-full transition-all duration-300"
              style={{
                background: "#0a0a0a",
                top: menuOpen ? "7px" : "2px",
                transform: menuOpen ? "rotate(45deg)" : "none",
              }}
            />
            <span
              className="absolute left-0 top-[7px] h-[2px] w-full rounded-full transition-all duration-300"
              style={{
                background: "#0a0a0a",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="absolute left-0 h-[2px] w-full rounded-full transition-all duration-300"
              style={{
                background: "#0a0a0a",
                top: menuOpen ? "7px" : "12px",
                transform: menuOpen ? "rotate(-45deg)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-0 -z-10 md:hidden transition-opacity duration-300
          ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "rgba(255, 241, 239, 0.96)", backdropFilter: "blur(20px)" }}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`mt-20 flex flex-col gap-2 px-6 transition-all duration-500
            ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3.5 text-lg font-semibold transition-all duration-300
                         hover:bg-[rgba(235,66,3,0.08)] hover:pl-5"
              style={{
                color: "#0a0a0a",
                fontFamily: "'Space Grotesk', sans-serif",
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#upload"
            onClick={() => setMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white
                       transition-transform duration-300 active:scale-[0.98]"
            style={{ background: "#EB4203" }}
          >
            Upload Image →
          </Link>

          <p
            className="mt-6 px-4 text-center text-xs"
            style={{ color: "#8a7a77" }}
          >
            Free · No signup · No uploads
          </p>
        </div>
      </div>
    </header>
  );
}