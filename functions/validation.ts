import { NextResponse } from "next/server";

export async function validateCharStatus(charStatus: any) {
  if (charStatus.charRank === "Rank Character") {
    return NextResponse.json({ msg: "Rank Character belum dipilih" }, { status: 422 });
  }
  if (charStatus.charElement === "Select Element") {
    return NextResponse.json({ msg: "Status Element belum dipilih" }, { status: 422 });
  }
  if (charStatus.isConjured === "Conjure") {
    charStatus.isConjured = true;
  }
  if (charStatus.isConjured === "Non-Conjured") {
    charStatus.isConjured = false;
  }
  if (charStatus.charTeam.length === 0) {
    return NextResponse.json({ msg: "Character Team belum dipilih" }, { status: 422 });
  }
  if (charStatus.charWeapon1 === "Select Weapon") {
    return NextResponse.json({ msg: "Weapon 1 belum dipilih" }, { status: 422 });
  }
  if (charStatus.charLeaderSkill === "Select Leader Skill") {
    charStatus.charLeaderSkill = undefined;
  }
  if (charStatus.charWeapon2 === "Select Weapon") {
    charStatus.charWeapon2 = undefined;
  }
}
