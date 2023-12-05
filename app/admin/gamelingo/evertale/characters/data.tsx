"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const BORDER = "border-solid hover:bg-emerald-500 border-2 border-white";

export default function Data() {
  const [loading, setLoading] = useState<true | false>(false);
  const [characters, setCharacters] = useState<any>();
  async function getData() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/gamelingo/evertale");

      setCharacters(data.chars);
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

  return loading ? (
    <p>Loading...</p>
  ) : (
    <table className="w-full">
      <thead>
        <tr className="bg-emerald-950 text-white font-roboto font-bold py-1 border-solid border-2 border-white">
          <th className={`${BORDER}`}>#</th>
          <th className={`${BORDER}`}>Characters Name</th>
          <th className={`${BORDER}`}>Action</th>
        </tr>
      </thead>
      <tbody className="bg-emerald-800 font-poppins text-white">
        {characters?.chars?.map((char: React.ComponentState, i: number) => (
          <tr key={`char-${i++}`} id={`char-${i++}`}>
            <td className={"text-center " + BORDER}>{i++}</td>
            <td className={`px-2 ${BORDER}`}>{char?.charStatus?.charName}</td>
            <td className={"hover:bg-emerald-500 text-center " + BORDER}>
              <Link href={`/admin/gamelingo/evertale/characters/${char?._id}`}>Detail</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
