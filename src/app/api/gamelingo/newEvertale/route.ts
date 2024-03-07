import { getPassiveSkills } from "@/lib/mongodb/evertale";
import Character from "@/models/Evertale/Characters";
import LeaderSkill from "@/models/Evertale/LeaderSkill";
import PassiveSkill from "@/models/Evertale/PassiveSkill";
import { TypeSkill } from "@/models/Evertale/TypeSkills";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (category === "lschar") {
    const ls = await LeaderSkill.find();
    const lsData = ls.filter((l: any) => l.name !== "Leader Skill").map((l: any) => l.name);

    return NextResponse.json({ lsData }, { status: 200 });
  } else if (category === "passive") {
    const passive = await PassiveSkill.find();

    return NextResponse.json({ passive }, { status: 200 });
  } else if (category === "chars") {
    const res = await Character.find();

    const chars = res.map((char: any) => ({
      charName: char.charStatus.charName,
      id: char.charId,
    }));

    return NextResponse.json({ chars }, { status: 200 });
  } else if (category === "statusResource") {
    const ls = await LeaderSkill.find();
    const lsData: string[] = ls
      .filter((l: Evertale.Misc.LeaderSkill) => l.name !== "Leader Skill")
      .map((l: Evertale.Misc.LeaderSkill) => l.name)
      .sort();
    const con = await Character.find({ "charStatus.isConjured": true });
    const conjure: string[] = con.map((c: Evertale.Character.State) => c.charStatus.charName).sort();
    const datarss = await TypeSkill.find();
    const rss: Evertale.Misc.TypeSkill = {
      typeCharTeam: datarss[0].typeCharTeam.sort(),
      typeActiveSkill: datarss[0].typeActiveSkill.sort(),
      typePassiveSkill: datarss[0].typePassiveSkill.sort(),
      typeLeaderSkill: datarss[0].typeLeaderSkill.sort(),
    };

    type Data = {
      lsData: string[];
      conjure: string[];
      rss: Evertale.Misc.TypeSkill;
    };

    const data: Data = {
      lsData,
      conjure,
      rss,
    };

    return NextResponse.json({ data }, { status: 200 });
  }

  return NextResponse.json({ category }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const { data, type } = await req.json();

  if (type === "passive-skill-type") {
    await TypeSkill.findByIdAndUpdate("6585933980d28308cec13f2c", {
      $push: { typePassiveSkill: data },
    });

    return NextResponse.json({ msg: `Type Skill dengan nama "${data}" berhasil ditambahkan` }, { status: 200 });
  } else if (type === "active-skill-type") {
    await TypeSkill.findByIdAndUpdate("6585933980d28308cec13f2c", {
      $push: { typeActiveSkill: data },
    });

    return NextResponse.json({ msg: `Type Skill dengan nama "${data}" berhasil ditambahkan` }, { status: 200 });
  } else if (type === "char-team-type") {
    await TypeSkill.findByIdAndUpdate("6585933980d28308cec13f2c", {
      $push: { typeCharTeam: data },
    });

    return NextResponse.json({ msg: `Char Team dengan nama "${data}" berhasil ditambahkan` }, { status: 200 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function OPTIONS(req: NextRequest) {
  const { category, activity } = await req.json();

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
        await PassiveSkill.create(newPassive);
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

      const data = await PassiveSkill.find({
        // skillName: {
        //   $regex: new RegExp(searchTerm, "i"),
        // },
        // typeSkill: "unset",
      });

      // const data = await Passive.findByIdAndDelete("6583df917e691b66143139b6");

      return NextResponse.json({ msg: `Ditemukan ${data.length}`, data }, { status: 200 });
    }
  } else if (category === "chars") {
    // if (activity === "migration") {
    //   const chars = await Character.find();
    //   for (const char of chars) {
    //     const data = {
    //       charId: char.char_id,
    //       charImage: {
    //         f1Img: char.charImage.f1Img,
    //         f2Img: char.charImage.f2Img,
    //         f3Img: char.charImage.f3Img,
    //       },
    //       charIntro: {
    //         gachaIntroEn: char.charIntro.gachaIntroEn,
    //         gachaIntroId: char.charIntro.gachaIntroId,
    //         gachaTextEn: char.charIntro.gachaTextEn,
    //         gachaTextId: char.charIntro.gachaTextId,
    //         loginTextEn: char.charIntro.loginTextEn,
    //         loginTextId: char.charIntro.loginTextId,
    //         text1En: char.charIntro.text1En,
    //         text1Id: char.charIntro.text1Id,
    //         text2En: char.charIntro.text2En,
    //         text2Id: char.charIntro.text2Id,
    //         text3En: char.charIntro.text3En,
    //         text3Id: char.charIntro.text3Id || "unsetting",
    //         text4En: char.charIntro.text4En,
    //         text4Id: char.charIntro.text4Id,
    //       },
    //       charStatus: {
    //         charName: char.charStatus.charName,
    //         charRank: char.charStatus.charRank,
    //         charTeam: char.charStatus.charTeam || [],
    //         charElement: char.charStatus.charElement,
    //         charWeapon1: char.charStatus.charWeapon1,
    //         charWeapon2: char.charStatus.charWeapon2,
    //         charLeaderSkill: char.charStatus.charLeaderSkill,
    //         charConjure: char.charStatus.charConjure,
    //         isConjured: char.charStatus.isConjured || false,
    //       },
    //       charProfile: {
    //         part1En: char.charProfile.part1En,
    //         part1Id: char.charProfile.part1Id,
    //         part2En: char.charProfile.part2En,
    //         part2Id: char.charProfile.part2Id,
    //         part3En: char.charProfile.part3En,
    //         part3Id: char.charProfile.part3Id,
    //       },
    //       charActiveSkill: char.charActiveSkill.map((as: any) => ({
    //         skillName: as.skillName,
    //         typeSkill: as.typeSkill || [],
    //         skillSpirit: as.skillSpirit,
    //         skillTarget: as.skillTarget,
    //         skillTu: as.skillTu,
    //         skillDescEn: as.skillDescEn,
    //         skillDescId: as.skillDescId,
    //       })),
    //       charPassiveSkill: char.charPassiveSkill.map((as: any) => ({
    //         skillName: as.skillName,
    //         typeSkill: as.typeSkill || [],
    //         skillDescEn: as.skillDescEn,
    //         skillDescId: as.skillDescId,
    //       })),
    //     };
    //     await Chars.create(data);
    //   }
    // }

    return NextResponse.json({ msg: "Migrasi data sukses" });
  }

  return NextResponse.json({ category }, { status: 200 });
}
