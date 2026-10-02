import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { Clip } from "@/data/media";

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

export function FilmVideo({ clip, tilt = 0 }: { clip: Clip; tilt?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onOther = (e: Event) => {
      const v = ref.current;
      if (v && (e as CustomEvent).detail !== v) v.pause();
    };
    document.addEventListener("snehoo:play", onOther);
    return () => document.removeEventListener("snehoo:play", onOther);
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      document.dispatchEvent(new CustomEvent("snehoo:play", { detail: v }));
      v.play().catch(() => setPlaying(false));
    } else {
      v.pause();
    }
  };

  const pct = dur ? (time / dur) * 100 : 0;

  return (
    <motion.figure
      className="mx-auto w-full max-w-md"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate: tilt }}
      data-testid={`film-${clip.id}`}
    >
      <div className="film-strip rounded-md px-3 py-2">
        <div className="sprockets" aria-hidden />
        <div className="my-2 flex items-center justify-between px-1 font-hand text-lg text-rose">
          <span>{clip.label}</span>
          <span aria-hidden className="tracking-widest text-paper/50">35 MM</span>
        </div>
        <div className="relative overflow-hidden rounded-[3px] bg-ink">
          <video
            ref={ref}
            data-testid={`video-${clip.id}`}
            className="block max-h-[72dvh] w-full bg-ink object-contain"
            style={{ minHeight: 180 }}
            playsInline
            muted={muted}
            preload="metadata"
            poster={clip.poster}
            aria-label={`${clip.label}: ${clip.title}`}
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
            onError={() => setFailed(true)}
          >
            <source src={clip.src} type="video/mp4" />
          </video>
          {!playing && !failed && (
            <button
              type="button"
              onClick={toggle}
              aria-label={`Play ${clip.title}`}
              data-testid={`button-bigplay-${clip.id}`}
              className="absolute inset-0 flex items-center justify-center bg-ink/10 transition-colors hover:bg-ink/20"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rose text-navy shadow-lg transition-transform hover:scale-105">
                <Play className="ml-1 h-7 w-7" fill="currentColor" />
              </span>
            </button>
          )}
          {failed && (
            <p className="absolute inset-0 flex items-center justify-center p-4 text-center font-hand text-xl text-paper">
              This reel did not load. Refresh and try again.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 px-1 pb-1 pt-3 text-paper">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            data-testid={`button-play-${clip.id}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose text-navy"
          >
            {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
          </button>
          <input
            type="range"
            className="scrub"
            min={0}
            max={dur || 0}
            step={0.05}
            value={time}
            style={{ ["--p" as string]: `${pct}%` }}
            aria-label={`Seek ${clip.title}`}
            aria-valuetext={`${fmt(time)} of ${fmt(dur)}`}
            data-testid={`slider-seek-${clip.id}`}
            onChange={(e) => {
              const v = ref.current;
              if (v) v.currentTime = Number(e.target.value);
              setTime(Number(e.target.value));
            }}
          />
          <span className="w-[4.6rem] shrink-0 text-right font-mono text-xs tabular-nums text-paper/80">
            {fmt(time)} / {fmt(dur)}
          </span>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Turn sound on" : "Mute"}
            aria-pressed={!muted}
            data-testid={`button-mute-${clip.id}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-paper hover:bg-paper/10"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
        <div className="sprockets mt-1" aria-hidden />
      </div>
      <figcaption className="mt-4 px-2 text-center">
        <p className="font-hand text-3xl leading-none text-navy">{clip.title}</p>
        <p className="mt-1 italic text-ink/75">{clip.caption}</p>
      </figcaption>
    </motion.figure>
  );
}
