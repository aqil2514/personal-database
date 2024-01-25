import React from "react";
import { Button } from "@/components/General/Button";
import { Input } from "@/components/General/Input";
import { SectionWrapper, TitleSection } from "@/components/General/Wrapper";
import GalleryWidget from "@/components/General/Widget";
import { useCharacterData } from "@/components/Evertale/Providers";

export default function CharImages() {
  const { data, setData } = useCharacterData();
  const fileRef = React.useRef<null | HTMLInputElement>(null);
  const [uploadLoading, setUploadLoading] = React.useState(false);

  async function uploadHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (!fileRef.current?.files || fileRef.current?.files.length === 0) {
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
      const f1Img = dataAPI.data.find((d: Record<string, string>) => d.name.includes("01")).url;
      const f2Img = dataAPI.data.find((d: Record<string, string>) => d.name.includes("02")).url;
      const f3Img = dataAPI.data.find((d: Record<string, string>) => d.name.includes("03")).url;

      setData({ ...data, charImage: { f1Img, f2Img, f3Img } });
    } catch (error) {
      console.error(error);
    } finally {
      setUploadLoading(false);
    }
  }

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
        <div className="flex flex-wrap gap-4 my-2">
          <Button variant="upload" type="button" disabled={uploadLoading} onClick={uploadHandler}>
            {uploadLoading ? "Uploading..." : "Upload"}
          </Button>
          <Button variant="default" type="button" disabled={uploadLoading} onClick={clickHandler}>
            Lihat Galeri
          </Button>
        </div>
        <GalleryWidget<Evertale.Character.State> data={data} setData={setData} game="Evertale" category="characters" />
      </div>
      <Input forId="f1Img" variant="default" label="Form 1 Image" value={data?.charImage?.f1Img} disabled required />
      <Input forId="f2Img" variant="default" label="Form 2 Image" value={data?.charImage?.f2Img} disabled />
      <Input forId="f3Img" variant="default" label="Form 3 Image" value={data?.charImage?.f3Img} disabled />
    </SectionWrapper>
  );
}
