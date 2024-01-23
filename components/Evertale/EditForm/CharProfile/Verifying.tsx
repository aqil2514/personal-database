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
  const oldCS = init.charProfile as Evertale.Character.Profile;
  const newCS = char.charProfile as Evertale.Character.Profile;
  const notifRef = React.useRef<null | HTMLParagraphElement>(null);
  const [notifVerif, setNotifVerif] = React.useState<string>("");
  const [isActiveUE, setIsActiveUE] = React.useState<boolean>(true);
  const [isChanged, setIsChanged] = React.useState<boolean>(false);
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const router = useRouter();

  const elements: NodeListOf<HTMLParagraphElement> = document.querySelectorAll("#char-profile-result p");
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
        section: "charProfile",
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
      <details id="char-profile-result">
        <summary>Lihat Data</summary>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-center font-bold text-yellow-600">Old Data</h3>
            <ComparingData<Evertale.Character.Profile> subfield="part1En" oldCS={oldCS} newCS={newCS} dataFor="old" title="Part 1 En" />
            <ComparingData<Evertale.Character.Profile> subfield="part1Id" oldCS={oldCS} newCS={newCS} dataFor="old" title="Part 1 Id" />
            <ComparingData<Evertale.Character.Profile> subfield="part2En" oldCS={oldCS} newCS={newCS} dataFor="old" title="Part 2 En" />
            <ComparingData<Evertale.Character.Profile> subfield="part2Id" oldCS={oldCS} newCS={newCS} dataFor="old" title="Part 2 Id" />
            <ComparingData<Evertale.Character.Profile> subfield="part3En" oldCS={oldCS} newCS={newCS} dataFor="old" title="Part 3 En" />
            <ComparingData<Evertale.Character.Profile> subfield="part3Id" oldCS={oldCS} newCS={newCS} dataFor="old" title="Part 3 Id" />
          </div>
          <div>
            <h3 className="text-center font-bold text-yellow-600">New Data</h3>
            <ComparingData<Evertale.Character.Profile> subfield="part1En" oldCS={oldCS} newCS={newCS} dataFor="new" title="Part 1 En" />
            <ComparingData<Evertale.Character.Profile> subfield="part1Id" oldCS={oldCS} newCS={newCS} dataFor="new" title="Part 1 Id" />
            <ComparingData<Evertale.Character.Profile> subfield="part2En" oldCS={oldCS} newCS={newCS} dataFor="new" title="Part 2 En" />
            <ComparingData<Evertale.Character.Profile> subfield="part2Id" oldCS={oldCS} newCS={newCS} dataFor="new" title="Part 2 Id" />
            <ComparingData<Evertale.Character.Profile> subfield="part3En" oldCS={oldCS} newCS={newCS} dataFor="new" title="Part 3 En" />
            <ComparingData<Evertale.Character.Profile> subfield="part3Id" oldCS={oldCS} newCS={newCS} dataFor="new" title="Part 3 Id" />
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
