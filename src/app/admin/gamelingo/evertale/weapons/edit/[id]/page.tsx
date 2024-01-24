import { Metadata } from "next";
import WeaponDetail from "./Weapon";
import Navigation from "./Navigation";
import { SECTION_STYLE, SECTION_TITLE_STYLE } from "@/app/components/Styles";

export const metadata: Metadata = {
  title: "Info Weapon | Personal Database",
};

export default function Weapon({ params }: any) {
  const { id } = params;
  return (
    <div className={SECTION_STYLE + " pb-20 relative"}>
      {" "}
      <h1 className={SECTION_TITLE_STYLE}>Edit Data Weapon</h1>
      <WeaponDetail id={id} />
      <Navigation />
    </div>
  );
}
