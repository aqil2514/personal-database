import connectMongoDB from "@/lib/mongoose";
import Passive from "@/models/PassiveSkills";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const passiveData = await Passive.find();

  return NextResponse.json({ passiveData }, { status: 200 });
}
