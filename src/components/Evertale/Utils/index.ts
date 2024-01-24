import React from "react";

export function editChangeHandler(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, char: Evertale.Character.State, setChar: React.Dispatch<React.SetStateAction<Evertale.Character.State>>) {
  const element = e.target;
  const subField = element.getAttribute("data-sub-field");
  const field = element.getAttribute("data-field");

  if (!field) {
    throw new Error("Tidak ada attribute data-field");
  }
  if (!Object.keys(char).includes(field)) {
    throw new Error(`Field '${field}' tidak valid dalam tipe State`);
  }
  if (!subField) {
    throw new Error("Tidak ada attribute data-sub-field");
  }
  if (!Object.keys(char[field as keyof Evertale.Character.State]).includes(subField)) {
    throw new Error(`SubField '${subField}' tidak valid dalam tipe ${field}`);
  }

  setChar({ ...char, [field]: { ...char[field as keyof Evertale.Character.State], [subField]: element.value.trim() } });
}

/**
 * Weapon Edit Handler
 *
 * @param {React.ChangeEvent<HTMLInputElement |HTMLSelectElement | HTMLTextAreaElement>} e Event Handler untuk ChangeEvent
 * @param {Evertale.Weapon.State} data Data State Weapon
 * @param {React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>} setData Pasangan Data State
 * @param {keyof Evertale.Weapon.State} dataField Data field yang akan diedit
 * @returns {void} void
 */

export function editWeaponHandler(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  data: Evertale.Weapon.State,
  setData: React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>,
  dataField: keyof Evertale.Weapon.State
): void {
  setData({ ...data, [dataField]: e.target.value });
}
