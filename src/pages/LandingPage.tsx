import { useState } from "react";
import { Link } from "react-router-dom";
import throneImg from "@/assets/throne.png";
import RotatingCube from "@/components/RotatingCube";
import MusicPlayer from "@/components/MusicPlayer";

const LandingPage = () => {
  const [cubeAxis, setCubeAxis] = useState<"y" | "x">("y");

  const toggleAxis = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setCubeAxis((prev) => (prev === "y" ? "x" : "y"));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center overflow-hidden touch-pinch-zoom">
      {/* Heading */}
      <div className="pt-8 sm:pt-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wider">
          <Link to="/page-two" className="shimmer-gold hover:opacity-80 transition-opacity cursor-pointer">
            African
          </Link>
          <span className="text-pale-green ml-3">American</span>
        </h1>
        <p className="text-foreground/80 font-body text-base sm:text-lg mt-2 tracking-widest">
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
          <div className="absolute" style={{ top: "45%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <RotatingCube axis={cubeAxis} />
          </div>
          {/* Tappable footstool area below the seat */}
          <div
            className="absolute cursor-pointer"
            style={{ bottom: "2%", left: "30%", width: "40%", height: "12%" }}
            onClick={toggleAxis}
            onTouchStart={toggleAxis}
            title="Tap to change cube rotation direction"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full pb-6 px-4 flex flex-col items-center gap-3">
        <MusicPlayer />
        <p className="text-muted-foreground text-xs tracking-widest font-body">for Demo purposes</p>
      </div>
    </div>
  );
};

export default LandingPage;
