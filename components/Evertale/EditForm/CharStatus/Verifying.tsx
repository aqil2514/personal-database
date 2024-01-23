import { Button } from "@/components/General/Button";
import { useCharacter } from "..";
import { ComparingData } from "@/components/Evertale/Utils/JSX";
import React, { useEffect, useMemo } from "react";
import { notif } from "@/components/Utils";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function Verifying({ char }: { char: Evertale.Character.State }) {
  const { id } = useParams();
  const init = useCharacter();
  const oldCS = init.charStatus as Evertale.Character.Status;
  const newCS = char.charStatus as Evertale.Character.Status;
  const notifRef = React.useRef<null | HTMLParagraphElement>(null);
  const [notifVerif, setNotifVerif] = React.useState<string>("");
  const [isActiveUE, setIsActiveUE] = React.useState<boolean>(true);
  const [isChanged, setIsChanged] = React.useState<boolean>(false);
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const router = useRouter();

  const elements: NodeListOf<HTMLParagraphElement> = document.querySelectorAll("#char-status-result p");
  const newData = useMemo(() => {
    const result: HTMLParagraphElement[] = [];

    for (const el of elements) {
      if (el.id.startsWith("new")) {
        result.push(el);
      }
    }
    return result;
  }, [elements]);

  const oldData = useMemo(() => {
    const result: HTMLParagraphElement[] = [];

    for (const el of elements) {
      if (el.id.startsWith("old")) {
        result.push(el);
      }
    }
    return result;
  }, [elements]);

  useEffect(() => {
    if (!isActiveUE) return;
    const changeValue: string[] = [];
    const initValue: string[] = [];
    for (const val of newData) {
      changeValue.push(val.textContent?.split(":")[1].trim() as string);
    }
    for (const val of oldData) {
      initValue.push(val.textContent?.split(":")[1].trim() as string);
    }
    const compare = JSON.stringify(initValue) === JSON.stringify(changeValue);
    if (compare) {
      setNotifVerif("");
      setIsChanged(false);
      return;
    } else {
      notif(notifRef, "blue", "Ada perubahan, silahkan periksa dan verifikasi!", setNotifVerif, false, 0);
      setIsChanged(true);
      return;
    }
  }, [newData, oldData, isActiveUE]);

  async function fixHandler() {
    try {
      setIsSending(true);
      setIsActiveUE(false);
      notif(notifRef, "green", "Mengirim perubahan ke server", setNotifVerif, false, 0);

      const res = await axios.put("/api/gamelingo/newEvertale/chars", {
        char,
        UID: id,
        section: "charStatus",
      });

      alert(res.data.msg);
      console.log(res.data);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsActiveUE(true);
      setIsSending(false);
      setNotifVerif("");
    }
  }
  return (
    <div className="bg-slate-100 my-4 rounded-xl">
      <h2 className="text-center font-bold text-yellow-600">Verifying Area</h2>
      <details id="char-status-result">
        <summary>Lihat Data</summary>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-center font-bold text-yellow-600">Old Data</h3>
            <ComparingData<Evertale.Character.Status> subfield="charName" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Name" />
            <ComparingData<Evertale.Character.Status> subfield="charRank" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Rank" />
            <ComparingData<Evertale.Character.Status> subfield="charTeam" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Team" />
            <ComparingData<Evertale.Character.Status> subfield="charElement" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Element" />
            <ComparingData<Evertale.Character.Status> subfield="charLeaderSkill" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Leader Skill" />
            <ComparingData<Evertale.Character.Status> subfield="charWeapon1" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Weapon 1" />
            <ComparingData<Evertale.Character.Status> subfield="charWeapon2" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Weapon 2" />
            <ComparingData<Evertale.Character.Status> subfield="isConjured" oldCS={oldCS} newCS={newCS} dataFor="old" title="Is Conjured" />
            <ComparingData<Evertale.Character.Status> subfield="charConjure" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Conjure" />
          </div>
          <div>
            <h3 className="text-center font-bold text-yellow-600">New Data</h3>
            <ComparingData<Evertale.Character.Status> subfield="charName" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Name" />
            <ComparingData<Evertale.Character.Status> subfield="charRank" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Rank" />
            <ComparingData<Evertale.Character.Status> subfield="charTeam" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Team" />
            <ComparingData<Evertale.Character.Status> subfield="charElement" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Element" />
            <ComparingData<Evertale.Character.Status> subfield="charLeaderSkill" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Leader Skill" />
            <ComparingData<Evertale.Character.Status> subfield="charWeapon1" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Weapon 1" />
            <ComparingData<Evertale.Character.Status> subfield="charWeapon2" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Weapon 2" />
            <ComparingData<Evertale.Character.Status> subfield="isConjured" oldCS={oldCS} newCS={newCS} dataFor="new" title="Is Conjured" />
            <ComparingData<Evertale.Character.Status> subfield="charConjure" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Conjure" />
          </div>
        </div>
      </details>
      <p ref={notifRef} className="font-bold">
        {notifVerif}
      </p>
      <Button type="button" variant="fixation" disabled={!isChanged || isSending} onClick={fixHandler}>
        {isChanged ? "Fiksasi Perubahan" : "Belum ada perubahan"}
      </Button>
    </div>
  );
}
