// components/FloatingImages.js
export default function FloatingImages() {
  const imagePaths = [
    "/images/pic1.png",
    "/images/pic2.png",
    "/images/pic3.png",
    "/images/pic4.png",
    "/images/pic5.png",
    "/images/pic6.png",
    "/images/pic7.png",
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none card-fade"
      style={{ zIndex: 0 }}
    >
      {Array.from({ length: 7 }).map((_, i) => {
        const randomImg = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        return (
          <img
            key={i}
            src={randomImg}
            alt={`floating-${i}`}
            className="absolute animate-floatImage opacity-90 card-fade"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${80 + Math.random() * 100}px`,
              animationDuration: `${10 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 4}s`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
