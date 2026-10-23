import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  type BlogSection,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={idx}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#0a0a0a",
            marginTop: 32,
            marginBottom: 12,
            letterSpacing: "-0.01em",
          }}
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={idx}
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#0a0a0a",
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          {section.text}
        </h3>
      );
    case "ul":
      return (
        <ul
          key={idx}
          style={{
            paddingLeft: 22,
            margin: "12px 0",
            color: "#3d2f2c",
            lineHeight: 1.7,
          }}
        >
          {section.items.map((it, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={idx}
          style={{
            paddingLeft: 22,
            margin: "12px 0",
            color: "#3d2f2c",
            lineHeight: 1.7,
          }}
        >
          {section.items.map((it, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              {it}
            </li>
          ))}
        </ol>
      );
    default:
      return (
        <p
          key={idx}
          style={{
            color: "#3d2f2c",
            fontSize: 16,
            lineHeight: 1.75,
            margin: "12px 0",
          }}
        >
          {section.text}
        </p>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "BgRemove",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/og-image.png`,
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "120px 20px 80px",
        minHeight: "100vh",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav
        aria-label="Breadcrumb"
        style={{
          fontSize: 13,
          color: "#8a7a77",
          marginBottom: 20,
          display: "flex",
          gap: 6,
        }}
      >
        <Link href="/" style={{ color: "#EB4203", textDecoration: "none" }}>
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" style={{ color: "#EB4203", textDecoration: "none" }}>
          Blog
        </Link>
        <span>/</span>
        <span>{post.category}</span>
      </nav>

      <article>
        <header style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 600,
              color: "#EB4203",
              background: "rgba(235,66,3,0.10)",
              padding: "4px 10px",
              borderRadius: 100,
              marginBottom: 14,
            }}
          >
            {post.category}
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#0a0a0a",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            {post.title}
          </h1>
          <div style={{ color: "#8a7a77", fontSize: 13, display: "flex", gap: 12 }}>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.updatedAt && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={post.updatedAt}>
                  Updated{" "}
                  {new Date(`${post.updatedAt}T12:00:00Z`).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                </time>
              </>
            )}
            <span>· {post.readMinutes} min read</span>
          </div>
          <p style={{ color: "#5a4a47", fontSize: 16, lineHeight: 1.65, marginTop: 18 }}>
            {post.excerpt}
          </p>
        </header>

        {post.sections.map(renderSection)}
      </article>

      <p style={{ marginTop: 40, color: "#3d2f2c", fontSize: 15, lineHeight: 1.7 }}>
        Ready to try it?{" "}
        <Link href="/#upload" style={{ color: "#EB4203", fontWeight: 600 }}>
          Open the free background remover
        </Link>
        .
      </p>

      {related.length > 0 && (
        <section style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(235,66,3,0.15)" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#0a0a0a",
              marginBottom: 20,
            }}
          >
            Related articles
          </h2>
          <div style={{ display: "grid", gap: 14 }}>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                style={{
                  padding: 16,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(235,66,3,0.15)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.25s ease",
                }}
              >
                <div style={{ fontWeight: 600, color: "#0a0a0a", fontSize: 15 }}>
                  {r.title}
                </div>
                <div style={{ color: "#5a4a47", fontSize: 13, marginTop: 4 }}>
                  {r.excerpt}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: 48 }}>
        <Link
          href="/blog"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: 999,
            background: "#EB4203",
            color: "#fff",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}