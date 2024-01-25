import { useWeaponData } from "@/components/Evertale/Providers";
import { Button } from "@/components/General/Button";
import { notif } from "@/components/Utils";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function WeaponButton() {
  const { isLoading, setIsLoading, data } = useWeaponData();
  const [notifState, setNotifState] = React.useState<string>("");
  const notifRef = React.useRef<null | HTMLParagraphElement>(null);
  const router = useRouter();

  async function sendData(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post("/api/gamelingo/newEvertale/weapon", {
        data,
      });
      notif(notifRef, "green", "Data berhasil ditambah", setNotifState);

      setTimeout(() => {
        router.replace("/admin/gamelingo/evertale/weapons/add");
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          if (error.response.data.ref) {
            const id = error.response.data.ref;
            const element = document.getElementById(id) as HTMLElement;
            const p = document.createElement("p");
            p.innerHTML = error.response.data.msg;
            p.setAttribute("class", "font-bold text-red-600");
            element.after(p);

            window.scrollTo({
              top: element.offsetTop,
              behavior: "smooth",
            });

            setTimeout(() => {
              p.remove();
            }, 3000);
            return;
          }
          notif(notifRef, "red", error.response.data.msg, setNotifState, false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <p ref={notifRef} className="font-bold">
        {notifState}
      </p>
      <Button variant="upload" type="button" disabled={isLoading} onClick={sendData}>
        {isLoading ? "Menambah Data..." : "Tambah Data"}
      </Button>
    </>
  );
}
