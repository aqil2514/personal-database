import { WeaponAscendComponent } from "./LocalComponent";

export default function WeaponAscend() {
  return (
    <>
      <WeaponAscendComponent ascend="no-ascend" />
      <WeaponAscendComponent ascend="ascend-1" />
      <WeaponAscendComponent ascend="full-ascend" />
      <WeaponAscendComponent ascend="max-status" />
    </>
  );
}
