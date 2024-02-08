import { useCharacterData } from "@/components/Evertale/Providers";
import { Button } from "@/components/General/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function Buttons() {
  const { data } = useCharacterData();
  const router = useRouter()

  const [sendLoading, setSendLoading] = React.useState<boolean>(false);
  const [verifLoading, setVerifLoading] = React.useState<boolean>(false);

  const sendingHandler = async (
    type: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      console.log(data);
      const res = await axios.post("/api/gamelingo/newEvertale/chars", {
        data,
        action: type,
      });
      // localStorage.removeItem("evertaleCharData");
      if (res.data.redirect) {
        alert(res.data.msg);
        router.replace("/admin/gamelingo/evertale/characters");
      }
      const msg: string = res.data.msg;
      alert(msg);
      console.log(res.data);
    } catch (error: any) {
      console.error(error);
      const msg: string = error.response.data.msg;
      const ref: string = error.response.data.ref;
      const element = document.getElementById(ref) as HTMLInputElement;
      const notif = document.createElement("p") as HTMLParagraphElement;
      notif.setAttribute("class", "font-bold text-red-600 my-2");
      notif.innerHTML = msg || "Terjadi Kesalahan";
      element.after(notif);
      setTimeout(() => {
        notif.remove();
      }, 3000);
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row gap-4 m-2">
      <Button
        variant="upload"
        disabled={verifLoading || sendLoading}
        onClick={() => sendingHandler("see", setVerifLoading)}
      >
        {verifLoading ? "Sedang Verifikasi..." : "Verifikasi Data"}
      </Button>
      <Button
        variant="upload"
        disabled={verifLoading || sendLoading}
        onClick={() => sendingHandler("add", setSendLoading)}
      >
        {sendLoading ? "Mengirim Data..." : "Kirim Data"}
      </Button>
      <Button
        variant="fixation"
        disabled={verifLoading || sendLoading}
        onClick={() => sendingHandler("see", setSendLoading || setVerifLoading)}
      >
        Lihat Data
      </Button>
    </div>
  );
}
