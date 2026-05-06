import { useState, useRef } from "react";
import cubeFace1 from "@/assets/cube-face-1.png";
import cubeFace2 from "@/assets/cube-face-2.jpeg";
import cubeFace3 from "@/assets/cube-face-3.jpeg";
import cubeFace4 from "@/assets/cube-face-4.jpeg";
import cubeFace5 from "@/assets/cube-face-5.jpeg";
import cubeFace6 from "@/assets/cube-face-6.png";

const RotatingCube = () => {
  // States cycle: horizontal -> paused -> vertical -> paused -> horizontal ...
  const [state, setState] = useState<"horizontal" | "paused-h" | "vertical" | "paused-v">("horizontal");
  const lastTapRef = useRef(0);

  const handleTap = () => {
    // Debounce so click + touchstart don't double-fire on touch devices
    const now = Date.now();
    if (now - lastTapRef.current < 300) return;
    lastTapRef.current = now;
    setState((s) => {
      if (s === "horizontal") return "paused-h";
      if (s === "paused-h") return "vertical";
      if (s === "vertical") return "paused-v";
      return "horizontal";
    });
  };

  const isVertical = state === "vertical" || state === "paused-v";
  const isPaused = state === "paused-h" || state === "paused-v";

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
    <div
      className="cursor-pointer"
      style={{ perspective: "600px", width: size, height: size }}
      onClick={handleTap}
      onTouchStart={handleTap}
    >
      <div
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
  );
};

export default RotatingCube;
