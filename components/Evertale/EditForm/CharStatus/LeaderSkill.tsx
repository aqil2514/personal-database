import { Input } from "@/components/General/Input";
import { notif } from "@/components/Utils";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export const LeaderSkill = ({ data, info, setData }: { data: Evertale.Character.State; info: string[]; setData: React.Dispatch<React.SetStateAction<Evertale.Character.State>> }) => {
  const router = useRouter();
  const [notifNew, setNotifNew] = useState<string>("");
  const notifRef = useRef<null | HTMLParagraphElement>(null);
  const lsData: string[] = info;

  const questions = (inputValue: string) => {
    const categoryMap: { [key: string]: string } = {
      "1": "Attack Buff",
      "2": "HP Buff",
      "3": "Hybrid Buff",
      "4": "Other Buff",
    };

    const category = prompt("Apa kategorinya? \n 1. Attack Buff \n 2. HP Buff \n 3. Hybird Buff \n 4. Other Buff");

    if (!category) {
      return;
    }
    const message = categoryMap[category];

    if (!message) {
      alert("Tidak ada pilihan tersebut");
      return;
    }

    const descEn = prompt("Apa Deskripsi bahasa Inggrisnya?");
    const descId = prompt("Apa Terjemahannya?");

    return {
      lsName: inputValue,
      lsType: categoryMap[category],
      descEn,
      descId,
    };
  };

  async function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    const element = e.target as HTMLInputElement;
    const inputValue = element.value;
    const isThere = info.includes(inputValue);
    if (e.key === "Enter" && !isThere) {
      const allow = confirm(`Ingin menambahkan ${inputValue}?`);
      if (!allow) {
        notif(notifRef, "red", "Aksi dibatalkan", setNotifNew);
        return;
      }

      const lsData = questions(inputValue);
      if (!lsData) {
        notif(notifRef, "red", "Aksi dibatalkan...", setNotifNew);
        return;
      }

      try {
        notif(notifRef, "cyan", "Mengirim Data...", setNotifNew, false, 0);
        element.disabled = true;

        const res = await axios.put("/api/gamelingo/newEvertale/leaderskill", {
          lsData,
        });

        notif(notifRef, "green", res.data.msg, setNotifNew);
        router.refresh();
      } catch (err: AxiosError | any) {
        const error = err as AxiosError;
        notif(notifRef, "red", (error.response?.data as any).msg, setNotifNew);
        console.error(error.response?.data);
        return;
      } finally {
        element.disabled = false;
      }
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = (document.getElementById("charLeaderSkill") as HTMLInputElement).value;
    setData({ ...data, charStatus: { ...data?.charStatus, charLeaderSkill: e.target.value } });

    const isThere = info.includes(inputValue);
    if (!inputValue) {
      setNotifNew("");
      return;
    }
    if (!isThere) {
      notif(notifRef, "orange", "Data baru terdeteksi. Tekan Enter untuk menyimpan di database", setNotifNew, false, 0);
      return;
    }
  }

  return (
    <div>
      <Input forId="charLeaderSkill" label="Leader Skill Unit" value={data.charStatus.charLeaderSkill} list="char-leader-skill-list" onChange={changeHandler} onKeyDown={keyDownHandler} />
      <datalist id="char-leader-skill-list">
        {lsData.map((ls: string) => (
          <option key={`char-leader-skill-${ls}`} value={ls} />
        ))}
      </datalist>
      <p ref={notifRef} className="font-semibold">
        {notifNew}
      </p>
    </div>
  );
};
