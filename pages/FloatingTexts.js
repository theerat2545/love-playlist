export default function FloatingTexts({ messages = [] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {messages.map((msg, i) => (
        <span
          key={i}
          className="absolute text-pink-100 text-sm animate-float opacity-90"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${6 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 4}s`,
            fontSize: `${14 + Math.random() * 6}px`,
            textShadow: "0 0 8px rgba(255,192,203,0.5)",
          }}
        >
          💬 {msg}
        </span>
      ))}
    </div>
  );
}
