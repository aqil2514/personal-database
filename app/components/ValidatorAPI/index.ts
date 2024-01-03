export function imageValidator(png: string, webp: string) {
  if (!png.endsWith(".png")) {
    const result = {
      msg: "Image 1 Harus Png",
      status: false,
    };
    return result;
  }
  if (!webp.endsWith(".webp")) {
    const result = {
      msg: "Image 2 Harus webp",
      status: false,
    };
    return result;
  }

  return {
    msg: "Validasi lolos",
    status: true,
  };
}

export function wpIdentityValidator(rank: string, type: string, name: string, enLore: string, idLore: string) {
  const allowedRank = ["SSR", "SR", "R", "N"];
  const allowedType = ["Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  if (!allowedRank.includes(rank)) {
    const result = {
      msg: "Hanya SSR, SR, R, N saja yang diizinkan",
      status: false,
    };
    return result;
  }
  if (!allowedType.includes(type)) {
    const result = {
      msg: `Hanya ${allowedType.join(", ")} saja yang diizinkan`,
      status: false,
    };
    return result;
  }
  if (!name) {
    const result = {
      msg: `Nama senjata tidak boleh kosong`,
      status: false,
    };
    return result;
  }
  if (!enLore) {
    const result = {
      msg: `Lore tidak boleh kosong`,
      status: false,
    };
    return result;
  }
  if (!idLore) {
    const result = {
      msg: `Lore tidak boleh kosong`,
      status: false,
    };
    return result;
  }

  return {
    msg: "sukses",
    status: true,
  };
}

export function wpAscendValidator(enLore: string, idLore: string, power: number, hp: number, atk: number, lvl: number, boost: number, pot: number) {
  if (!enLore) {
    const result = {
      msg: `Weapon English Lore tidak boleh kosong`,
      status: false,
    };
    return result;
  }
  if (!idLore) {
    const result = {
      msg: `Weapon English Lore tidak boleh kosong`,
      status: false,
    };
    return result;
  }
  if (typeof power !== "number") {
    const result = {
      msg: `Power harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof hp !== "number") {
    const result = {
      msg: `HP harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof atk !== "number") {
    const result = {
      msg: `ATK harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof lvl !== "number") {
    const result = {
      msg: `Level harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof boost !== "number") {
    const result = {
      msg: `Boost harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (typeof pot !== "number") {
    const result = {
      msg: `Potential harus berupa angka`,
      status: false,
    };

    return result;
  }
  if (pot > 100) {
    const result = {
      msg: `Potential maksimal 100`,
      status: false,
    };

    return result;
  }

  return {
    msg: "sukses",
    status: true,
  };
}
