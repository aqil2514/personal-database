// import { useState } from "react";
import React, { useState } from "react";
import { charElement, charRank, charWeapon } from "../../../component/data";
import { useData } from "../formbody";
import { INPUT_STYLE, SELECT_STYLE, ADD_BUTTON_STYLE } from "@/app/components/Styles";
import useSWR from "swr";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input, InputRadio } from "@/components/General/Input";
import { Option, OptionString, Select } from "@/components/General/Select";
import { SectionWrapper } from "@/components/General/Wrapper";

const Data = ({ info }: { info: any }) => {
  const { data, setData } = useData();
  const [isAddMode, setIsAddMode] = React.useState(false);
  const router = useRouter();

  function changeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, stateData: string) {
    setData({ ...data, charStatus: { ...data?.charStatus, [stateData]: e.target.value } });
  }
  return (
    <SectionWrapper>
      <Input variant="default" forId="charName" label="Unit Name" value={data?.charStatus?.charName} onChange={(e) => changeHandler(e, "charName")} />
      <Select variant="default" forId="charRank" onChange={(e) => changeHandler(e, "charRank")} label="Unit Rank">
        <Option isFirst>Character Rank</Option>
        <Option isFirst={false} dataMap={charRank} valueMap="rank" />
      </Select>
      <div id="isConjured">
        Conjure / Non-Conjure :
        <InputRadio forId="conjure" name="isConjured" label="Conjure" value="Conjure" onChange={(e) => changeHandler(e, "isConjured")} />
        <InputRadio forId="non-conjure" name="isConjured" label="Non Conjure" value="Non-Conjured" onChange={(e) => changeHandler(e, "isConjured")} />
      </div>
      <CharTeam info={info} />
      <Select variant="default" forId="charElement" onChange={(e) => changeHandler(e, "charElement")} label="Character Element">
        <Option isFirst>Element Character</Option>
        <Option isFirst={false} dataMap={charElement} valueMap="element" />
      </Select>
      <Select variant="default" forId="charWeapon1" onChange={(e) => changeHandler(e, "charWeapon1")} label="Character Weapon 1">
        <Option isFirst>Select Weapon</Option>
        <Option isFirst={false} dataMap={charWeapon} valueMap="name" />
      </Select>
      <Select variant="default" forId="charWeapon2" onChange={(e) => changeHandler(e, "charWeapon2")} label="Character Weapon 2">
        <Option isFirst>Select Weapon</Option>
        <Option isFirst={false} dataMap={charWeapon} valueMap="name" />
      </Select>
      <LeaderSkill data={data} setData={setData} info={info} />

      <Select variant="default" forId="charConjure" onChange={(e) => changeHandler(e, "charConjure")} label="Character Conjure">
        <Option isFirst>Select Conjure</Option>
        <OptionString dataMap={info} childMap="conjure" valueMap="conjure" />
      </Select>
    </SectionWrapper>
  );
};

const CharTeam = ({ info }: any) => {
  const { data, setData } = useData();
  const router = useRouter();
  const [teams, setTeams] = useState<string[]>([]);
  const [team, setTeam] = useState<string>("");

  async function enterHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!team) {
        alert("Team Setting masih kosong");
        return;
      }
      const isThere = info?.rss?.typeCharTeam.find((t: string) => t === team);
      if (isThere) {
        const dupplicate = teams.includes(team);
        if (dupplicate) {
          alert(`${team} sudah ditambahkan`);
          setTeam("");
          return;
        }
        setTeams((prevTeams: string[]) => [...prevTeams, team]);
        setTeam("");
        return;
      }

      const allow = confirm(`${team} belum ditambahkan di Database, tambahkan sekarang?`);
      if (!allow) {
        return;
      }

      const res = await axios.put("/api/gamelingo/newEvertale", {
        data: team,
        type: "char-team-type",
      });

      alert(res.data.msg);
      router.refresh();
    }
  }

  function deleteHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLSpanElement;
    const teamSelected = target.getAttribute("data-team");

    const filtered = teams.filter((team: string) => team !== teamSelected);
    setTeams(filtered);
  }
  return (
    <div id="charTeam">
      Character Team:
      <div className="flex flex-wrap gap-4 flex-row border-2 border-black border-solid p-4 justify-start w-full rounded-lg">
        {teams.length === 0 ? (
          <p className="mx-auto font-bold">Character Team belum dipilih</p>
        ) : (
          teams.map((team: string, i: number) => (
            <p className="border-2 border-black rounded-lg relative p-2" key={`${team}-team-${i++}`}>
              <span data-team={team} className="font-bold absolute -top-1 right-1 text-red-700 cursor-pointer" onClick={deleteHandler}>
                X
              </span>
              {team}
            </p>
          ))
        )}
      </div>
      <Input forId="char-team-input" label="Team Setting" list="option-char-team" value={team} onChange={(e) => setTeam(e.target.value)} onKeyDown={(e) => enterHandler(e)} />
      <datalist id="option-char-team">{info?.rss?.typeCharTeam.map((team: string) => <option value={team} key={`opt-char-team-${team}`} />)}</datalist>
      {/* TODO : THIS BELOW BUTTON,  */}
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
