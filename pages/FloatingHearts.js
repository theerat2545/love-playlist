import { useState } from "react";

export default function FloatingHearts() {
  const hearts = Array.from({ length: 20 });
  const colors = ["#ffb6c1", "#ff69b4", "#ff1493", "#db2777"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none card-fade">
      {hearts.map((_, i) => (
        <span
          key={i}
          className="absolute opacity-80 text-2xl animate-float card-fade"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${6 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 4}s`,
            fontSize: `${16 + Math.random() * 20}px`,
            color: colors[Math.floor(Math.random() * colors.length)],
            filter: Math.random() > 0.5 ? "blur(1px)" : "none",
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
