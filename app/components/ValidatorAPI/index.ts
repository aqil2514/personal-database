export function imageValidator(png: string, webp: string) {
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

export function wpIdentityValidator(rank: string, type: string, name: string, enLore: string, idLore: string) {
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

export function wpAscendValidator(enLore: string, idLore: string, power: number, hp: number, atk: number, lvl: number, boost: number, pot: number) {
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

// Character Validator
export function charStatusValidator(status: any) {
  const charStatus = status;

  if (!charStatus.charName) {
    return {
      msg: `Karakter belum diberi nama`,
      success: false,
    };
  }
  if (charStatus.charRank === "Rank Character" || !charStatus.charRank) {
    return {
      msg: `Rank Character belum dipilih`,
      success: false,
    };
  }
  if (charStatus.charElement === "Element Character" || !charStatus.charElement) {
    return {
      msg: `Status Element belum dipilih`,
      success: false,
    };
  }
  if (charStatus.isConjured === "Conjure") {
    charStatus.isConjured = true;
  } else if (charStatus.isConjured === "Non-Conjured") {
    charStatus.isConjured = false;
  }
  if (charStatus.charTeam.length === 0) {
    return {
      msg: `Team Character belum dipilih`,
      success: false,
    };
  }
  if (!charStatus.charWeapon1 || charStatus.charWeapon1 === "Select Weapon") {
    return {
      msg: `Weapon 1 belum dipilih`,
      success: false,
    };
  }
  if (charStatus.charWeapon1 === charStatus.charWeapon2) {
    return {
      msg: `Weapon 1 dan 2 tidak boleh sama`,
      success: false,
    };
  }
  if (!charStatus.charLeaderSkill || charStatus.charLeaderSkill === "Select Leader Skill") {
    charStatus.charLeaderSkill = undefined;
  }
  if (!charStatus.charWeapon2 || charStatus.charWeapon2 === "Select Weapon") {
    charStatus.charWeapon2 = undefined;
  }
  if (!charStatus.charConjure || charStatus.charConjure === "Select Conjure") {
    charStatus.charConjure = undefined;
  }

  return { charStatus, success: true };
}

export function charImageValidator(image: any) {
  const charImage = image;

  if (!charImage.f1Img) {
    return { msg: "Char Image Pertama belum diisi", success: false };
  }
  if (!charImage.f2Img) {
    charImage.f2Img = undefined;
  }
  if (!charImage.f3Img) {
    charImage.f3Img = undefined;
  }

  return {
    success: true,
    charImage,
  };
}

export function charIntroValidator(intro: any) {
  const charIntro = intro;

  if (charIntro.gachaIntroEn && charIntro.gachaIntroId.length === 0) {
    return { msg: "Gacha Intro belum diterjemahkan", success: false };
  }

  if (!charIntro.gachaIntroEn) {
    charIntro.gachaIntroEn = undefined;
    charIntro.gachaIntroId = undefined;
  }
  if (charIntro.gachaTextEn && charIntro.gachaTextId.length === 0) {
    return { msg: "Gacha Text belum diterjemahkan", success: false };
  }
  if (!charIntro.gachaTextEn) {
    charIntro.gachaTextEn = undefined;
    charIntro.gachaTextId = undefined;
  }
  if (charIntro.loginTextEn && charIntro.loginTextId.length === 0) {
    return { msg: "Login Text belum diterjemahkan", success: false };
  }
  if (!charIntro.loginTextEn) {
    charIntro.loginTextEn = undefined;
    charIntro.loginTextId = undefined;
  }
  if (charIntro.text1En && charIntro.text1Id.length === 0) {
    return { msg: "Text 1 belum diterjemahkan", success: false };
  }
  if (!charIntro.text1En) {
    charIntro.text1En = undefined;
    charIntro.text1Id = undefined;
  }
  if (charIntro.text2En && charIntro.text2Id.length === 0) {
    return { msg: "Text 2 belum diterjemahkan", success: false };
  }
  if (!charIntro.text2En) {
    charIntro.text2En = undefined;
    charIntro.text2Id = undefined;
  }
  if (charIntro.text3En && charIntro.text3Id.length === 0) {
    return { msg: "Text 3 belum diterjemahkan", success: false };
  }
  if (!charIntro.text3En) {
    charIntro.text3En = undefined;
    charIntro.text3Id = undefined;
  }
  if (charIntro.text4En && charIntro.text4Id.length === 0) {
    return { msg: "Text 4 belum diterjemahkan", success: false };
  }
  if (!charIntro.text4En) {
    charIntro.text4En = undefined;
    charIntro.text4Id = undefined;
  }

  return { charIntro, success: true };
}

export function charProfileValidator(profile: any) {
  const charProfile = profile;

  if (!charProfile.part1En) {
    return { msg: "Char Profile 1 wajib diisi", success: false };
  }
  if (charProfile.part1En && !charProfile.part1Id) {
    return { msg: "Char Profile 1 belum diterjemahkan", success: false };
  }
  if (!charProfile.part2En) {
    charProfile.part2En = undefined;
    charProfile.part2Id = undefined;
  }
  if (charProfile.part2En && !charProfile.part2Id) {
    return { msg: "Char Profile 2 belum diterjemahkan", success: false };
  }
  if (!charProfile.part3En) {
    charProfile.part3En = undefined;
    charProfile.part3Id = undefined;
  }
  if (charProfile.part3En && !charProfile.part3Id) {
    return { msg: "Char Profile 3 belum diterjemahkan", success: false };
  }
  return { charProfile, success: true };
}

export function charActiveSkillValidator(activeSkill: any) {
  const charActiveSkill = activeSkill;

  if (charActiveSkill.length === 0) {
    return { msg: "Character Active Skill belum diisi", success: false };
  }
  return { charActiveSkill, success: true };
}

export function charPassiveSkillValidator(passiveSkill: any) {
  const charPassiveSkill = passiveSkill;

  if (charPassiveSkill.length === 0) {
    return { msg: "Character Assive Skill belum diisi", success: false };
  }
  return { charPassiveSkill, success: true };
}
