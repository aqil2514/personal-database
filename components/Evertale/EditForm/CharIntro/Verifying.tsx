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
  const oldCS = init.charIntro as Evertale.Character.Intro;
  const newCS = char.charIntro as Evertale.Character.Intro;
  const notifRef = React.useRef<null | HTMLParagraphElement>(null);
  const [notifVerif, setNotifVerif] = React.useState<string>("");
  const [isActiveUE, setIsActiveUE] = React.useState<boolean>(true);
  const [isChanged, setIsChanged] = React.useState<boolean>(false);
  const [isSending, setIsSending] = React.useState<boolean>(false);
  const router = useRouter();

  const elements: NodeListOf<HTMLParagraphElement> = document.querySelectorAll("#char-image-result p");
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
        section: "charIntro",
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
      <details id="char-image-result">
        <summary>Lihat Data</summary>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-center font-bold text-yellow-600">Old Data</h3>
            <ComparingData<Evertale.Character.Intro> subfield="gachaIntroEn" oldCS={oldCS} newCS={newCS} dataFor="old" title="Gacha Intro En" />
            <ComparingData<Evertale.Character.Intro> subfield="gachaIntroId" oldCS={oldCS} newCS={newCS} dataFor="old" title="Gacha Intro Id" />
            <ComparingData<Evertale.Character.Intro> subfield="gachaTextEn" oldCS={oldCS} newCS={newCS} dataFor="old" title="Gacha Text En" />
            <ComparingData<Evertale.Character.Intro> subfield="gachaTextId" oldCS={oldCS} newCS={newCS} dataFor="old" title="Gacha Text Id" />
            <ComparingData<Evertale.Character.Intro> subfield="loginTextEn" oldCS={oldCS} newCS={newCS} dataFor="old" title="Login Text En" />
            <ComparingData<Evertale.Character.Intro> subfield="loginTextId" oldCS={oldCS} newCS={newCS} dataFor="old" title="Login Text Id" />
            <ComparingData<Evertale.Character.Intro> subfield="text1En" oldCS={oldCS} newCS={newCS} dataFor="old" title="Text 1 En" />
            <ComparingData<Evertale.Character.Intro> subfield="text1Id" oldCS={oldCS} newCS={newCS} dataFor="old" title="Text 1 Id" />
            <ComparingData<Evertale.Character.Intro> subfield="text2En" oldCS={oldCS} newCS={newCS} dataFor="old" title="Text 2 En" />
            <ComparingData<Evertale.Character.Intro> subfield="text2Id" oldCS={oldCS} newCS={newCS} dataFor="old" title="Text 2 Id" />
            <ComparingData<Evertale.Character.Intro> subfield="text3En" oldCS={oldCS} newCS={newCS} dataFor="old" title="Text 3 En" />
            <ComparingData<Evertale.Character.Intro> subfield="text3Id" oldCS={oldCS} newCS={newCS} dataFor="old" title="Text 3 Id" />
            <ComparingData<Evertale.Character.Intro> subfield="text4En" oldCS={oldCS} newCS={newCS} dataFor="old" title="Text 4 En" />
            <ComparingData<Evertale.Character.Intro> subfield="text4Id" oldCS={oldCS} newCS={newCS} dataFor="old" title="Text 4 Id" />
          </div>
          <div>
            <h3 className="text-center font-bold text-yellow-600">New Data</h3>
            <ComparingData<Evertale.Character.Intro> subfield="gachaIntroEn" oldCS={oldCS} newCS={newCS} dataFor="new" title="Gacha Intro En" />
            <ComparingData<Evertale.Character.Intro> subfield="gachaIntroId" oldCS={oldCS} newCS={newCS} dataFor="new" title="Gacha Intro Id" />
            <ComparingData<Evertale.Character.Intro> subfield="gachaTextEn" oldCS={oldCS} newCS={newCS} dataFor="new" title="Gacha Text En" />
            <ComparingData<Evertale.Character.Intro> subfield="gachaTextId" oldCS={oldCS} newCS={newCS} dataFor="new" title="Gacha Text Id" />
            <ComparingData<Evertale.Character.Intro> subfield="loginTextEn" oldCS={oldCS} newCS={newCS} dataFor="new" title="Login Text En" />
            <ComparingData<Evertale.Character.Intro> subfield="loginTextId" oldCS={oldCS} newCS={newCS} dataFor="new" title="Login Text Id" />
            <ComparingData<Evertale.Character.Intro> subfield="text1En" oldCS={oldCS} newCS={newCS} dataFor="new" title="Text 1 En" />
            <ComparingData<Evertale.Character.Intro> subfield="text1Id" oldCS={oldCS} newCS={newCS} dataFor="new" title="Text 1 Id" />
            <ComparingData<Evertale.Character.Intro> subfield="text2En" oldCS={oldCS} newCS={newCS} dataFor="new" title="Text 2 En" />
            <ComparingData<Evertale.Character.Intro> subfield="text2Id" oldCS={oldCS} newCS={newCS} dataFor="new" title="Text 2 Id" />
            <ComparingData<Evertale.Character.Intro> subfield="text3En" oldCS={oldCS} newCS={newCS} dataFor="new" title="Text 3 En" />
            <ComparingData<Evertale.Character.Intro> subfield="text3Id" oldCS={oldCS} newCS={newCS} dataFor="new" title="Text 3 Id" />
            <ComparingData<Evertale.Character.Intro> subfield="text4En" oldCS={oldCS} newCS={newCS} dataFor="new" title="Text 4 En" />
            <ComparingData<Evertale.Character.Intro> subfield="text4Id" oldCS={oldCS} newCS={newCS} dataFor="new" title="Text 4 Id" />
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
