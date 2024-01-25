import { useWeaponData } from "@/components/Evertale/Providers";
import { Button } from "@/components/General/Button";
import { Input } from "@/components/General/Input";
import GalleryWidget from "@/components/General/Widget";
import { notif } from "@/components/Utils";
import axios, { isAxiosError } from "axios";
import React from "react";

export default function WeaponImage() {
  const [notifP, setNotifP] = React.useState<string>("");
  const notifRef = React.useRef<null | HTMLParagraphElement>(null);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const { data, setData } = useWeaponData();

  async function uploadHandler() {
    const file = document.getElementById("weapon-file-image") as HTMLInputElement;

    if (!file.files) throw new Error("Terjadi kesalahan");
    if (file.files.length === 0) return notif(notifRef, "red", "Gambar masih kosong", setNotifP, false);

    const formData = new FormData();
    for (const f of file.files) {
      formData.append("files", f);
    }

    try {
      setIsUploading(true);
      const res = await axios.postForm("/api/file?game=evertale&category=weapons", formData);
      const apiData = res.data;
      const imgInfo: {
        url: string;
        name: string;
      }[] = apiData.data;

      const imgWebp = imgInfo.find((img) => img.url.endsWith(".webp"))!.url;
      const imgPng = imgInfo.find((img) => img.url.endsWith(".png"))!.url;

      setData({ ...data, weapImage: { png: imgPng, webp: imgWebp } });

      notif(notifRef, "green", apiData.msg, setNotifP, false);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(notifRef, "red", error.response?.data.msg, setNotifP, false);
          console.error(error);
          return;
        } else {
          notif(notifRef, "red", "Terjadi kesalahan", setNotifP, false);
          console.error(error);
        }
      }
    } finally {
      setIsUploading(false);
    }
  }

  function clickHandler() {
    const widget = document.getElementById("container-image") as HTMLDivElement;
    widget.classList.replace("invisible", "visible");
    widget.classList.replace("opacity-0", "opacity-1");
  }

  return (
    <>
      {/* Weapon Image */}
      <Input forId="weapon-file-image" label="File" type="file" multiple disabled={isUploading} />
      <p ref={notifRef} className="font-bold">
        {notifP}
      </p>
      <div className="my-2">
        <Button variant="upload" disabled={isUploading} type="button" onClick={uploadHandler}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
        <Button variant="default" type="button" disabled={isUploading} onClick={clickHandler}>
          Lihat Galeri
        </Button>
      </div>
      <GalleryWidget<Evertale.Weapon.State> data={data} setData={setData} game="Evertale" category="weapons" />

      <Input forId="weapImagePng" value={data.weapImage.png} readOnly label="Weapon Image PNG" disabled={isUploading} />
      <Input forId="weapImageWebp" value={data.weapImage.webp} readOnly label="Weapon Image WEBP" disabled={isUploading} />
    </>
  );
}
