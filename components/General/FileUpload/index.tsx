import { v2 as cloudinary } from "cloudinary";
import React from "react";

export default function FileUpload() {
  let preview;
  async function server(formData: FormData) {
    "use server";
    const image = formData.get("image") as File;
    const arrayBuffer = await image.arrayBuffer();
    const fileName = image.name;
    const buffer = new Uint8Array(arrayBuffer);
    await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            filename_override: fileName,
            use_filename: true,
            folder: "evertale-characters",
            use_filename_as_display_name: true,
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            preview = result?.secure_url;
            resolve(result);
          }
        )
        .end(buffer);
    });
  }

  return (
    <div>
      <form action={server}>
        <input name="image" type="file" />
        <button>submit</button>
        {preview && <img src={preview} />}
      </form>
    </div>
  );
}
