import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE } from "@/app/components/Styles";
import { useData } from "../formbody";
import React from "react";
export default function CharImages() {
  const { data, setData } = useData();
  const fileRef = React.useRef<any>(null);
  const [loading, setLoading] = React.useState(false);

  async function uploadHandler() {
    if (!fileRef.current.files || fileRef.current.files.length === 0) {
      return;
    }

    const files = fileRef.current.files;
    const formData = new FormData();

    for (const file of Array.from(files)) {
      formData.append("files", file as File);
    }

    // console.log(files);

    try {
      setLoading(true);
      const res = await fetch("/api/file?game=evertale&category=characters", {
        method: "POST",
        body: formData,
      });
      const dataAPI = await res.json();
      const f1Img = dataAPI.result.find((d: Record<string, string>) => d.public_id.includes("01")).url;
      const f2Img = dataAPI.result.find((d: Record<string, string>) => d.public_id.includes("02")).url;
      const f3Img = dataAPI.result.find((d: Record<string, string>) => d.public_id.includes("03")).url;

      setData({ ...data, charImage: { f1Img, f2Img, f3Img } });
      console.log(dataAPI);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div id="character-images" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Images</h3>
      <div>
        <label htmlFor="files" className="block">
          Upload File :{" "}
        </label>
        <input type="file" ref={fileRef} name="files" id="files" multiple />
        <button type="button" disabled={loading} className="bg-green-700 disabled:bg-green-200 font-bold rounded-lg px-4 py-2 text-white" onClick={uploadHandler}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <label htmlFor="f1Img">
        Form 1 Image : <input className={INPUT_STYLE} value={data?.charImage?.f1Img} disabled type="text" name="f1Img" id="f1Img" required />
      </label>
      <label htmlFor="f2Img">
        Form 2 Image : <input className={INPUT_STYLE} value={data?.charImage?.f2Img} disabled type="text" name="f2Img" id="f2Img" />
      </label>
      <label htmlFor="f3Img">
        Form 3 Image : <input className={INPUT_STYLE} value={data?.charImage?.f3Img} disabled type="text" name="f3Img" id="f3Img" />
      </label>
    </div>
  );
}
