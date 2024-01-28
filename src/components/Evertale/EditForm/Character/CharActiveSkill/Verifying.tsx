import { Button } from "@/components/General/Button";
import { useCharacter } from "..";
import { ComparingData } from "@/components/Evertale/Utils/JSX";
import React, { useEffect, useMemo } from "react";
import { notif } from "@/components/Utils";
import axios, { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";

export default function Verifying({ char }: { char: Evertale.Character.State }) {
  const { id } = useParams();
  const init = useCharacter();
  const oldCS = init.charActiveSkill as Evertale.Character.ActiveSkill[];
  const newCS = char.charActiveSkill as Evertale.Character.ActiveSkill[];
  const notifRef = React.useRef<null | HTMLParagraphElement>(null);
  const [notifVerif, setNotifVerif] = React.useState<string>("");
  const [isActiveUE, setIsActiveUE] = React.useState<boolean>(true);
  const [isChanged, setIsChanged] = React.useState<boolean>(false);
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const router = useRouter();

  const elements: NodeListOf<HTMLParagraphElement> = document.querySelectorAll("#char-active-skills-result p");
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
      changeValue.push(val.textContent?.trim() as string);
    }
    for (const val of oldData) {
      initValue.push(val.textContent?.trim() as string);
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
        section: "charActiveSkill",
      });

      alert(res.data.msg);
      console.log(res.data);
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(notifRef, "red", error.response.data.msg, setNotifVerif);
        } else {
          notif(notifRef, "red", "Terjadi Kesalahan", setNotifVerif);
        }
      }
      console.error(error);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setIsActiveUE(true);
      }, 3000);
    }
  }
  return (
    <div className="bg-slate-100 my-4 rounded-xl">
      <h2 className="text-center font-bold text-yellow-600">Verifying Area</h2>
      <details id="char-active-skills-result">
        <summary>Lihat Data</summary>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-center font-bold text-yellow-600">Old Data</h3>
            {oldCS.map((old, i) => (
              <div key={`${old.skillName}`}>
                <>
                  <ComparingData<Evertale.Character.ActiveSkill> subfield="skillName" oldCS={old} newCS={newCS[i]} dataFor="old" title="Skill Name" />
                  <ComparingData<Evertale.Character.ActiveSkill> subfield="typeSkill" oldCS={old} newCS={newCS[i]} dataFor="old" title="Skill Type" />
                  <ComparingData<Evertale.Character.ActiveSkill> subfield="skillSpirit" oldCS={old} newCS={newCS[i]} dataFor="old" title="Skill Spirit" />
                  <ComparingData<Evertale.Character.ActiveSkill> subfield="skillTarget" oldCS={old} newCS={newCS[i]} dataFor="old" title="Skill Target" />
                  <ComparingData<Evertale.Character.ActiveSkill> subfield="skillTu" oldCS={old} newCS={newCS[i]} dataFor="old" title="Skill Tu" />
                  <ComparingData<Evertale.Character.ActiveSkill> subfield="skillDescEn" oldCS={old} newCS={newCS[i]} dataFor="old" title="Skill Description" />
                  <ComparingData<Evertale.Character.ActiveSkill> subfield="skillDescId" oldCS={old} newCS={newCS[i]} dataFor="old" title="Skill Deskripsi" />
                </>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-center font-bold text-yellow-600">New Data</h3>
            {newCS.map((newMap, i) => (
              <div key={`${newMap.skillName}`}>
                <ComparingData<Evertale.Character.ActiveSkill> subfield="skillName" oldCS={oldCS[i]} newCS={newMap} dataFor="new" title="Skill Name" />
                <ComparingData<Evertale.Character.ActiveSkill> subfield="typeSkill" oldCS={oldCS[i]} newCS={newMap} dataFor="new" title="Skill Type" />
                <ComparingData<Evertale.Character.ActiveSkill> subfield="skillSpirit" oldCS={oldCS[i]} newCS={newMap} dataFor="new" title="Skill Spirit" />
                <ComparingData<Evertale.Character.ActiveSkill> subfield="skillTarget" oldCS={oldCS[i]} newCS={newMap} dataFor="new" title="Skill Target" />
                <ComparingData<Evertale.Character.ActiveSkill> subfield="skillTu" oldCS={oldCS[i]} newCS={newMap} dataFor="new" title="Skill Tu" />
                <ComparingData<Evertale.Character.ActiveSkill> subfield="skillDescEn" oldCS={oldCS[i]} newCS={newMap} dataFor="new" title="Skill Description" />
                <ComparingData<Evertale.Character.ActiveSkill> subfield="skillDescId" oldCS={oldCS[i]} newCS={newMap} dataFor="new" title="Skill Deskripsi" />
              </div>
            ))}
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
