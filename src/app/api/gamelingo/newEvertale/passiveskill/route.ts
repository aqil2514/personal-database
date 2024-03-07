import PassiveSkill from "@/models/Evertale/PassiveSkill";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const passiveData = await PassiveSkill.find();

  return NextResponse.json({ passiveData }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  await PassiveSkill.create(data);

  return NextResponse.json({ msg: `Skill pasif ${data.skillName} berhasil ditambahkan` }, { status: 200 });
}
