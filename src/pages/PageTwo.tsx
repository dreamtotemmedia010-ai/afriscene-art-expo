import MusicPlayer from "@/components/MusicPlayer";
import { Link } from "react-router-dom";

const PageTwo = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col touch-pinch-zoom animate-fade-in">
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
          <div className="sm:w-1/2 aspect-video rounded-lg border border-gold/20 overflow-hidden">
            <img src="/images/page-two-tile1.jpg" alt="Studio portrait" className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2 flex items-center">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex items-center justify-center">
              <p className="shimmer-gold font-display text-xl sm:text-2xl tracking-wider text-center leading-relaxed">Thug Life was a concubine not the main Wife/ expecting resurrecting truths 7th month shedding his Lyme Life!</p>
            </div>
          </div>
        </div>

        {/* Tile 2 - Text left, Image/Video right */}
        <div className="flex flex-col sm:flex-row-reverse gap-6">
          <div className="sm:w-1/2 aspect-video rounded-lg border border-gold/20 overflow-hidden">
            <img src="/images/page-two-tile2.jpg" alt="Currency conspiracy collage" className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2 flex items-center">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex items-center justify-center">
              <p className="shimmer-gold font-display text-xl sm:text-2xl tracking-wider text-center leading-relaxed">What do these have in common?—truths lie in discernment, not eloquent rhetoric.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full pb-6 px-6 flex items-center justify-between">
        <p className="text-muted-foreground text-xs tracking-widest font-body">Demo</p>
        <div className="flex items-center gap-4">
          <Link to="/page-three" className="text-gold text-sm hover:underline font-display">
            Next →
          </Link>
          <MusicPlayer justify="right" src="/audio/smooth-ember-2.mp3" />
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
