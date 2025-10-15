import { useState } from "react";
import { useRouter } from "next/router";

export default function Create() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const newSong = { title, artist, url, message };

    const res = await fetch("/api/saveSong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    });

    if (res.ok) {
      alert("บันทึกเพลงเรียบร้อยแล้ว 💖");
      router.push("/playlist");
    } else {
      alert("เกิดข้อผิดพลาดในการบันทึกเพลง 😢");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-pink-600 mb-4">
          💌 เพิ่มเพลงของคุณ 💌
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="ชื่อเพลง"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="ศิลปิน"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="ลิงก์ YouTube"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="ข้อความถึงเธอ 💬"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            💖 ส่งเพลงนี้ 💖
          </button>
        </form>
      </div>
    </div>
  );
}
