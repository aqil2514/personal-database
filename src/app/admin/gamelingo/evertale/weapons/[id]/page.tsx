import { Metadata } from "next";
import WeaponDetail from "./Weapon";

export const metadata: Metadata = {
  title: "Info Weapon | Personal Database",
};

export default function Weapon({ params }: any) {
  const { id } = params;
  return (
    <div className="w-full min-h-full">
      <WeaponDetail id={id} />
    </div>
  );
}
