"use client";

import { Body, Head, Heading, Row, Table } from "@/components/General/Table";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const BORDER = "border-solid hover:bg-emerald-500 border-2 border-white";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const URL = "/api/gamelingo/newEvertale/chars";

export default function Data() {
  const { data, isLoading, error } = useSWR(URL, fetcher);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const router = useRouter();

  if (!data || isLoading) return <p>Loading....</p>;
  if (error) {
    console.log(error);
    return <p>Gagal mengambil data</p>;
  }
  const char = data.chars;
  const deleteHandler = async (e: any) => {
    const id = e.target.getAttribute("data-id");
    const deleteChar = char.find((char: any) => char.id === id).charName;
    const allow = confirm(`Yakin ingin menghapus Karakter dengan nama ${deleteChar}?`);
    if (!allow) {
      return;
    }

    const res = await axios.delete(`/api/gamelingo/newEvertale/chars?id=${id}`);

    if (res.status !== 200) {
      alert("Terjadi kesalahan");
      return;
    }

    alert(res.data.msg);
    router.refresh();
  };

  return (
    <>
      <div>
        <Link href="/admin/gamelingo/evertale/characters/add" className="mx-2 px-2 py-1 rounded-lg font-roboto font-bold bg-amber-500 hover:bg-amber-200 hover:text-amber-950 ">
          Tambah
        </Link>
        <button className=" px-2 py-1 rounded-lg mx-2 font-roboto font-bold bg-amber-500 hover:bg-amber-200 hover:text-amber-950" onClick={() => setIsDeleteMode(!isDeleteMode)}>
          {isDeleteMode ? "Batal" : "Hapus"}
        </button>
      </div>

      <Table>
        <Heading>
          <Row>
            <Head>#</Head>
            <Head>Character&apos;s Name</Head>
            <Head>Action</Head>
          </Row>
        </Heading>
        <Body>
          {data.chars.map((char: React.ComponentState, i: number) => (
            <tr key={`char-${i++}`} id={`char-${i++}`}>
              <td className={"text-center " + BORDER}>{i++}</td>
              <td className={`px-2 ${BORDER}`}>{char.charName}</td>
              <td className={"hover:bg-emerald-500 text-center " + BORDER}>
                {isDeleteMode ? (
                  <p className="cursor-pointer" data-id={char.id} onClick={(e) => deleteHandler(e)}>
                    Hapus
                  </p>
                ) : (
                  <Link href={`/admin/gamelingo/evertale/characters/${char.id}`}>Detail</Link>
                )}
              </td>
            </tr>
          ))}
        </Body>
      </Table>

      {/* <table className="w-full">
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
                {isDeleteMode ? (
                  <p className="cursor-pointer" data-id={char.id} onClick={(e) => deleteHandler(e)}>
                    Hapus
                  </p>
                ) : (
                  <Link href={`/admin/gamelingo/evertale/characters/${char.id}`}>Detail</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
}
