import { NextRequest, NextResponse } from "next/server";
import Character from "@/models/Evertale/Character";
import connectMongoDB from "@/lib/mongoose";
import { charActiveSkillValidator, charImageValidator, charIntroValidator, charPassiveSkillValidator, charProfileValidator, charStatusValidator } from "@/app/components/ValidatorAPI";
import Post from "@/models/General/Post";
import { ObjectId } from "mongodb";
import { validator } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await connectMongoDB();

  if (id) {
    const char: Evertale.Character.State | null = await Character.findById(id);
    if (!char) {
      return NextResponse.json({ msg: "No Data" }, { status: 422 });
    }

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

  const status = validator.character.status(charStatus);
  if (!status.success) {
    return NextResponse.json({ msg: status.msg, ref: status.ref }, { status: 422 });
  }

  const image = validator.character.images(charImage);
  if (!image.success) {
    return NextResponse.json({ msg: image.msg, ref: image.ref }, { status: 422 });
  }

  const intro = validator.character.intro(charIntro);
  if (!intro.success) {
    return NextResponse.json({ msg: intro.msg, ref: intro.ref }, { status: 422 });
  }

  const profile = validator.character.profile(charProfile);
  if (!profile.success) {
    return NextResponse.json({ msg: profile.msg, ref: profile.ref }, { status: 422 });
  }

  const activeSkill = validator.character.activeSkill(charActiveSkill);
  if (!activeSkill.success) {
    return NextResponse.json({ msg: activeSkill.success, ref: activeSkill.ref }, { status: 422 });
  }

  const passiveSkill = charPassiveSkillValidator(charPassiveSkill);
  if (!passiveSkill.success) {
    return NextResponse.json({ msg: passiveSkill.success, ref: passiveSkill.ref }, { status: 422 });
  }

  const charData: Evertale.Character.State = {
    charStatus: status.charStatus,
    charImage: image.charImage,
    charIntro: Object.values(intro.charIntro).every((val) => val === undefined) ? undefined : intro.charIntro,
    charProfile: profile.charProfile,
    charActiveSkill: activeSkill.charActiveSkill,
    charPassiveSkill: passiveSkill.charPassiveSkill,
  };

  if (action === "see") {
    return NextResponse.json({ msg: "Data berhasil diverifikasi", charData, redirect: false }, { status: 200 });
  } else if (action === "add") {
    await connectMongoDB();
    const newChar = await Character.create(charData);
    await Post.create({
      title: newChar.charStatus.charName,
      game: {
        name: "Evertale",
        topic: "Character",
      },
      content: newChar._id,
      author: "Admin GameLingo",
    });
    return NextResponse.json({ msg: "Data berhasil ditambah", redirect: true }, { status: 200 });
  }
}

// export async function PUT(req: NextRequest) {
//   const { submitData, action } = await req.json();
//   const { charStatus, charImage, charIntro, charProfile, charActiveSkill, charPassiveSkill, _id } = submitData;

//   const status = charStatusValidator(charStatus);
//   if (!status.success) {
//     return NextResponse.json({ msg: status.msg }, { status: 422 });
//   }

//   const image = charImageValidator(charImage);
//   if (!image.success) {
//     return NextResponse.json({ msg: image.msg }, { status: 422 });
//   }

//   const intro = charIntroValidator(charIntro);
//   if (!intro.success) {
//     return NextResponse.json({ msg: intro.msg }, { status: 422 });
//   }

//   const profile = charProfileValidator(charProfile);
//   if (!profile.success) {
//     return NextResponse.json({ msg: profile.msg }, { status: 422 });
//   }

//   const activeSkill = charActiveSkillValidator(charActiveSkill);
//   if (!activeSkill.success) {
//     return NextResponse.json({ msg: activeSkill.success }, { status: 422 });
//   }

//   const passiveSkill = charPassiveSkillValidator(charPassiveSkill);
//   if (!passiveSkill.success) {
//     return NextResponse.json({ msg: passiveSkill.success }, { status: 422 });
//   }

//   const charData = {
//     charStatus: status.charStatus,
//     charImage: image.charImage,
//     charIntro: Object.values(intro.charIntro).every((val) => val === undefined) ? undefined : intro.charIntro,
//     charProfile: profile.charProfile,
//     charActiveSkill: activeSkill.charActiveSkill,
//     charPassiveSkill: passiveSkill.charPassiveSkill,
//   };

//   if (action === "see") {
//     return NextResponse.json({ submitData }, { status: 200 });
//   }
//   if (action === "update") {
//     const char = await Character.findByIdAndUpdate(_id, charData, { new: true });

//     return NextResponse.json({ msg: "Update Character Sukses", char }, { status: 200 });
//   }
// }

export async function PUT(req: NextRequest) {
  const { section, char, UID }: { section: keyof Evertale.Character.State; char: Evertale.Character.State; UID: string } = await req.json();
  if (section === "charStatus") {
    const data: Evertale.Character.Status = char.charStatus;
    const charStatus = validator.character.status(data);
    if (!charStatus.success) {
      return NextResponse.json({ msg: charStatus.msg }, { status: 200 });
    }

    const character = await Character.findByIdAndUpdate(UID, { $set: { charStatus: charStatus.charStatus } }, { runValidators: true });
    await Post.findOneAndUpdate({ content: new ObjectId(UID) }, { $set: { title: character.charStatus.charName } }, { runValidators: true });
    return NextResponse.json({ msg: "Data berhasil diubah" }, { status: 200 });
  }
}
// const character = await Character.findById(UID);
// const post = await Post.findOne({ content: new ObjectId(UID) });

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  await Character.findByIdAndDelete(id);
  await Post.findOneAndDelete({ content: new ObjectId(id as string) });

  return NextResponse.json({ msg: "Character berhasil dihapus" }, { status: 200 });
}
