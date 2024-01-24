import connectMongoDB from "@/lib/mongoose";
import Passive from "@/models/Evertale/PassiveSkills";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const passiveData = await Passive.find();

  return NextResponse.json({ passiveData }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  await Passive.create(data);

  return NextResponse.json({ msg: `Skill pasif ${data.skillName} berhasil ditambahkan` }, { status: 200 });
}
