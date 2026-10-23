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
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
  excerpt: string;
  sections: BlogSection[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-to-remove-image-background-free",
    title: "How to Remove an Image Background Online for Free",
    description:
      "A practical guide to removing an image background online, downloading a transparent PNG, and checking the result before you use it.",
    keywords: ["remove image background free", "online background remover", "transparent PNG"],
    category: "Guides",
    publishedAt: "2026-01-12",
    updatedAt: "2026-10-24",
    readMinutes: 2,
    excerpt:
      "Choose a suitable photo, make a browser-based cutout, and download or edit the transparent PNG.",
    sections: [
      {
        type: "p",
        text: "A free online background remover can make a cutout without requiring photo-editing software. BgRemove processes the selected image in your browser and exports a PNG; you can use the editor to keep transparency or place the cutout on a solid background.",
      },
      { type: "h2", text: "Before you start" },
      {
        type: "p",
        text: "Use a clear image where the subject is easy to distinguish from its surroundings. Good lighting and visible edges can help an automatic selection, though no tool will produce perfect results on every photo.",
      },
      { type: "h2", text: "Remove the background in a few steps" },
      {
        type: "ol",
        items: [
          "Open the BgRemove tool and choose a PNG, JPG, or WEBP image.",
          "Let the browser-based model process the image. The first use may need to load model files; time depends on your connection, image, and device.",
          "Inspect the cutout, especially hair, thin objects, and low-contrast edges.",
          "Download the transparent PNG, or open Edit & Crop to crop or select a solid background such as white.",
        ],
      },
      { type: "h2", text: "Transparent or white background?" },
      {
        type: "p",
        text: "A transparent PNG is useful when you plan to place the subject over another image or color. If you need a plain white background, use the editor's White option before downloading. Check the final image at its intended size.",
      },
      { type: "h2", text: "Understand the export size" },
      {
        type: "p",
        text: "BgRemove places the cutout on a 3840 × 2160 pixel canvas. This describes the canvas dimensions, not the detail in the source: enlarging a small photo cannot recover detail that was not in the original.",
      },
      {
        type: "p",
        text: "For a quick start, use the background remover on the home page and review the downloaded image before publishing or printing it.",
      },
    ],
  },
  {
    slug: "best-free-background-remover-tools-2026",
    title: "How to Choose a Free Online Background Remover",
    description:
      "Compare the practical details that matter in a free background remover: image handling, supported formats, output, editing controls, and device requirements.",
    keywords: [
      "free online background remover",
      "background remover without signup",
      "transparent background maker",
    ],
    category: "Guides",
    publishedAt: "2026-01-14",
    updatedAt: "2026-10-24",
    readMinutes: 2,
    excerpt:
      "A checklist for choosing a background remover based on privacy, output format, editing needs, and device compatibility.",
    sections: [
      {
        type: "p",
        text: "“Free” does not describe every detail of an online background remover. Before choosing one, check what happens to your image, which formats it accepts, what the download contains, and whether the result is suitable for your next step.",
      },
      { type: "h2", text: "Check how the image is processed" },
      {
        type: "p",
        text: "Read the service's privacy information. Some tools send images to a remote service; others process a selected file in the browser. BgRemove uses browser-based processing for the selected image. The page and model files still need to load in your browser.",
      },
      { type: "h2", text: "Look beyond the word “free”" },
      {
        type: "ul",
        items: [
          "Does the tool require an account?",
          "Does the exported image have a watermark?",
          "Which input formats are supported, and what format is downloaded?",
          "Can you add a solid background or crop the result?",
          "Does it explain output dimensions and whether small images are enlarged?",
        ],
      },
      { type: "h2", text: "Consider your device and image" },
      {
        type: "p",
        text: "A browser-based model uses your device's memory and processing resources. Large images may take longer or be unsuitable for a low-memory device. A clear subject/background boundary can also make an automatic cutout easier to inspect.",
      },
      { type: "h2", text: "Review the result, not just the preview" },
      {
        type: "p",
        text: "Check delicate edges, shadows, and transparent objects at the size where you will use them. If the image is for a listing, document, or print, compare it with the current requirements of the platform or authority before relying on it.",
      },
      {
        type: "p",
        text: "BgRemove is one option for a free online background removal workflow: it accepts PNG, JPG, and WEBP images, processes the selected file in the browser, and downloads a PNG without adding a watermark.",
      },
    ],
  },
  {
    slug: "4k-transparent-png-export-guide",
    title: "Transparent PNGs: Canvas Size, Backgrounds, and Image Detail",
    description:
      "Understand transparent PNGs, canvas dimensions, solid backgrounds, and why enlarging an image does not create additional detail.",
    keywords: [
      "transparent PNG",
      "transparent background maker",
      "PNG canvas dimensions",
    ],
    category: "Guides",
    publishedAt: "2026-01-16",
    updatedAt: "2026-10-24",
    readMinutes: 2,
    excerpt:
      "Learn how transparency works, when to use a white background, and what a large export canvas does—and does not—mean.",
    sections: [
      {
        type: "p",
        text: "A transparent PNG stores a subject without filling the surrounding canvas with a solid color. This lets you place a cutout over a different color, photo, or layout in an editor.",
      },
      { type: "h2", text: "Canvas dimensions versus image detail" },
      {
        type: "p",
        text: "BgRemove exports a 3840 × 2160 pixel canvas and centers the cutout while preserving its proportions. If the original image is smaller, it may be enlarged to fit; the larger pixel dimensions do not create detail that was absent from the source.",
      },
      { type: "h2", text: "When to keep transparency or add white" },
      {
        type: "ul",
        items: [
          "Keep transparency when you will place the subject over another background.",
          "Choose a white background when a design or listing calls for a plain white image.",
          "Check the requirements of the destination before preparing product or document photos.",
        ],
      },
      { type: "h2", text: "Check the image before using it" },
      {
        type: "ol",
        items: [
          "View the PNG over both a light and a dark background to spot unwanted edge pixels.",
          "Inspect fine details such as hair, fur, glass, or shadows.",
          "Compare the result with the original and check that the cutout has enough detail for its intended size.",
        ],
      },
      {
        type: "p",
        text: "PNG supports transparency; JPEG does not. If you save the cutout as JPEG in another app, that app must fill transparent pixels with a background color.",
      },
    ],
  },
  {
    slug: "remove-background-id-card-photo",
    title: "How to Prepare an ID Photo Background Carefully",
    description:
      "Use a browser-based background remover to prepare an ID photo cutout, then check the current official rules for your document before submitting it.",
    keywords: [
      "ID photo background",
      "passport photo background remover",
      "remove background from photo",
    ],
    category: "Guides",
    publishedAt: "2026-01-18",
    updatedAt: "2026-10-24",
    readMinutes: 2,
    excerpt:
      "A cautious workflow for editing an ID photo background while checking the relevant authority's current requirements.",
    sections: [
      {
        type: "p",
        text: "An image editor can help prepare a photo cutout, but ID and passport photo rules vary by document and issuing authority. Some rules restrict background changes or other edits, so check the current official guidance before submitting an edited image.",
      },
      { type: "h2", text: "Keep the photo and requirements in mind" },
      {
        type: "ul",
        items: [
          "Start with a clear, evenly lit photo with the face and shoulders visible.",
          "Check whether the issuing authority permits background editing.",
          "Confirm required background color, photo dimensions, framing, and file format from the official source.",
        ],
      },
      { type: "h2", text: "A careful editing workflow" },
      {
        type: "ol",
        items: [
          "If edits are allowed, choose the image in BgRemove. The selected photo is processed in the browser.",
          "Review the cutout around hair, ears, and shoulders; redo the photo if edges or lighting look unnatural.",
          "Use Edit & Crop to choose the background color only if the official rules call for it.",
          "Check final dimensions and framing against the authority's instructions before submitting.",
        ],
      },
      { type: "h2", text: "A note about privacy and suitability" },
      {
        type: "p",
        text: "BgRemove processes the selected image in your browser rather than sending it to the application server for background removal. This does not mean every edited photo will meet document rules: use the issuing authority's current guidance and do not alter the subject's appearance.",
      },
    ],
  },
  {
    slug: "remove-background-from-product-photos",
    title: "How to Remove a Background from Product Photos",
    description:
      "Create a clean product photo cutout, choose a transparent or solid background, and review the image against your store's current listing requirements.",
    keywords: [
      "remove background from product photos",
      "product photo background remover",
      "white background product photo",
    ],
    category: "Guides",
    publishedAt: "2026-10-24",
    readMinutes: 2,
    excerpt:
      "A practical workflow for preparing product image cutouts while keeping listing rules, edges, and image quality in mind.",
    sections: [
      {
        type: "p",
        text: "A product photo cutout can help a product stand out in a listing, catalog, or promotional design. BgRemove removes the surrounding background in your browser and exports a PNG; check your destination's rules before deciding whether to keep transparency or use a solid color.",
      },
      { type: "h2", text: "Start with a clear product photo" },
      {
        type: "ul",
        items: [
          "Use a well-lit image where the product is distinct from its surroundings.",
          "Keep the whole product inside the frame and avoid motion blur where possible.",
          "A simple, contrasting background can make the product edge easier to review.",
        ],
      },
      { type: "h2", text: "Remove the background and prepare the image" },
      {
        type: "ol",
        items: [
          "Choose a PNG, JPG, or WEBP product photo in the BgRemove tool.",
          "Wait for the browser-based model to create a cutout; processing time depends on your device and image.",
          "Inspect the edges, including handles, reflective surfaces, transparent packaging, and soft shadows.",
          "Download the transparent PNG, or use Edit & Crop to choose a solid background if your design or listing calls for one.",
        ],
      },
      { type: "h2", text: "Choose transparency or a solid background" },
      {
        type: "p",
        text: "A transparent PNG is useful when you will place the product into a designed layout. A white or other solid background may suit a catalog image, but marketplace and retailer requirements differ. Confirm the current rules for background color, crop, margins, and file dimensions before publishing.",
      },
      { type: "h2", text: "Review the result at its intended size" },
      {
        type: "p",
        text: "Check that important product details remain visible and that no parts were accidentally removed. Compare the exported image with the original, and make sure the cutout has enough detail for the size where it will appear. A 3840 × 2160 export canvas does not add detail to a smaller source photo.",
      },
      {
        type: "p",
        text: "BgRemove processes the selected image in your browser rather than sending it to the application server for background removal. For other uses, see the guide to transparent PNGs and canvas dimensions.",
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
