import { SECTION_TITLE_STYLE, SECTION_STYLE } from "@/components/Layouting/Styles";
import Form from "@/components/Evertale/Form/Weapon";

export default function AddWeapon() {
  return (
    <div className={SECTION_STYLE + " pb-20 relative"}>
      <h1 className={SECTION_TITLE_STYLE}>Add Weapons</h1>
      <Form />
    </div>
  );
}
