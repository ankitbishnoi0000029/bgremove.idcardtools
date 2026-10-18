import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_URL
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : "https://bgremove.idcardtools.com";

export const metadata: Metadata = {
  title: "Blog — Background Removal Guides & Tips",
  description:
    "Guides, comparisons, and tutorials on removing image backgrounds for free. Learn how to export transparent 4K PNGs, choose the right tool, and stay private.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Blog — Background Removal Guides & Tips",
    description:
      "Guides, comparisons, and tutorials on removing image backgrounds for free.",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "120px 20px 80px",
        minHeight: "100vh",
      }}
    >
      <header style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "#0a0a0a",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Background Removal <span style={{ color: "#EB4203" }}>Blog</span>
        </h1>
        <p style={{ color: "#5a4a47", fontSize: 16, maxWidth: 640 }}>
          Guides, comparisons, and tutorials on removing image backgrounds for
          free — without uploading your photos to any server.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="fade-in-up"
            style={{
              display: "block",
              padding: 24,
              borderRadius: 18,
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(235,66,3,0.18)",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 600,
                color: "#EB4203",
                background: "rgba(235,66,3,0.10)",
                padding: "4px 10px",
                borderRadius: 100,
                marginBottom: 12,
              }}
            >
              {post.category}
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#0a0a0a",
                lineHeight: 1.35,
                marginBottom: 8,
              }}
            >
              {post.title}
            </h2>
            <p style={{ color: "#5a4a47", fontSize: 14, lineHeight: 1.55 }}>
              {post.excerpt}
            </p>
            <div
              style={{
                marginTop: 16,
                fontSize: 12,
                color: "#8a7a77",
                display: "flex",
                gap: 12,
              }}
            >
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span>· {post.readMinutes} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}