import { NextRequest, NextResponse } from "next/server";
import { file } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const searchParams = req.nextUrl.searchParams;
  const game = searchParams.get("game");
  const category = searchParams.get("category");

  const files = formData.getAll("files");

  const result = await file.uploadImage(files, game as string, category as string);
  return NextResponse.json({ msg: "Sukses", result }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const game = searchParams.get("game") as string;
  const category = searchParams.get("category") as string;
  const format = searchParams.get("format") as string;
  const q = searchParams.get("q") as string;

  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: `${game}/${category}/${format}/${q}`,
  });

  const data = result.resources.map((image: any) => ({
    url: image.secure_url,
    name: (image.public_id as string).split("/")[3],
  }));

  return NextResponse.json({ msg: "Sukses", result }, { status: 200 });
}
