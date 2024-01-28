"use client";
import React from "react";
import WeaponStatus from "./WeaponStatus";
import WeaponImage from "./WeaponImage";
import WeaponAscend from "./WeaponAscend";
import WeaponButton from "./WeaponButton";

const OldWeaponContext = React.createContext<oldDataState>({} as oldDataState);

type oldDataState = {
  data: Evertale.Weapon.State;
  setData: React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditForm({ old }: { old: Evertale.Weapon.State }) {
  const [data, setData] = React.useState<Evertale.Weapon.State>(old);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return (
    <div className="py-20">
      <OldWeaponContext.Provider value={{ data, setData, isLoading, setIsLoading }}>
        <WeaponStatus />
        <WeaponImage />
        <WeaponAscend />
        <WeaponButton />
      </OldWeaponContext.Provider>
    </div>
  );
}

export function useOldWeaponData() {
  return React.useContext(OldWeaponContext);
}
