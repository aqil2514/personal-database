namespace Evertale {
  namespace Character {
    export interface Image {
      f1Img: string;
      f2Img?: string;
      f3Img?: string;
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
      gachaIntroEn?: string;
      gachaIntroId?: string;
      gachaTextEn?: string;
      gachaTextId?: string;
      loginTextEn?: string;
      loginTextId?: string;
      text1En?: string;
      text1Id?: string;
      text2En?: string;
      text2Id?: string;
      text3Id?: string;
      text3En?: string;
      text4En?: string;
      text4Id?: string;
    }

    export interface Status {
      charName: string;
      charRank: "SSR" | "SR" | "R" | "N";
      charElement: "Dark" | "Light" | "Earth" | "Fire" | "Storm" | "Water";
      charTeam: string[];
      charWeapon1: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
      charWeapon2?: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana";
      charLeaderSkill?: string;
      isConjured: boolean | string;
      charConjure?: string;
    }
    export interface Profile {
      part1En: string;
      part1Id: string;
      part2En?: string;
      part2Id?: string;
      part3En?: string;
      part3Id?: string;
    }
    export interface ActiveSkill {
      skillName: string;
      typeSkill: string[];
      skillSpirit: number;
      skillTarget: string | number;
      skillTu: number;
      skillDescEn: string;
      skillDescId: string;
    }
    export interface PassiveSkill {
      _id?: string;
      skillName: string;
      typeSkill: string[];
      skillDescEn: string;
      skillDescId: string;
    }
  }
  namespace Weapon {
    export interface State {
      weapImage: { png: string; webp: string };
      weapName: string;
      weapRank: "SSR" | "SR" | "R" | "N" | "Weap Rank";
      weapType: "Sword" | "Axe" | "Staff" | "Mace" | "GreatSword" | "GreatAxe" | "Spear" | "Hammer" | "Katana" | "Weap Type";
      weapLore?: {
        loreEn?: string;
        loreId?: string;
      };
      weapAscend?: Ascend;
      weapMax?: {
        status?: {
          power?: number;
          cost?: number;
          hp?: number;
          atk?: number;
          level?: number;
          boost?: number;
          potential?: number;
        };
      };
    }

    export interface Ascend {
      noAscend?: NoAscend;
      ascend1?: Ascend1;
      fullAscend?: FullAscend;
    }

    export interface NoAscend {
      weapSkill?: Skill;
      status?: Status;
    }

    export interface Ascend1 {
      weapSkill?: Skill;
      status?: Status;
    }

    export interface FullAscend {
      weapSkill?: Skill;
      status?: Status;
    }

    export interface Skill {
      skillEn?: string;
      skillId?: string;
    }

    export interface Status {
      power?: number;
      hp?: number;
      atk?: number;
      level?: number;
      boost?: number;
      cost?: number;
      potential?: number;
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
  namespace Utils {
    export interface ComparingDataProps<T> {
      subfield: keyof T | null;
      oldCS: T;
      newCS: T;
      dataFor: "new" | "old";
      title: string;
    }
  }
}
