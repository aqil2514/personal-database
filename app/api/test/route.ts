import { getLeaderSkills } from "@/lib/mongodb/evertale";
import connectMongoDB from "@/lib/mongoose";
import LeaderSkill, { LeaderSkill2 } from "@/models/LeaderSkill";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ req }: { req: NextRequest }) {
  // const {searchParams} = new URL(req.url);
  // const category = searchParams.get("category");

  await connectMongoDB();

  // const lSkill = await LeaderSkill2.updateMany(
  //   {
  //     // name: { $regex: /ATK & HP Up/i },
  //     name: "Leader Skill",
  //   },
  //   { typeSkill: "No Setting" }
  // );
  const lSkill = await LeaderSkill2.find();
  const lSNew = await LeaderSkill.find();
  // const oldSkill = await getLeaderSkills();
  // const leaderSkill = lSkill.leaderskills2;
  // for (const skill of lSkill) {
  //   await LeaderSkill.insertMany({
  //     name: skill.name,
  //     descEn: skill.descEn,
  //     descId: skill.descId,
  //     typeSkill: skill.typeSkill,
  //     createdAt: skill.createdAt,
  //   });
  // }

  // return NextResponse.json({ msg: "Data berhasil diubah" }, { status: 200 });
  return NextResponse.json({ lSNew }, { status: 200 });
}
