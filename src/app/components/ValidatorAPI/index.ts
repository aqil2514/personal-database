// Character Validator
export function charStatusValidator(status: any) {
  const charStatus = status;

  if (!charStatus.charName) {
    return {
      msg: `Karakter belum diberi nama`,
      ref: "charName",
      success: false,
    };
  }
  if (charStatus.charRank === "Character Rank" || !charStatus.charRank) {
    return {
      msg: `Rank Character belum dipilih`,
      ref: "charRank",
      success: false,
    };
  }
  if (charStatus.charElement === "Element Character" || !charStatus.charElement) {
    return {
      msg: `Status Element belum dipilih`,
      ref: "charElement",
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
      ref: "charTeam",
      success: false,
    };
  }
  if (!charStatus.charWeapon1 || charStatus.charWeapon1 === "Select Weapon") {
    return {
      msg: `Weapon 1 belum dipilih`,
      ref: "charWeapon1",
      success: false,
    };
  }
  if (charStatus.charWeapon1 === charStatus.charWeapon2) {
    return {
      msg: `Weapon 1 dan 2 tidak boleh sama`,
      ref: "charWeapon2",
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
    return { msg: "Char Image Pertama belum diisi", ref: "f1Img", success: false };
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
    return { msg: "Gacha Intro belum diterjemahkan", ref: "gacha-intro-id", success: false };
  }

  if (!charIntro.gachaIntroEn) {
    charIntro.gachaIntroEn = undefined;
    charIntro.gachaIntroId = undefined;
  }
  if (charIntro.gachaTextEn && charIntro.gachaTextId.length === 0) {
    return { msg: "Gacha Text belum diterjemahkan", ref: "gacha-text-id", success: false };
  }
  if (!charIntro.gachaTextEn) {
    charIntro.gachaTextEn = undefined;
    charIntro.gachaTextId = undefined;
  }
  if (charIntro.loginTextEn && charIntro.loginTextId.length === 0) {
    return { msg: "Login Text belum diterjemahkan", ref: "login-text-id", success: false };
  }
  if (!charIntro.loginTextEn) {
    charIntro.loginTextEn = undefined;
    charIntro.loginTextId = undefined;
  }
  if (charIntro.text1En && charIntro.text1Id.length === 0) {
    return { msg: "Text 1 belum diterjemahkan", ref: "text-1-id", success: false };
  }
  if (!charIntro.text1En) {
    charIntro.text1En = undefined;
    charIntro.text1Id = undefined;
  }
  if (charIntro.text2En && charIntro.text2Id.length === 0) {
    return { msg: "Text 2 belum diterjemahkan", ref: "text-2-id", success: false };
  }
  if (!charIntro.text2En) {
    charIntro.text2En = undefined;
    charIntro.text2Id = undefined;
  }
  if (charIntro.text3En && charIntro.text3Id.length === 0) {
    return { msg: "Text 3 belum diterjemahkan", ref: "text-3-id", success: false };
  }
  if (!charIntro.text3En) {
    charIntro.text3En = undefined;
    charIntro.text3Id = undefined;
  }
  if (charIntro.text4En && charIntro.text4Id.length === 0) {
    return { msg: "Text 4 belum diterjemahkan", ref: "text-4-id", success: false };
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
    return { msg: "Char Profile 1 wajib diisi", ref: "part-1-en", success: false };
  }
  if (charProfile.part1En && !charProfile.part1Id) {
    return { msg: "Char Profile 1 belum diterjemahkan", ref: "part-1-id", success: false };
  }
  if (!charProfile.part2En) {
    charProfile.part2En = undefined;
    charProfile.part2Id = undefined;
  }
  if (charProfile.part2En && !charProfile.part2Id) {
    return { msg: "Char Profile 2 belum diterjemahkan", ref: "part-2-id", success: false };
  }
  if (!charProfile.part3En) {
    charProfile.part3En = undefined;
    charProfile.part3Id = undefined;
  }
  if (charProfile.part3En && !charProfile.part3Id) {
    return { msg: "Char Profile 3 belum diterjemahkan", ref: "part-3-id", success: false };
  }
  return { charProfile, success: true };
}

export function charActiveSkillValidator(activeSkill: any) {
  const charActiveSkill = activeSkill;

  if (charActiveSkill.length === 0) {
    return { msg: "Character Active Skill belum diisi", ref: "active-skill-section", success: false };
  }
  return { charActiveSkill, success: true };
}

export function charPassiveSkillValidator(passiveSkill: any) {
  const charPassiveSkill = passiveSkill;

  if (charPassiveSkill.length === 0) {
    return { msg: "Character Assive Skill belum diisi",ref:"passive-skill-setting-container", success: false };
  }
  return { charPassiveSkill, success: true };
}
