// components/FloatingImages.js
export default function FloatingImages() {
  const imagePaths = [
    "/images/pic1.jpg",
    "/images/pic2.jpg",
    "/images/pic3.jpg",
    "/images/pic4.jpg",
    "/images/pic5.jpg",
    "/images/pic6.jpg",
    "/images/pic7.jpg",
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {Array.from({ length: 7 }).map((_, i) => {
        const randomImg =
          imagePaths[Math.floor(Math.random() * imagePaths.length)];
        const randomLeft = `${Math.random() * 100}%`;
        const randomSize = 60 + Math.random() * 60;
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 5;

        return (
          <img
            key={i}
            src={randomImg}
            alt={`floating-heart-${i}`}
            className="absolute animate-floatImageHeart opacity-0"
            style={{
              left: randomLeft,
              bottom: "-150px",
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              objectFit: "cover",
              WebkitMaskImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 29.6\"><path fill=\"white\" d=\"M23.6,0c-3,0-5.6,1.9-7.6,4.7C14,1.9,11.4,0,8.4,0C3.8,0,0,3.8,0,8.4 c0,9.4,16,21.2,16,21.2S32,17.8,32,8.4C32,3.8,28.2,0,23.6,0z\"/></svg>')",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 29.6\"><path fill=\"white\" d=\"M23.6,0c-3,0-5.6,1.9-7.6,4.7C14,1.9,11.4,0,8.4,0C3.8,0,0,3.8,0,8.4 c0,9.4,16,21.2,16,21.2S32,17.8,32,8.4C32,3.8,28.2,0,23.6,0z\"/></svg>')",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
              borderRadius: "50%",
              filter: "drop-shadow(0 0 6px rgba(255, 105, 180, 0.3))",
            }}
          />
        );
      })}
    </div>
  );
}
