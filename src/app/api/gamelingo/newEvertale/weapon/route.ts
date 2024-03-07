import { document, validator } from "@/lib/utils";
import { Weapon } from "@/models/Evertale/Weapons";
import { Post } from "@/models/General/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

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

// export async function POST(req: NextRequest) {
//   const form = await req.json();
//   const {
//     weapName,
//     weapImagePng,
//     weapImageWebp,
//     weapEnLore,
//     weapIdLore,
//     weapRank,
//     weapType,
//     naWeapEnSkill,
//     naWeapIdSkill,
//     naPower,
//     naHP,
//     naATK,
//     naLvl,
//     naBoost,
//     naPot,
//     naCost,
//     a1WeapEnSkill,
//     a1WeapIdSkill,
//     a1Power,
//     a1HP,
//     a1ATK,
//     a1Lvl,
//     a1Boost,
//     a1Pot,
//     a1Cost,
//     faWeapEnSkill,
//     faWeapIdSkill,
//     faPower,
//     faHP,
//     faATK,
//     faLvl,
//     faBoost,
//     faPot,
//     faCost,
//     maxPower,
//     maxHP,
//     maxATK,
//     maxLvl,
//     maxBoost,
//     maxPot,
//   } = form.data;

//   //   Image Validator
//   const isImgValidate = document.weapon.validator.image(weapImagePng, weapImageWebp);
//   if (!isImgValidate?.status) {
//     return NextResponse.json({ msg: isImgValidate?.msg }, { status: 422 });
//   }

//   //   wpIdentityValidator
//   const isIdentityValidate = document.weapon.validator.weaponIdentity(weapRank, weapType, weapName, weapEnLore, weapIdLore);
//   if (!isIdentityValidate?.status) {
//     return NextResponse.json({ msg: isIdentityValidate?.msg }, { status: 422 });
//   }

//   //   ascend Validator
//   const iswpAscendValidator = document.weapon.validator.weaponAscend(naWeapEnSkill, naWeapIdSkill, Number(naPower), Number(naHP), Number(naATK), Number(naLvl), Number(naBoost), Number(naPot), Number(naCost));
//   if (!iswpAscendValidator?.status) {
//     return NextResponse.json({ msg: iswpAscendValidator?.msg }, { status: 422 });
//   }

//   const faData = {
//     weapSkill: cleanData(faWeapEnSkill)
//       ? {
//           skillEn: cleanData(faWeapEnSkill),
//           skillId: cleanData(faWeapIdSkill),
//         }
//       : undefined,
//     status: Object.values({
//       power: cleanNumeric(faPower),
//       hp: cleanNumeric(faHP),
//       atk: cleanNumeric(faATK),
//       level: cleanNumeric(faLvl),
//       boost: cleanNumeric(faBoost),
//       potential: cleanNumeric(faPot),
//       cost: cleanNumeric(faCost),
//     }).every((value) => value === undefined)
//       ? undefined
//       : {
//           power: cleanNumeric(faPower),
//           hp: cleanNumeric(faHP),
//           atk: cleanNumeric(faATK),
//           level: cleanNumeric(faLvl),
//           boost: cleanNumeric(faBoost),
//           potential: cleanNumeric(faPot),
//           cost: cleanNumeric(faCost),
//         },
//   };

//   const a1Data = {
//     weapSkill: cleanData(a1WeapEnSkill)
//       ? {
//           skillEn: cleanData(a1WeapEnSkill),
//           skillId: cleanData(a1WeapIdSkill),
//         }
//       : undefined,
//     status:
//       cleanNumeric(a1Power) || cleanNumeric(a1HP) || cleanNumeric(a1ATK) || cleanNumeric(a1Lvl) || cleanNumeric(a1Boost) || cleanNumeric(a1Pot) || cleanNumeric(a1Cost)
//         ? {
//             power: cleanNumeric(a1Power),
//             hp: cleanNumeric(a1HP),
//             atk: cleanNumeric(a1ATK),
//             level: cleanNumeric(a1Lvl),
//             boost: cleanNumeric(a1Boost),
//             potential: cleanNumeric(a1Pot),
//             cost: cleanNumeric(a1Cost),
//           }
//         : undefined,
//   };

