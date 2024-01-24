"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BORDER = "border-solid hover:bg-emerald-500 border-2 border-white";

export default function Characters() {
  const [dataInit, setDataInit] = useState<React.ComponentState>();
  const [characters, setCharacters] = useState<React.ComponentState>();
  const [dataChar, setDataChar] = useState<React.ComponentState>();
  const [loading, setLoading] = useState<false | true>(false);
  const [isTableMode, setIsTableMode] = useState<false | true>(true);

  async function getData() {
    try {
      setLoading(true);
      const { data } = await axios.get("https://www.googleapis.com/blogger/v3/blogs/1645572543431077439/posts?key=AIzaSyB7KoRVBAojtfvAuRkG95N6KhnRGzvFTg4&maxResults=100&labels=Evertale Char&fetchImages=true");
      const charName = data.items
        .filter((char: any) => typeof char === "object" && char.title)
        .map((char: any) => char.title)
        .sort();
      setDataInit(charName);
      setCharacters(charName);
      setDataChar(data.items);
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
  }, [characters]);

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
    const selected = dataChar.find((char: React.ComponentState) => char?.title === charName);
    const link = selected?.url;

    if (link) {
      window.open(link, "_blank");
    }
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="w-full p-10">
      <h1 className="text-center font-playfair text-2xl font-bold mb-5">Characters List</h1>
      <button
        onClick={() =>
          // setIsTableMode(!isTableMode)
          alert("Mode yang lain sedang dalam pengembangan")
        }
        className="bg-green-800 text-white text-lg font-bold mb-5 py-2 px-4 rounded m-1"
      >
        {isTableMode ? "Mode Table" : "Mode Thumbnail"}
      </button>
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
      {isTableMode ? (
        <table className="w-full mt-6">
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
                  <button onClick={(e) => clickHandler(e)} title={`Lihat ${character}`}>
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-row flex-wrap justify-between text-center">
          {dataChar?.map((char: any, i: number) => (
            <Link key={i++} href={char?.url}>
              <Image src={char?.images[0].url} width={240} height={240} alt={char?.title} />
              <figcaption>{char?.title}</figcaption>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
