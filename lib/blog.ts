export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  publishedAt: string; // ISO
  updatedAt?: string;
  readMinutes: number;
  excerpt: string;
  sections: BlogSection[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-to-remove-image-background-free",
    title: "How to Remove Image Background for Free in 2026 (No Signup)",
    description:
      "A step-by-step guide to removing image backgrounds online for free. No signup, no watermark, and transparent 4K PNG export — all done in your browser.",
    keywords: [
      "remove image background free",
      "background remover online",
      "transparent png",
      "free background eraser",
    ],
    category: "Guides",
    publishedAt: "2026-01-12",
    updatedAt: "2026-01-20",
    readMinutes: 5,
    excerpt:
      "Learn how to remove image backgrounds for free in 2026 using an AI tool that runs entirely in your browser. Output transparent 4K PNGs in seconds.",
    sections: [
      {
        type: "p",
        text: "Removing an image background used to require Photoshop, a paid subscription, or uploading your file to a third-party server. In 2026, a modern AI background remover can do it for free in under 5 seconds — without uploading anything.",
      },
      { type: "h2", text: "Why use a browser-based background remover?" },
      {
        type: "ul",
        items: [
          "Your image never leaves your device — everything runs in WebAssembly.",
          "No signup, no email, no credit card.",
          "No watermark, no resolution downgrade.",
          "Exports transparent 4K PNGs instantly.",
        ],
      },
      { type: "h2", text: "Step-by-step: remove background in 3 steps" },
      {
        type: "ol",
        items: [
          "Open BgRemove in your browser.",
          "Drag and drop your image (PNG, JPG, or WEBP).",
          "Click Download 4K Transparent PNG. Done.",
        ],
      },
      { type: "h2", text: "Best use cases" },
      {
        type: "p",
        text: "Background removal is useful for e-commerce product photos, profile pictures, ID card photos, thumbnails, blog headers, and presentations. Any image where you want the subject to stand out on a clean or transparent background.",
      },
      { type: "h2", text: "What output do you get?" },
      {
        type: "p",
        text: "BgRemove exports a transparent PNG at 4K resolution (3840×2160), preserving the original aspect ratio. The alpha channel is kept intact, so you can drop the result onto any background color or image.",
      },
    ],
  },
  {
    slug: "best-free-background-remover-tools-2026",
    title: "7 Best Free Background Remover Tools in 2026 (Tested)",
    description:
      "We tested 7 free background remover tools in 2026. Compare speed, quality, watermark policy, and whether they keep your images private.",
    keywords: [
      "best free background remover",
      "background remover tools 2026",
      "remove bg free",
      "online background eraser",
    ],
    category: "Reviews",
    publishedAt: "2026-01-14",
    readMinutes: 6,
    excerpt:
      "A hands-on comparison of 7 free background removers in 2026 — ranked by speed, quality, privacy, and whether they add a watermark.",
    sections: [
      {
        type: "p",
        text: "Free background removers have exploded in 2026 — but most add watermarks, downgrade resolution, or quietly upload your images to a server. We tested 7 tools across 20 images to find which ones actually deliver.",
      },
      { type: "h2", text: "Our testing criteria" },
      {
        type: "ul",
        items: [
          "Edge quality on hair and semi-transparent objects.",
          "Output resolution and file format.",
          "Watermark policy on free tier.",
          "Whether the tool uploads images to a server.",
          "Speed on a typical laptop.",
        ],
      },
      { type: "h2", text: "The top pick: BgRemove" },
      {
        type: "p",
        text: "BgRemove scored highest overall because it processes images 100% in the browser, exports transparent 4K PNGs, and adds no watermark. It's free with no signup required.",
      },
      { type: "h2", text: "How the other tools compare" },
      {
        type: "p",
        text: "Most browser-based tools fall into two groups: those that upload your image to a server (fast, but a privacy risk) and those that run locally (private, but often slower on large images). BgRemove runs locally using WebAssembly and still completes typical images in under 5 seconds.",
      },
      { type: "h2", text: "Which should you use?" },
      {
        type: "p",
        text: "If privacy matters — for client work, ID photos, or anything sensitive — always pick a tool that runs entirely in your browser. If you only care about speed and don't mind uploads, a server-based option can work. For everything else, BgRemove is the safer default.",
      },
    ],
  },
  {
    slug: "4k-transparent-png-export-guide",
    title: "4K Transparent PNG Export: Complete Guide",
    description:
      "Everything you need to know about exporting transparent PNGs at 4K (3840×2160) resolution — file size, best practices, and where 4K matters.",
    keywords: [
      "4k transparent png",
      "transparent png export",
      "3840x2160 png",
      "high resolution background remover",
    ],
    category: "Guides",
    publishedAt: "2026-01-16",
    readMinutes: 4,
    excerpt:
      "Why 4K transparent PNGs matter, how to export them correctly, and what to watch out for when scaling up smaller images.",
    sections: [
      {
        type: "p",
        text: "4K (3840×2160) transparent PNGs are the standard for modern e-commerce listings, print-ready mockups, and high-DPI displays. Getting a clean 4K export matters — a blurry cutout looks worse than no cutout at all.",
      },
      { type: "h2", text: "When should you export at 4K?" },
      {
        type: "ul",
        items: [
          "E-commerce product photography (Amazon, Shopify, Etsy).",
          "Print-ready mockups and packaging.",
          "Retina / high-DPI web hero images.",
          "Video thumbnails and presentation covers.",
        ],
      },
      { type: "h2", text: "How BgRemove handles 4K export" },
      {
        type: "p",
        text: "BgRemove fits your cutout into a 3840×2160 canvas while preserving aspect ratio. The image is centered on a transparent canvas, so nothing is cropped or stretched. The alpha channel is preserved end-to-end.",
      },
      { type: "h2", text: "File size expectations" },
      {
        type: "p",
        text: "A 4K transparent PNG typically ranges from 2 MB to 8 MB depending on complexity. Simple product shots with clean edges compress well; photos with hair or fine detail will be larger.",
      },
      { type: "h2", text: "Common mistakes to avoid" },
      {
        type: "ol",
        items: [
          "Upscaling a tiny image to 4K — the cutout will look soft.",
          "Flattening onto white before export — you lose transparency.",
          "Using JPEG — it doesn't support transparency.",
        ],
      },
    ],
  },
  {
    slug: "remove-background-id-card-photo",
    title: "Remove Background from ID Card Photo (Free, No Signup)",
    description:
      "How to remove the background from an ID card or passport photo for free, without uploading your photo to a server. Transparent, print-ready output.",
    keywords: [
      "id card photo background",
      "passport photo background remover",
      "id photo background",
      "idcardtools",
    ],
    category: "Guides",
    publishedAt: "2026-01-18",
    readMinutes: 4,
    excerpt:
      "Remove the background from ID card and passport photos privately — without uploading your photo to any server.",
    sections: [
      {
        type: "p",
        text: "ID photos need clean, uniform backgrounds. If you took your photo at home, the background is often messy or off-white. You can fix this for free — and without uploading your sensitive photo to any server — using a browser-based background remover.",
      },
      { type: "h2", text: "Why privacy matters for ID photos" },
      {
        type: "p",
        text: "ID photos are personal. Most free background removers upload your image to a server, process it, then delete it. If you don't want your photo leaving your device at all, use a tool that runs in your browser using WebAssembly.",
      },
      { type: "h2", text: "Step-by-step" },
      {
        type: "ol",
        items: [
          "Open BgRemove on the device that has the photo.",
          "Drop in your ID photo (JPG or PNG).",
          "Download the transparent 4K PNG.",
          "Open it in any photo editor and fill the background with the required color (white, blue, or grey).",
        ],
      },
      { type: "h2", text: "Which background color do I need?" },
      {
        type: "ul",
        items: [
          "India: white for most IDs; blue for some state documents.",
          "USA passport: plain white or off-white.",
          "Schengen visa: light grey or white.",
        ],
      },
      { type: "h2", text: "Print sizing tips" },
      {
        type: "p",
        text: "Print your final image at 300 DPI. A standard 2×2 inch (US passport) photo needs at least 600×600 pixels — 4K output gives you plenty of margin for high-quality printing.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);
}