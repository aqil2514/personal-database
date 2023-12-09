"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const BORDER = "border-solid hover:bg-emerald-500 border-2 border-white";

export default function Data() {
  const [loading, setLoading] = useState<true | false>(false);
  const [dataInit, setDataInit] = useState<React.ComponentState>();
  const [dataBlog, setDataBlog] = useState<React.ComponentState>();
  const [blogInit, setBlogInit] = useState<React.ComponentState>();
  const [isDataBlog, setIsDataBlog] = useState<true | false>(false);
  const [characters, setCharacters] = useState<any>();
  async function getData() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/gamelingo/evertale");

      const dataChar = data.chars.chars.map((char: any) => ({ charName: char.charStatus.charName, charId: char._id }));

      setCharacters(dataChar);
      setDataInit(dataChar);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function bloggerApi() {
    try {
      setLoading(true);
      const { data } = await axios.get("https://www.googleapis.com/blogger/v3/blogs/1645572543431077439/posts?key=AIzaSyB7KoRVBAojtfvAuRkG95N6KhnRGzvFTg4&maxResults=100&labels=Evertale Char&fetchImages=true");

      const characters = data.items.map((char: any) => ({ charName: char.title, charLink: char.url }));

      setDataBlog(characters);
      setBlogInit(characters);
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
    bloggerApi();
  }, [isDataBlog]);

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const keyword = e.target.value.toLowerCase();

    if (!isDataBlog) {
      if (keyword === "") {
        setCharacters(dataInit);
        return;
      }

      const charName = characters.filter((char: any) => char?.charName?.toLowerCase().includes(keyword));

      setCharacters(charName);
      return;
    } else if (isDataBlog) {
      if (keyword === "") {
        setDataBlog(blogInit);
        return;
      }

      const charName = dataBlog.filter((char: any) => char?.charName?.toLowerCase().includes(keyword));

      setDataBlog(charName);
    }
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div>
        <input
          type="text"
          name="search"
          className="block border-slate-200 focus-visible:border-green-200 w-full px-2 border-solid border-2 my-4"
          id="search-charName"
          placeholder={loading ? "Memuat data..." : "Cari berdasarkan nama karakter..."}
          onChange={(e) => searchHandler(e)}
          disabled={loading}
        />
        <button type="button" onClick={() => setIsDataBlog(!isDataBlog)}>
          {isDataBlog ? "Lihat Database" : "Lihat Data Blog"}
        </button>
      </div>
      {isDataBlog ? <DataBlog dataBlog={dataBlog} /> : <Database characters={characters} />}
    </>
  );
}

function DataBlog({ dataBlog }: { dataBlog: React.ComponentState }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-emerald-950 text-white font-roboto font-bold py-1 border-solid border-2 border-white">
          <th className={`${BORDER}`}>#</th>
          <th className={`${BORDER}`}>Characters Name</th>
          <th className={`${BORDER}`}>Action</th>
        </tr>
      </thead>
      <tbody className="bg-emerald-800 font-poppins text-white">
        {dataBlog?.map((char: React.ComponentState, i: number) => (
          <tr key={`char-${i++}`} id={`char-${i++}`}>
            <td className={"text-center " + BORDER}>{i++}</td>
            <td className={`px-2 ${BORDER}`}>{char?.charName}</td>
            <td className={"hover:bg-emerald-500 text-center " + BORDER}>
              <a href={char?.charLink} target="_blank">
                Detail
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Database({ characters }: { characters: React.ComponentState }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-emerald-950 text-white font-roboto font-bold py-1 border-solid border-2 border-white">
          <th className={`${BORDER}`}>#</th>
          <th className={`${BORDER}`}>Characters Name</th>
          <th className={`${BORDER}`}>Action</th>
        </tr>
      </thead>
      <tbody className="bg-emerald-800 font-poppins text-white">
        {characters?.map((char: React.ComponentState, i: number) => (
          <tr key={`char-${i++}`} id={`char-${i++}`}>
            <td className={"text-center " + BORDER}>{i++}</td>
            <td className={`px-2 ${BORDER}`}>{char?.charName}</td>
            <td className={"hover:bg-emerald-500 text-center " + BORDER}>
              <Link href={`/admin/gamelingo/evertale/characters/${char?.charId}`}>Detail</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
