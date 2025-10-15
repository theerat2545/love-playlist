export default async function handler(req, res) {
  const binUrl = process.env.NEXT_PUBLIC_JSONBIN_URL;
  const apiKey = process.env.NEXT_PUBLIC_JSONBIN_KEY;

  if (!binUrl || !apiKey) {
    return res.status(500).json({ error: "❌ Missing JSONBin environment variables" });
  }

  try {
    if (req.method === "GET") {
      // ✅ อ่านข้อมูลทั้งหมดจาก Bin
      const resp = await fetch(binUrl + "/latest", {
        headers: { "X-Master-Key": apiKey },
      });
      const json = await resp.json();
      return res.status(200).json(json.record || []);
    }

    if (req.method === "POST") {
      const newSong = req.body;

      // ✅ โหลดข้อมูลเก่าจาก Bin
      const oldResp = await fetch(binUrl + "/latest", {
        headers: { "X-Master-Key": apiKey },
      });
      const oldData = await oldResp.json();
      const songs = oldData.record || [];

      // ✅ เพิ่มเพลงใหม่
      songs.push(newSong);

      // ✅ เขียนกลับไปยัง JSONBin
      await fetch(binUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify(songs),
      });

      return res.status(200).json({ success: true, message: "บันทึกเพลงสำเร็จ!" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("🔥 Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
}
