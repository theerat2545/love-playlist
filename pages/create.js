import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FloatingTexts from "./FloatingTexts";
import FloatingHearts from "./FloatingHearts";

export default function CreatePlaylist() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    url: "",
    message: "",
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const newSong = { title, artist, url, message };

    await fetch("/api/saveSong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    });

    alert("บันทึกเพลงสำเร็จ ❤️");
  }


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

  const addSong = () => {
    if (!newSong.title || !newSong.url) {
      alert("กรุณากรอกชื่อเพลงและลิงก์ YouTube 💖");
      return;
    }
    setSongs([...songs, newSong]);
    setNewSong({ title: "", artist: "", url: "", message: "" });
  };

  const removeSong = (index) => {
    setSongs(songs.filter((_, i) => i !== index));
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white p-6"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* พื้นหลังหัวใจ + ข้อความลอย */}
      <FloatingHearts />
      <FloatingTexts previewMessage={newSong.message} />

      <h1 className="text-4xl font-bold text-center mb-6 drop-shadow-lg relative z-10">
        🎧 เพิ่มเพลงของคุณ 💞
      </h1>

      {/* ฟอร์ม */}
      <div className="max-w-2xl mx-auto bg-pink-600/40 backdrop-blur-md rounded-xl p-5 mb-8 relative z-10">
        <div className="grid gap-3">
          <input
            type="text"
            placeholder="ชื่อเพลง"
            className="p-2 rounded-lg text-black"
            value={newSong.title}
            onChange={(e) =>
              setNewSong({ ...newSong, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="ศิลปิน"
            className="p-2 rounded-lg text-black"
            value={newSong.artist}
            onChange={(e) =>
              setNewSong({ ...newSong, artist: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="ลิงก์ YouTube"
            className="p-2 rounded-lg text-black"
            value={newSong.url}
            onChange={(e) =>
              setNewSong({ ...newSong, url: e.target.value })
            }
          />
          <textarea
            placeholder="ข้อความความรู้สึก 💬"
            className="p-2 rounded-lg text-black"
            value={newSong.message}
            onChange={(e) =>
              setNewSong({ ...newSong, message: e.target.value })
            }
          ></textarea>
        </div>

        <button
          onClick={addSong}
          className="mt-4 bg-pink-600 px-6 py-2 rounded-lg hover:bg-pink-700 transition font-semibold"
        >
          ➕ เพิ่มเพลงนี้
        </button>

        <button
          onClick={() => router.push("/playlist")}
          className="mt-4 ml-3 bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          ▶ ไปหน้าฟังเพลง
        </button>
      </div>

      {/* การ์ดเพลงที่เพิ่ม */}
      {songs.length > 0 && (
        <div className="max-w-2xl mx-auto grid gap-4 relative z-10">
          {songs.map((s, i) => (
            <div
              key={i}
              className="bg-pink-500/40 rounded-xl p-3 flex justify-between items-center"
            >
              <div>
                <strong>{s.title}</strong> — {s.artist}
              </div>
              <button onClick={() => removeSong(i)}>❌</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
