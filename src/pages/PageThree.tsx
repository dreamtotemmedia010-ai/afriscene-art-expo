import MusicPlayer from "@/components/MusicPlayer";
import { Link } from "react-router-dom";

const PageThree = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col touch-pinch-zoom animate-fade-in">
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
          <div className="sm:w-1/2 flex items-center">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px] flex items-center justify-center">
              <p className="shimmer-gold font-display text-xl sm:text-2xl tracking-wider text-center leading-relaxed">Which look is in your future?</p>
            </div>
          </div>
        </div>

        {/* Tile 2 */}
        <div className="flex flex-col sm:flex-row-reverse gap-6">
          <div className="sm:w-1/2 aspect-video bg-muted rounded-lg border border-gold/20 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Insert image or video</span>
          </div>
          <div className="sm:w-1/2 flex items-center">
            <div className="w-full p-4 bg-card rounded-lg border border-border min-h-[120px]">
              <p className="text-muted-foreground text-sm">Text box — add your content here</p>
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
