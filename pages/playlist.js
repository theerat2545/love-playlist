import { useState, useEffect } from "react";
import FloatingTexts from "./FloatingTexts";
import FloatingHearts from "./FloatingHearts";
import FloatingImages from "./FloatingImages";

export default function Playlist() {
  const [songs, setSongs] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadSongs() {
      const res = await fetch("/api/saveSong");
      const data = await res.json();
      setSongs(data);

      const baseMessages = data.map((s) => s.message).filter(Boolean);
      const repeated = baseMessages.flatMap((msg) => {
        const times = 1 + Math.floor(Math.random() * 5);
        return Array.from({ length: times }, () => msg);
      });
      setMessages(repeated);
    }

    loadSongs();
  }, []);

  function convertYouTubeUrl(url) {
    try {
      if (url.includes("youtube.com/watch?v="))
        return url.replace("watch?v=", "embed/");
      else if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return url;
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white p-4 sm:p-6 overflow-hidden"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <FloatingHearts />
      <FloatingImages />
      <FloatingTexts messages={messages} />

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 drop-shadow-lg relative z-10">
        💖 ส่งเพลงให้เธอ 💖
      </h1>

      {songs.length === 0 ? (
        <div className="text-center text-gray-200 relative z-10">
          <p>ยังไม่มีเพลงเลย 😅</p>
          <a
            href="/create"
            className="mt-4 inline-block bg-pink-600 px-6 py-2 rounded-lg hover:bg-pink-700 transition font-semibold"
          >
            ➕ เพิ่มเพลง
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {songs.map((s, i) => (
            <div
              key={i}
              className="bg-pink-600/40 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-lg hover:scale-105 transition"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-1">{s.title}</h2>
              <p className="text-sm mb-2 opacity-80">{s.artist}</p>
              <iframe
                className="w-full rounded-xl mb-3"
                height="180"
                src={convertYouTubeUrl(s.url)}
                title={s.title}
                frameBorder="0"
                allow="autoplay"
              />
              <p className="italic text-sm sm:text-base text-pink-100">
                “{s.message}”
              </p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-12 text-center text-sm opacity-80 relative z-10">
        💕 สร้างเพลย์ลิสต์โดย <strong>ธีรัตม์</strong>
      </p>
    </div>
  );
}
