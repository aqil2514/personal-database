"use client";

import Link from "next/link";
import useSWR from "swr";

const BORDER = "border-solid hover:bg-emerald-500 border-2 border-white";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const URL = "/api/gamelingo/newEvertale/chars";

export default function Data() {
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) return <p>Loading....</p>;
  if (error) {
    console.log(error);
    return <p>Gagal mengambil data</p>;
  }
  console.log(data);

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
        {data.chars.map((char: React.ComponentState, i: number) => (
          <tr key={`char-${i++}`} id={`char-${i++}`}>
            <td className={"text-center " + BORDER}>{i++}</td>
            <td className={`px-2 ${BORDER}`}>{char.charName}</td>
            <td className={"hover:bg-emerald-500 text-center " + BORDER}>
              <Link href={`/admin/gamelingo/evertale/characters/${char.id}`}>Detail</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
