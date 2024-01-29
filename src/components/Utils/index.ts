import axios from "axios";
import React from "react";

/**
 *
 * @param ref RefObject dengan nilai HTML Paragraph Element <p>
 * @param textColor Css Style Color
 * @param msg Pesan yang ingin ditampilkan
 * @param setState setState yang digunakan untuk menampilkan pesan
 * @param scroll Ingin scroll ke tempat ref berada? Default: true
 * @param time Berapa lama pesan ditampilkan? Default:3 detik
 */

export function notif(ref: React.RefObject<HTMLParagraphElement>, textColor: string, msg: string, setState: React.Dispatch<React.SetStateAction<string>>, scroll: boolean = true, time: number = 3000): void {
  ref.current!.style.color = textColor;
  setState(msg);

  if (textColor === "red" && scroll) {
    window.scrollTo({
      top: ref.current?.offsetTop,
      behavior: "smooth",
    });
  }

  if (time) {
    setTimeout(() => {
      setState("");
    }, time);
  }
}

/**
 *Translate Handler Function
 *
 * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - Elemen HTML TextArea yang menjadi sasaran
 * @param {any} data - UseState
 * @param {any} section - Mengikuti interface Evertale Character State
 * @param {React.Dispatch<React.SetStateAction<any>>} setData - Pasangan useState data
 * @returns {Promise<void>}
 */

export async function translateHandler(e: React.KeyboardEvent<HTMLTextAreaElement>, section: any, data: any, setData: React.Dispatch<React.SetStateAction<any>>): Promise<void> {
  if (e.ctrlKey && e.key === "Enter") {
    const element = e.target as HTMLTextAreaElement;
    const field = element.getAttribute("data-field");
    const target = field?.replace("En", "Id") as string;
    if (!field) {
      throw new Error("data-field tidak ada");
    }
    const text = data[section][field];

    try {
      const res = await axios.post("/api/translate", {
        text,
      });

      const translated: string = res.data.translatedText;
      setData({ ...data, [section]: { ...data[section], [target]: translated } });
    } catch (error) {
      console.error(error);
    }
  }
}
