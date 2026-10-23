"use client";

import { useState, useCallback, useRef, useMemo, useEffect, type CSSProperties, type PointerEvent as RPointerEvent } from "react";

// ================= TYPES =================
type ProcessingState = "idle" | "loading" | "processing" | "done" | "error";
type CropHandle = "tl" | "tr" | "bl" | "br" | "tm" | "bm" | "lm" | "rm" | "move";
type Crop = { x: number; y: number; w: number; h: number };

// ================= CONSTANTS =================
const OUTPUT_W = 3840;
const OUTPUT_H = 2160;
const BRAND = { primary: "#fff1ef", secondary: "#EB4203", black: "#0a0a0a" };

const CHECKER: CSSProperties = {
  backgroundImage: "conic-gradient(#d4d4d4 25%, #fafafa 0 50%, #d4d4d4 0 75%, #fafafa 0)",
  backgroundSize: "20px 20px",
};

const fadeUp: CSSProperties = {
  animation: "fadeUp 0.55s cubic-bezier(.22,1,.36,1) both",
};

const ASPECTS: { label: string; ratio: number | null }[] = [
  { label: "Free", ratio: null },
  { label: "1:1", ratio: 1 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "9:16", ratio: 9 / 16 },
  { label: "3:4", ratio: 3 / 4 },
];

const BG_PRESETS: { label: string; value: string | "transparent" }[] = [
  { label: "Transparent", value: "transparent" },
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#000000" },
  { label: "Brand", value: "#EB4203" },
];

// ================= HELPERS =================
const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });

const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/png"));

const cropCursor = (h: CropHandle) => {
  switch (h) {
    case "tl":
    case "br":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    case "tm":
    case "bm":
      return "ns-resize";
    case "lm":
    case "rm":
      return "ew-resize";
    default:
      return "move";
  }
};

// ================= STYLES =================
const styles = `
@keyframes floaty {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-18px) scale(1.06); }
}
@keyframes pulseRing {
  0% { transform: scale(0.85); opacity: 0.6; }
  70% { transform: scale(1.25); opacity: 0; }
  100% { transform: scale(1.25); opacity: 0; }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-4px); opacity: 1; }
}
@keyframes spinSlow {
  to { transform: rotate(360deg); }
}
@keyframes ripple {
  from { transform: scale(0); opacity: 1; }
  to { transform: scale(28); opacity: 0; }
}
@keyframes uploadBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes dropPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(235,66,3,0.35), 0 20px 60px rgba(235,66,3,0.25); }
  50% { box-shadow: 0 0 0 14px rgba(235,66,3,0), 0 20px 60px rgba(235,66,3,0.35); }
}
@keyframes editorIn {
  from { opacity: 0; transform: translateY(24px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
`;

