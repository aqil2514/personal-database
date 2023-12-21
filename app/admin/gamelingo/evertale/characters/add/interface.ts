interface CharacterImage {
  f1Img: string;
  f2Img: string;
  f3Img: string;
}

interface CharacterIntro {
  gachaIntroEn: string;
  gachaIntroId: string;
  gachaTextEn: string;
  gachaTextId: string;
  loginTextEn: string;
  loginTextId: string;
  text1En: string;
  text1Id: string;
  text2En: string;
  text2Id: string;
  text3Id: string;
  text3En: string;
  text4En: string;
  text4Id: string;
}
interface CharacterStatus {
  charName: string;
  charRank: "SSR" | "SR" | "R" | "N" | undefined;
  charElement: "Dark" | "Light" | "Earth" | "Fire" | "Storm" | "Water" | undefined;
  charTeam: string[];
  charWeapon1: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana" | undefined;
  charWeapon2: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana" | undefined;
  charLeaderSkill: string | null;
  isConjured: Boolean;
  charConjure: string | null;
}
interface CharacterProfile {
  part1En: string;
  part1Id: string;
  part2En: string;
  part2Id: string;
  part3En: string;
  part3Id: string;
}
interface CharacterActiveSkill {
  name: string;
  typeSkill: string[];
  spirit: number;
  target: string | number;
  TU: number;
  descEn: string;
  descId: string;
}
interface CharacterPassiveSkill {
  name: string;
  typeSkill: string[];
  descEn: string;
  descId: string;
}

export interface CharacterState {
  charStatus: CharacterStatus;
  charIntro: CharacterIntro;
  charImage: CharacterImage;
  charProfile: CharacterProfile;
  charActiveSkill: CharacterActiveSkill[];
  charPassiveSkill: CharacterPassiveSkill[];
}
