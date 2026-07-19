import MusicPlayer from "@/components/MusicPlayer";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import derrickArt from "@/assets/Derrick_Carter.jpeg.asset.json";
import derrickArtFull from "@/assets/Derrick_Carter_full.jpeg.asset.json";
import artAudio from "@/assets/I.M._Art_page_Derrick_Carter_fin_copy.m4a.asset.json";
import fashionFull from "@/assets/African_future_street_wear_full.png.asset.json";
import fashionThumb from "@/assets/African_future_et_street_wear_3.png.asset.json";
import fashionAudio from "@/assets/pulse-on-my-name.mp3.asset.json";
import { useRef, useState, useEffect } from "react";

const PageThree = () => {
  const [artOpen, setArtOpen] = useState(false);
  const [fashionOverlayOpen, setFashionOverlayOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fashionAudioRef = useRef<HTMLAudioElement | null>(null);

  const openFashionOverlay = () => {
    setFashionOverlayOpen(true);
    setTimeout(() => {
      if (fashionAudioRef.current) {
        fashionAudioRef.current.currentTime = 0;
        fashionAudioRef.current.play().catch(() => {});
      }
    }, 0);
  };

  const closeFashionOverlay = () => {
    setFashionOverlayOpen(false);
    if (fashionAudioRef.current) {
      fashionAudioRef.current.pause();
      fashionAudioRef.current.currentTime = 0;
    }
  };

  const openArt = () => {
    setArtOpen(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }, 0);
  };

  const closeArt = () => {
    setArtOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col touch-pinch-zoom animate-fade-in-slow">
      <SEO
        title="Fashion & Art — AAAFM Interactive Magazine"
        description="African futuristic streetwear and Derrick Carter's Melanine dawn art — explore fashion and art in the interactive AAAFM."
        path="/page-three"
      />
      {/* Header */}
      <div className="pt-6 px-6">
        <Link to="/page-two" className="shimmer-gold font-display text-2xl tracking-wider hover:opacity-80">
          ← Back
        </Link>
      </div>

      {/* Tiles */}
      <div className="flex-1 flex flex-col gap-8 p-6 sm:p-10 max-w-6xl mx-auto w-full">
        {/* Tile 1 */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            type="button"
            onClick={openFashionOverlay}
            className="sm:w-1/2 aspect-video rounded-lg border border-gold/20 overflow-hidden cursor-pointer"
          >
            <img src={fashionThumb.url} alt="African futurist streetwear" className="w-full h-full object-cover" />
          </button>
          <audio ref={fashionAudioRef} src={fashionAudio.url} />
          <div className="sm:w-1/2 flex items-center min-w-0">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex flex-col items-center justify-center gap-2 min-w-0">
              <p className="shimmer-gold font-display text-2xl sm:text-3xl tracking-wider text-center break-words hyphens-auto max-w-full">Fashion</p>
              <p className="shimmer-gold font-display text-base sm:text-xl tracking-normal sm:tracking-wider text-center leading-relaxed break-words hyphens-auto max-w-full">African Futuristic Street wear. What will be your swag—street, futurism or—BOTH! Full feature debuts in LATE summer. [TAP PAUSE at the bottom of the page. TAP image to see full image]</p>
            </div>
          </div>
        </div>

        {/* Tile 2 */}
        <div className="flex flex-col sm:flex-row-reverse gap-6">
          <div className="sm:w-1/2 aspect-video rounded-lg border border-gold/20 overflow-hidden">
            <img src={derrickArt.url} alt="Danse a l'aube de la melanine by Derrick Carter" className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2 flex items-center min-w-0">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex flex-col items-center justify-center gap-2 min-w-0">
              <button
                onClick={openArt}
                className="shimmer-gold font-display text-3xl sm:text-4xl font-bold tracking-wider text-center break-words hyphens-auto max-w-full hover:opacity-80 transition-opacity cursor-pointer"
              >
                Art
              </button>
              <p className="shimmer-gold font-display text-base sm:text-xl tracking-wider text-center opacity-80">(click/tap "Art")</p>
              <p className="shimmer-gold font-display text-base sm:text-xl tracking-normal sm:tracking-wider text-center leading-relaxed break-words hyphens-auto max-w-full">"Danse a l'aube de la melanine" (Melanine dawn dancing) [not actual name] by Derrick Carter</p>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={artAudio.url} preload="auto" onEnded={closeArt} />

      {artOpen && (
        <div
          onClick={closeArt}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4 animate-fade-in cursor-pointer touch-pinch-zoom overflow-auto"
        >
          <img
            src={derrickArtFull.url}
            alt="Danse a l'aube de la melanine by Derrick Carter"
            style={{ aspectRatio: "9 / 19.5" }}
            className="h-full max-h-screen w-auto object-contain rounded-lg animate-scale-in touch-pinch-zoom"
          />
        </div>
      )}

      {fashionOverlayOpen && (
        <div
          onClick={closeFashionOverlay}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4 animate-fade-in cursor-pointer"
        >
          <img
            src={fashionFull.url}
            alt="African futurist streetwear full"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg animate-scale-in shadow-[0_0_60px_20px_rgba(0,150,255,0.9),0_0_120px_40px_rgba(0,150,255,0.6)] border-2 border-[#00A6FF]"
          />
        </div>
      )}

      {/* Bottom */}
      <div className="w-full pb-6 px-6 flex items-center justify-between">
        <p className="text-muted-foreground text-xs tracking-widest font-body">Demo</p>
        <Link to="/page-habitat" className="shimmer-gold font-display text-2xl tracking-wider hover:opacity-80">
          Next →
        </Link>
        <MusicPlayer justify="right" />
      </div>
    </div>
  );
};

export default PageThree;