//   const maxData = {
//     status: {
//       power: cleanNumeric(maxPower),
//       hp: cleanNumeric(maxHP),
//       atk: cleanNumeric(maxATK),
//       level: cleanNumeric(maxLvl),
//       boost: cleanNumeric(maxBoost),
//       potential: cleanNumeric(maxPot),
//     },
//   };

//   const data: any = {
//     weapName,
//     weapImage: {
//       png: weapImagePng,
//       webp: weapImageWebp,
//     },
//     weapLore: {
//       loreEn: weapEnLore,
//       loreId: weapIdLore,
//     },
//     weapRank,
//     weapType,
//     weapAscend: {
//       noAscend: {
//         weapSkill: {
//           skillEn: naWeapEnSkill,
//           skillId: naWeapIdSkill,
//         },
//         status: {
//           power: cleanNumeric(naPower),
//           hp: cleanNumeric(naHP),
//           atk: cleanNumeric(naATK),
//           level: cleanNumeric(naLvl),
//           boost: cleanNumeric(naBoost),
//           potential: cleanNumeric(naPot),
//           cost: cleanNumeric(naCost),
//         },
//       },
//       ascend1: Object.values(a1Data).every((value) => value === undefined) ? undefined : a1Data,
//       fullAscend: Object.values(faData).every((value) => value === undefined) ? undefined : faData,
//     },
//     weapMax: Object.values(maxData).every((value) => value === undefined) ? undefined : maxData,
//   };

//   const create = await document.weapon.db.create(data);

//   return NextResponse.json({ msg: create }, { status: 200 });
// }

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data: Evertale.Weapon.State = body.data;

  const identityValidator = validator.weapon.identity(data);
  if (identityValidator.status === false) {
    return NextResponse.json({ msg: identityValidator.msg, ref: identityValidator.ref }, { status: 422 });
  }

  const imageValidator = validator.weapon.image(data);
  if (imageValidator.status === false) {
    return NextResponse.json({ msg: imageValidator.msg }, { status: 422 });
  }

  const ascendValidator = validator.weapon.ascend(data);
  if (ascendValidator.status === false) {
    return NextResponse.json({ msg: ascendValidator.msg, ref: ascendValidator.ref }, { status: 422 });
  }

  const final = validator.weapon.adjust(data);

  const weapon = await Weapon.create(final);
  await Post.create({
    title: weapon.weapName,
    game: {
      name: "Evertale",
      topic: "Weapon",
    },
    content: weapon._id,
    author: "Muhamad Aqil Maulana",
  });

  return NextResponse.json({ msg: "Berhasil tambah data", final }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const data: Evertale.Weapon.State = body.data;

  if (!id) {
    return NextResponse.json({ msg: "id tidak ada" }, { status: 422 });
  }

  const identityValidator = validator.weapon.identity(data);
  if (identityValidator.status === false) {
    return NextResponse.json({ msg: identityValidator.msg, ref: identityValidator.ref }, { status: 422 });
  }

  const imageValidator = validator.weapon.image(data);
  if (imageValidator.status === false) {
    return NextResponse.json({ msg: imageValidator.msg }, { status: 422 });
  }

  const ascendValidator = validator.weapon.ascend(data);
  if (ascendValidator.status === false) {
    return NextResponse.json({ msg: ascendValidator.msg, ref: ascendValidator.ref }, { status: 422 });
  }

  const final = validator.weapon.adjust(data);

  await Weapon.findByIdAndUpdate(id, final);

  return NextResponse.json({ msg: "Ubah data berhasil" }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  const msg = await document.weapon.db.delete(id as string);

  return NextResponse.json({ msg }, { status: 200 });
}
