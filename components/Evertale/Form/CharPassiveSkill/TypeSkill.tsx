import { Button } from "@/components/General/Button";
import { Input } from "@/components/General/Input";
import { notif } from "@/components/Utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useRef } from "react";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export const TypeSkill = ({ setInputSkill, inputSkill }: { setInputSkill: React.Dispatch<SetStateAction<Evertale.Character.PassiveSkill>>; inputSkill: Evertale.Character.PassiveSkill }) => {
  const URL = "/api/gamelingo/newEvertale?category=statusResource";
  const { data, isLoading, error } = useSWR(URL, fetcher);
  const router = useRouter();
  const [types, setTypes] = React.useState<string[]>([]);
  const [type, setType] = React.useState<string>("");
  const [typeNotif, setTypeNotif] = React.useState<string>("");
  const [fixNotif, setFixNotif] = React.useState<string>("");

  const notifRef = useRef<null | HTMLParagraphElement>(null);
  const fixNotifRef = useRef<null | HTMLParagraphElement>(null);

  if (!data || isLoading) return <p>Mengambil data...</p>;
  if (error) return <p>Error...</p>;

  const passiveSkillTypes: string[] = data.data.rss.typePassiveSkill;

  async function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey && e.key === "Enter") {
      fixationHandler();
      return;
    }
    if (e.key === "Enter") {
      if (!type) {
        notif(notifRef, "red", "Tipe Skill Setting masih kosong", setTypeNotif);
        return;
      }
      const isThere = passiveSkillTypes.find((t: string) => t === type);
      if (isThere) {
        const dupplicate = types.includes(type);
        if (dupplicate) {
          notif(notifRef, "red", `${type} sudah ditambahkan`, setTypeNotif);
          return;
        }
        notif(notifRef, "green", `${type} berhasil ditambahkan`, setTypeNotif);
        setTypes((prevTeams: string[]) => [...prevTeams, type]);
        setType("");
        return;
      }

      const allow = confirm(`${type} belum ditambahkan di Database, tambahkan sekarang?`);
      if (!allow) {
        notif(notifRef, "red", `Aksi dibatalkan`, setTypeNotif);
        return;
      }

      const res = await axios.put("/api/gamelingo/newEvertale", {
        data: type,
        type: "char-team-type",
      });

      notif(notifRef, "green", res.data.msg, setTypeNotif);
      router.refresh();
    }
  }

  function fixationHandler() {
    if (types.length === 0) {
      notif(fixNotifRef, "red", `Belum ada tipe skill yang dipilih`, setFixNotif);
      return;
    }
    notif(fixNotifRef, "orange", `${types.length} buah Tipe Skill telah dipilih : "${types.join(", ")}"`, setFixNotif);
    setInputSkill({ ...inputSkill, typeSkill: types });
    setTypes([]);
  }

  function deleteHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLSpanElement;
    const typeSelected = target.getAttribute("data-team");

    notif(notifRef, "green", `${typeSelected} berhasil dihapus`, setTypeNotif);

    const filtered = types.filter((t: string) => t !== typeSelected);
    setTypes(filtered);
  }

  return (
    <div id="Type Skill">
      Tipe Skill:
      <div className="flex flex-wrap gap-4 flex-row border-2 border-black border-solid p-4 justify-start w-full rounded-lg">
        {types.length === 0 ? (
          <p className="mx-auto font-bold">Tipe Skill belum dipilih</p>
        ) : (
          types.map((t: string, i: number) => (
            <p className="border-2 border-black rounded-lg relative p-2" key={`${t}-team-${i++}`}>
              <span data-team={t} className="font-bold absolute -top-1 right-1 text-red-700 cursor-pointer" onClick={deleteHandler}>
                X
              </span>
              {t}
            </p>
          ))
        )}
      </div>
      <p ref={notifRef} className="font-semibold">
        {typeNotif}
      </p>
      <Input forId="passive-skill-type-input" label="Skill Type Setting" list="option-passive-skill-type" value={type} onChange={(e) => setType(e.target.value)} onKeyDown={(e) => keyDownHandler(e)} />
      <datalist id="option-passive-skill-type">
        {passiveSkillTypes.map((t: string) => (
          <option value={t} key={`opt-skill-type-${t}`} />
        ))}
      </datalist>
      <p ref={fixNotifRef} className="font-semibold">
        {fixNotif}
      </p>
      <Button variant="fixation" type="button" onClick={fixationHandler}>
        Fiksasi
      </Button>
    </div>
  );
};
