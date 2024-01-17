import { useData } from "@/components/Evertale/Form";
import React from "react";
import { Button } from "@/components/General/Button";
import { Input } from "@/components/General/Input";
import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import axios from "axios";
import GalleryWidget from "./Widget";

export default function CharImages() {
  const { data, setData } = useData();
  const fileRef = React.useRef<any>(null);
  const widgetRef = React.useRef<null | HTMLDivElement>(null);
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [fetchLoading, setFetchLoading] = React.useState<boolean>(false);

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
      setUploadLoading(true);
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
      setUploadLoading(false);
    }
  }

  // async function getHandler() {
  //   try {
  //     setFetchLoading(true);
  //     const res = await axios.get("/api/file?game=evertale&category=characters");

  //     console.log(res);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setFetchLoading(false);
  //   }
  // }

  function clickHandler() {
    const widget = document.getElementById("container-image") as HTMLDivElement;
    widget.classList.replace("invisible", "visible");
    widget.classList.replace("opacity-0", "opacity-1");
  }

  return (
    <SectionWrapper>
      <TitleSection>Character Images</TitleSection>

      <div>
        <label htmlFor="files" className="block">
          Upload File :{" "}
        </label>
        <input type="file" ref={fileRef} name="files" id="files" multiple />
        <Button variant="upload" type="button" disabled={uploadLoading || fetchLoading} onClick={uploadHandler}>
          {uploadLoading ? "Uploading..." : "Upload"}
        </Button>
        <Button variant="default" type="button" disabled={uploadLoading || fetchLoading} onClick={clickHandler}>
          {fetchLoading ? "Mengambil Data..." : "Lihat Data"}
        </Button>
        <GalleryWidget ref={widgetRef} />
      </div>
      <Input forId="f1Img" variant="default" label="Form 1 Image" value={data?.charImage?.f1Img} disabled required />
      <Input forId="f2Img" variant="default" label="Form 2 Image" value={data?.charImage?.f2Img} disabled />
      <Input forId="f3Img" variant="default" label="Form 3 Image" value={data?.charImage?.f3Img} disabled />
    </SectionWrapper>
  );
}
