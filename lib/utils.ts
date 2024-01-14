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
