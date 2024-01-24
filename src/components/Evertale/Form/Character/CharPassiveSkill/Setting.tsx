import { Input } from "@/components/General/Input";
import { TitleSection } from "@/components/General/Wrapper";
import React, { RefObject } from "react";
import { Textarea } from "@/components/General/Textarea";
import { Button } from "@/components/General/Button";
import { TypeSkill } from "./TypeSkill";
import { notif, translateHandler } from "@/components/Utils";
import useSWR from "swr";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
const URL = "/api/gamelingo/newEvertale/passiveskill";

export const Setting = ({
  deleteMode,
  setDeleteMode,
  data,
  setData,
}: {
  deleteMode: boolean;
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  data: Evertale.Character.State;
  setData: React.Dispatch<React.SetStateAction<Evertale.Character.State>>;
}) => {
  const [inputSkill, setInputSkill] = React.useState<Evertale.Character.PassiveSkill>({} as Evertale.Character.PassiveSkill);
  const [notifName, setNotifName] = React.useState<string>("");
  const res = useSWR(URL, fetcher);
  const router = useRouter();

  const nameRef: React.MutableRefObject<HTMLParagraphElement | null> = React.useRef<HTMLParagraphElement | null>(null);

  if (res.data) {
    console.log(res.data);
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const element = e.target as HTMLInputElement | HTMLTextAreaElement;
    const field = element.getAttribute("data-passive") as string;

    setInputSkill({ ...inputSkill, [field]: element.value });
  }

  function enterHandler(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      const selectedData = res.data.passiveData.find((p: Evertale.Character.PassiveSkill) => p.skillName === inputSkill.skillName) as Evertale.Character.PassiveSkill;

      setInputSkill({ skillName: selectedData.skillName, typeSkill: selectedData.typeSkill, skillDescEn: selectedData.skillDescEn, skillDescId: selectedData.skillDescId });
    }
  }

  async function addHandler(): Promise<void> {
    if (!inputSkill.skillName) {
      notif(nameRef, "red", "Nama Passive belum diisi", setNotifName);
      return;
    }
    const isThere = res.data.passiveData.find((p: Evertale.Character.PassiveSkill) => p.skillName === inputSkill.skillName) as Evertale.Character.PassiveSkill;
    if (!isThere) {
      const allow = confirm(`${inputSkill.skillName} belum ada di database, tambahkan?`);
      if (!allow) {
        notif(nameRef, "blue", `Aksi dibatalkan`, setNotifName, false);
        return;
      }
      try {
        const res = await axios.post(URL, {
          data: inputSkill,
        });

        alert(res.data.msg);
        router.refresh();
      } catch (error) {
        if (isAxiosError(error)) {
          alert("terjadi kesalahan");
          console.error(error);
        }
      }
    }

    setData({ ...data, charPassiveSkill: [...data.charPassiveSkill, inputSkill] });
    setInputSkill({ skillName: "", typeSkill: [], skillDescEn: "", skillDescId: "" });
  }

  async function translateHandler(e: React.KeyboardEvent<HTMLTextAreaElement>): Promise<void> {
    if (e.ctrlKey && e.key === "Enter") {
      const text = inputSkill.skillDescEn;

      try {
        const res = await axios.post("/api/translate", {
          text,
        });

        const translated: string = res.data.translatedText;
        setInputSkill({ ...inputSkill, skillDescId: translated });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <TitleSection>Character Passive Skill</TitleSection>

      <div>
        <Input forId="passive-skill-name" label="Passive Name" list="passive-data-list" data-passive="skillName" value={inputSkill.skillName} onChange={changeHandler} onKeyDown={enterHandler} />
        <p ref={nameRef} className="font-semibold">
          {notifName}
        </p>

        {!res.data || res.isLoading ? (
          <p>Memuat Data Passive</p>
        ) : (
          <datalist id="passive-data-list">
            {res.data.passiveData.map((p: Evertale.Character.PassiveSkill) => (
              <option value={p.skillName} key={p._id} />
            ))}
          </datalist>
        )}

        <TypeSkill inputSkill={inputSkill} setInputSkill={setInputSkill} />

        <Textarea forId="passive-desc-en" label="Description" data-passive="skillDescEn" value={inputSkill.skillDescEn} onChange={changeHandler} onKeyDown={translateHandler} />

        <Textarea forId="passive-desc-id" label="Deskripsi" data-passive="skillDescId" value={inputSkill.skillDescId} onChange={changeHandler} />
      </div>

      <Button variant="upload" onClick={addHandler}>
        Add
      </Button>

      <Button variant="danger" onClick={() => setDeleteMode(!deleteMode)}>
        {deleteMode ? "Batalkan" : "Hapus"}
      </Button>
    </div>
  );
};