// ================= COMPONENT =================
export default function BgRemover() {
  // ---- Main state ----
  const [state, setState] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  // ---- Upload state ----
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processingRef = useRef(false);
  const cancelRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [preview, setPreview] = useState<{ name: string; url: string } | null>(null);
  const dragCounter = useRef(0);
  const rippleIdRef = useRef(0);

  // ---- Editor state ----
  const [editorOpen, setEditorOpen] = useState(false);
  const [workingUrl, setWorkingUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, w: 100, h: 100 });
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [bgColor, setBgColor] = useState<string | "transparent">("transparent");
  const [applying, setApplying] = useState(false);
  const [imgRatio, setImgRatio] = useState(1); // natural w/h

  const overlayRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    handle: CropHandle;
    startX: number;
    startY: number;
    startCrop: Crop;
  } | null>(null);

  // ================= STAGE TEXT =================
  const stage = useMemo(() => {
    if (state !== "processing" && state !== "loading") return "";
    if (progress < 10) return "Loading image";
    if (progress < 30) return "Analyzing subject";
    if (progress < 60) return "Removing background";
    if (progress < 85) return "Refining edges";
    if (progress < 95) return "Preparing 3840 × 2160 canvas";
    return "Finalizing";
  }, [progress, state]);

  // ================= CLEANUP ON UNMOUNT =================
  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      if (workingUrl && workingUrl !== resultUrl) URL.revokeObjectURL(workingUrl);
      if (preview?.url) URL.revokeObjectURL(preview.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================= PROCESS =================
  const processFile = useCallback(async (file: File) => {
    if (processingRef.current) return;
    processingRef.current = true;
    cancelRef.current = false;
    setState("loading");
    setFileName(file.name);
    setProgress(0);

    try {
      setState("processing");

      const { removeBackground } = await import("@imgly/background-removal");
      const transparentBlob = await removeBackground(file, {
        publicPath: `${window.location.origin}/imgly-assets/`,
        progress: (_, current, total) => {
          if (total > 0) setProgress(Math.round((current / total) * 100));
        },
      });

      if (cancelRef.current) return;

      const output4k = await processTo4K(transparentBlob);
      if (cancelRef.current) return;

      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(output4k);
      });
      setState("done");
    } catch (err) {
      console.error(err);
      if (!cancelRef.current) setState("error");
    } finally {
      if (!cancelRef.current) processingRef.current = false;
    }
  }, []);

  // ================= 4K CANVAS (direct) =================
  const processTo4K = (blob: Blob): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = OUTPUT_W;
        canvas.height = OUTPUT_H;
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        const scale = Math.min(OUTPUT_W / img.width, OUTPUT_H / img.height);
        const drawW = Math.round(img.width * scale);
        const drawH = Math.round(img.height * scale);
        const x = Math.round((OUTPUT_W - drawW) / 2);
        const y = Math.round((OUTPUT_H - drawH) / 2);
        ctx.drawImage(img, x, y, drawW, drawH);

        canvas.toBlob((b) => {
          URL.revokeObjectURL(url);
          if (b) resolve(b);
          else reject(new Error("4K export failed"));
        }, "image/png");
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Image load failed"));
      };
      img.src = url;
    });

  // ================= FILE HANDLERS =================
  const handleFile = (file: File) => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview({ name: file.name, url: URL.createObjectURL(file) });
    processFile(file);
  };

  const onPickFile = () => {
    if (preview?.url) URL.revokeObjectURL(preview.url);
    setPreview(null);
    fileInputRef.current?.click();
  };

  // ================= DOWNLOAD (no edits) =================
  const download4K = () => {
    if (!resultUrl) return;
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `background-removed_${fileName.replace(/\.[^.]+$/, "")}.png`;
    link.click();
  };

  const handleReset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    if (workingUrl && workingUrl !== resultUrl) URL.revokeObjectURL(workingUrl);
    if (preview?.url) URL.revokeObjectURL(preview.url);
    cancelRef.current = true;
    processingRef.current = false;
    setState("idle");
    setResultUrl(null);
    setWorkingUrl(null);
    setEditorOpen(false);
    setPreview(null);
    setProgress(0);
  };

  const isProcessing = state === "loading" || state === "processing";

  // ================= EDITOR: OPEN / CLOSE / RESET =================
  const openEditor = () => {
    if (!resultUrl) return;
    if (workingUrl && workingUrl !== resultUrl) URL.revokeObjectURL(workingUrl);
    setWorkingUrl(resultUrl);
    setEditorOpen(true);
    setCrop({ x: 0, y: 0, w: 100, h: 100 });
    setAspectRatio(null);
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setBgColor("transparent");
  };

  const closeEditor = () => {
    if (workingUrl && workingUrl !== resultUrl) URL.revokeObjectURL(workingUrl);
    setWorkingUrl(null);
    setEditorOpen(false);
  };

  const resetEdits = () => {
    if (!resultUrl) return;
    if (workingUrl && workingUrl !== resultUrl) URL.revokeObjectURL(workingUrl);
    setWorkingUrl(resultUrl);
    setCrop({ x: 0, y: 0, w: 100, h: 100 });
    setAspectRatio(null);
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setBgColor("transparent");
  };

  // ================= EDITOR: TRANSFORMS =================
  const rotate = async (dir: "left" | "right") => {
    if (!workingUrl) return;
    const img = await loadImage(workingUrl);
    const canvas = document.createElement("canvas");
    canvas.width = img.height;
    canvas.height = img.width;
    const ctx = canvas.getContext("2d")!;
    if (dir === "right") {
      ctx.translate(canvas.width, 0);
      ctx.rotate(Math.PI / 2);
    } else {
      ctx.translate(0, canvas.height);
      ctx.rotate(-Math.PI / 2);
    }
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas);
    const newUrl = URL.createObjectURL(blob);
    if (workingUrl !== resultUrl) URL.revokeObjectURL(workingUrl);
    setWorkingUrl(newUrl);
    setImgRatio(canvas.width / canvas.height);
    setCrop({ x: 0, y: 0, w: 100, h: 100 });
    setAspectRatio(null);
  };

  const flip = async (axis: "h" | "v") => {
    if (!workingUrl) return;
    const img = await loadImage(workingUrl);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(axis === "h" ? canvas.width : 0, axis === "v" ? canvas.height : 0);
    ctx.scale(axis === "h" ? -1 : 1, axis === "v" ? -1 : 1);
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas);
    const newUrl = URL.createObjectURL(blob);
    if (workingUrl !== resultUrl) URL.revokeObjectURL(workingUrl);
    setWorkingUrl(newUrl);
  };

  // ================= EDITOR: ASPECT RATIO =================
  const applyAspect = (ratio: number | null) => {
    setAspectRatio(ratio);
    if (!ratio || !imgRatio) return;
    let w: number, h: number;
    if (ratio > imgRatio) {
      w = 100;
      h = (imgRatio / ratio) * 100;
    } else {
      h = 100;
      w = (ratio / imgRatio) * 100;
    }
    setCrop({ x: (100 - w) / 2, y: (100 - h) / 2, w, h });
  };

  // ================= EDITOR: CROP POINTER EVENTS =================
  const startDrag = (handle: CropHandle) => (e: RPointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: { ...crop },
    };
    overlayRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: RPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || !overlayRef.current) return;

    const rect = overlayRef.current.getBoundingClientRect();
    const dx = ((e.clientX - drag.startX) / rect.width) * 100;
    const dy = ((e.clientY - drag.startY) / rect.height) * 100;

    const MIN = 5;
    const start = drag.startCrop;
    const brX = start.x + start.w;
    const brY = start.y + start.h;

    let { x, y, w, h } = start;

    if (drag.handle === "move") {
      x = Math.max(0, Math.min(100 - w, start.x + dx));
      y = Math.max(0, Math.min(100 - h, start.y + dy));
    } else {
      // Width resize
      if (drag.handle.includes("l")) {
        const nx = Math.max(0, Math.min(brX - MIN, start.x + dx));
        w = brX - nx;
        x = nx;
      } else if (drag.handle.includes("r")) {
        w = Math.max(MIN, Math.min(100 - start.x, start.w + dx));
      }
      // Height resize
      if (drag.handle.includes("t")) {
        const ny = Math.max(0, Math.min(brY - MIN, start.y + dy));
        h = brY - ny;
        y = ny;
      } else if (drag.handle.includes("b")) {
        h = Math.max(MIN, Math.min(100 - start.y, start.h + dy));
      }

      // Aspect ratio lock
      if (aspectRatio) {
        const ratioPct = aspectRatio / imgRatio;
        if (w / h > ratioPct) {
          w = h * ratioPct;
          if (drag.handle.includes("l")) x = brX - w;
        } else if (w / h < ratioPct) {
          h = w / ratioPct;
          if (drag.handle.includes("t")) y = brY - h;
        }
      }
    }

    setCrop({
      x: Math.max(0, x),
      y: Math.max(0, y),
      w: Math.min(100, w),
      h: Math.min(100, h),
    });
  };

  const endDrag = (e: RPointerEvent<HTMLDivElement>) => {
    if (dragRef.current) {
      try {
        overlayRef.current?.releasePointerCapture(e.pointerId);
      } catch {}
    }
    dragRef.current = null;
  };

  // ================= EDITOR: EXPORT WITH EDITS =================
  const downloadWithEdits = async () => {
    if (!workingUrl || applying) return;
    setApplying(true);
    try {
      const img = await loadImage(workingUrl);

      // 1) Apply filters on a full-size canvas
      const filtered = document.createElement("canvas");
      filtered.width = img.naturalWidth;
      filtered.height = img.naturalHeight;
      const fctx = filtered.getContext("2d")!;
      fctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
      fctx.drawImage(img, 0, 0);

      // 2) Crop region in natural pixels
      const cX = Math.round((crop.x / 100) * img.naturalWidth);
      const cY = Math.round((crop.y / 100) * img.naturalHeight);
      const cW = Math.round((crop.w / 100) * img.naturalWidth);
      const cH = Math.round((crop.h / 100) * img.naturalHeight);

      // 3) Final 4K canvas
      const final = document.createElement("canvas");
      final.width = OUTPUT_W;
      final.height = OUTPUT_H;
      const ctx = final.getContext("2d")!;

      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, OUTPUT_W, OUTPUT_H);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const scale = Math.min(OUTPUT_W / cW, OUTPUT_H / cH);
      const drawW = Math.round(cW * scale);
      const drawH = Math.round(cH * scale);
      const dx = Math.round((OUTPUT_W - drawW) / 2);
      const dy = Math.round((OUTPUT_H - drawH) / 2);

      ctx.drawImage(filtered, cX, cY, cW, cH, dx, dy, drawW, drawH);

      const blob = await canvasToBlob(final);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `4k_edited_${fileName.replace(/\.[^.]+$/, "")}.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setApplying(false);
    }
  };

  // ================= RENDER =================
  const filterCSS = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;

  const handles: CropHandle[] = ["tl", "tr", "bl", "br", "tm", "bm", "lm", "rm"];
  const handlePos = (h: CropHandle) => {
    const map: Record<CropHandle, { x: number; y: number }> = {
      tl: { x: crop.x, y: crop.y },
      tr: { x: crop.x + crop.w, y: crop.y },
      bl: { x: crop.x, y: crop.y + crop.h },
      br: { x: crop.x + crop.w, y: crop.y + crop.h },
      tm: { x: crop.x + crop.w / 2, y: crop.y },
      bm: { x: crop.x + crop.w / 2, y: crop.y + crop.h },
      lm: { x: crop.x, y: crop.y + crop.h / 2 },
      rm: { x: crop.x + crop.w, y: crop.y + crop.h / 2 },
      move: { x: 0, y: 0 },
    };
    return map[h];
  };

  return (
    <>
      <style>{styles}</style>

      <div
        className="relative min-h-screen overflow-hidden px-3 py-24 sm:px-6"
        style={{ background: BRAND.primary, color: BRAND.black }}
      >
        {/* Ambient blobs */}
        <div
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: BRAND.secondary, animation: "floaty 9s ease-in-out infinite" }}
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: BRAND.black, animation: "floaty 12s ease-in-out infinite reverse" }}
        />

        <div className="relative mx-auto max-w-5xl">
          {/* HERO */}
          {!editorOpen && (
            <div className="mx-auto max-w-[1200px] text-center">
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{
                  background: "rgba(235,66,3,0.10)",
                  color: "#EB4203",
                  border: "1px solid rgba(235,66,3,0.25)",
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "#EB4203" }}
                />
                Free · No Account · In-Browser Processing
              </div>

              <h1
                className="mx-auto max-w-4xl pb-2 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
                style={{ color: "#0a0a0a" }}
              >
                Remove Image Background <span style={{ color: "#EB4203" }}>for Free</span>
              </h1>
            </div>
          )}

          {/* UPLOAD */}
          {state === "idle" && !editorOpen && (
            <div style={fadeUp}>
              <div
                role="button"
                tabIndex={0}
                aria-label="Upload an image to remove its background"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const id = ++rippleIdRef.current;
                  setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
                  setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 650);
                  onPickFile();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onPickFile();
                  }
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  dragCounter.current += 1;
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  dragCounter.current -= 1;
                  if (dragCounter.current <= 0) {
                    dragCounter.current = 0;
                    setIsDragging(false);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  dragCounter.current = 0;
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFile(file);
                }}
                className={`group relative overflow-hidden rounded-3xl border-2 border-dashed p-8 py-10 text-center backdrop-blur transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isDragging ? "scale-[1.015] bg-white shadow-[0_20px_60px_rgba(235,66,3,0.28)]" : "bg-white/70 shadow-sm hover:-translate-y-1 hover:bg-white hover:shadow-xl active:translate-y-0 active:scale-[0.99]"}`}
                style={{
                  borderColor: BRAND.secondary,
                  // @ts-expect-error custom ring color
                  "--tw-ring-color": BRAND.secondary,
                  animation: isDragging ? "dropPulse 1.2s ease-in-out infinite" : "none",
                }}
              >
                {/* Corner accents */}
                {[
                  { left: "0.75rem", top: "0.75rem", delay: "0ms" },
                  { right: "0.75rem", top: "0.75rem", delay: "80ms" },
                  { left: "0.75rem", bottom: "0.75rem", delay: "160ms" },
                  { right: "0.75rem", bottom: "0.75rem", delay: "240ms" },
                ].map((pos, i) => (
                  <span
                    key={i}
                    className="pointer-events-none absolute h-3 w-3 rounded-full transition-all duration-300"
                    style={{
                      ...pos,
                      background: BRAND.secondary,
                      opacity: isDragging ? 1 : 0,
                      transform: isDragging ? "scale(1)" : "scale(0)",
                      transitionDelay: pos.delay,
                    }}
                  />
                ))}

                {/* Ripples */}
                {ripples.map((r) => (
                  <span
                    key={r.id}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      left: r.x,
                      top: r.y,
                      width: 10,
                      height: 10,
                      marginLeft: -5,
                      marginTop: -5,
                      background: "rgba(235,66,3,0.35)",
                      animation: "ripple 0.65s ease-out forwards",
                    }}
                  />
                ))}

                {/* Icon */}
                <div
                  className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: isDragging ? BRAND.secondary : BRAND.primary,
                    transition: "background 0.3s ease, transform 0.4s cubic-bezier(.22,1,.36,1)",
                    transform: isDragging ? "scale(1.15) rotate(-6deg)" : undefined,
                  }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      border: `2px solid ${BRAND.secondary}`,
                      opacity: isDragging ? 0.6 : 0,
                      animation: isDragging ? "pulseRing 1.4s ease-out infinite" : "none",
                    }}
                  />
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDragging ? "#ffffff" : BRAND.secondary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      animation: isDragging ? "uploadBob 0.9s ease-in-out infinite" : "none",
                      transition: "stroke 0.3s ease",
                    }}
                  >
                    <path d="M12 16V4" />
                    <path d="m6 10 6-6 6 6" />
                    <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                  </svg>
                </div>

                <p
                  className="text-lg font-semibold transition-colors duration-300"
                  style={{ color: isDragging ? BRAND.secondary : BRAND.black }}
                >
                  {isDragging ? "Drop it — we've got it" : "Drop image or click to upload"}
                </p>
                <p
                  className="mt-1 text-sm transition-opacity duration-300"
                  style={{ opacity: isDragging ? 0.9 : 0.6 }}
                >
                  PNG, JPG, WEBP · max 1 file
                </p>

                {preview && (
                  <div
                    className="mt-5 flex items-center gap-3 rounded-xl border px-3 py-2 text-left"
                    style={{ borderColor: "rgba(235,66,3,0.2)", background: "rgba(255,255,255,0.85)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={preview.url}
                      alt=""
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className="truncate text-xs font-semibold"
                        style={{ color: BRAND.black }}
                      >
                        {preview.name}
                      </div>
                      <div
                        className="text-[11px]"
                        style={{ color: "#8a7a77" }}
                      >
                        Selected · processing…
                      </div>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </div>
            </div>
          )}

          {!editorOpen && (
            <p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed"
              style={{ color: "#5a4a47" }}
            >
              Remove an image background online for free and download a transparent PNG with no account or BgRemove watermark. Processing happens in your browser; the export uses a 3840 × 2160 canvas, which does not add detail to a small original.
            </p>
          )}

          {/* PROCESSING */}
          {isProcessing && !editorOpen && (
            <div
              className="rounded-3xl border-2 bg-white p-8 shadow-xl"
              style={{ borderColor: BRAND.black, ...fadeUp }}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative h-20 w-20">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `3px solid ${BRAND.secondary}`, animation: "pulseRing 1.6s ease-out infinite" }}
                  />
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: "3px solid transparent",
                      borderTopColor: BRAND.secondary,
                      borderRightColor: BRAND.black,
                      animation: "spinSlow 1s linear infinite",
                    }}
                  />
                  <div
                    className="absolute inset-3 flex items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: BRAND.primary }}
                  >
                    {progress}%
                  </div>
                </div>

                <div className="flex items-center gap-1 text-base font-semibold">
                  <span>{stage}</span>
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: BRAND.secondary, animation: `dotBounce 1.2s ${i * 0.15}s infinite` }}
                      />
                    ))}
                  </span>
                </div>

                <div className="w-full">
                  <div
                    className="h-3 w-full overflow-hidden rounded-full"
                    style={{ background: "#f0e6e4" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300 ease-out"
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.black}, ${BRAND.secondary})`,
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.8s linear infinite",
                      }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs opacity-60">
                    <span>Processing</span>
                    <span>{progress}%</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                  style={{ borderColor: BRAND.black }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* RESULT (pre-editor) */}
          {state === "done" && resultUrl && !editorOpen && (
            <div
              className="rounded-3xl border-2 bg-white p-5 shadow-xl sm:p-7"
              style={{ borderColor: BRAND.black, ...fadeUp }}
            >
              <div className="mb-3 flex items-center justify-between">
                <p
                  className="font-bold"
                  style={{ color: BRAND.secondary }}
                >
                  Transparent PNG result
                </p>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: BRAND.primary, color: BRAND.black }}
                >
                  3840 × 2160
                </span>
              </div>

              <div
                style={CHECKER}
                className="rounded-2xl p-2"
              >
                <img
                  src={resultUrl}
                  alt="Transparent PNG result"
                  className="mx-auto max-h-[420px] w-auto rounded-xl transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={download4K}
                  className="flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.99]"
                  style={{ background: BRAND.secondary }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  Download PNG
                </button>

                <button
                  onClick={openEditor}
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(235,66,3,0.06)] hover:shadow-md active:translate-y-0"
                  style={{ borderColor: BRAND.black, color: BRAND.black }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                  Edit & Crop
                </button>
              </div>

              <button
                onClick={handleReset}
                className="mt-3 w-full rounded-2xl border py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                style={{ borderColor: BRAND.black }}
              >
                Upload New
              </button>
            </div>
          )}

          {/* ================= EDITOR ================= */}
          {state === "done" && resultUrl && editorOpen && workingUrl && (
            <div
              className="overflow-hidden rounded-3xl border-2 bg-white shadow-2xl"
              style={{ borderColor: BRAND.black, animation: "editorIn 0.5s cubic-bezier(.22,1,.36,1) both" }}
            >
              {/* Editor header */}
              <div
                className="flex items-center justify-between border-b px-5 py-4"
                style={{ borderColor: "rgba(235,66,3,0.15)" }}
              >
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: BRAND.black }}
                  >
                    Edit Image
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#8a7a77" }}
                  >
                    Crop · Rotate · Filters · Background
                  </p>
                </div>
                <button
                  onClick={closeEditor}
                  className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(235,66,3,0.06)]"
                  style={{ borderColor: BRAND.black, color: BRAND.black }}
                >
                  ← Back
                </button>
              </div>

              <div className="grid gap-6 p-5 lg:grid-cols-[1fr_320px]">
                {/* Canvas / crop area */}
                <div>
                  <div
                    className="mx-auto"
                    style={{
                      maxWidth: 700,
                      position: "relative",
                    }}
                  >
                    <div
                      ref={overlayRef}
                      onPointerMove={onPointerMove}
                      onPointerUp={endDrag}
                      onPointerCancel={endDrag}
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: `${imgRatio}`,
                        maxHeight: "60vh",
                        margin: "0 auto",
                        touchAction: "none",
                        userSelect: "none",
                        backgroundImage: "conic-gradient(#d4d4d4 25%, #fafafa 0 50%, #d4d4d4 0 75%, #fafafa 0)",
                        backgroundSize: "20px 20px",
                        borderRadius: 12,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={workingUrl}
                        alt="Editing preview"
                        onLoad={(e) => {
                          const el = e.currentTarget;
                          setImgRatio(el.naturalWidth / el.naturalHeight);
                        }}
                        draggable={false}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                          filter: filterCSS,
                          transition: "filter 0.2s ease",
                        }}
                      />

                      {/* 4 dark overlays around the crop */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: `${crop.y}%`,
                          background: "rgba(0,0,0,0.55)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: `${100 - crop.y - crop.h}%`,
                          background: "rgba(0,0,0,0.55)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: `${crop.y}%`,
                          left: 0,
                          width: `${crop.x}%`,
                          height: `${crop.h}%`,
                          background: "rgba(0,0,0,0.55)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: `${crop.y}%`,
                          right: 0,
                          width: `${100 - crop.x - crop.w}%`,
                          height: `${crop.h}%`,
                          background: "rgba(0,0,0,0.55)",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Crop rectangle (draggable to move) */}
                      <div
                        onPointerDown={startDrag("move")}
                        style={{
                          position: "absolute",
                          left: `${crop.x}%`,
                          top: `${crop.y}%`,
                          width: `${crop.w}%`,
                          height: `${crop.h}%`,
                          border: "2px solid #fff",
                          boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
                          cursor: "move",
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Rule of thirds */}
                        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                          <div style={{ position: "absolute", left: "33.33%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.35)" }} />
                          <div style={{ position: "absolute", left: "66.66%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.35)" }} />
                          <div style={{ position: "absolute", top: "33.33%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.35)" }} />
                          <div style={{ position: "absolute", top: "66.66%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.35)" }} />
                        </div>
                      </div>

                      {/* Handles */}
                      {handles.map((h) => {
                        const p = handlePos(h);
                        return (
                          <div
                            key={h}
                            onPointerDown={startDrag(h)}
                            style={{
                              position: "absolute",
                              left: `${p.x}%`,
                              top: `${p.y}%`,
                              width: 14,
                              height: 14,
                              marginLeft: -7,
                              marginTop: -7,
                              background: "#fff",
                              border: `2px solid ${BRAND.secondary}`,
                              borderRadius: "50%",
                              cursor: cropCursor(h),
                              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                              transition: "transform 0.15s ease",
                              zIndex: 5,
                            }}
                            onPointerEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.25)";
                            }}
                            onPointerLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Controls panel */}
                <div className="space-y-5">
                  {/* Aspect ratio */}
                  <div>
                    <p
                      className="mb-2 text-xs font-bold uppercase tracking-wide"
                      style={{ color: BRAND.black }}
                    >
                      Crop Ratio
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {ASPECTS.map((a) => {
                        const active = aspectRatio === a.ratio;
                        return (
                          <button
                            key={a.label}
                            onClick={() => applyAspect(a.ratio)}
                            className="rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                              background: active ? BRAND.secondary : "rgba(235,66,3,0.08)",
                              color: active ? "#fff" : BRAND.secondary,
                              border: active ? "none" : "1px solid rgba(235,66,3,0.25)",
                            }}
                          >
                            {a.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rotate / Flip */}
                  <div>
                    <p
                      className="mb-2 text-xs font-bold uppercase tracking-wide"
                      style={{ color: BRAND.black }}
                    >
                      Transform
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: "↺", title: "Rotate left", onClick: () => rotate("left") },
                        { label: "↻", title: "Rotate right", onClick: () => rotate("right") },
                        { label: "⇋", title: "Flip horizontal", onClick: () => flip("h") },
                        { label: "⇅", title: "Flip vertical", onClick: () => flip("v") },
                      ].map((btn) => (
                        <button
                          key={btn.title}
                          title={btn.title}
                          onClick={btn.onClick}
                          className="rounded-lg border py-2 text-base transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(235,66,3,0.06)] active:translate-y-0"
                          style={{ borderColor: "rgba(235,66,3,0.25)", color: BRAND.black }}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filters */}
                  <div>
                    <p
                      className="mb-2 text-xs font-bold uppercase tracking-wide"
                      style={{ color: BRAND.black }}
                    >
                      Filters
                    </p>
                    <div className="space-y-3">
                      {[
                        { label: "Brightness", value: brightness, set: setBrightness, min: 50, max: 150 },
                        { label: "Contrast", value: contrast, set: setContrast, min: 50, max: 150 },
                        { label: "Saturation", value: saturate, set: setSaturate, min: 0, max: 200 },
                      ].map((f) => (
                        <div key={f.label}>
                          <div
                            className="mb-1 flex justify-between text-xs"
                            style={{ color: "#5a4a47" }}
                          >
                            <span>{f.label}</span>
                            <span style={{ color: BRAND.secondary, fontWeight: 600 }}>{f.value}%</span>
                          </div>
                          <input
                            type="range"
                            min={f.min}
                            max={f.max}
                            value={f.value}
                            onChange={(e) => f.set(Number(e.target.value))}
                            className="w-full"
                            style={{ accentColor: BRAND.secondary }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Background */}
                  <div>
                    <p
                      className="mb-2 text-xs font-bold uppercase tracking-wide"
                      style={{ color: BRAND.black }}
                    >
                      Background
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {BG_PRESETS.map((b) => {
                        const active = bgColor === b.value;
                        return (
                          <button
                            key={b.label}
                            onClick={() => setBgColor(b.value)}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                              background: active ? BRAND.secondary : "rgba(235,66,3,0.08)",
                              color: active ? "#fff" : BRAND.secondary,
                              border: active ? "none" : "1px solid rgba(235,66,3,0.25)",
                            }}
                          >
                            <span
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 3,
                                border: "1px solid rgba(0,0,0,0.15)",
                                background: b.value === "transparent" ? "conic-gradient(#d4d4d4 25%, #fafafa 0 50%, #d4d4d4 0 75%, #fafafa 0)" : b.value,
                                backgroundSize: "6px 6px",
                              }}
                            />
                            {b.label}
                          </button>
                        );
                      })}
                      <label
                        className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: "rgba(235,66,3,0.08)",
                          color: BRAND.secondary,
                          border: "1px solid rgba(235,66,3,0.25)",
                        }}
                      >
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 3,
                            border: "1px solid rgba(0,0,0,0.15)",
                            background: bgColor === "transparent" ? "#ccc" : bgColor,
                          }}
                        />
                        Custom
                        <input
                          type="color"
                          value={bgColor === "transparent" ? "#ffffff" : bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className="space-y-2 border-t pt-4"
                    style={{ borderColor: "rgba(235,66,3,0.15)" }}
                  >
                    <button
                      onClick={downloadWithEdits}
                      disabled={applying}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ background: BRAND.secondary }}
                    >
                      {applying ? (
                        <>
                          <span
                            className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                            style={{ animation: "spinSlow 0.8s linear infinite" }}
                          />
                          Applying…
                        </>
                      ) : (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 3v12" />
                            <path d="m7 10 5 5 5-5" />
                            <path d="M5 21h14" />
                          </svg>
                          Download Edited 4K
                        </>
                      )}
                    </button>
                    <button
                      onClick={resetEdits}
                      className="w-full rounded-2xl border py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0"
                      style={{ borderColor: BRAND.black, color: BRAND.black }}
                    >
                      Reset Edits
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ERROR */}
          {state === "error" && (
            <div
              className="rounded-3xl border-2 bg-white p-8 text-center shadow-xl"
              style={{ borderColor: BRAND.secondary, ...fadeUp }}
            >
              <p
                className="font-semibold"
                style={{ color: BRAND.secondary }}
              >
                Something went wrong
              </p>
              <button
                onClick={handleReset}
                className="mt-4 rounded-full px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                style={{ background: BRAND.secondary }}
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
