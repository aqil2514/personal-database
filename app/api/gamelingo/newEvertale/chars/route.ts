import { NextRequest, NextResponse } from "next/server";
import Character from "@/models/Character";
import connectMongoDB from "@/lib/mongoose";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectMongoDB();

  if (id) {
    const char = await Character.findById(id);

    return NextResponse.json({ char }, { status: 200 });
  }

  const res = await Character.find();

  const chars = res.map((char: any) => ({
    charName: char.charStatus.charName,
    id: char._id,
  }));

  return NextResponse.json({ chars }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { data, action } = await req.json();
  const { charStatus, charImage, charIntro, charProfile, charActiveSkill, charPassiveSkill } = data;

  //CharStatus Validation Start

  if (charStatus) {
    if (!charStatus.charRank) {
      return NextResponse.json({ msg: "Rank Character belum dipilih" }, { status: 422 });
    }
    if (!charStatus.charElement) {
      return NextResponse.json({ msg: "Status Element belum dipilih" }, { status: 422 });
    }
    if (charStatus.isConjured === "Conjure") {
      charStatus.isConjured = true;
    } else if (charStatus.isConjured === "Non-Conjured") {
      charStatus.isConjured = false;
    }
    if (charStatus.charTeam.length === 0) {
      return NextResponse.json({ msg: "Character Team belum dipilih" }, { status: 422 });
    }
    if (!charStatus.charWeapon1) {
      return NextResponse.json({ msg: "Weapon 1 belum dipilih" }, { status: 422 });
    }
    if (charStatus.charLeaderSkill === "Select Leader Skill") {
      charStatus.charLeaderSkill = undefined;
    }
    if (!charStatus.charWeapon2) {
      charStatus.charWeapon2 = undefined;
    }
    if (!charStatus.charConjure) {
      charStatus.charConjure = undefined;
    }
  }

  //CharStatus Validation End

  // charImage Validation Start

  if (charImage) {
    if (!charImage.f1Img) {
      return NextResponse.json({ msg: "Char Image Pertama belum diisi" }, { status: 422 });
    }
    if (!charImage.f2Img) {
      charImage.f2Img = undefined;
    }
    if (!charImage.f3Img) {
      charImage.f3Img = undefined;
    }
  }

  // charImage Validation End

  // charIntro Validation Start

  if (charIntro) {
    if (charIntro.gachaIntroEn && charIntro.gachaIntroId.length === 0) {
      return NextResponse.json({ msg: "Gacha Intro belum diterjemahkan" }, { status: 422 });
    }

    if (!charIntro.gachaIntroEn) {
      charIntro.gachaIntroEn = undefined;
      charIntro.gachaIntroId = undefined;
    }
    if (charIntro.gachaTextEn && charIntro.gachaTextId.length === 0) {
      return NextResponse.json({ msg: "Gacha Text belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.gachaTextEn) {
      charIntro.gachaTextEn = undefined;
      charIntro.gachaTextId = undefined;
    }
    if (charIntro.loginTextEn && charIntro.loginTextId.length === 0) {
      return NextResponse.json({ msg: "Login Text belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.loginTextEn) {
      charIntro.loginTextEn = undefined;
      charIntro.loginTextId = undefined;
    }
    if (charIntro.text1En && charIntro.text1Id.length === 0) {
      return NextResponse.json({ msg: "Text 1 belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.text1En) {
      charIntro.text1En = undefined;
      charIntro.text1Id = undefined;
    }
    if (charIntro.text2En && charIntro.text2Id.length === 0) {
      return NextResponse.json({ msg: "Text 2 belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.text2En) {
      charIntro.text2En = undefined;
      charIntro.text2Id = undefined;
    }
    if (charIntro.text3En && charIntro.text3Id.length === 0) {
      return NextResponse.json({ msg: "Text 3 belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.text3En) {
      charIntro.text3En = undefined;
      charIntro.text3Id = undefined;
    }
    if (charIntro.text4En && charIntro.text4Id.length === 0) {
      return NextResponse.json({ msg: "Text 4 belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.text4En) {
      charIntro.text4En = undefined;
      charIntro.text4Id = undefined;
    }
  }

  // charIntro Validation End

  // CharProfile Validation Start
  if (charProfile) {
    if (!charProfile.part1En) {
      return NextResponse.json({ msg: "Char Profile 1 wajib diisi" }, { status: 422 });
    }
    if (charProfile.part1En && !charProfile.part1Id) {
      return NextResponse.json({ msg: "Char Profile 1 belum diterjemahkan" }, { status: 422 });
    }
    if (!charProfile.part2En) {
      charProfile.part2En = undefined;
      charProfile.part2Id = undefined;
    }
    if (charProfile.part2En && !charProfile.part2Id) {
      return NextResponse.json({ msg: "Char Profile 2 belum diterjemahkan" }, { status: 422 });
    }
    if (!charProfile.part3En) {
      charProfile.part3En = undefined;
      charProfile.part3Id = undefined;
    }
    if (charProfile.part3En && !charProfile.part3Id) {
      return NextResponse.json({ msg: "Char Profile 3 belum diterjemahkan" }, { status: 422 });
    }
  }
  // CharProfile Validation End

  // CharActiveSkill Validation Start
  if (charActiveSkill.length === 0) {
    return NextResponse.json({ msg: "Character Active Skill belum diisi" }, { status: 422 });
  }
  // CharActiveSkill Validation End

  // TODO : Tambahin konfigurasi edit tambah skill aktif & pasif

  // CharPassiveSkill Validation Start
  if (charPassiveSkill.length === 0) {
    return NextResponse.json({ msg: "Character Passive Skill belum diisi" }, { status: 422 });
  }
  // CharPassiveSkill Validation End

  if (action === "see") {
    return NextResponse.json({ msg: "Data berhasil diverifikasi", data, redirect: false }, { status: 200 });
  } else if (action === "add") {
    await connectMongoDB();
    await Character.create(data);
    return NextResponse.json({ msg: "Data berhasil ditambah", redirect: true }, { status: 200 });
  }
}

export async function PUT(req: NextRequest) {
  const { submitData, action } = await req.json();
  const { charStatus, charImage, charIntro, charProfile, charActiveSkill, charPassiveSkill, _id } = submitData;

  //CharStatus Validation Start

  if (charStatus) {
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
    if (charStatus.charConjure === "Select Conjure") {
      charStatus.charConjure = undefined;
    }
  }

  //CharStatus Validation End

  // charImage Validation Start

  if (charImage) {
    if (!charImage.f1Img) {
      return NextResponse.json({ msg: "Char Image Pertama belum diisi" }, { status: 422 });
    }
    if (!charImage.f2Img) {
      charImage.f2Img = undefined;
    }
    if (!charImage.f3Img) {
      charImage.f3Img = undefined;
    }
  }

  // charImage Validation End

  // charIntro Validation Start

  if (charIntro) {
    if (charIntro.gachaIntroEn && charIntro.gachaIntroId.length === 0) {
      return NextResponse.json({ msg: "Gacha Intro belum diterjemahkan" }, { status: 422 });
    }

    if (!charIntro.gachaIntroEn) {
      charIntro.gachaIntroEn = undefined;
      charIntro.gachaIntroId = undefined;
    }
    if (charIntro.gachaTextEn && charIntro.gachaTextId.length === 0) {
      return NextResponse.json({ msg: "Gacha Text belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.gachaTextEn) {
      charIntro.gachaTextEn = undefined;
      charIntro.gachaTextId = undefined;
    }
    if (charIntro.loginTextEn && charIntro.loginTextId.length === 0) {
      return NextResponse.json({ msg: "Login Text belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.loginTextEn) {
      charIntro.loginTextEn = undefined;
      charIntro.loginTextId = undefined;
    }
    if (charIntro.text1En && charIntro.text1Id.length === 0) {
      return NextResponse.json({ msg: "Text 1 belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.text1En) {
      charIntro.text1En = undefined;
      charIntro.text1Id = undefined;
    }
    if (charIntro.text2En && charIntro.text2Id.length === 0) {
      return NextResponse.json({ msg: "Text 2 belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.text2En) {
      charIntro.text2En = undefined;
      charIntro.text2Id = undefined;
    }
    if (charIntro.text3En && charIntro.text3Id.length === 0) {
      return NextResponse.json({ msg: "Text 3 belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.text3En) {
      charIntro.text3En = undefined;
      charIntro.text3Id = undefined;
    }
    if (charIntro.text4En && charIntro.text4Id.length === 0) {
      return NextResponse.json({ msg: "Text 4 belum diterjemahkan" }, { status: 422 });
    }
    if (!charIntro.text4En) {
      charIntro.text4En = undefined;
      charIntro.text4Id = undefined;
    }
  }

  // charIntro Validation End

  // CharProfile Validation Start
  if (charProfile) {
    if (!charProfile.part1En) {
      return NextResponse.json({ msg: "Char Profile 1 wajib diisi" }, { status: 422 });
    }
    if (charProfile.part1En && !charProfile.part1Id) {
      return NextResponse.json({ msg: "Char Profile 1 belum diterjemahkan" }, { status: 422 });
    }
    if (!charProfile.part2En) {
      charProfile.part2En = undefined;
      charProfile.part2Id = undefined;
    }
    if (charProfile.part2En && !charProfile.part2Id) {
      return NextResponse.json({ msg: "Char Profile 2 belum diterjemahkan" }, { status: 422 });
    }
    if (!charProfile.part3En) {
      charProfile.part3En = undefined;
      charProfile.part3Id = undefined;
    }
    if (charProfile.part3En && !charProfile.part3Id) {
      return NextResponse.json({ msg: "Char Profile 3 belum diterjemahkan" }, { status: 422 });
    }
  }
  // CharProfile Validation End

  // CharActiveSkill Validation Start
  if (charActiveSkill) {
    for (let i = 0; i < charActiveSkill.length; i++) {
      if (!charActiveSkill[i].skillName) {
        return NextResponse.json({ msg: `Nama Active Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (charActiveSkill[i].typeSkill.length === 0) {
        return NextResponse.json({ msg: `Tipe Active Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (!charActiveSkill[i].skillSpirit) {
        return NextResponse.json({ msg: `Spirit Active Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (!charActiveSkill[i].skillTu) {
        return NextResponse.json({ msg: `TU Active Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (!charActiveSkill[i].skillTarget) {
        return NextResponse.json({ msg: `Target Active Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (!charActiveSkill[i].skillDescEn) {
        return NextResponse.json({ msg: `Deskripsi Bahasa Inggris Active Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (!charActiveSkill[i].skillDescId) {
        return NextResponse.json({ msg: `Deskripsi Bahasa Indonesia Active Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
    }
  }
  // CharActiveSkill Validation End

  // TODO : Tambahin konfigurasi edit tambah skill aktif & pasif

  // CharPassiveSkill Validation Start
  if (charPassiveSkill) {
    for (let i = 0; i < charPassiveSkill.length; i++) {
      if (!charPassiveSkill[i].skillName) {
        return NextResponse.json({ msg: `Nama Passive Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (charPassiveSkill[i].typeSkill.length === 0) {
        return NextResponse.json({ msg: `Tipe Passive Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (!charPassiveSkill[i].skillDescEn) {
        return NextResponse.json({ msg: `Deskripsi Bahasa Inggris Passive Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
      if (!charPassiveSkill[i].skillDescId) {
        return NextResponse.json({ msg: `Deskripsi Bahasa Indonesia Passive Skill ke-${i + 1} belum diisi` }, { status: 422 });
      }
    }
  }
  // CharPassiveSkill Validation End

  if (action === "see") {
    return NextResponse.json({ submitData }, { status: 200 });
  }
  if (action === "update") {
    const char = await Character.findByIdAndUpdate(_id, { charStatus, charImage, charIntro, charProfile, charActiveSkill, charPassiveSkill }, { new: true });

    return NextResponse.json({ msg: "Update Character Sukses", char }, { status: 200 });
  }
}
