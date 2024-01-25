import React from "react";

export function evertaleCharacterHandlers(url: string[], data: Evertale.Character.State, setData: React.Dispatch<React.SetStateAction<Evertale.Character.State>>) {
  const f1Img = url.filter((u) => u.includes("01.webp")).toString();
  const f2Img = url.filter((u) => u.includes("02.webp")).toString();
  const f3Img = url.filter((u) => u.includes("03.webp")).toString();

  setData({ ...data, charImage: { f1Img, f2Img, f3Img } });
}
