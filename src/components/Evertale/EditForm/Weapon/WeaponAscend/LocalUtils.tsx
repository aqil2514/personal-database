/**
 * Ubah Data
 * @param data Evertale Data Weapon State
 * @param setData Pasangan useState Data
 * @param e HTMLInputElement atau HTMLTextAreaElement
 * @param ascendField AscendFile berdasarkan interface yang dimaksud
 * @param beforeLastField Sama seperti sebelumnya
 * @param lastField sama seperti sebelumnya
 * @param weaponAscendField Apakah ini ada di field Weapon Ascend? default: true (Jika false, akan beralih ke Weapon Max)
 * @param affectAll Default:false. Jika true, field noascend, ascend1, dan fullascend akan ikut berubah nilainya
 * @param lang Gunakan jika affectAll true. Mengatur bahasa apa yang dituju
 * @returns Sebuah fungsi untuk mengubah data
 */

export function editHandler(
  data: Evertale.Weapon.State,
  setData: React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ascendField: keyof Evertale.Weapon.Ascend | "null",
  beforeLastField: keyof Evertale.Weapon.NoAscend | "null",
  lastField: keyof Evertale.Weapon.Skill | keyof Evertale.Weapon.Status | "null",
  weaponAscendField: boolean = true,
  affectAll: boolean = false,
  lang?: "en" | "id"
): void {
  if (!weaponAscendField) return nonAscendHandler(data, setData, e, lastField);

  if (!data.weapAscend?.noAscend && !data.weapAscend) throw new Error("Ada data yang tidak tepat");

  if (affectAll) return affectAllHandler(data, setData, e, lang as "en" | "id");

  if (ascendField === "null" || beforeLastField === "null" || lastField === "null") throw new Error("Terjadi kesalahan");

  return ascendFieldHandler(data, setData, e, ascendField, beforeLastField, lastField);
}

function nonAscendHandler(data: Evertale.Weapon.State, setData: React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lastField: string) {
  setData({
    ...data,
    weapMax: {
      ...data.weapMax,
      status: {
        ...data.weapMax?.status,
        [lastField]: e.target.value,
      },
    },
  });
  return;
}

function affectAllHandler(data: Evertale.Weapon.State, setData: React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang: "en" | "id") {
  const skillKey = lang === "en" ? "skillEn" : "skillId";
  setData({
    ...data,
    weapAscend: {
      ...data.weapAscend,
      noAscend: {
        ...data!.weapAscend!.noAscend,
        weapSkill: {
          ...data!.weapAscend!.noAscend?.weapSkill,
          [skillKey]: e.target.value,
        },
      },
      ascend1: {
        ...data!.weapAscend!.ascend1,
        weapSkill: {
          ...data!.weapAscend!.ascend1?.weapSkill,
          [skillKey]: e.target.value,
        },
      },
      fullAscend: {
        ...data!.weapAscend!.fullAscend,
        weapSkill: {
          ...data!.weapAscend!.fullAscend?.weapSkill,
          [skillKey]: e.target.value,
        },
      },
    },
  });

  return;
}

function ascendFieldHandler(
  data: Evertale.Weapon.State,
  setData: React.Dispatch<React.SetStateAction<Evertale.Weapon.State>>,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ascendField: keyof Evertale.Weapon.Ascend,
  beforeLastField: keyof Evertale.Weapon.NoAscend,
  lastField: keyof Evertale.Weapon.Skill | keyof Evertale.Weapon.Status
) {
  const lastPart = { ...data.weapAscend![ascendField]![beforeLastField], [lastField]: e.target.value };
  const beforeLastPart = { ...data.weapAscend![ascendField], [beforeLastField]: lastPart };
  const weapAscend = { ...data.weapAscend, [ascendField]: beforeLastPart };

  setData({ ...data, weapAscend: weapAscend });
}
