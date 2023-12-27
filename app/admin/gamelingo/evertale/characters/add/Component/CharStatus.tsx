// import { useState } from "react";
import React from "react";
import { charElement, charRank, charWeapon } from "../../../component/data";
import { useData } from "../formbody";
import { SECTION_STYLE, INPUT_STYLE, SELECT_STYLE, ADD_BUTTON_STYLE } from "@/app/components/Styles";
import useSWR from "swr";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const Data = ({ info }: { info: any }) => {
  const { data, setData } = useData();
  const [isAddMode, setIsAddMode] = React.useState(false);
  const router = useRouter();
  return (
    <div id="character-status" className={SECTION_STYLE}>
      <label htmlFor="unit-name">
        {" "}
        Unit Name : <input value={data?.charStatus?.charName} onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charName: e.target.value } })} className={INPUT_STYLE} type="text" name="charName" id="unit-name" />
      </label>
      <label htmlFor="charRank">
        Unit Rank :
        <select className={SELECT_STYLE} value={data?.charStatus?.charRank} onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charRank: e.target.value } })} name="charRank" id="charRank" defaultValue={undefined}>
          <option value={undefined}>Rank Character</option>
          {charRank?.map((r: any, i: number) => (
            <option value={r.rank} key={`rank-${i++}`}>
              {r.rank}
            </option>
          ))}
        </select>
      </label>
      <div id="isConjured">
        Conjure / Non-Conjure :
        <label htmlFor="conjure" className="mx-8">
          <input type="radio" name="isConjured" id="conjure" value="Conjure" onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, isConjured: e.target.value } })} /> Conjure
        </label>
        <label htmlFor="non-conjure" className="mx-8">
          <input type="radio" name="isConjured" id="non-conjure" value="Non-Conjured" onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, isConjured: e.target.value } })} /> Non-Conjure
        </label>
      </div>
      <div id="charTeam">
        CharTeam:
        <div className="flex flex-wrap flex-row border-2 border-black border-solid justify-start w-full rounded-xl h-1/6 overflow-y-scroll">
          {info?.rss?.typeCharTeam?.map((type: string, i: number) => (
            <label htmlFor={type} key={i++}>
              <input className="ml-4 mr-2" type="checkbox" name={`char-team-${i++}`} value={type} id={type} />
              {type}
            </label>
          ))}
        </div>
        <div className="cursor-pointer" onClick={() => setIsAddMode(!isAddMode)}>
          {isAddMode ? <XCircleFill className="inline-block" /> : <PlusCircleFill className="inline-block" />}
          <p className="inline-block my-auto mx-2">{isAddMode ? "Batal (Tekan CTRL + Enter untuk menambah data)" : "Tambah Skill Type"}</p>
        </div>
        {isAddMode && (
          <input
            type="text"
            name="input-new-skill-type"
            placeholder="Nama skill type..."
            className="mx-2 w-1/6"
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                const isDuplicate = data?.rss?.typeCharTeam?.find((keyword: string) => keyword.toLowerCase() === e.currentTarget.value.toLocaleLowerCase());
                if (isDuplicate) {
                  alert("Char Team telah tersedia");
                  return;
                }
                const sure = confirm(`Yakin ingin tambahkan Char Type baru dengan nama "${e.currentTarget.value}" ?`);
                if (!sure) {
                  return;
                }
                axios
                  .put("/api/gamelingo/newEvertale", {
                    data: e.currentTarget.value,
                    type: "char-team-type",
                  })
                  .then((res) => {
                    alert(res.data.msg);
                    e.currentTarget.value = "";
                    router.refresh();
                  })
                  .catch((error) => console.log(error));
              } else if (e.key === "Escape") {
                setIsAddMode(false);
              }
            }}
          />
        )}
        <button
          className={ADD_BUTTON_STYLE + " block"}
          type="button"
          onClick={() => {
            const els = document.querySelectorAll("#charTeam label input");
            const value: string[] = [];
            els.forEach((el: any) => {
              if (el.checked) {
                value.push(el.value);
              }
            });
            alert(`${value.length} buah CharTeam telah dipilih : "${value.join(", ")}"`);
            setData({ ...data, charStatus: { ...data.charStatus, charTeam: value } });
          }}
        >
          Fiksasi
        </button>
      </div>
      <label htmlFor="charElement">
        Unit Rank :
        <select
          className={SELECT_STYLE}
          value={data?.charStatus?.charElement}
          onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charElement: e.target.value } })}
          name="charElement"
          id="charElement"
          defaultValue={undefined}
        >
          <option value={undefined}>Element Character</option>
          {charElement?.map((e: any, i: number) => (
            <option value={e.element} key={`element-${i++}`}>
              {e.element}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="charWeapon1">
        Unit Weapon 1 :
        <select
          className={SELECT_STYLE}
          value={data?.charStatus?.charWeapon1}
          onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charWeapon1: e.target.value } })}
          name="charWeapon1"
          id="charWeapon1"
          defaultValue={undefined}
        >
          <option value={undefined}>Select Weapon</option>
          {charWeapon?.map((e: any, i: number) => (
            <option value={e.name} key={`weapon-I-${i++}`}>
              {e.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="charWeapon2">
        Unit Weapon 2 :
        <select
          className={SELECT_STYLE}
          value={data?.charStatus?.charWeapon2}
          onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charWeapon2: e.target.value } })}
          name="charWeapon2"
          id="charWeapon2"
          defaultValue={undefined}
        >
          <option value={undefined}>Select Weapon</option>
          {charWeapon?.map((e: any, i: number) => (
            <option value={e.name} key={`weapon-II-${i++}`}>
              {e.name}
            </option>
          ))}
        </select>
      </label>
      <LeaderSkill data={data} setData={setData} info={info} />
      <label htmlFor="conjure">
        Conjure :
        <select className={SELECT_STYLE} value={data?.charStatus?.charConjure} onChange={(e) => setData({ ...data, charStatus: { ...data.charStatus, charConjure: e.target.value } })} name="conjure" id="conjure" defaultValue={undefined}>
          <option value={undefined}>Select Conjure</option>
          {info?.conjure?.map((conjure: string, i: number) => (
            <option value={conjure} key={`conjure-${i++}`}>
              {conjure}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

const LeaderSkill = ({ data, info, setData }: { data: React.ComponentState; info: React.ComponentState; setData: React.ComponentState }) => {
  const [isAddMode, setIsAddMode] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [lsData, setLsData] = React.useState({ lsName: "", descEn: "", descId: "", lsType: "" });
  const router = useRouter();

  const sendHandler = async () => {
    try {
      setIsSending(true);
      axios
        .put("/api/gamelingo/newEvertale/leaderskill", {
          lsData,
        })
        .then((res) => {
          alert(res.data.msg);
          router.refresh();
        })
        .catch((err) => {
          if (err.response.status === 422) {
            alert(err.response.data.msg);
            return;
          }
        });
    } catch (error) {
      alert("Terjadi kesalahan");
      console.log(error);
      return;
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="new-ls">
          Leader Skill Baru <input type="checkbox" name="new-ls" id="new-ls" checked={isAddMode} onChange={() => setIsAddMode(!isAddMode)} />
        </label>
      </div>
      {!isAddMode && (
        <label htmlFor="leaderSkill">
          Leader Skill :
          <select
            className={SELECT_STYLE}
            value={data?.charStatus?.charLeaderSkill}
            onChange={(e) => setData({ ...data, charStatus: { ...data?.charStatus, charLeaderSkill: e.target.value } })}
            name="leaderSkill"
            id="leaderSkill"
            defaultValue={undefined}
          >
            <option value={undefined}>Select Leader Skill</option>
            {info?.lsData?.map((e: any, i: number) => (
              <option value={e} key={`weapon-II-${i++}`}>
                {e}
              </option>
            ))}
          </select>
        </label>
      )}
      {isAddMode && (
        <>
          <label htmlFor="new-ls-name">
            New Leader Skill Name :
            <input type="text" name="new-ls-name" id="new-ls-name" value={lsData.lsName} onChange={(e) => setLsData({ ...lsData, lsName: e.target.value })} className={INPUT_STYLE} />
          </label>
          <label htmlFor="new-ls-desc-en">
            English Description :
            <input type="text" disabled={isSending} name="new-ls-desc-en" id="new-ls-desc-en" value={lsData.descEn} onChange={(e) => setLsData({ ...lsData, descEn: e.target.value })} className={INPUT_STYLE} />
          </label>
          <label htmlFor="new-ls-desc-id">
            Deskripsi Idonesia :
            <input type="text" disabled={isSending} name="new-ls-desc-id" id="new-ls-desc-id" value={lsData.descId} onChange={(e) => setLsData({ ...lsData, descId: e.target.value })} className={INPUT_STYLE} />
          </label>
          <div id="new-ls-radio">
            Leader Skill Type :
            <div className="flex justify-center gap-4">
              {info?.rss?.typeLeaderSkill?.map((type: string, i: number) => (
                <label htmlFor={type} key={i++} className="mx-2">
                  <input type="radio" className="mr-2" value={type} onChange={(e) => setLsData({ ...lsData, lsType: e.target.value })} name="leader-skill-type" id={type} />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="button" disabled={isSending} onClick={sendHandler} className={ADD_BUTTON_STYLE}>
            {isSending ? "Mengirim data..." : "Tambahkan!"}
          </button>
        </>
      )}
    </div>
  );
};

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function CharStatus() {
  const URL = "/api/gamelingo/newEvertale?category=statusResource";
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) return <p>Mengambil data...</p>;
  if (error) return <p>Error...</p>;
  return <Data info={data} />;
}
