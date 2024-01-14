import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE } from "@/app/components/Styles";
import { useData } from "../formbody";
import React from "react";
import { Button } from "@/components/General/Button";
import { Input } from "@/components/General/Input";
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
        <Button variant="upload" type="button" disabled={loading} onClick={uploadHandler}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
      <Input forId="f1Img" variant="default" label="Form 1 Image" value={data?.charImage?.f1Img} disabled required />
      <Input forId="f2Img" variant="default" label="Form 2 Image" value={data?.charImage?.f2Img} disabled />
      <Input forId="f3Img" variant="default" label="Form 3 Image" value={data?.charImage?.f3Img} disabled />
    </div>
  );
}
