export function notif(ref: React.RefObject<HTMLParagraphElement>, textColor: string, msg: string, setState: React.Dispatch<React.SetStateAction<string>>, time: number = 3000): void {
  ref.current!.style.color = textColor;
  setState(msg);

  if (textColor === "red") {
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
