import { Input } from "@/components/General/Input";
import { notif } from "@/components/Utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useRef } from "react";
import useSWR from "swr";
import { useCharacter } from "..";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export const TypeSkill = ({ index, char, setChar }: { index: number; char: Evertale.Character.State; setChar: React.Dispatch<SetStateAction<Evertale.Character.State>> }) => {
  const init = useCharacter();
  const URL = "/api/gamelingo/newEvertale?category=statusResource";
  const { data, isLoading, error } = useSWR(URL, fetcher);
  const router = useRouter();
  const [type, setType] = React.useState<string>("");
  const [typeNotif, setTypeNotif] = React.useState<string>("");

  const notifRef = useRef<null | HTMLParagraphElement>(null);

  if (!data || isLoading) return <p>Mengambil data...</p>;
  if (error) return <p>Error...</p>;
  const activeSkillTypes: string[] = data.data.rss.typeActiveSkill;
  const types: string[] = (char.charActiveSkill[index] as Evertale.Character.ActiveSkill).typeSkill;

  async function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const isThere = activeSkillTypes.find((skill) => skill === type);
      if (isThere) {
        const dupplicate = types.includes(isThere);
        if (dupplicate) {
          notif(notifRef, "red", "Tipe skill sudah ditambahkan", setTypeNotif, false);
          return;
        }

        setChar({
          ...char,
          charActiveSkill: char.charActiveSkill.map((skill, i) => {
            if (i === index) {
              return {
                ...skill,
                typeSkill: [...skill.typeSkill, type],
              };
            }
            return skill;
          }),
        });

        notif(notifRef, "green", `${type} berhasil ditambahkan`, setTypeNotif);
        setType("");
        return;
      }

      const allow = confirm(`${type} belum ada di Database. Ingin menambahkan?`);
      if (!allow) {
        notif(notifRef, "red", "Aksi dibatalkan.", setTypeNotif, false);
        return;
      }

      const res = await axios.put("/api/gamelingo/newEvertale", {
        data: type,
        type: "active-skill-type",
      });

      notif(notifRef, "green", res.data.msg, setTypeNotif);
      router.refresh();
    }
  }

  function deleteHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLSpanElement;
    const typeSelected = target.getAttribute("data-team");

    notif(notifRef, "green", `${typeSelected} berhasil dihapus`, setTypeNotif);

    const filtered = types.filter((t: string) => t !== typeSelected);
    setChar({
      ...char,
      charActiveSkill: char.charActiveSkill.map((skill: Evertale.Character.ActiveSkill, i: number) => {
        if (i === index) {
          return {
            ...skill,
            typeSkill: filtered,
          };
        }
        return skill;
      }),
    });
  }

  return (
    <div id={`Type-Skill-${index}`}>
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
      <Input forId="active-skill-type-input" label="Skill Type Setting" list="option-skill-type" value={type} onChange={(e) => setType(e.target.value)} onKeyDown={(e) => keyDownHandler(e)} />
      <datalist id="option-skill-type">
        {activeSkillTypes.map((t: string) => (
          <option value={t} key={`opt-skill-type-${t}`} />
        ))}
      </datalist>
    </div>
  );
};
