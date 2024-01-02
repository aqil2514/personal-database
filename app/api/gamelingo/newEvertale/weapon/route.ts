import connectMongoDB from "@/lib/mongoose";
import { Weapon } from "@/models/Weapons";
import { NextRequest, NextResponse } from "next/server";

function imageValidator(png: string, webp: string) {
  if (!png.endsWith(".png")) {
    const result = {
      msg: "Image 1 Harus Png",
      status: false,
    };
    return result;
  }
  if (!webp.endsWith(".webp")) {
    const result = {
      msg: "Image 2 Harus webp",
      status: false,
    };
    return result;
  }

  return {
    msg: "Validasi lolos",
    status: true,
  };
}

function identityValidator(rank: string, type: string, name: string, enLore: string, idLore: string) {
  const allowedRank = ["SSR", "SR", "R", "N"];
  const allowedType = ["Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  if (!allowedRank.includes(rank)) {
    const result = {
      msg: "Hanya SSR, SR, R, N saja yang diizinkan",
      status: false,
    };
    return result;
  }
  if (!allowedType.includes(type)) {
    const result = {
      msg: `Hanya ${allowedType.join(", ")} saja yang diizinkan`,
      status: false,
    };
    return result;
  }
  if (!name) {
    const result = {
      msg: `Nama senjata tidak boleh kosong`,
      status: false,
    };
    return result;
  }
  if (!enLore) {
    const result = {
      msg: `Lore tidak boleh kosong`,
      status: false,
    };
    return result;
  }
  if (!idLore) {
    const result = {
      msg: `Lore tidak boleh kosong`,
      status: false,
    };
    return result;
  }

  return {
    msg: "sukses",
    status: true,
  };
}

function ascendValidator(enLore: string, idLore: string, power: number, hp: number, atk: number, lvl: number, boost: number, pot: number) {
  if (!enLore) {
    const result = {
      msg: `Weapon English Lore tidak boleh kosong`,
      status: false,
    };
    return result;
  }
  if (!idLore) {
    const result = {
      msg: `Weapon English Lore tidak boleh kosong`,
      status: false,
    };
    return result;
  }
  if (typeof power !== "number") {
    const result = {
      msg: `Power harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof hp !== "number") {
    const result = {
      msg: `HP harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof atk !== "number") {
    const result = {
      msg: `ATK harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof lvl !== "number") {
    const result = {
      msg: `Level harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof boost !== "number") {
    const result = {
      msg: `Boost harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof pot !== "number") {
    const result = {
      msg: `Potential harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (pot > 100) {
    const result = {
      msg: `Potential maksimal 100`,
      status: false,
    };

    return result;
  }

  return {
    msg: "sukses",
    status: true,
  };
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

  //   identityValidator
  const isIdentityValidate = identityValidator(weapRank, weapType, weapName, weapEnLore, weapIdLore);
  if (!isIdentityValidate?.status) {
    return NextResponse.json({ msg: isIdentityValidate?.msg }, { status: 422 });
  }

  //   ascend Validator
  const isAscendValidator = ascendValidator(naWeapEnSkill, naWeapIdSkill, Number(naPower), Number(naHP), Number(naATK), Number(naLvl), Number(naBoost), Number(naPot));
  if (!isAscendValidator?.status) {
    return NextResponse.json({ msg: isAscendValidator?.msg }, { status: 422 });
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
  await Weapon.create(data);

  return NextResponse.json({ msg: "Tambah data weapon berhasil" }, { status: 200 });
}
