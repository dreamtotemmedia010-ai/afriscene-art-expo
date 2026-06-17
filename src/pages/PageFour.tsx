import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import mediImg from "@/assets/Medi.png.asset.json";
import audioTrack from "@/assets/Fin_pour_IM_Rhyme.mp3.asset.json";

const POEM_LINES = [
  "Thoughts on riot, whose ever sighted/",
  "Solo or teams invited, single physiques get Gemini divided/",
  "I'm dark knighted, mind laser-guided/",
  "Big Bang's omen was an mcee and me collided/",
  "My level to find it/",
  "Dark matter stellar chariot Aries riding it/",
  "Scribed, in sacred books slighted/",
  "I was spitting with my Hair, Eyes & Mic IGNITED!",
];

const PageFour = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

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
        <Link to="/page-three" className="shimmer-gold font-display text-2xl tracking-wider hover:opacity-80">
          ← Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-8 p-6 sm:p-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row gap-6 items-stretch">
          <div className="flex items-center gap-4 sm:w-1/2">
            <button
              onClick={toggleAudio}
              aria-label={playing ? "Pause audio" : "Play audio"}
              className="shimmer-gold font-display text-4xl sm:text-6xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer select-none"
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <div
              className="flex-1 aspect-[4/3] rounded-lg border border-gold/20 overflow-hidden cursor-pointer select-none"
              onClick={toggleAudio}
              role="button"
              aria-label={playing ? "Pause audio" : "Play audio"}
            >
              <img src={mediImg.url} alt="Hooded figure with red lightsaber microphone" className="w-full h-full object-cover" draggable={false} />
            </div>
          </div>
          <div className="sm:w-1/2 flex items-center min-w-0">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex flex-col items-center justify-center gap-3 min-w-0">
              <p className="shimmer-gold font-display text-2xl sm:text-4xl font-bold tracking-wider text-center break-words max-w-full">
                Interactive Poetry (tap the play icon to play the commentary)
              </p>
              <p className="shimmer-gold font-display text-sm sm:text-lg tracking-normal text-center leading-relaxed break-words max-w-full whitespace-pre-line">
                {POEM_LINES.join("\n")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioTrack.url} preload="auto" onEnded={() => setPlaying(false)} />

      <div className="w-full pb-6 px-6">
        <p className="text-muted-foreground text-xl sm:text-2xl tracking-widest font-body text-center">Demo</p>
      </div>
    </div>
  );
};

export default PageFour;
