import { imageValidator, wpAscendValidator, wpIdentityValidator } from "@/app/components/ValidatorAPI";
import connectMongoDB from "@/lib/mongoose";
import { Weapon } from "@/models/Evertale/Weapons";
import Post from "@/models/General/Post";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  await connectMongoDB();

  if (id) {
    const weapon = await Weapon.findById(id);

    return NextResponse.json({ weapon }, { status: 200 });
  }

  const weapons = await Weapon.find();
  const data = weapons.map((weapon: any) => ({
    weapName: weapon.weapName,
    weapId: weapon._id,
  }));

  return NextResponse.json({ data }, { status: 200 });
}

function cleanData(value: string) {
  return value === "" ? undefined : value;
}

function cleanNumeric(value: string) {
  return value === "" ? undefined : value === "0" ? 0 : Number(value);
}

export async function POST(req: NextRequest) {
  const form = await req.json();
  const {
    weapName,
    weapImagePng,
    weapImageWebp,
    weapEnLore,
    weapIdLore,
    weapRank,
    weapType,
    naWeapEnSkill,
    naWeapIdSkill,
    naPower,
    naHP,
    naATK,
    naLvl,
    naBoost,
    naPot,
    naCost,
    a1WeapEnSkill,
    a1WeapIdSkill,
    a1Power,
    a1HP,
    a1ATK,
    a1Lvl,
    a1Boost,
    a1Pot,
    a1Cost,
    faWeapEnSkill,
    faWeapIdSkill,
    faPower,
    faHP,
    faATK,
    faLvl,
    faBoost,
    faPot,
    faCost,
    maxPower,
    maxHP,
    maxATK,
    maxLvl,
    maxBoost,
    maxPot,
  } = form.data;

  //   Image Validator
  const isImgValidate = imageValidator(weapImagePng, weapImageWebp);
  if (!isImgValidate?.status) {
    return NextResponse.json({ msg: isImgValidate?.msg }, { status: 422 });
  }

  //   wpIdentityValidator
  const isIdentityValidate = wpIdentityValidator(weapRank, weapType, weapName, weapEnLore, weapIdLore);
  if (!isIdentityValidate?.status) {
    return NextResponse.json({ msg: isIdentityValidate?.msg }, { status: 422 });
  }

  //   ascend Validator
  const iswpAscendValidator = wpAscendValidator(naWeapEnSkill, naWeapIdSkill, Number(naPower), Number(naHP), Number(naATK), Number(naLvl), Number(naBoost), Number(naPot));
  if (!iswpAscendValidator?.status) {
    return NextResponse.json({ msg: iswpAscendValidator?.msg }, { status: 422 });
  }

  const faData = {
    weapSkill: cleanData(faWeapEnSkill)
      ? {
          skillEn: cleanData(faWeapEnSkill),
          skillId: cleanData(faWeapIdSkill),
        }
      : undefined,
    status: Object.values({
      power: cleanNumeric(faPower),
      hp: cleanNumeric(faHP),
      atk: cleanNumeric(faATK),
      level: cleanNumeric(faLvl),
      boost: cleanNumeric(faBoost),
      potential: cleanNumeric(faPot),
      cost: cleanNumeric(faCost),
    }).every((value) => value === undefined)
      ? undefined
      : {
          power: cleanNumeric(faPower),
          hp: cleanNumeric(faHP),
          atk: cleanNumeric(faATK),
          level: cleanNumeric(faLvl),
          boost: cleanNumeric(faBoost),
          potential: cleanNumeric(faPot),
          cost: cleanNumeric(faCost),
        },
  };

  const a1Data = {
    weapSkill: cleanData(a1WeapEnSkill)
      ? {
          skillEn: cleanData(a1WeapEnSkill),
          skillId: cleanData(a1WeapIdSkill),
        }
      : undefined,
    status:
      cleanNumeric(a1Power) || cleanNumeric(a1HP) || cleanNumeric(a1ATK) || cleanNumeric(a1Lvl) || cleanNumeric(a1Boost) || cleanNumeric(a1Pot) || cleanNumeric(a1Cost)
        ? {
            power: cleanNumeric(a1Power),
            hp: cleanNumeric(a1HP),
            atk: cleanNumeric(a1ATK),
            level: cleanNumeric(a1Lvl),
            boost: cleanNumeric(a1Boost),
            potential: cleanNumeric(a1Pot),
            cost: cleanNumeric(a1Cost),
          }
        : undefined,
  };

  const maxData = {
    status: {
      power: cleanNumeric(maxPower),
      hp: cleanNumeric(maxHP),
      atk: cleanNumeric(maxATK),
      level: cleanNumeric(maxLvl),
      boost: cleanNumeric(maxBoost),
      potential: cleanNumeric(maxPot),
    },
  };

  const data: any = {
    weapName,
    weapImage: {
      png: weapImagePng,
      webp: weapImageWebp,
    },
    weapLore: {
      loreEn: weapEnLore,
      loreId: weapIdLore,
    },
    weapRank,
    weapType,
    weapAscend: {
      noAscend: {
        weapSkill: {
          skillEn: naWeapEnSkill,
          skillId: naWeapIdSkill,
        },
        status: {
          power: cleanNumeric(naPower),
          hp: cleanNumeric(naHP),
          atk: cleanNumeric(naATK),
          level: cleanNumeric(naLvl),
          boost: cleanNumeric(naBoost),
          potential: cleanNumeric(naPot),
          cost: cleanNumeric(naCost),
        },
      },
      ascend1: Object.values(a1Data).every((value) => value === undefined) ? undefined : a1Data,
      fullAscend: Object.values(faData).every((value) => value === undefined) ? undefined : faData,
    },
    weapMax: Object.values(maxData).every((value) => value === undefined) ? undefined : maxData,
  };

  await connectMongoDB();
  const newWeap = await Weapon.create(data);
  await Post.create({
    title: newWeap.weapName,
    game: {
      name: "Evertale",
      topic: "Weapon",
    },
    content: newWeap._id,
    author: "Admin GameLingo",
  });

  return NextResponse.json({ msg: "Tambah data weapon berhasil" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const form = await req.json();
  const {
    weapName,
    weapImagePng,
    weapImageWebp,
    weapEnLore,
    weapIdLore,
    weapRank,
    weapType,
    naWeapEnSkill,
    naWeapIdSkill,
    naPower,
    naHP,
    naATK,
    naLvl,
    naBoost,
    naPot,
    a1WeapEnSkill,
    a1WeapIdSkill,
    a1Power,
    a1HP,
    a1ATK,
    a1Lvl,
    a1Boost,
    a1Pot,
    faWeapEnSkill,
    faWeapIdSkill,
    faPower,
    faHP,
    faATK,
    faLvl,
    faBoost,
    faPot,
    maxPower,
    maxHP,
    maxATK,
    maxLvl,
    maxBoost,
    maxPot,
  } = form.data;

  //   Image Validator
  const isImgValidate = imageValidator(weapImagePng, weapImageWebp);
  if (!isImgValidate?.status) {
    return NextResponse.json({ msg: isImgValidate?.msg }, { status: 422 });
  }

  //   wpIdentityValidator
  const isIdentityValidate = wpIdentityValidator(weapRank, weapType, weapName, weapEnLore, weapIdLore);
  if (!isIdentityValidate?.status) {
    return NextResponse.json({ msg: isIdentityValidate?.msg }, { status: 422 });
  }

  //   ascend Validator
  const iswpAscendValidator = wpAscendValidator(naWeapEnSkill, naWeapIdSkill, Number(naPower), Number(naHP), Number(naATK), Number(naLvl), Number(naBoost), Number(naPot));
  if (!iswpAscendValidator?.status) {
    return NextResponse.json({ msg: iswpAscendValidator?.msg }, { status: 422 });
  }

  const data = {
    weapName,
    weapImage: {
      png: weapImagePng,
      webp: weapImageWebp,
    },
    weapLore: {
      loreEn: weapEnLore,
      loreId: weapIdLore,
    },
    weapRank,
    weapType,
    weapAscend: {
      noAscend: {
        weapSkill: {
          skillEn: naWeapEnSkill,
          skillId: naWeapIdSkill,
        },
        status: {
          power: Number(naPower),
          hp: Number(naHP),
          atk: Number(naATK),
          level: Number(naLvl),
          boost: Number(naBoost),
          potential: Number(naPot),
        },
      },
      ascend1: {
        weapSkill: {
          skillEn: a1WeapEnSkill,
          skillId: a1WeapIdSkill,
        },
        status: {
          power: Number(a1Power),
          hp: Number(a1HP),
          atk: Number(a1ATK),
          level: Number(a1Lvl),
          boost: Number(a1Boost),
          potential: Number(a1Pot),
        },
      },
      fullAscend: {
        weapSkill: {
          skillEn: faWeapEnSkill,
          skillId: faWeapIdSkill,
        },
        status: {
          power: Number(faPower),
          hp: Number(faHP),
          atk: Number(faATK),
          level: Number(faLvl),
          boost: Number(faBoost),
          potential: Number(faPot),
        },
      },
    },
    weapMax: {
      status: {
        power: Number(maxPower),
        hp: Number(maxHP),
        atk: Number(maxATK),
        level: Number(maxLvl),
        boost: Number(maxBoost),
        potential: Number(maxPot),
      },
    },
  };

  await connectMongoDB();
  await Weapon.findByIdAndUpdate(form.id, data);

  return NextResponse.json({ msg: "Ubah data berhasil" }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  await Weapon.findByIdAndDelete(id);
  await Post.findOneAndDelete({ content: new ObjectId(id as string) });

  return NextResponse.json({ msg: "Weapon berhasil dihapus" }, { status: 200 });
}
