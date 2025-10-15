export default async function handler(req, res) {
  const binUrl = process.env.NEXT_PUBLIC_JSONBIN_URL;
  const apiKey = process.env.NEXT_PUBLIC_JSONBIN_KEY;

  if (!binUrl || !apiKey) {
    return res.status(500).json({ error: "❌ Missing JSONBin environment variables" });
  }

  try {
    // 🧠 โหลดข้อมูลเก่า (กัน error JSON.parse)
    let songs = [];
    try {
      const oldResp = await fetch(binUrl + "/latest", {
        headers: { "X-Master-Key": apiKey },
      });

      if (oldResp.ok) {
        const text = await oldResp.text(); // อ่านแบบ text ก่อนกันกรณีว่าง
        if (text.trim()) {
          const parsed = JSON.parse(text);
          songs = Array.isArray(parsed.record)
            ? parsed.record
            : Array.isArray(parsed)
            ? parsed
            : [];
        }
      }
    } catch (err) {
      console.warn("⚠️ JSONBin ว่างหรือ parse ไม่ได้:", err.message);
    }

    // 🧾 GET - แสดงข้อมูลทั้งหมด
    if (req.method === "GET") {
      return res.status(200).json(songs);
    }

    // 💖 POST - เพิ่มเพลงใหม่
    if (req.method === "POST") {
      const { title, artist, url, message } = req.body;
      if (!title || !artist || !url || !message) {
        return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
      }

      const newSong = { title, artist, url, message };
      songs.push(newSong);

      // ✅ บันทึกกลับไปที่ JSONBin
      const saveResp = await fetch(binUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify(songs),
      });

      const resultText = await saveResp.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        console.warn("⚠️ JSONBin ไม่ได้คืน JSON:", resultText);
        result = {};
      }

      if (!saveResp.ok) {
        console.error("🔥 JSONBin Save Error:", result);
        return res.status(saveResp.status).json({
          error: "❌ JSONBin Save Failed",
          detail: result,
        });
      }

      return res.status(200).json({ success: true, message: "บันทึกเพลงสำเร็จ!", data: result });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("🔥 Server Error:", err);
    return res.status(500).json({
      error: "Server Error",
      detail: err.message,
    });
  }
}
