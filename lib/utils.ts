import { Weapon } from "@/models/Evertale/Weapons";
import connectMongoDB from "./mongoose";
import Post from "@/models/General/Post";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

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
      create: async (data: any) => {
        await connectMongoDB();
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
              author: "Admin GameLingo",
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
        await connectMongoDB();
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

// File API
export const file = {
  uploadImage: async (files: any, game: string, category: string) => {
    const result: any = [];

    for (const file of files) {
      const bytes = await (file as File).arrayBuffer();
      const format = (file as File).name.split(".");
      const buffer = new Uint8Array(bytes);
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `${game}/${category}/${format[1]}`,
              public_id: `${format[0]}`,
              discard_original_filename: true,
            },
            (error, result) => {
              if (error) {
                reject(error);
                return { msg: "Error", error };
              }

              return resolve(result);
            }
          )
          .end(buffer);
      });

      result.push(uploadResult);
    }

    return result;
  },
};

//Validator Api
export const validator = {
  character: {
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
      if (charStatus.charConjure === "Select Conjure") {
        charStatus.charConjure = undefined;
      }

      return { charStatus, success: true };
    },
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
    passiveSkill: (passiveSkill: Evertale.Character.PassiveSkill[]) => {
      const charPassive = passiveSkill;

      for (const passiveSkill of charPassive) {
        if (!passiveSkill.skillName) {
          return { msg: "Skill Name ada yang belum diisi", ref: "passive-skill-section", success: false };
        }
        if (passiveSkill.typeSkill.length === 0) {
          return { msg: "Tipe skill masih belum diisi", ref: "passive-skill-section", success: false };
        }
      }

      if (charPassive.length === 0) {
        return { msg: "Character Passive Skill belum diisi", ref: "active-skill-section", success: false };
      }
      return { charPassive, success: true };
    },
  },
};
