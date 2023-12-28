import Passive from "@/models/PassiveSkills";
import { NextResponse } from "next/server";

export async function GET() {
  const passiveData = await Passive.find();

  return NextResponse.json({ passiveData }, { status: 200 });
}
