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
      const now = ctx.currentTime;

      // Master with shimmer reverb-like delay
      const master = ctx.createGain();
      master.gain.value = 0.0001;
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.5, now + 0.05);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 2);
      master.connect(ctx.destination);

      const delay = ctx.createDelay();
      delay.delayTime.value = 0.28;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.45;
      delay.connect(feedback).connect(delay);
      delay.connect(master);

      // Slow LFO for alien wobble
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 6;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 18;
      lfo.connect(lfoGain);
      lfo.start(now);
      lfo.stop(now + 2);

      // Ethereal chime: stacked detuned partials at non-harmonic ratios
      const partials = [880, 1318.5, 1760, 2217, 2637, 3520];
      partials.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.value = freq;
        // Detune sweep up for alien shimmer
        osc.detune.setValueAtTime(-30, now);
        osc.detune.linearRampToValueAtTime(40, now + 1.8);
        lfoGain.connect(osc.detune);

        const g = ctx.createGain();
        const peak = 0.18 / (i + 1);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(peak, now + 0.04 + i * 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

        osc.connect(g);
        g.connect(master);
        g.connect(delay);
        osc.start(now + i * 0.02);
        osc.stop(now + 2);
      });

      setTimeout(() => ctx.close().catch(() => {}), 2400);
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
        <p className="text-foreground/80 font-body text-lg sm:text-xl md:text-2xl mt-2 tracking-widest whitespace-pre-wrap">
          The African American Arts Festival Magazine{"\n\n"}<span className="shimmer-gold">[Tap "AFRICAN" to go to the next page]</span>{"\n\n"}
        </p>
      </div>

      {/* Throne + Cube */}
      <div className="flex-1 flex items-center justify-center w-full max-w-2xl px-4">
        <div className="relative">
          <img
            src={throneImg}
            alt="Ornate black marble throne with gold accents"
            className="w-full max-w-lg object-contain"
          />
          {/* Cube positioned in the throne seat */}
          <div className="absolute" style={{ top: "38%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <RotatingCube />
          </div>
          <div className="absolute bottom-[2%] left-0 right-0 text-center px-4 flex flex-col items-center gap-1">
            <p className="font-body text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-sm">
              <span className="shimmer-gold" style={{ WebkitTextStroke: '2px black' }}>Welcome</span>
            </p>
            <p className="font-body text-xl sm:text-2xl md:text-3xl tracking-wide text-black drop-shadow-sm">
              to your first interactive magazine{" "}
              <span className="font-semibold" style={{ color: "#4169E1" }}>(I.M.)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full pb-6 px-4 flex flex-col items-center gap-2 mt-8">
        <MusicPlayer />
        <p className="text-muted-foreground text-base sm:text-lg tracking-widest font-body">for Demo purposes</p>
      </div>
      </div>
    </div>
  );
};

export default LandingPage;
