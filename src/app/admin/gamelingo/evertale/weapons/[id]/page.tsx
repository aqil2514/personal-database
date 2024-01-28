import { Metadata } from "next";
import EvertaleWeaponPost from "@/components/Evertale/Post/Weapon";

export const metadata: Metadata = {
  title: "Info Weapon | Personal Database",
};

export default function Weapon({ params }: any) {
  const { id } = params;
  return (
    <div className="w-full min-h-full">
      <EvertaleWeaponPost id={id} />
    </div>
  );
}
