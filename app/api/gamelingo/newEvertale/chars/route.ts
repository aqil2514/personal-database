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

export async function PUT(req: NextRequest) {
  const { submitData } = await req.json();
  const { charStatus, charImage, charIntro } = submitData;

  //CharStatus Validation Start

  if (charStatus.charRank === "Rank Character") {
    return NextResponse.json({ msg: "Rank Character belum dipilih" }, { status: 422 });
  }
  if (charStatus.charElement === "Select Element") {
    return NextResponse.json({ msg: "Status Element belum dipilih" }, { status: 422 });
  }
  if (charStatus.isConjured === "Conjure") {
    charStatus.isConjured = true;
  }
  if (charStatus.isConjured === "Non-Conjured") {
    charStatus.isConjured = false;
  }
  if (charStatus.charTeam.length === 0) {
    return NextResponse.json({ msg: "Character Team belum dipilih" }, { status: 422 });
  }
  if (charStatus.charWeapon1 === "Select Weapon") {
    return NextResponse.json({ msg: "Weapon 1 belum dipilih" }, { status: 422 });
  }
  if (charStatus.charLeaderSkill === "Select Leader Skill") {
    charStatus.charLeaderSkill = undefined;
  }
  if (charStatus.charWeapon2 === "Select Weapon") {
    charStatus.charWeapon2 = undefined;
  }
  //CharStatus Validation End

  // charImage Validation Start

  charImage.f1Img = charImage.f1Img.trim();
  charImage.f2Img = charImage.f2Img.trim();
  charImage.f3Img = charImage.f3Img.trim();
  if (charImage.f1Img.trim().length === 0) {
    return NextResponse.json({ msg: "Char Image Pertama belum diisi" }, { status: 422 });
  }
  if (charImage.f2Img.trim().length === 0) {
    charImage.f2Img = undefined;
  }
  if (charImage.f3Img.trim().length === 0) {
    charImage.f3Img = undefined;
  }

  // charImage Validation End

  // charIntro Validation Start
  charIntro.gachaIntroEn = charIntro.gachaIntroEn.trim();
  charIntro.gachaIntroId = charIntro.gachaIntroId.trim();
  charIntro.gachaTextEn = charIntro.gachaTextEn.trim();
  charIntro.gachaTextId = charIntro.gachaTextId.trim();
  charIntro.loginTextEn = charIntro.loginTextEn.trim();
  charIntro.loginTextId = charIntro.loginTextId.trim();
  charIntro.text1En = charIntro.text1En.trim();
  charIntro.text1Id = charIntro.text1Id.trim();
  charIntro.text2En = charIntro.text2En.trim();
  charIntro.text2Id = charIntro.text2Id.trim();
  charIntro.text3En = charIntro.text3En.trim();
  charIntro.text3Id = charIntro.text3Id.trim();
  charIntro.text4En = charIntro.text4En.trim();
  charIntro.text4Id = charIntro.text4Id.trim();

  if (charIntro.gachaIntro && charIntro.gachaIntroId.length === 0) {
    return NextResponse.json({ msg: "Gacha Intro belum diterjemahkan" }, { status: 422 });
  }

  if (!charIntro.gachaIntroEn) {
    charIntro.gachaIntroEn = undefined;
    charIntro.gachaIntroId = undefined;
  }
  if (charIntro.gachaText && charIntro.gachaTextId.length === 0) {
    return NextResponse.json({ msg: "Gacha Text belum diterjemahkan" }, { status: 422 });
  }
  if (!charIntro.gachaTextEn) {
    charIntro.gachaTextEn = undefined;
    charIntro.gachaTextId = undefined;
  }
  if (charIntro.loginText && charIntro.loginTextId.length === 0) {
    return NextResponse.json({ msg: "Login Text belum diterjemahkan" }, { status: 422 });
  }
  if (!charIntro.loginTextEn) {
    charIntro.loginTextEn = undefined;
    charIntro.loginTextId = undefined;
  }
  if (charIntro.text1 && charIntro.text1Id.length === 0) {
    return NextResponse.json({ msg: "Text 1 belum diterjemahkan" }, { status: 422 });
  }
  if (!charIntro.text1En) {
    charIntro.text1En = undefined;
    charIntro.text1Id = undefined;
  }
  if (charIntro.text2 && charIntro.text2Id.length === 0) {
    return NextResponse.json({ msg: "Text 2 belum diterjemahkan" }, { status: 422 });
  }
  if (!charIntro.text2En) {
    charIntro.text2En = undefined;
    charIntro.text2Id = undefined;
  }
  if (charIntro.text3 && charIntro.text3Id.length === 0) {
    return NextResponse.json({ msg: "Text 3 belum diterjemahkan" }, { status: 422 });
  }
  if (!charIntro.text3En) {
    charIntro.text3En = undefined;
    charIntro.text3Id = undefined;
  }
  if (charIntro.text4 && charIntro.text4Id.length === 0) {
    return NextResponse.json({ msg: "Text 4 belum diterjemahkan" }, { status: 422 });
  }
  if (!charIntro.text4En) {
    charIntro.text4En = undefined;
    charIntro.text4Id = undefined;
  }
  // charIntro Validation End

  return NextResponse.json({ charIntro }, { status: 200 });
}
