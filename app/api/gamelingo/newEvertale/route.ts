import { getChars, getPassiveSkills } from "@/lib/mongodb/evertale";
import connectMongoDB from "@/lib/mongoose";
import Character from "@/models/Character";
import LeaderSkill from "@/models/LeaderSkill";
import Passive from "@/models/PassiveSkills";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  await connectMongoDB();

  if (category === "lschar") {
    const ls = await LeaderSkill.find();
    const lsData = ls.filter((l: any) => l.name !== "Leader Skill").map((l: any) => l.name);

    return NextResponse.json({ lsData }, { status: 200 });
  } else if (category === "passive") {
    const passive = await Passive.find();

    return NextResponse.json({ passive }, { status: 200 });
  } else if (category === "chars") {
    const res = await Character.find();

    const chars = res.map((char: any) => ({
      charName: char.charStatus.charName,
      id: char.charId,
    }));

    return NextResponse.json({ chars }, { status: 200 });
  }

  return NextResponse.json({ category }, { status: 200 });
}

export async function OPTIONS(req: NextRequest) {
  const { category, activity } = await req.json();

  await connectMongoDB();

  if (category === "passive") {
    if (activity === "migration") {
      const oldPassive = await getPassiveSkills();
      for (const old of oldPassive.passiveskills) {
        const newPassive = {
          skillName: old.name,
          typeSkill: "unset",
          skillDescEn: old.descEN,
          skillDescId: old.descID,
        };
        await Passive.create(newPassive);
      }
      return NextResponse.json({ msg: "Migration success" }, { status: 200 });
    } else if (activity === "configuration") {
      // const searchTerm = /(G.Axe|G.Sword|Spear|Sword)\sresist/;
      // const searchTerm = "passive";
      // const data = await Passive.updateMany(
      //   {
      //     skillName: {
      //       $regex: new RegExp(searchTerm, "i"),
      //     },
      //   },
      //   {
      //     typeSkill: "Effect Negative Immunity",
      //   }
      // );

      const data = await Passive.find({
        // skillName: {
        //   $regex: new RegExp(searchTerm, "i"),
        // },
        // typeSkill: "unset",
      });

      // const data = await Passive.findByIdAndDelete("6583df917e691b66143139b6");

      return NextResponse.json({ msg: `Ditemukan ${data.length}`, data }, { status: 200 });
    }
  } else if (category === "chars") {
    if (activity === "migration") {
      const chars = await getChars();
      for (const char of chars.chars) {
        const data = {
          charId: char.char_id,
          charImage: {
            f1Img: char.charImage.f1Img,
            f2Img: char.charImage.f2Img,
            f3Img: char.charImage.f3Img,
          },
          charIntro: {
            gachaIntroEn: char.charIntro.gachaIntroEn,
            gachaIntroId: char.charIntro.gachaIntroId,
            gachaTextEn: char.charIntro.gachaTextEn,
            gachaTextId: char.charIntro.gachaTextId,
            loginTextEn: char.charIntro.loginTextEn,
            loginTextId: char.charIntro.loginTextId,
            text1En: char.charIntro.text1En,
            text1Id: char.charIntro.text1Id,
            text2En: char.charIntro.text2En,
            text2Id: char.charIntro.text2Id,
            text3En: char.charIntro.text3En,
            text4En: char.charIntro.text4En,
            text4Id: char.charIntro.text4Id,
          },
          charStatus: {
            charName: char.charStatus.charName,
            charRank: char.charStatus.charRank,
            charTeam: [],
            charElement: char.charStatus.statusElement,
            charWeapon1: char.charStatus.firstWeapon,
            charWeapon2: char.charStatus.secondWeapon,
            charLeaderSkill: char.charStatus.leaderSkill,
            charConjure: char.charStatus.conjures,
            isConjured: false,
          },
          charProfile: {
            part1En: char.charProfile.part1En,
            part1Id: char.charProfile.part1Id,
            part2En: char.charProfile.part2En,
            part2Id: char.charProfile.part2Id,
            part3En: char.charProfile.part3En,
            part3Id: char.charProfile.part3Id,
          },
          charActiveSkill: char.charActiveSkill.map((as: any) => ({
            skillName: as.name,
            typeSkill: [],
            skillSpirit: as.spirit,
            skillTarget: as.target,
            skillTu: as.TU,
            skillDescEn: as.descEn,
            skillDescId: as.descId,
          })),
          charPassiveSkill: char.charPassiveSkill.map((as: any) => ({
            skillName: as.name,
            typeSkill: "unset",
            skillDescEn: as.descEn,
            skillDescId: as.descId,
          })),
        };
        await Character.create(data);
      }
    }

    return NextResponse.json({ msg: "Migrasi data sukses" });
  }

  return NextResponse.json({ category }, { status: 200 });
}