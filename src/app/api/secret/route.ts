import connectMongoDB from "@/lib/mongoose";
import Character from "@/models/Evertale/Character";
import Passive from "@/models/Evertale/PassiveSkills";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectMongoDB();
  const passives = await Passive.find();
  const chars: Evertale.Character.State[] = await Character.find();
  const passiveSkill = chars
    .map((char) => ({
      passiveSkill: char.charPassiveSkill as Evertale.Character.PassiveSkill[],
    }))
    .map((p) => p.passiveSkill);
  const result = passiveSkill.reduce((result, array) => {
    array.forEach((obj) => {
      const dupplicate = result.find((item) => item.skillName === obj.skillName);

      if (!dupplicate) {
        result.push(obj);
      }
    });
    return result;
  });

  // const final = [];

  // for (const p of result) {
  //   const data = {
  //     skillName: p.skillName,
  //     typeSkill: p.typeSkill,
  //     skillDescEn: p.skillDescEn,
  //     skillDescId: p.skillDescId,
  //   };
  //   const dupplicate = passives.find((ps) => ps.skillName === data.skillName);
  //   if (!dupplicate) {
  //     await Passive.create(data);
  //   }
  // }
  return NextResponse.json({ passives: passives }, { status: 200 });
}
