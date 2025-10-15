import { useState, useEffect } from "react";

export default function FloatingTexts({ previewMessage = "" }) {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    if (previewMessage) {
      const newText = {
        id: Date.now(),
        text: previewMessage,
        left: `${Math.random() * 90}%`,
        top: `${80 + Math.random() * 10}%`, // เริ่มล่าง ๆ
      };
      setTexts((prev) => [...prev, newText]);

      // ให้ข้อความหายหลังจาก 8 วินาที
      const timeout = setTimeout(() => {
        setTexts((prev) => prev.filter((t) => t.id !== newText.id));
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [previewMessage]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none card-fade"
      style={{ zIndex: 0 }}
    >
      {texts.map((t) => (
        <span
          key={t.id}
          className="absolute text-pink-200 font-semibold animate-floatText card-fade"
          style={{
            left: t.left,
            top: t.top,
            animationDuration: `${5 + Math.random() * 5}s`,
            fontSize: `${18 + Math.random() * 12}px`,
            transform: "translateX(-50%)",
            color: "#fff",
            textShadow: "0 0 8px #ff69b4",
          }}
        >
          {t.text}
        </span>
      ))}
    </div>
  );
}
