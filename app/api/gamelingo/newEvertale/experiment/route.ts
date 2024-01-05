import connectMongoDB from "@/lib/mongoose";
import Character from "@/models/Character";
import { Person, Post, Story } from "@/models/Post";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const request = req.headers;
  return NextResponse.json({ request }, { status: 200 });
}

export async function OPTIONS(req: NextRequest) {
  const request = req.headers;
  return NextResponse.json({ request }, { status: 200 });
}

//   const data = await Post.findById("65962446c4453886d1598f97").populate("charId");
//   const char = await Character.findById("6586b2757b1c059dd9db2712");

//   // MIGRATION FUNCTION
//   const characters = await Character.find();
//   const charId = characters.map((char: any) => ({
//     charId: char._id,
//   }));

//   for (const id of charId) {
//     await Post.create({
//       charId: id.charId,
//     });
//   }
//   return NextResponse.json({ msg: "Sukses" }, { status: 200 });
