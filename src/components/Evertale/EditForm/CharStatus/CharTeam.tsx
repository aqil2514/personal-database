import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { notif } from "@/components/Utils";
import axios from "axios";
import { Input } from "@/components/General/Input";
import { Button } from "@/components/General/Button";

export const CharTeam = ({ charTeams, dataTeam, data, setData }: { charTeams: string[]; dataTeam: string[]; data: Evertale.Character.State; setData: React.Dispatch<React.SetStateAction<Evertale.Character.State>> }) => {
  const router = useRouter();
  const [teams, setTeams] = useState<string[]>(charTeams);
  const [team, setTeam] = useState<string>("");
  const [inputNotif, setInputNotif] = useState<string>("");
  const [fixNotif, setFixNotif] = useState<string>("");

  const notifRef = useRef<null | HTMLParagraphElement>(null);
  const fixNotifRef = useRef<null | HTMLParagraphElement>(null);

  async function addHandler(element: HTMLInputElement) {
    if (!dataTeam.includes(team)) {
      const allow = confirm(`Ingin menambahkan "${element.value}" ke database?`);
      if (!allow) {
        notif(notifRef, "green", "Aksi dibatalkan", setInputNotif);
        return;
      }

      const res = await axios.put("/api/gamelingo/newEvertale", {
        data: team,
        type: "char-team-type",
      });

      notif(notifRef, "green", res.data.msg, setInputNotif);
      router.refresh();
    }

    setTeams((prevTeams: string[]) => [...prevTeams, team]);
    setTeam("");
  }

  function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    const element = e.target as HTMLInputElement;
    if (e.ctrlKey && e.key === "Enter") {
      addHandler(element);
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const element = e.target as HTMLInputElement;
    setTeam(element.value);

    if (!dataTeam.includes(team)) {
      notif(notifRef, "red", `${element.value} masih belum ada di database. CTRL + Enter untuk menyimpannya.`, setInputNotif);
      return;
    }
    notif(notifRef, "green", `${element.value} Tersedia. CTRL + Enter untuk menambahkannya.`, setInputNotif);
  }

  function deleteHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLSpanElement;
    const teamSelected = target.getAttribute("data-team");

    notif(notifRef, "green", `${teamSelected} berhasil dihapus`, setInputNotif);

    const filtered = teams.filter((team: string) => team !== teamSelected);
    setTeams(filtered);
  }

  function fixationHandler() {
    if (teams.length === 0) {
      notif(fixNotifRef, "red", `Belum ada tim yang dipilih`, setFixNotif);
      return;
    }
    notif(fixNotifRef, "orange", `${teams.length} buah CharTeam telah dipilih : "${teams.join(", ")}"`, setFixNotif);
    setData({ ...data, charStatus: { ...data.charStatus, charTeam: teams } });
  }

  return (
    <div id="charTeam">
      Character Team:
      <div className="flex flex-wrap gap-4 flex-row border-2 border-black border-solid p-4 justify-start w-full rounded-lg">
        {teams.length === 0 ? (
          <p className="mx-auto font-bold">Character Team belum dipilih</p>
        ) : (
          teams.map((team: string, i: number) => (
            <p className="border-2 border-black rounded-lg relative p-2" key={`${team}-team-${i++}`}>
              <span data-team={team} className="font-bold absolute -top-1 right-1 text-red-700 cursor-pointer" onClick={deleteHandler}>
                X
              </span>
              {team}
            </p>
          ))
        )}
      </div>
      <Input forId="char-team-input" label="Team Setting" list="option-char-team" value={team} onKeyDown={keyDownHandler} onChange={changeHandler} />
      <p ref={notifRef}>{inputNotif}</p>
      <datalist id="option-char-team">
        {dataTeam.map((team) => (
          <option value={team} key={`opt-char-team-${team}`} />
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
