import MusicPlayer from "@/components/MusicPlayer";
import { Link } from "react-router-dom";
import derrickArt from "@/assets/Derrick_Carter.jpeg.asset.json";

const PageThree = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col touch-pinch-zoom animate-fade-in-slow">
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
          <div className="sm:w-1/2 aspect-video rounded-lg border border-gold/20 overflow-hidden">
            <img src="/images/page-three-tile1.png" alt="African futurist streetwear quad" className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2 flex items-center min-w-0">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex flex-col items-center justify-center gap-2 min-w-0">
              <p className="shimmer-gold font-display text-2xl sm:text-3xl tracking-wider text-center break-words hyphens-auto max-w-full">Fashion</p>
              <p className="shimmer-gold font-display text-base sm:text-xl tracking-normal sm:tracking-wider text-center leading-relaxed break-words hyphens-auto max-w-full">African Futuristic Street wear. What will be your swag—street, futurism or—BOTH! Purchase the full feature in July to see what we chose.</p>
            </div>
          </div>
        </div>

        {/* Tile 2 */}
        <div className="flex flex-col sm:flex-row-reverse gap-6">
          <div className="sm:w-1/2 aspect-video rounded-lg border border-gold/20 overflow-hidden">
            <img src="/images/page-three-tile2.jpg" alt="Afro-futurist royals on thrones with pyramids backdrop" className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2 flex items-center min-w-0">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex flex-col items-center justify-center gap-2 min-w-0">
              <p className="shimmer-gold font-display text-3xl sm:text-4xl font-bold tracking-wider text-center break-words hyphens-auto max-w-full">THANK YOU</p>
              <p className="shimmer-gold font-display text-base sm:text-xl tracking-normal sm:tracking-wider text-center leading-relaxed break-words hyphens-auto max-w-full">for your support in viewing this interactive magazine. Revisit this user name on this platform in July 2026 for the full feature, including motion graphics, A.I. videos, and more engaging interactive elements and content for AAMi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full pb-6 px-6 flex items-center justify-between">
        <p className="text-muted-foreground text-xs tracking-widest font-body">Demo</p>
        <MusicPlayer justify="right" />
      </div>
    </div>
  );
};

export default PageThree;
