import { NextRequest, NextResponse } from "next/server";
import { file } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const searchParams = req.nextUrl.searchParams;
  const game = searchParams.get("game");
  const category = searchParams.get("category");

  if (!game) {
    return NextResponse.json({ msg: "Tidak ada parameter game" }, { status: 422 });
  }
  if (!category) {
    return NextResponse.json({ msg: "Tidak ada parameter category" }, { status: 422 });
  }

  const files = formData.getAll("files") as File[];

  const validation = file.validationImage(files);
  if (!validation?.status) {
    return NextResponse.json({ msg: validation?.msg }, { status: 422 });
  }

  const result: CloudinaryAPI.Image[] = await file.uploadImage(files, game, category);
  const data = result.map((img) => ({
    url: img.secure_url,
    name: img.public_id.split("/")[3],
  }));

  return NextResponse.json({ msg: "Gambar berhasil diupload", data }, { status: 200 });
  // return NextResponse.json({ msg: "Gambar berhasil diupload" }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const game = searchParams.get("game");
  const category = searchParams.get("category");
  const format = searchParams.get("format");
  const q = searchParams.get("q") as string;

  if (!game || !category || !format) {
    return NextResponse.json({ msg: "Search Parameter tidak lengkap" }, { status: 422 });
  }

  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: `${game}/${category}/${format}/${q}`,
  });

  const data = result.resources.map((image: CloudinaryAPI.Image) => ({
    url: image.secure_url,
    name: image.public_id.split("/")[3],
  }));

  return NextResponse.json({ msg: "Sukses", data }, { status: 200 });
}
