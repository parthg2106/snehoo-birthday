import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Heart, Polaroid, PhotoImg, Reveal, SectionHead, Squiggle } from "@/components/scrapbook";
import { FilmVideo } from "@/components/film-video";
import { clips, photos, versions, wishes } from "@/data/media";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------- Cover --------------------------------- */
function Cover({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section
      aria-label="Welcome"
      className="fixed inset-0 z-50 overflow-y-auto bg-cream"
      style={{
        backgroundImage:
          "radial-gradient(110% 55% at 50% 0%, hsl(44 70% 96%), transparent 62%), radial-gradient(90% 50% at 100% 100%, hsl(346 70% 88% / .5), transparent 60%)",
      }}
      initial={{ y: 0 }}
      exit={{ y: "-104%", rotate: -1.2, transition: { duration: 1, ease: [0.7, 0, 0.2, 1] } }}
    >
      <div className="mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-center justify-center gap-8 px-6 py-10 md:flex-row md:gap-16">
        <motion.div
          className="w-[62%] max-w-[270px] shrink-0 md:w-[300px] md:max-w-none"
          initial={{ opacity: 0, y: 30, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
        >
          <Polaroid photo={photos.cover} tilt={-4} eager showCaption={false} className="!p-2.5">
            <p className="px-1 pb-0.5 pt-3 text-center font-hand text-2xl text-navy">october 5, always</p>
          </Polaroid>
        </motion.div>

        <div className="text-center md:text-left">
          <motion.p
            className="font-hand text-2xl text-rose-deep md:text-3xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            a little something, made by hand
          </motion.p>
          <motion.h1
            className="font-display text-navy"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease }}
          >
            <span className="block text-3xl font-light italic md:text-4xl">For</span>
            <span className="-mt-1 block text-[4.6rem] font-medium leading-[0.95] tracking-tight md:text-[8rem]">Snehoo</span>
          </motion.h1>
          <Squiggle className="mx-auto mt-2 h-3 w-48 text-rose-deep/70 md:mx-0 md:w-72" />
          <motion.p
            className="mx-auto mt-5 max-w-sm text-lg italic leading-relaxed text-ink/80 md:mx-0 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            Another year of you, and the world is still a little brighter for it. I made you a small place to keep it all.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease }}
          >
            <button
              type="button"
              onClick={onEnter}
              data-testid="button-enter"
              className="pulse-ring group relative flex items-center gap-3 rounded-full bg-navy px-8 py-4 font-display text-lg text-paper shadow-[0_14px_30px_-12px_hsl(224_55%_20%/.7)] transition-transform active:scale-95"
            >
              <span>Enter</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/* ------------------------------- Versions --------------------------------- */
function Versions() {
  const tilts = [-2.5, 2, -1.5, 1.2, -2];
  return (
    <section aria-labelledby="versions-title" className="relative px-5 pb-24 pt-24 md:pt-32">
      <SectionHead
        id="versions-title"
        kicker="chapter one"
        title="You, in different versions"
        sub="Nobody warned me you came with this many editions. I like every single one."
      />
      <div className="mx-auto mt-16 grid max-w-4xl gap-x-14 gap-y-16 md:grid-cols-2">
        {versions.map((p, i) => {
          const wide = p.id === "saree";
          return (
            <div
              key={p.id}
              className={`${wide ? "md:col-span-2 md:mx-auto md:max-w-xl" : ""} ${
                i % 2 === 1 && !wide ? "md:mt-20" : ""
              } ${i % 2 === 0 ? "mr-auto pr-4 md:pr-0" : "ml-auto pl-4 md:pl-0"} w-full max-w-sm md:max-w-none`}
            >
              <Polaroid photo={p} tilt={tilts[i]} tape={i % 2 ? "blue" : "pink"} index={i} />
            </div>
          );
        })}
      </div>
      <Reveal className="mt-16 text-center">
        <p className="font-hand text-2xl text-rose-deep md:text-3xl">
          same person, every time. <Heart className="inline-block align-[-2px] text-rose-deep" size={16} />
        </p>
      </Reveal>
    </section>
  );
}

/* -------------------------------- Moments --------------------------------- */
function Moments() {
  return (
    <section aria-labelledby="moments-title" className="relative overflow-hidden bg-[hsl(226_50%_14%)] px-4 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 40% at 50% 0%, hsl(346 60% 70% / .14), transparent 70%), radial-gradient(60% 40% at 50% 100%, hsl(224 60% 50% / .25), transparent 70%)" }}
      />
      <div className="relative">
        <SectionHead
          id="moments-title"
          tone="light"
          kicker="chapter two"
          title="Little moments"
          sub="Two small reels, kept because the little things were never little. Tap play. The sound is off until you want it."
        />
        <div className="mx-auto mt-14 grid max-w-5xl items-start gap-16 md:grid-cols-2 md:gap-10">
          <FilmVideo clip={clips[0]} tilt={-1} />
          <div className="md:mt-24">
            <FilmVideo clip={clips[1]} tilt={1} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Wishes --------------------------------- */
function Wishes() {
  const tilts = [-1.2, 1, -0.8, 1.4];
  return (
    <section aria-labelledby="wishes-title" className="relative px-5 py-24 md:py-32">
      <SectionHead
        id="wishes-title"
        kicker="chapter three"
        title="Things I wish for you"
        sub="Written in the margins, the way you say the real things."
      />
      <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-14">
        <div className="mx-auto w-[70%] max-w-[260px] md:w-full">
          <Polaroid photo={photos.cover} tilt={3} tape="blue" showCaption={false}>
            <p className="px-1 pt-3 text-center font-hand text-2xl text-navy">may this look be permanent</p>
          </Polaroid>
        </div>
        <ol className="space-y-6">
          {wishes.map((w, i) => (
            <motion.li
              key={w.word}
              data-testid={`wish-${w.word.toLowerCase()}`}
              className="paper lined relative rounded-[3px] py-4 pl-14 pr-5"
              style={{ rotate: tilts[i] }}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, ease, delay: 0.05 }}
              whileHover={{ rotate: 0, x: 4 }}
            >
              <span aria-hidden className="absolute bottom-0 left-9 top-0 w-px bg-rose-deep/30" />
              <span aria-hidden className="absolute left-3 top-3 font-display text-3xl italic text-rose-deep/70">
                {i + 1}
              </span>
              <h3 className="font-hand text-[2rem] leading-none text-navy">{w.word}</h3>
              <p className="mt-1 text-[1.05rem] leading-[34px] text-ink/85">{w.note}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- Final reveal ----------------------------- */
function Burst({ burstKey }: { burstKey: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => {
        const a = (i / 30) * Math.PI * 2 + (i % 3) * 0.2;
        const r = 110 + ((i * 53) % 130);
        return {
          x: Math.cos(a) * r,
          y: Math.sin(a) * r * 0.8 - 60,
          rot: ((i * 97) % 540) - 270,
          c: ["hsl(346 72% 82%)", "hsl(224 55% 30%)", "hsl(42 70% 82%)", "hsl(342 52% 52%)"][i % 4],
          w: 6 + (i % 4) * 3,
          heart: i % 5 === 0,
        };
      }),
    [],
  );
  if (!burstKey) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 z-20 h-0 w-0">
      {bits.map((b, i) => (
        <motion.span
          key={`${burstKey}-${i}`}
          className="absolute block"
          style={{ width: b.w, height: b.heart ? b.w : b.w * 1.6, background: b.heart ? "transparent" : b.c, color: b.c, borderRadius: 1 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 220], opacity: [1, 1, 0], rotate: b.rot, scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        >
          {b.heart && <Heart size={b.w * 2} />}
        </motion.span>
      ))}
    </div>
  );
}

function Finale() {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(0);
  const letterRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      setBurst((b) => b + 1);
      window.setTimeout(() => letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 700);
    }
  };

  return (
    <section aria-labelledby="final-title" className="relative overflow-hidden px-5 pb-32 pt-24 md:pt-32">
      <SectionHead id="final-title" kicker="chapter four" title="One last thing..." />
      <div className="relative mx-auto mt-12 flex max-w-md flex-col items-center">
        <Burst burstKey={burst} />
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="final-letter"
          data-testid="button-reveal"
          className="group relative block w-[300px] max-w-full rounded-md transition-transform active:scale-[0.97]"
          style={{ perspective: 900 }}
        >
          <span className="sr-only">{open ? "Fold the letter back" : "Open the envelope"}</span>
          <motion.span
            aria-hidden
            className="relative block h-[190px] w-full rounded-md"
            style={{ background: "linear-gradient(160deg, hsl(224 52% 30%), hsl(226 52% 20%))", boxShadow: "0 24px 40px -18px hsl(224 60% 15% / .6)" }}
            animate={open ? { y: 0, rotate: 0 } : { y: [0, -5, 0], rotate: [-1, 1, -1] }}
            transition={open ? { duration: 0.4 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="absolute inset-0 rounded-md"
              style={{ clipPath: "polygon(0 100%, 50% 38%, 100% 100%)", background: "hsl(224 52% 25%)" }}
            />
            <motion.span
              className="absolute left-0 right-0 top-0 block h-[105px] origin-top rounded-t-md"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", background: "hsl(224 52% 34%)", backfaceVisibility: "hidden" }}
              animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 2 }}
              transition={{ duration: 0.7, ease }}
            />
            <motion.span
              className="absolute left-1/2 top-[84px] z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-rose text-rose-deep shadow-md"
              animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
            >
              <Heart size={20} />
            </motion.span>
          </motion.span>
          <span className="mt-5 block text-center font-hand text-3xl text-rose-deep">
            {open ? "fold it back" : "tap to open"}
            {!open && <ArrowDown className="bob ml-2 inline h-5 w-5" aria-hidden />}
          </span>
        </button>

        <div id="final-letter" ref={letterRef} aria-live="polite" className="mt-10 w-full scroll-mt-6">
          <AnimatePresence>
            {open && (
              <motion.div
                data-testid="final-letter"
                initial={{ opacity: 0, y: 80, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: -0.6 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.9, ease, delay: 0.25 }}
                className="paper lined relative mx-auto rounded-[3px] px-6 pb-8 pt-9"
                style={{ backgroundPositionY: 22 }}
              >
                <span className="tape" style={{ top: -12, left: "50%", marginLeft: "-2.75rem", rotate: "-2deg" }} />
                <p className="font-hand text-3xl text-navy">Snehoo,</p>
                <div className="mt-2 space-y-[0px] text-[1.08rem] leading-[34px] text-ink/90">
                  <p>
                    You can be loud, silly, soft, stubborn and brilliant all in one afternoon, and somehow every version of you feels like home.
                  </p>
                  <p>I wanted this birthday to feel like you, not like a shelf in a shop.</p>
                </div>
                <blockquote className="my-5 border-l-4 border-rose pl-4 font-display text-[1.45rem] italic leading-snug text-navy" style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}>
                  I could’ve bought you something. But I thought I’d make you something instead.
                </blockquote>
                <p className="text-[1.08rem] leading-[34px] text-ink/90">
                  Whatever this year holds, I hope it is yours to choose. And remember, someone is always cheering a little too loudly from the background.
                </p>

                <motion.div
                  className="paper relative mx-auto mt-8 w-full p-2.5 pb-3"
                  initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 1.8 }}
                  transition={{ duration: 0.9, ease, delay: 0.9 }}
                >
                  <span className="tape blue" style={{ top: -12, right: 18, rotate: "8deg" }} />
                  <PhotoImg photo={photos.last} />
                  <p className="px-1 pt-2 text-center font-hand text-xl text-navy">{photos.last.caption}</p>
                </motion.div>

                <motion.p
                  data-testid="text-happy-birthday"
                  className="mt-9 text-center font-display text-[1.9rem] font-medium leading-tight text-navy md:text-4xl"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.5, ease }}
                >
                  Happy Birthday, Snehoo. ❤️
                </motion.p>
                <p className="mt-2 text-center font-hand text-2xl text-rose-deep">with all my love, always.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- The story -------------------------------- */
function Story() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    headRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
      <motion.div aria-hidden className="fixed left-0 right-0 top-0 z-40 h-[3px] origin-left bg-rose-deep/80" style={{ scaleX }} />
      <header className="px-6 pb-4 pt-16 text-center md:pt-24">
        <p className="font-hand text-2xl text-rose-deep">october 5</p>
        <h1
          ref={headRef}
          tabIndex={-1}
          className="font-display text-5xl font-medium tracking-tight text-navy outline-none md:text-7xl"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
        >
          Snehoo, this is yours.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-lg italic text-ink/75">Go slowly. Nothing here is in a hurry.</p>
        <ArrowDown className="bob mx-auto mt-6 h-6 w-6 text-rose-deep" aria-hidden />
      </header>
      <Versions />
      <Moments />
      <Wishes />
      <Finale />
      <footer className="px-6 pb-14 text-center">
        <p className="font-hand text-2xl text-navy/70">
          made by hand, for Snehoo <Heart className="inline-block align-[-1px] text-rose-deep" size={14} />
        </p>
      </footer>
    </motion.main>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = entered ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [entered]);

  return (
    <div className="min-h-[100dvh]">
      {entered && <Story />}
      <AnimatePresence>{!entered && <Cover key="cover" onEnter={() => setEntered(true)} />}</AnimatePresence>
    </div>
  );
}
