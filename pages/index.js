import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/playlist"); // redirect ไปยังหน้า playlist
  }, [router]);

  return <p style={{ textAlign: "center", marginTop: "50px" }}>กำลังพาไปหน้าเพลย์ลิสต์... 🎵</p>;
}
