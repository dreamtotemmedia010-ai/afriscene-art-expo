import { useState } from "react";

const RotatingCube = () => {
  const [paused, setPaused] = useState(false);

  const togglePause = () => setPaused((p) => !p);

  const size = 80; // px
  const half = size / 2;

  const faces = [
    { transform: `rotateY(0deg) translateZ(${half}px)`, label: "Front" },
    { transform: `rotateY(180deg) translateZ(${half}px)`, label: "Back" },
    { transform: `rotateY(90deg) translateZ(${half}px)`, label: "Right" },
    { transform: `rotateY(-90deg) translateZ(${half}px)`, label: "Left" },
    { transform: `rotateX(90deg) translateZ(${half}px)`, label: "Top" },
    { transform: `rotateX(-90deg) translateZ(${half}px)`, label: "Bottom" },
  ];

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "600px", width: size, height: size }}
      onClick={togglePause}
      onTouchStart={togglePause}
    >
      <div
        className={`cube-rotate ${paused ? "cube-paused" : ""}`}
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
              backgroundColor: "hsl(0, 0%, 8%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Blank face - add images here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingCube;
