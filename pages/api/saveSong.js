// /pages/api/saveSong.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const filePath = path.join(process.cwd(), "data.json");

    const newSong = req.body;
    let data = [];

    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    data.push(newSong);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ success: true, message: "บันทึกเพลงสำเร็จ ❤️" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
