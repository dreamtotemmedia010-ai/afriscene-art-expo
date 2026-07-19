import MusicPlayer from "@/components/MusicPlayer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import tupacFull from "@/assets/Tupac_in_studio_Full_pic.jpg.asset.json";
import tupacAudio from "@/assets/I.M._Tupac_cliffhanger_fin-2.m4a.asset.json";
import SEO from "@/components/SEO";

const PageTwo = () => {
  const navigate = useNavigate();
  const [rolling, setRolling] = useState(false);
  const [showTupac, setShowTupac] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const openTupac = () => {
    setShowTupac(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 50);
  };

  const closeTupac = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setShowTupac(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (rolling) return;
    setRolling(true);
    setTimeout(() => navigate("/page-three"), 1200);
  };

  return (
    <>
    <SEO
      title="Celebrity News & Politics — AAAFM Interactive"
      description="Celebrity news and political commentary in the African American Arts Festival Magazine — Tupac cliffhanger, discernment over rhetoric."
      path="/page-two"
    />
    <div className="min-h-screen bg-background overflow-hidden touch-pinch-zoom animate-fade-in">
      <div className={`min-h-screen flex flex-col ${rolling ? "page-roll-up" : ""}`}>
      {/* Header */}
      <div className="pt-6 px-6">
        <Link to="/" className="shimmer-gold font-display text-2xl tracking-wider hover:opacity-80">
          ← Back
        </Link>
      </div>

      {/* Tiles */}
      <div className="flex-1 flex flex-col gap-8 p-6 sm:p-10 max-w-6xl mx-auto w-full">
        {/* Tile 1 - Image/Video left, text right */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            type="button"
            onClick={openTupac}
            className="sm:w-1/2 aspect-video rounded-lg border border-gold/20 overflow-hidden cursor-pointer"
          >
            <img src="/images/page-two-tile1.jpg" alt="Studio portrait" className="w-full h-full object-cover" />
          </button>
          <div className="sm:w-1/2 flex items-center">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex flex-col items-center justify-center">
              <p className="shimmer-gold font-display text-2xl sm:text-3xl tracking-wider text-center mb-2">Celebrity News</p>
              <p className="shimmer-gold font-display text-xl sm:text-2xl tracking-wider text-center leading-relaxed">
                "Thug Life" was a concubine, not the main Wife/ expecting resurrecting truths shedding his Lyme Life!{" "}
                <span className="text-xl sm:text-2xl italic">(tap on Tupac)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tile 2 - Text left, Image/Video right */}
        <div className="flex flex-col sm:flex-row-reverse gap-6">
          <div className="sm:w-1/2 aspect-video rounded-lg border border-gold/20 overflow-hidden">
            <img src="/images/page-two-tile2.jpg" alt="Currency conspiracy collage" className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2 flex items-center">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex flex-col items-center justify-center">
              <p className="shimmer-gold font-display text-2xl sm:text-3xl tracking-wider text-center mb-2">Politics</p>
              <p className="shimmer-gold font-display text-xl sm:text-2xl tracking-wider text-center leading-relaxed">What do all of these have in comnon? ----truths lye in discernment, not eloquent rhetoric.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full pb-6 px-6 flex items-center justify-between">
        <p className="text-muted-foreground text-xs tracking-widest font-body">Demo</p>
        <div className="flex items-center gap-4">
          <Link to="/page-three" onClick={handleNext} className="text-gold text-sm hover:underline font-display">
            <span className="text-lg">Next →</span>
          </Link>
          <MusicPlayer justify="right" src="/audio/smooth-ember-2.mp3" />
        </div>
      </div>
      {showTupac && (
        <div
          onClick={closeTupac}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <img
            src={tupacFull.url}
            alt="Tupac in studio"
            className="max-h-full max-w-full object-contain rounded-lg"
          />
          <audio ref={audioRef} src={tupacAudio.url} />
        </div>
      )}
      </div>
    </div>
    </>
  );
};

export default PageTwo;
