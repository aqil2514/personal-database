import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { notif } from "@/components/Utils";
import axios from "axios";
import { Input } from "@/components/General/Input";
import { Button } from "@/components/General/Button";
import { DataResponse } from ".";
import { useCharacterData } from "@/components/Evertale/Providers";

export const CharTeam = ({ info }: { info: DataResponse }) => {
  const { data, setData } = useCharacterData();
  const router = useRouter();
  const [teams, setTeams] = useState<string[]>([]);
  const [team, setTeam] = useState<string>("");
  const [notifCharTeam, setNotifCharTeam] = useState<string>("");
  const [fixNotif, setFixNotif] = useState<string>("");
  const notifRef = useRef<null | HTMLParagraphElement>(null);
  const fixNotifRef = useRef<null | HTMLParagraphElement>(null);

  useEffect(() => {
    if (data.charStatus?.charTeam) {
      setTeams(data.charStatus?.charTeam);
    }
  }, [data]);

  const charTeam: Evertale.Misc.TypeSkill = info.rss;

  async function keyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey && e.key === "Enter") {
      fixationHandler();
      return;
    }
    if (e.key === "Enter") {
      if (!team) {
        notif(notifRef, "red", "Team Setting masih kosong", setNotifCharTeam);
        return;
      }
      const isThere = charTeam.typeCharTeam.find((t: string) => t === team);
      if (isThere) {
        const dupplicate = teams.includes(team);
        if (dupplicate) {
          notif(notifRef, "red", `${team} sudah ditambahkan`, setNotifCharTeam);
          return;
        }
        notif(notifRef, "green", `${team} berhasil ditambahkan`, setNotifCharTeam);
        setTeams((prevTeams: string[]) => [...prevTeams, team]);
        setTeam("");
        return;
      }

      const allow = confirm(`${team} belum ditambahkan di Database, tambahkan sekarang?`);
      if (!allow) {
        notif(notifRef, "green", `Aksi dibatalkan`, setNotifCharTeam);
        return;
      }

      const res = await axios.put("/api/gamelingo/newEvertale", {
        data: team,
        type: "char-team-type",
      });

      notif(notifRef, "green", res.data.msg, setNotifCharTeam);
      router.refresh();
    }
  }

  function deleteHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLSpanElement;
    const teamSelected = target.getAttribute("data-team");

    notif(notifRef, "green", `${teamSelected} berhasil dihapus`, setNotifCharTeam);

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
      <p ref={notifRef} className="font-semibold">
        {notifCharTeam}
      </p>
      <Input forId="char-team-input" label="Team Setting" list="option-char-team" value={team} onChange={(e) => setTeam(e.target.value)} onKeyDown={(e) => keyDownHandler(e)} />
      <datalist id="option-char-team">
        {charTeam.typeCharTeam.map((team: string) => (
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
