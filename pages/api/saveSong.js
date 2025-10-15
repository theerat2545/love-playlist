import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data.json");

  // อ่านข้อมูลเก่า (ถ้ามี)
  let songs = [];
  if (fs.existsSync(filePath)) {
    songs = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  if (req.method === "POST") {
    const newSong = req.body;
    songs.push(newSong);
    fs.writeFileSync(filePath, JSON.stringify(songs, null, 2));
    return res.status(200).json({ success: true, message: "บันทึกเพลงสำเร็จ!" });
  }

  if (req.method === "GET") {
    return res.status(200).json(songs);
  }

  res.status(405).json({ message: "Method not allowed" });
}
