namespace Evertale {
  namespace Character {
    export interface Image {
      f1Img: string;
      f2Img: string;
      f3Img: string;
    }
    export interface State {
      charStatus: CharacterStatus;
      charIntro: CharacterIntro;
      charImage: CharacterImage;
      charProfile: CharacterProfile;
      charActiveSkill: CharacterActiveSkill[];
      charPassiveSkill: CharacterPassiveSkill[];
    }
    export interface Intro {
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

    export interface Status {
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
    export interface Profile {
      part1En: string;
      part1Id: string;
      part2En: string;
      part2Id: string;
      part3En: string;
      part3Id: string;
    }
    export interface ActiveSkill {
      name: string;
      typeSkill: string[];
      spirit: number;
      target: string | number;
      TU: number;
      descEn: string;
      descId: string;
    }
    export interface PassiveSkill {
      name: string;
      typeSkill: string[];
      descEn: string;
      descId: string;
    }
  }
  namespace Misc {
    export interface TypeSkill {
      typeLeaderSkill: string[];
      typePassiveSkill: string[];
      typeActiveSkill: string[];
      typeCharTeam: string[];
    }
    export interface LeaderSkill {
      name: string;
      descEn: string;
      descId: string;
      typeSkill: string;
    }
  }
}
