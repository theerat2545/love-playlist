import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FloatingTexts from "./FloatingTexts";
import FloatingHearts from "./FloatingHearts";
import FloatingImages from "./FloatingImages";

export default function Playlist() {
  const [songs, setSongs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("loveSongs");
    if (saved) setSongs(JSON.parse(saved));
  }, []);

  function convertYouTubeUrl(url) {
    try {
      if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
      } else if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      } else {
        return url;
      }
    } catch {
      return url;
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white p-4 sm:p-6"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* 💖 พื้นหลังหัวใจ + ข้อความลอย */}
      <FloatingHearts />
      <FloatingTexts />
      <FloatingImages />

      {/* หัวข้อ */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 drop-shadow-lg relative z-10 card-fade">
        💖 ส่งเพลงให้เธอ 💖
      </h1>

      {/* ถ้ายังไม่มีเพลง */}
      {songs.length === 0 ? (
        <div className="text-center text-gray-200 relative z-10 card-fade">
          <p className="text-lg sm:text-xl">ยังไม่มีเพลงเลยนะ 😅</p>
          <button
            onClick={() => router.push("/create")}
            className="mt-6 bg-pink-600 px-6 py-2 rounded-lg hover:bg-pink-700 transition font-semibold text-sm sm:text-base"
          >
            ➕ เพิ่มเพลง
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10 card-fade">
          {songs.map((s, i) => (
            <div
              key={i}
              className="bg-pink-600/40 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-1 truncate">
                {s.title}
              </h2>
              <p className="text-sm sm:text-base mb-2 opacity-80 truncate">
                {s.artist}
              </p>
              <div className="relative w-full aspect-video mb-3 rounded-xl overflow-hidden">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={convertYouTubeUrl(s.url)}
                  title={s.title}
                  frameBorder="0"
                  allow="autoplay"
                ></iframe>
              </div>
              <p className="italic text-sm sm:text-base text-pink-100 leading-snug">
                “{s.message}”
              </p>
            </div>
          ))}
        </div>
      )}

      {/* เครดิต */}
      <p className="mt-10 sm:mt-12 text-center text-xs sm:text-sm opacity-80 relative z-10 card-fade">
        💕 สร้างเพลย์ลิสต์โดย <strong>ธีรัตม์</strong>
      </p>
    </div>
  );
}
