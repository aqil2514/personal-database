import { NextRequest, NextResponse } from "next/server";
import Character from "@/models/Character";
import { ObjectId } from "mongodb";
import connectMongoDB from "@/lib/mongoose";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectMongoDB();

  if (id) {
    const char = await Character.findOne({
      charId: new ObjectId(id),
    });

    return NextResponse.json({ char }, { status: 200 });
  }

  const res = await Character.find();

  const chars = res.map((char: any) => ({
    charName: char.charStatus.charName,
    id: char.charId,
  }));

  return NextResponse.json({ chars }, { status: 200 });
}
