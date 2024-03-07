import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { Weapon } from "@/models/Evertale/Weapons";
import { Post } from "@/models/General/Post";

// DOCUMENT API

export const document = {
  weapon: {
    validator: {
      image: (png: string, webp: string) => {
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
      },
      weaponIdentity: (rank: string, type: string, name: string, enLore: string, idLore: string) => {
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
      },
      weaponAscend: (enLore: string, idLore: string, power: number, hp: number, atk: number, lvl: number, boost: number, pot: number, cost: number) => {
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
        if (typeof cost !== "number") {
          const result = {
            msg: `Cost harus berupa angka`,
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
      },
    },
    db: {
      create: async (game: "Evertale" | "Mobile Legends" | "Genshin Impact", data: any) => {
        const session = mongoose.startSession();
        try {
          try {
            (await session).startTransaction();

            const newWeap = await Weapon.create(data);
            await Post.create({
              title: newWeap.weapName,
              game: {
                name: "Evertale",
                topic: "Weapon",
              },
              content: newWeap._id,
              author: "Muhamad Aqil Maulana",
            });

            (await session).commitTransaction();
          } catch (error) {
            (await session).abortTransaction();
          } finally {
            (await session).endSession();
          }

          return "Tambah data weapon berhasil";
        } catch (error) {
          console.error(error);
          return "Terjadi kesalahan";
        }
      },
      delete: async (id: string) => {
        const session = mongoose.startSession();
        try {
          (await session).startTransaction();

          try {
            await Weapon.findByIdAndDelete(id);
            await Post.findOneAndDelete({ content: new ObjectId(id as string) });

            (await session).commitTransaction();
            return "Weapon berhasil dihapus";
          } catch (error) {
            (await session).abortTransaction();
            throw error;
          } finally {
            (await session).endSession();
          }
        } catch (error) {
          console.error("Terjadi kesalahan", error);
          return "Terjadi kesalahan";
        }
      },
    },
  },
};

// DOCUMENT TOOLS API START

// EVERTALE SECTION

// DOCUMENT TOOLS API END

// File API
export const file = {
  /**
   * Upload File Gambar ke Cloudinary
   *
   * @param files Array File yang ingin diupload
   * @param game Game apa? Digunakan untuk main folder
   * @param category Category apa? Digunakan untuk sub folder
   * @returns {Promise<CloudinaryAPI.Image[]>} Kumpulan informasi tentang data yang diupload
   */
  // SOLVED CODE
  uploadImage: async (files: File[], game: string, category: string): Promise<UploadApiResponse[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        try {
          const fileBuffer = await file.arrayBuffer();
          const format = file.name.split(".");
          const mime = file.type;
          const encoding = "base64";
          const base64Data = Buffer.from(fileBuffer).toString("base64");
          const fileUri = `data:${mime};${encoding},${base64Data}`;

          const result = await cloudinary.uploader.upload(fileUri, {
            invalidate: true,
            folder: `${game}/${category}/${format[1]}`,
            public_id: format[0],
            discard_original_filename: true,
          });

          return result;
        } catch (error) {
          console.error(error);
          throw error;
        }
      });

      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /**
   * Validasi file gambar
   *
   * @param files Kumpulan file yang akan divalidasi
   * @returns Hasil validasi
   */
  validationImage: (files: File[]) => {
    const allowedExtension = ["webp", "png"];
    const maxSizeInBytes = 1 * 1024 * 1024;

    for (const file of files) {
      const extension = file.type.split("/")[1];

      if (!allowedExtension.includes(extension)) {
        return {
          status: false,
          msg: "Gambar harus format webp atau png",
        };
      }
      if (file.size > maxSizeInBytes) {
        return {
          status: false,
          msg: "Maksimal ukuran gambar 1MB",
        };
      }
    }

    return { status: true, files };
  },
};

//Validator Api
export const validator = {
  character: {
    /**
     * Validasi Character Status
     * @param status Data Character Status yang akan divalidasi
     * @returns Hasil validasi
     */
    status: (status: Evertale.Character.Status) => {
      const charStatus = status;
      const validRank = ["SSR", "SR", "R", "N"];
      const validElement = ["Dark", "Light", "Earth", "Fire", "Storm", "Water"];
      const validWeapons = ["Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

      if (!charStatus.charName) {
        return {
          msg: `Karakter belum diberi nama`,
          ref: "charName",
          success: false,
        };
      }
      if (charStatus.isConjured === "Non-Conjured" || !charStatus.isConjured) {
        charStatus.isConjured = false;
      } else {
        charStatus.isConjured = true;
      }
      if (!charStatus.charRank) {
        return {
          msg: `Rank Character belum diisi`,
          ref: "charRank",
          success: false,
        };
      }
      if (!validRank.includes(charStatus.charRank)) {
        return {
          msg: `Rank Character tidak tersedia`,
          ref: "charRank",
          success: false,
        };
      }
      if (!charStatus.charElement) {
        return {
          msg: `Element belum diisi`,
          ref: "charElement",
          success: false,
        };
      }
      if (!validElement.includes(charStatus.charElement)) {
        return {
          msg: `Element tidak tersedia`,
          ref: "charElement",
          success: false,
        };
      }
      if (charStatus.charTeam.length === 0) {
        return {
          msg: `Team Character belum dipilih`,
          ref: "charTeam",
          success: false,
        };
      }
      if (!charStatus.charWeapon1) {
        return {
          msg: `Weapon 1 belum diisi`,
          ref: "charWeapon1",
          success: false,
        };
      }
      if (!validWeapons.includes(charStatus.charWeapon1)) {
        return {
          msg: `Weapon tidak tersedia`,
          ref: "charWeapon1",
          success: false,
        };
      }
      if (charStatus.charWeapon1 === charStatus.charWeapon2) {
        return {
          msg: `Weapon 1 dan 2 tidak boleh sama`,
          ref: "charWeapon2",
          success: false,
        };
      }
      if (!charStatus.charWeapon2) {
        charStatus.charWeapon2 = undefined;
      }
      if (!charStatus.charLeaderSkill) {
        charStatus.charLeaderSkill = undefined;
      }
      if (!charStatus.charConjure || charStatus.charConjure === "Select Conjure") {
        charStatus.charConjure = undefined;
      }

      return { charStatus, success: true };
    },
    /**
     * Validasi Character Image
     * @param image Data Character Image yang akan divalidasi
     * @returns Hasil validasi
     */
    images: (image: Evertale.Character.Image) => {
      const charImage = image;

      if (!charImage.f1Img) {
        return { msg: "Char Image Pertama belum diisi", ref: "f1Img", success: false };
      }
      if (!charImage.f2Img) {
        charImage.f2Img = undefined;
      }
      if (!charImage.f3Img) {
        charImage.f3Img = undefined;
      }

      return {
        success: true,
        charImage,
      };
    },
    /**
     * Validasi Character Intro
     * @param intro Dara Character Intro yang akan divalidasi
     * @returns Hasil validasi
     */
    intro: (intro: Evertale.Character.Intro) => {
      const charIntro = intro;

      if (charIntro.gachaIntroEn && !charIntro.gachaIntroId) {
        return { msg: "Gacha Intro belum diterjemahkan", ref: "gacha-intro-id", success: false };
      }

      if (!charIntro.gachaIntroEn) {
        charIntro.gachaIntroEn = undefined;
        charIntro.gachaIntroId = undefined;
      }
      if (charIntro.gachaTextEn && !charIntro.gachaTextId) {
        return { msg: "Gacha Text belum diterjemahkan", ref: "gacha-text-id", success: false };
      }
      if (!charIntro.gachaTextEn) {
        charIntro.gachaTextEn = undefined;
        charIntro.gachaTextId = undefined;
      }
      if (charIntro.loginTextEn && !charIntro.loginTextId) {
        return { msg: "Login Text belum diterjemahkan", ref: "login-text-id", success: false };
      }
      if (!charIntro.loginTextEn) {
        charIntro.loginTextEn = undefined;
        charIntro.loginTextId = undefined;
      }
      if (charIntro.text1En && !charIntro.text1Id) {
        return { msg: "Text 1 belum diterjemahkan", ref: "text-1-id", success: false };
      }
      if (!charIntro.text1En) {
        charIntro.text1En = undefined;
        charIntro.text1Id = undefined;
      }
      if (charIntro.text2En && !charIntro.text2Id) {
        return { msg: "Text 2 belum diterjemahkan", ref: "text-2-id", success: false };
      }
      if (!charIntro.text2En) {
        charIntro.text2En = undefined;
        charIntro.text2Id = undefined;
      }
      if (charIntro.text3En && !charIntro.text3Id) {
        return { msg: "Text 3 belum diterjemahkan", ref: "text-3-id", success: false };
      }
      if (!charIntro.text3En) {
        charIntro.text3En = undefined;
        charIntro.text3Id = undefined;
      }
      if (charIntro.text4En && !charIntro.text4Id) {
        return { msg: "Text 4 belum diterjemahkan", ref: "text-4-id", success: false };
      }
      if (!charIntro.text4En) {
        charIntro.text4En = undefined;
        charIntro.text4Id = undefined;
      }

      return { charIntro, success: true };
    },
    /**
     * Validasi Character Profile
     * @param profile Data Character Profile yang akan divalidasi
     * @returns Hasil validasi
     */
    profile: (profile: Evertale.Character.Profile) => {
      const charProfile = profile;

      if (!charProfile.part1En) {
        return { msg: "Char Profile 1 wajib diisi", ref: "part-1-en", success: false };
      }
      if (charProfile.part1En && !charProfile.part1Id) {
        return { msg: "Char Profile 1 belum diterjemahkan", ref: "part-1-id", success: false };
      }
      if (!charProfile.part2En) {
        charProfile.part2En = undefined;
        charProfile.part2Id = undefined;
      }
      if (charProfile.part2En && !charProfile.part2Id) {
        return { msg: "Char Profile 2 belum diterjemahkan", ref: "part-2-id", success: false };
      }
      if (!charProfile.part3En) {
        charProfile.part3En = undefined;
        charProfile.part3Id = undefined;
      }
      if (charProfile.part3En && !charProfile.part3Id) {
        return { msg: "Char Profile 3 belum diterjemahkan", ref: "part-3-id", success: false };
      }
      return { charProfile, success: true };
    },
    /**
     * Validasi Character Active Skill
     * @param activeSkill Data Character Active Skill yang akan divalidasi
     * @returns Hasil validasi
     */
    activeSkill: (activeSkill: Evertale.Character.ActiveSkill[]) => {
      const charActiveSkill = activeSkill;

      for (const activeSkill of charActiveSkill) {
        if (!activeSkill.skillName) {
          return { msg: "Skill Name ada yang belum diisi", ref: "active-skill-section", success: false };
        }
        if (activeSkill.typeSkill.length === 0) {
          return { msg: "Tipe skill masih belum diisi", ref: "active-skill-section", success: false };
        }
      }

      if (charActiveSkill.length === 0) {
        return { msg: "Character Active Skill belum diisi", ref: "active-skill-section", success: false };
      }
      return { charActiveSkill, success: true };
    },
    /**
     * Validasi Character Passive Skill
     * @param passiveSkill Data Character Passive Skill yang akan divalidasi
     * @returns Hasil Validasi
     */
    passiveSkill: (passiveSkill: Evertale.Character.PassiveSkill[]) => {
      const charPassiveSkill = passiveSkill;

      for (const passiveSkill of charPassiveSkill) {
        if (!passiveSkill.skillName) {
          return { msg: "Skill Name ada yang belum diisi", ref: "passive-skill-section", success: false };
        }
        if (passiveSkill.typeSkill.length === 0) {
          return { msg: "Tipe skill masih belum diisi", ref: "passive-skill-section", success: false };
        }
      }

      if (charPassiveSkill.length === 0) {
        return { msg: "Character Passive Skill belum diisi", ref: "active-skill-section", success: false };
      }
      return { charPassiveSkill, success: true };
    },
  },
  weapon: {
    identity: (data: Evertale.Weapon.State): Utils.Validator.ResultValidator => {
      const allowedRank = ["SSR", "SR", "R", "N"];
      const allowedType = ["Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];
      if (!data.weapName) {
        const result: Utils.Validator.ResultValidator = {
          msg: `Nama senjata tidak boleh kosong`,
          ref: "weapon-name",
          status: false,
        };

        return result;
      }
      if (!allowedRank.includes(data.weapRank)) {
        const result: Utils.Validator.ResultValidator = {
          msg: "Hanya SSR, SR, R, N saja yang diizinkan",
          ref: "weapRank",
          status: false,
        };
        return result;
      }
      if (!allowedType.includes(data.weapType)) {
        const result: Utils.Validator.ResultValidator = {
          msg: `Hanya ${allowedType.join(", ")} saja yang diizinkan`,
          ref: "weapType",
          status: false,
        };
        return result;
      }
      if (!data.weapLore?.loreEn) {
        const result: Utils.Validator.ResultValidator = {
          msg: `Lore tidak boleh kosong`,
          ref: "weapLoreEn",
          status: false,
        };
        return result;
      }
      if (!data.weapLore.loreId) {
        const result: Utils.Validator.ResultValidator = {
          msg: `Lore tidak boleh kosong`,
          ref: "weapLoreId",
          status: false,
        };
        return result;
      }

      const result: Utils.Validator.ResultValidator = {
        msg: "sukses",
        status: true,
      };

      return result;
    },
    image: (data: Evertale.Weapon.State): Utils.Validator.ResultValidator => {
      const png: string = data.weapImage.png;
      const webp: string = data.weapImage.webp;
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
    },
    ascend: (data: Evertale.Weapon.State): Utils.Validator.ResultValidator => {
      const weaponAscend = data.weapAscend as Evertale.Weapon.Ascend;
      const noAscend = weaponAscend.noAscend;

      if (!noAscend?.weapSkill?.skillEn) return resultValidator("Weapon Skill wajib diisi", false, "nAWeapSkillEn");
      if (!noAscend?.weapSkill?.skillId) return resultValidator("Weapon Skill wajib diisi", false, "nAWeapSkillId");

      if (!noAscend.status?.atk) return resultValidator("Atk belum diisi", false, "naATK");
      if (!noAscend.status?.boost && noAscend.status?.boost !== 0) return resultValidator("Boost belum diisi", false, "naBoost");
      if (!noAscend.status?.cost) return resultValidator("Cost belum diisi", false, "naCost");
      if (!noAscend.status?.potential && noAscend.status?.potential !== 0) return resultValidator("Potential belum diisi", false, "naPotential");
      if (!noAscend.status?.level) return resultValidator("Level belum diisi", false, "naLvl");
      if (!noAscend.status?.hp) return resultValidator("HP belum diisi", false, "naHP");
      if (!noAscend.status?.power) return resultValidator("Power belum diisi", false, "naPower");

      return resultValidator("sukses", true, undefined, data);
    },
    adjust: (data: Evertale.Weapon.State): Evertale.Weapon.State => {
      const weaponAscend = data.weapAscend as Evertale.Weapon.Ascend;

      if (weaponAscend!.noAscend!.status) weaponMapping("noAscend", data);
      if (!weaponAscend.ascend1!.weapSkill!.skillEn) data!.weapAscend!.ascend1 = undefined;
      else if (weaponAscend.ascend1!.weapSkill!.skillEn) weaponMapping("ascend1", data);
      if (!weaponAscend.fullAscend!.weapSkill!.skillEn) data!.weapAscend!.fullAscend = undefined;
      else if (weaponAscend.fullAscend!.weapSkill!.skillEn) weaponMapping("fullAscend", data);

      return data;
    },
  },
};

function resultValidator(msg: string, status: boolean, ref?: string, data?: any): Utils.Validator.ResultValidator {
  return {
    msg,
    status,
    ref,
    data,
  };
}

// Weapon API TOOLS START

function weaponMapping(field: keyof Evertale.Weapon.Ascend, data: Evertale.Weapon.State) {
  data!.weapAscend![field]!.status!.atk = Number(data!.weapAscend![field]!.status!.atk);
  data!.weapAscend![field]!.status!.boost = Number(data!.weapAscend![field]!.status!.boost);
  data!.weapAscend![field]!.status!.cost = Number(data!.weapAscend![field]!.status!.cost);
  data!.weapAscend![field]!.status!.hp = Number(data!.weapAscend![field]!.status!.hp);
  data!.weapAscend![field]!.status!.level = Number(data!.weapAscend![field]!.status!.level);
  data!.weapAscend![field]!.status!.potential = Number(data!.weapAscend![field]!.status!.potential);
  data!.weapAscend![field]!.status!.power = Number(data!.weapAscend![field]!.status!.power);
  return data;
}

// Weapon API TOOLS END
