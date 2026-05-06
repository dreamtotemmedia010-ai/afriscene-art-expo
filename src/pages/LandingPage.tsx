import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import throneImg from "@/assets/throne.png";
import RotatingCube from "@/components/RotatingCube";
import MusicPlayer from "@/components/MusicPlayer";

const LandingPage = () => {
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playWind = () => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      audioCtxRef.current = ctx;
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 600;
      filter.Q.value = 0.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.3);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);

      // Sweep filter for whoosh
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 1.2);
      filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + 2);

      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 2);
      setTimeout(() => ctx.close().catch(() => {}), 2200);
    } catch {
      // no-op
    }
  };

  const handleTransition = (e: React.MouseEvent) => {
    e.preventDefault();
    if (transitioning) return;
    setTransitioning(true);
    playWind();
    setTimeout(() => navigate("/page-two"), 2000);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden touch-pinch-zoom animate-fade-in">
      <div
        className={`min-h-screen flex flex-col items-center will-change-transform ${
          transitioning ? "page-slide-out-left" : ""
        }`}
      >
      {/* Heading */}
      <div className="pt-8 sm:pt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wider">
          <Link to="/page-two" onClick={handleTransition} className="shimmer-gold hover:opacity-80 transition-opacity cursor-pointer">
            African
          </Link>
          <span className="text-pale-green ml-3">American</span>
        </h1>
        <p className="text-foreground/80 font-body text-lg sm:text-xl md:text-2xl mt-2 tracking-widest">
          The African American Arts Festival Magazine
        </p>
      </div>

      {/* Throne + Cube */}
      <div className="flex-1 flex items-center justify-center relative w-full max-w-2xl px-4">
        <div className="relative w-full flex justify-center">
          <img
            src={throneImg}
            alt="Ornate black marble throne with gold accents"
            className="w-full max-w-lg object-contain"
          />
          {/* Cube positioned in the throne seat */}
          <div className="absolute" style={{ top: "38%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <RotatingCube />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full pb-6 px-4 flex flex-col items-center gap-3">
        <MusicPlayer />
        <p className="text-muted-foreground text-base sm:text-lg tracking-widest font-body">for Demo purposes</p>
      </div>
      </div>
    </div>
  );
};

export default LandingPage;
