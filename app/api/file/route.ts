import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const files = formData.getAll("files");

  // TODO : DYNAMIC CATEGORY

  const result: any = [];
  for (const file of files) {
    const bytes = await (file as File).arrayBuffer();
    const fileName = (file as File).name;
    const format = (file as File).name.split(".");
    const buffer = new Uint8Array(bytes);
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `evertale/characters/${format[1]}`,
            public_id: `${fileName}`,
            discard_original_filename: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return NextResponse.json({ msg: "Error", error });
            }

            return resolve(result);
          }
        )
        .end(buffer);
    });

    result.push(uploadResult);
  }
  return NextResponse.json({ msg: "Sukses", result }, { status: 200 });
}
