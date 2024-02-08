import React from "react";

//** Character Providers */
const CharacterDataContext = React.createContext<CharacterStateContext>({} as CharacterStateContext);

type CharacterStateContext = {
  data: Evertale.Character.State;
  setData: React.Dispatch<React.SetStateAction<Evertale.Character.State>>;
};

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<Evertale.Character.State>({
    charStatus: {
      charName: "",
      charRank: undefined,
      charConjure: "",
      charElement: undefined,
      charLeaderSkill: "",
      charTeam: [],
      charWeapon1: undefined,
      charWeapon2: undefined,
      isConjured: false,
    },
    charImage: {
      f1Img: "",
      f2Img: "",
      f3Img: "",
    },
    charIntro: {
      gachaIntroEn: "",
      gachaIntroId: "",
      gachaTextEn: "",
      gachaTextId: "",
      loginTextEn: "",
      loginTextId: "",
      text1En: "",
      text1Id: "",
      text2En: "",
      text2Id: "",
      text3En: "",
      text3Id: "",
      text4En: "",
      text4Id: "",
    },
    charProfile: {
      part1En: "",
      part1Id: "",
      part2En: "",
      part2Id: "",
      part3En: "",
      part3Id: "",
    },
    charActiveSkill: [],
    charPassiveSkill: [],
  });

  return <CharacterDataContext.Provider value={{ data, setData }}>{children}</CharacterDataContext.Provider>;
}

export function useCharacterData() {
  const context = React.useContext(CharacterDataContext);
  if (!context) {
    throw new Error("useCharacterData must be used within a CharacterProvider");
  }
  return context;
}

//** Weapon Providers */
const WeaponDataContext = React.createContext<WeaponStateContext>({} as WeaponStateContext);

type WeaponStateContext = {
  data: Evertale.Weapon.State;
  setData: React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export function WeaponProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Evertale.Weapon.State>({
    weapName: "",
    weapRank: "Weap Rank",
    weapType: "Weap Type",
    weapLore: {
      loreEn: "",
      loreId: "",
    },
    weapImage: {
      webp: "",
      png: "",
    },
    weapAscend: {
      noAscend: {
        weapSkill: {
          skillEn: "",
          skillId: "",
        },
        status: {
          power: 0,
          hp: 0,
          atk: 0,
          level: 0,
          boost: 0,
          potential: 0,
          cost: 0,
        },
      },
      ascend1: {
        weapSkill: {
          skillEn: "",
          skillId: "",
        },
        status: {
          power: 0,
          hp: 0,
          atk: 0,
          level: 0,
          boost: 0,
          potential: 0,
          cost: 0,
        },
      },
      fullAscend: {
        weapSkill: {
          skillEn: "",
          skillId: "",
        },
        status: {
          power: 0,
          hp: 0,
          atk: 0,
          level: 0,
          boost: 0,
          potential: 0,
          cost: 0,
        },
      },
    },
    weapMax: {
      status: {
        power: 0,
        hp: 0,
        atk: 0,
        level: 0,
        boost: 0,
        potential: 0,
        cost: 0,
      },
    },
  });
  return <WeaponDataContext.Provider value={{ data, setData, isLoading, setIsLoading }}>{children}</WeaponDataContext.Provider>;
}

export function useWeaponData() {
  return React.useContext(WeaponDataContext);
}
