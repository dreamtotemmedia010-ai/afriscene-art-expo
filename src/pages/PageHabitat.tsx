import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import hpOrig from "@/assets/HP_orig.jpg.asset.json";
import hpLed from "@/assets/HP_LED.jpg.asset.json";
import hpAudio from "@/assets/IM_Hab_Puz_concept.m4a.asset.json";

const PageHabitat = () => {
  const [showLed, setShowLed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    const a = audioRef.current;
    if (!showLed) {
      setShowLed(true);
      setTimeout(() => {
        if (a) {
          a.currentTime = 0;
          a.play().catch(() => {});
        }
      }, 0);
    } else {
      setShowLed(false);
      if (a) {
        a.pause();
        a.currentTime = 0;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in-slow">
      <div className="pt-6 px-6 flex justify-between items-center">
        <Link to="/page-three" className="shimmer-gold font-display text-2xl tracking-wider hover:opacity-80">
          ← Back
        </Link>
        <Link to="/page-four" className="shimmer-gold font-display text-2xl tracking-wider hover:opacity-80">
          Next →
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center gap-6 p-6 max-w-5xl mx-auto w-full">
        <h1 className="shimmer-gold font-display text-3xl sm:text-5xl tracking-wider text-center">
          Habitat Puzzle Concept
        </h1>
        <p className="shimmer-gold font-display text-base sm:text-lg text-center">
          (tap the sketch to hear the concept)
        </p>

        <button
          type="button"
          onClick={toggle}
          className="w-full rounded-lg border border-gold/20 overflow-hidden cursor-pointer"
        >
          <img
            src={showLed ? hpLed.url : hpOrig.url}
            alt={showLed ? "Habitat puzzle with LED highlights" : "Habitat puzzle original sketch"}
            className="w-full h-auto object-contain"
          />
        </button>

        <audio ref={audioRef} src={hpAudio.url} onEnded={() => { setShowLed(false); }} />
      </div>

      <div className="w-full pb-6 px-6 flex items-center justify-between">
        <p className="text-muted-foreground text-xs tracking-widest font-body">Demo</p>
      </div>
    </div>
  );
};

export default PageHabitat;