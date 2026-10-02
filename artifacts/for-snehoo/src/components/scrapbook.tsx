import { type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Photo } from "@/data/media";

export function Heart({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 22" width={size} height={size * 0.92} className={className} fill="currentColor">
      <path d="M12 21.2C5.6 16.2 1.5 12.6 1.5 7.8 1.5 4.6 3.9 2.4 6.8 2.4c1.9 0 3.5 1 5.2 3.1 1.7-2.1 3.3-3.1 5.2-3.1 2.9 0 5.3 2.2 5.3 5.4 0 4.8-4.1 8.4-10.5 13.4z" />
    </svg>
  );
}

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 18" className={className} fill="none" preserveAspectRatio="none">
      <motion.path
        d="M3 11 C 30 2, 50 17, 80 9 S 130 3, 160 10 S 215 16, 245 7 S 285 6, 297 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
      />
    </svg>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  kicker,
  title,
  sub,
  id,
  tone = "ink",
}: {
  kicker: string;
  title: string;
  sub?: string;
  id: string;
  tone?: "ink" | "light";
}) {
  return (
    <Reveal className="mx-auto max-w-2xl px-6 text-center">
      <p className={`font-hand text-2xl md:text-3xl ${tone === "light" ? "text-rose" : "text-rose-deep"}`}>{kicker}</p>
      <h2
        id={id}
        className={`font-display mt-1 text-[2.4rem] leading-[1.02] tracking-tight md:text-6xl ${
          tone === "light" ? "text-paper" : "text-navy"
        }`}
        style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
      >
        {title}
      </h2>
      <Squiggle className={`mx-auto mt-3 h-3 w-40 ${tone === "light" ? "text-rose" : "text-rose-deep/70"}`} />
      {sub && (
        <p className={`mt-4 text-lg leading-relaxed ${tone === "light" ? "text-paper/80" : "text-ink/75"}`}>{sub}</p>
      )}
    </Reveal>
  );
}

/** Photo at full natural framing. If stored sideways, rotates a quarter turn at display time. */
export function PhotoImg({ photo, eager = false }: { photo: Photo; eager?: boolean }) {
  const loading = eager ? "eager" : "lazy";
  if (photo.turn) {
    const w = photo.height;
    const h = photo.width;
    return (
      <div className="relative w-full overflow-hidden bg-ink/5" style={{ aspectRatio: `${w} / ${h}` }}>
        <img
          src={photo.src}
          alt={photo.alt}
          loading={loading}
          decoding="async"
          draggable={false}
          className="absolute left-1/2 top-1/2 max-w-none"
          style={{
            width: `${(h / w) * 100}%`,
            height: `${(w / h) * 100}%`,
            transform: `translate(-50%, -50%) rotate(${photo.turn}deg)`,
          }}
        />
      </div>
    );
  }
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={loading}
      decoding="async"
      draggable={false}
      className="block h-auto w-full bg-ink/5"
    />
  );
}

export function Polaroid({
  photo,
  tilt = 0,
  tape = "pink",
  eager = false,
  showCaption = true,
  className = "",
  index,
  children,
}: {
  photo: Photo;
  tilt?: number;
  tape?: "pink" | "blue";
  eager?: boolean;
  showCaption?: boolean;
  className?: string;
  index?: number;
  children?: ReactNode;
}) {
  return (
    <motion.figure
      data-testid={`polaroid-${photo.id}`}
      className={`paper relative mx-auto w-full p-3 pb-4 ${className}`}
      style={{ rotate: tilt, borderRadius: 3 }}
      initial={{ opacity: 0, y: 40, rotate: tilt + (tilt >= 0 ? 5 : -5) }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-8% 0px" }}
      whileHover={{ rotate: 0, scale: 1.025, y: -4 }}
      whileTap={{ scale: 0.99, rotate: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
    >
      <span className={`tape ${tape === "blue" ? "blue" : ""}`} style={{ top: -12, left: "50%", marginLeft: "-2.75rem", rotate: `${-tilt * 1.5 - 2}deg` }} />
      <div className="relative overflow-hidden" style={{ boxShadow: "inset 0 0 0 1px hsl(224 40% 20% / .12)" }}>
        <PhotoImg photo={photo} eager={eager} />
        <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 40px hsl(30 60% 30% / .12)" }} />
      </div>
      {showCaption && (
        <figcaption className="px-1 pt-3">
          {index !== undefined && (
            <span className="font-hand text-lg text-rose-deep">version {String(index + 1).padStart(2, "0")}</span>
          )}
          <p className="font-hand text-[1.7rem] leading-none text-navy">{photo.title}</p>
          <p className="mt-1.5 text-[0.98rem] italic leading-snug text-ink/75">{photo.caption}</p>
        </figcaption>
      )}
      {children}
    </motion.figure>
  );
}
