import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import hpOrig from "@/assets/HP_orig.jpg.asset.json";
import hpLed from "@/assets/HP_LED.jpg.asset.json";
import hpAudio from "@/assets/I.M._Haberdasher_puzzle_concept_fin_Deux_1.m4a.asset.json";
import leReveur from "@/assets/LeReveur_Dujour.png.asset.json";

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

      <div className="flex-1 flex flex-col items-center gap-8 p-6 max-w-5xl mx-auto w-full">
        {/* Row 1: Text left, HP image right */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 border border-gold/20 rounded-lg bg-card p-6 flex items-center justify-center">
            <p className="shimmer-gold font-display text-xl sm:text-2xl tracking-wider text-center">
              Habadasher Puzzle Concept
            </p>
          </div>
          <button
            type="button"
            onClick={toggle}
            className={`${showLed ? "sm:flex-[2]" : "flex-1"} w-full rounded-lg border border-gold/20 overflow-hidden cursor-pointer transition-all`}
          >
            <img
              src={showLed ? hpLed.url : hpOrig.url}
              alt={showLed ? "Habitat puzzle with LED highlights" : "Habitat puzzle original sketch"}
              className="w-full h-auto object-contain"
            />
          </button>
        </div>

        <p className="shimmer-gold font-display text-xl sm:text-2xl tracking-wider text-center -mt-4">
          (tap the sketch to hear the concept)
        </p>

        {/* Row 2: LeReveur image left (linked), text right */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-6">
          <a
            href="https://youtu.be/H8ZToD0nkH8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 w-full rounded-lg border border-gold/20 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src={leReveur.url}
              alt="LeReveur D'Jour"
              className="w-full h-auto object-contain"
            />
          </a>
          <div className="flex-1 border border-gold/20 rounded-lg bg-card p-6 flex items-center justify-center">
            <p className="shimmer-gold font-display text-xl sm:text-2xl tracking-wider text-center leading-relaxed">
              LeReveur D'Jour<br />
              <span className="text-base sm:text-lg block">
                (a short story about bullying)<br />
                Click on the image
              </span>
            </p>
          </div>
        </div>

        <audio ref={audioRef} src={hpAudio.url} onEnded={() => { setShowLed(false); }} />
      </div>

      <div className="w-full pb-6 px-6 flex items-center justify-between">
        <p className="text-muted-foreground text-xs tracking-widest font-body">Demo</p>
      </div>
    </div>
  );
};

export default PageHabitat;
