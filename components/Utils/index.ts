import axios from "axios";

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

export async function translateHandler(e: React.KeyboardEvent<HTMLTextAreaElement>, data: Evertale.Character.State, setData: React.Dispatch<React.SetStateAction<Evertale.Character.State>>) {
  if (e.ctrlKey && e.key === "Enter") {
    const element = e.target as HTMLTextAreaElement;
    const field = element.getAttribute("data-field");
    const target = field?.replace("En", "Id") as string;
    const text = data.charIntro[field];

    try {
      const res = await axios.post("/api/translate", {
        text,
      });

      const translated: string = res.data.translatedText;
      setData({ ...data, charIntro: { ...data.charIntro, [target]: translated } });
    } catch (error) {
      console.error(error);
    }
  }
}
