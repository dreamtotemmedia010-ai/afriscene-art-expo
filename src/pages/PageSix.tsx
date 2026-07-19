import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import closingAudio from "@/assets/I.M._Closing_statements_fin_trois-2.m4a.asset.json";
import SEO from "@/components/SEO";

const VIDEO_URL =
  "https://player.cloudinary.com/embed/?cloud_name=die2n47m2&public_id=Roi_et_Reine_fin_iu6gpt&player[autoplay]=true&player[muted]=false";

const PageSix = () => {
  const [showVideo, setShowVideo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Transition sound effect via WebAudio (cymbal roll)
    try {
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
      const ctx = new Ctx();
      const duration = 2.5;
      const sampleRate = ctx.sampleRate;
      const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        // Build a swell: attack 0-1.2s, then decay
        const attack = Math.min(t / 1.2, 1);
        const decay = Math.pow(1 - Math.max((t - 1.2) / 1.3, 0), 2);
        const envelope = attack * decay;
        data[i] = (Math.random() * 2 - 1) * envelope;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      // Bandpass to focus on cymbal shimmer range
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 6000;
      bp.Q.value = 1.5;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.7, ctx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      noise.connect(bp).connect(gain).connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + duration);
    } catch {}

    const t = setTimeout(() => setShowVideo(true), 1600);
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
      <SEO
        title="The End — AAAFM Interactive Magazine"
        description="Closing feature of the African American Arts Festival Magazine — Roi et Reine video and closing commentary."
        path="/page-six"
      />
      <div className="pt-6 px-6">
        <Link to="/page-five" className="shimmer-gold font-display text-2xl tracking-wider hover:opacity-80">
          ← Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-6 p-6 sm:p-10 max-w-5xl mx-auto w-full items-center justify-center">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gold/30">
          <div
            className={`absolute inset-0 flex items-center justify-center bg-background transition-opacity duration-[1600ms] ease-in-out ${showVideo ? "opacity-0" : "opacity-100"}`}
          >
            <p className="shimmer-gold font-display text-3xl sm:text-5xl tracking-widest">Loading…</p>
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${showVideo ? "opacity-100" : "opacity-0"}`}
          >
            {showVideo && (
              <iframe
                src={VIDEO_URL}
                title="Closing video"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                frameBorder={0}
              />
            )}
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="shimmer-gold font-display text-4xl sm:text-6xl md:text-7xl tracking-wider">
            ~~~~The End ~~~~
          </h2>
          <p className="shimmer-gold font-display text-lg sm:text-2xl md:text-3xl tracking-wide whitespace-pre-line">
            (African American Arts Festival Magazine)&nbsp;
            {"\n"}[interactive magazine]
          </p>
        </div>

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