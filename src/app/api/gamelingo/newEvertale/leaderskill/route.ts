import LeaderSkill from "@/models/Evertale/LeaderSkill";
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

export async function PUT(req: NextRequest) {
  const { lsData } = await req.json();
  const term = new RegExp(lsData.lsName, "i");

  const ls = await LeaderSkill.find({ name: term });
  if (ls.length !== 0) {
    return NextResponse.json({ msg: "Leader Skill sudah tersedia" }, { status: 422 });
  }
  if (!lsData.lsName) {
    return NextResponse.json({ msg: "Nama Leader Skill belum diisi" }, { status: 422 });
  }
  if (!lsData.descEn) {
    return NextResponse.json({ msg: "English Description Leader Skill belum diisi" }, { status: 422 });
  }
  if (!lsData.descId) {
    return NextResponse.json({ msg: "Deskripsi Indonesia Leader Skill belum diisi" }, { status: 422 });
  }
  if (!lsData.lsType) {
    return NextResponse.json({ msg: "Tipe Leader Skill belum diisi" }, { status: 422 });
  }

  const fixedData = {
    name: lsData.lsName,
    descEn: lsData.descEn,
    descId: lsData.descId,
    typeSkill: lsData.lsType,
  };

  await LeaderSkill.create(fixedData);

  return NextResponse.json({ msg: "Leader Skill berhasil ditambah" }, { status: 200 });
}
