import { useState, useRef } from "react";
import { RotateCcw } from "lucide-react";
import cubeFace1 from "@/assets/cube-face-1.png";
import cubeFace2 from "@/assets/cube-face-2.jpeg";
import cubeFace3 from "@/assets/cube-face-3.jpeg";
import cubeFace4 from "@/assets/cube-face-4.jpeg";
import cubeFace5 from "@/assets/cube-face-5.jpeg";
import cubeFace6 from "@/assets/cube-face-6.png";

const RotatingCube = () => {
  // Tap/click toggles pause/resume. Restart button resets the animation.
  const [isPaused, setIsPaused] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const lastTapRef = useRef(0);

  const handleTap = () => {
    // Debounce so click + touchstart don't double-fire on touch devices
    const now = Date.now();
    if (now - lastTapRef.current < 300) return;
    lastTapRef.current = now;
    setIsPaused((p) => !p);
  };

  const handleRestart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsPaused(false);
    setIsVertical((v) => !v);
    setAnimKey((k) => k + 1);
  };

  const size = 140;
  const half = size / 2;

  const faces = [
    { transform: `rotateY(0deg) translateZ(${half}px)`, img: cubeFace1 },
    { transform: `rotateY(180deg) translateZ(${half}px)`, img: cubeFace2 },
    { transform: `rotateY(90deg) translateZ(${half}px)`, img: cubeFace3 },
    { transform: `rotateY(-90deg) translateZ(${half}px)`, img: cubeFace4 },
    { transform: `rotateX(90deg) translateZ(${half}px)`, img: cubeFace5 },
    { transform: `rotateX(-90deg) translateZ(${half}px)`, img: cubeFace6 },
  ];

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
    <div
      className="cursor-pointer"
      style={{ perspective: "600px", width: size, height: size }}
      onClick={handleTap}
      onTouchStart={handleTap}
      role="button"
      tabIndex={0}
      aria-label={isPaused ? "Resume cube rotation" : "Pause cube rotation"}
      aria-pressed={isPaused}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleTap();
        }
      }}
    >
      <div
        key={animKey}
        className={`${isVertical ? "cube-rotate-vertical" : "cube-rotate"} ${isPaused ? "cube-paused" : ""}`}
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            className="gold-seam"
            style={{
              position: "absolute",
              width: size,
              height: size,
              transform: face.transform,
              backfaceVisibility: "visible",
              overflow: "hidden",
            }}
          >
            <img
              src={face.img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
      <button
        type="button"
        onClick={handleRestart}
        aria-label="Restart cube rotation"
        className="absolute -bottom-2 -right-2 bg-background/80 hover:bg-background border border-border rounded-full p-1.5 shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
      >
        <RotateCcw className="w-4 h-4 text-foreground" aria-hidden="true" />
      </button>
    </div>
  );
};

export default RotatingCube;
