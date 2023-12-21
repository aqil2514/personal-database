import LeaderSkill from "@/models/LeaderSkill";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (name) {
    const ls = await LeaderSkill.findOne({ name });
    return NextResponse.json({ ls }, { status: 200 });
  }

  const ls = await LeaderSkill.find();
  const lsData = ls.filter((l: any) => l.name !== "Leader Skill").map((l: any) => l.name);

  return NextResponse.json({ lsData }, { status: 200 });
}
