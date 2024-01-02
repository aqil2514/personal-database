import { SECTION_TITLE_STYLE, SECTION_STYLE } from "@/app/components/Styles";
import Form from "./Form";
import Navigation from "./Navigation";

export default function AddWeapon() {
  return (
    <div className={SECTION_STYLE + " pb-20 relative"}>
      <h1 className={SECTION_TITLE_STYLE}>Add Weapons</h1>
      <Form />
      <Navigation />
    </div>
  );
}
