import { NextRequest, NextResponse } from "next/server";
import { file } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const searchParams = req.nextUrl.searchParams;
  const game = searchParams.get("game");
  const category = searchParams.get("category");

  const files = formData.getAll("files");

  const result = await file.uploadImage(files, game as string, category as string);
  return NextResponse.json({ msg: "Sukses", result }, { status: 200 });
}
