"use client";

import { useEffect, useState } from "react";

const BORDER = "border-solid hover:bg-emerald-500 border-2 border-white";

export default function Characters() {
  const [dataInit, setdataInit] = useState<any>();
  const [characters, setCharacters] = useState<any>();
  const [dataChar, setDataChar] = useState<React.ComponentState>();
  const [loading, setLoading] = useState<any>(false);

  async function getData() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/gamelingo/evertale", { cache: "no-store" });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      const charName = [];
      for (const char of data.chars.chars) {
        const name = char.charStatus.charName;

        charName.push(name);
      }

      setDataChar(data.chars.chars);

      setdataInit(charName.sort());
      setCharacters(charName.sort());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!characters) {
      getData();
    }
  }, []);

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const keyword = e.target.value.toLowerCase();

    if (keyword === "") {
      setCharacters(dataInit);
      return;
    }

    const charName = characters.filter((char: string | undefined) => char?.toLowerCase().includes(keyword));

    setCharacters(charName);
  }

  function clickHandler(e: any) {
    const charName = e.target.parentElement.previousSibling.innerText;
    const selected = dataChar.find((char: React.ComponentState) => char?.charStatus?.charName === charName);
    const link = selected?.charStatus?.charLink;

    if (link) {
      window.open(link, "_blank");
    }
  }

  return (
    <div className="w-full p-10">
      <h1 className="text-center font-playfair font-bold mb-5">Characters List</h1>
      <div>
        <input
          type="text"
          name="search"
          className="block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2"
          id="search-charName"
          placeholder={loading ? "Memuat data..." : "Cari berdasarkan nama karakter..."}
          onChange={(e) => searchHandler(e)}
          disabled={loading}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-emerald-950 text-white font-roboto font-bold py-1 border-solid border-2 border-white">
            <th className={`${BORDER}`}>#</th>
            <th className={`${BORDER}`}>Character Name</th>
            <th className={`${BORDER}`}>Visit Page</th>
          </tr>
        </thead>
        <tbody className="bg-emerald-800 font-poppins text-white">
          {characters?.map((character: any, i: number) => (
            <tr key={i + 1}>
              <td className={"text-center " + BORDER}>{i + 1}</td>
              <td className={`px-2 ${BORDER}`}>{character}</td>
              <td className={"hover:bg-emerald-500 text-center " + BORDER}>
                <button onClick={(e) => clickHandler(e)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
}
