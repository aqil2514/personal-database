import { useFormStatus } from "react-dom";
import { useSkills } from "./formbody";
import { ADD_BUTTON_STYLE } from "./formbody";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

export async function action() {
  return alert("Menambah Karakter");
}

export function Button() {
  const { pending, data } = useFormStatus();
  const { skills } = useSkills();
  const router = useRouter();

  const values = [
    "charName",
    "f1Img",
    "f2Img",
    "f3Img",
    "gachaIntroEn",
    "gachaIntroId",
    "gachaTextEn",
    "gachaTextId",
    "loginTextEn",
    "loginTextId",
    "text1En",
    "text1Id",
    "text2En",
    "text2Id",
    "text3En",
    "text3Id",
    "text4En",
    "text4Id",
    "charLink",
    "statusElement",
    "firstWeapon",
    "secondWeapon",
    "leaderSkill",
    "conjures",
    "part-1-en",
    "part-1-id",
    "part-2-en",
    "part-2-id",
    "part-3-en",
    "part-3-id",
  ];

  class Data {
    charImage: {
      charName: string;
      f1Img?: string;
      f2Img?: string;
      f3Img?: string;
    };
    charIntro: {
      gachaIntroEn?: string;
      gachaIntroId?: string;
      gachaTextEn?: string;
      gachaTextId?: string;
      loginTextEn?: string;
      loginTextId?: string;
      text1En?: string;
      text1Id?: string;
      text2En?: string;
      text2Id?: string;
      text3En?: string;
      text3Id?: string;
      text4En?: string;
      text4Id?: string;
    };
    charStatus: {
      charName?: string;
      charLink?: string;
      statusElement?: string;
      firstWeapon?: string;
      secondWeapon?: string;
      leaderSkill?: string;
      conjures?: string;
    };
    charProfile: {
      part1En?: string;
      part1Id?: string;
      part2En?: string;
      part2Id?: string;
      part3En?: string;
      part3Id?: string;
    };

    constructor(
      charName: string,
      f1Img: string,
      f2Img: string,
      f3Img: string,
      gachaIntroEn: string,
      gachaIntroId: string,
      gachaTextEn: string,
      gachaTextId: string,
      loginTextEn: string,
      loginTextId: string,
      text1En: string,
      text1Id: string,
      text2En: string,
      text2Id: string,
      text3En: string,
      text3Id: string,
      text4En: string,
      text4Id: string,
      charLink: string,
      statusElement: string,
      firstWeapon: string,
      secondWeapon: string,
      leaderSkill: string,
      conjures: string,
      part1En: string,
      part1Id: string,
      part2En: string,
      part2Id: string,
      part3En: string,
      part3Id: string
    ) {
      this.charImage = {
        charName,
        f1Img: f1Img !== "" ? f1Img : undefined,
        f2Img: f2Img !== "" ? f2Img : undefined,
        f3Img: f3Img !== "" ? f3Img : undefined,
      };

      this.charIntro = {
        gachaIntroEn: gachaIntroEn !== "" ? gachaIntroEn : undefined,
        gachaIntroId: gachaIntroId !== "" ? gachaIntroId : undefined,
        gachaTextEn: gachaTextEn !== "" ? gachaTextEn : undefined,
        gachaTextId: gachaTextId !== "" ? gachaTextId : undefined,
        loginTextEn: loginTextEn !== "" ? loginTextEn : undefined,
        loginTextId: loginTextId !== "" ? loginTextId : undefined,
        text1En: text1En !== "" ? text1En : undefined,
        text1Id: text1Id !== "" ? text1Id : undefined,
        text2En: text2En !== "" ? text2En : undefined,
        text2Id: text2Id !== "" ? text2Id : undefined,
        text3En: text3En !== "" ? text3En : undefined,
        text3Id: text3Id !== "" ? text3Id : undefined,
        text4En: text4En !== "" ? text4En : undefined,
        text4Id: text4Id !== "" ? text4Id : undefined,
      };

      this.charStatus = {
        charName,
        charLink: charLink !== "" ? charLink : undefined,
        statusElement: statusElement !== "" ? statusElement : undefined,
        firstWeapon: firstWeapon !== "" ? firstWeapon : undefined,
        secondWeapon: secondWeapon !== "Select Second Weapon" ? secondWeapon : undefined,
        leaderSkill: leaderSkill !== "null" ? leaderSkill : undefined,
        conjures: conjures !== "null" ? conjures : undefined,
      };

      this.charProfile = {
        part1En: part1En !== "" ? part1En : undefined,
        part1Id: part1Id !== "" ? part1Id : undefined,
        part2En: part2En !== "" ? part2En : undefined,
        part2Id: part2Id !== "" ? part2Id : undefined,
        part3En: part3En !== "" ? part3En : undefined,
        part3Id: part3Id !== "" ? part3Id : undefined,
      };
    }
  }

  async function sendData() {
    try {
      const newData = [];
      for (const value of values) {
        newData.push(data?.get(value));
      }

      console.log(newData);

      const result = new Data(
        ...(newData as [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string
        ])
      );

      const res = await axios.post(
        "/api/gamelingo/evertale",
        {
          formBody1: result,
          formBody2: skills,
          typeData: "Character",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.msg);
      router.replace("/admin/gamelingo/evertale/characters");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (pending) {
      sendData();
    }
  }, [pending]);

  return (
    <button className={ADD_BUTTON_STYLE + " block !mx-auto"} disabled={pending} type="submit">
      {pending ? "Mengirim Data..." : "Tambah"}
    </button>
  );
}
