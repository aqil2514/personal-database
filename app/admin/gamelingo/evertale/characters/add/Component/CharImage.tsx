import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE } from "@/app/components/Styles";
import { useData } from "../formbody";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";
import React from "react";
export default function CharImages() {
  const { data, setData } = useData();
  const formRef = React.useRef<any>(null);

  async function uploadHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const files = event.target.files;
    const formData = new FormData();

    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    // console.log(file);
    const res = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Images</h3>
      <label htmlFor="f1Img">
        Form 1 Image : <input type="file" onChange={uploadHandler} name="f1Img" id="f1Img" multiple />
      </label>
      {/* <CldUploadWidget signatureEndpoint="/api/file">
          {({ open }) => {
            return <button onClick={() => open()}>Upload an Image</button>;
          }}
        </CldUploadWidget> */}
      {/* Form 1 Image : <input className={INPUT_STYLE} value={data?.charImage?.f1Img} onChange={(e) => setData({ ...data, charImage: { ...data.charImage, f1Img: e.target.value } })} type="text" name="f1Img" id="f1Img" required /> */}
      <label htmlFor="f2Img">
        Form 2 Image : <input className={INPUT_STYLE} value={data?.charImage?.f2Img} onChange={(e) => setData({ ...data, charImage: { ...data.charImage, f2Img: e.target.value } })} type="text" name="f2Img" id="f2Img" />
      </label>
      <label htmlFor="f3Img">
        Form 3 Image : <input className={INPUT_STYLE} value={data?.charImage?.f3Img} onChange={(e) => setData({ ...data, charImage: { ...data.charImage, f3Img: e.target.value } })} type="text" name="f3Img" id="f3Img" />
      </label>
    </div>
  );
}
