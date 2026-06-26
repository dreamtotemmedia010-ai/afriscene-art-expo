import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import closingAudio from "@/assets/IM_closing_message_fin.m4a.asset.json";

const VIDEO_URL =
  "https://player.cloudinary.com/embed/?cloud_name=die2n47m2&public_id=cleaned_video_hw2kh2&player[autoplay]=true&player[muted]=false";

const PageSix = () => {
  const [showVideo, setShowVideo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Transition sound effect via WebAudio (whoosh-like sweep)
    try {
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.35);
    } catch {}

    const t = setTimeout(() => setShowVideo(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in-slow">
      <div className="pt-6 px-6">
        <Link to="/page-five" className="shimmer-gold font-display text-2xl tracking-wider hover:opacity-80">
          ← Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-6 p-6 sm:p-10 max-w-5xl mx-auto w-full items-center justify-center">
        {!showVideo ? (
          <div className="w-full aspect-video rounded-lg border border-gold/30 flex items-center justify-center animate-fade-in">
            <p className="shimmer-gold font-display text-3xl sm:text-5xl tracking-widest">Loading…</p>
          </div>
        ) : (
          <div className="w-full aspect-video rounded-lg overflow-hidden border border-gold/30 animate-scale-in">
            <iframe
              src={VIDEO_URL}
              title="Closing video"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              frameBorder={0}
            />
          </div>
        )}

        <button
          onClick={toggleAudio}
          aria-label={playing ? "Pause audio" : "Play audio"}
          className="shimmer-gold font-display text-4xl sm:text-6xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer select-none"
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>

      <audio ref={audioRef} src={closingAudio.url} preload="auto" onEnded={() => setPlaying(false)} />

      <div className="w-full pb-6 px-6">
        <p className="text-muted-foreground text-xl sm:text-2xl tracking-widest font-body text-center">Demo</p>
      </div>
    </div>
  );
};

export default PageSix;