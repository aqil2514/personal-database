import { useState, useEffect, SelectHTMLAttributes } from "react";
import { SECTION_STYLE, SELECT_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE, TEXTAREA_STYLE, ADD_BUTTON_STYLE, ICON_DELETE_STYLE, DELETE_BUTTON_STYLE, useSkills } from "./formbody";
import axios from "axios";

export default function Skills() {
  const { skills, setSkills } = useSkills();

  return (
    <>
      <ActiveSkill skills={skills} setSkills={setSkills} />
      <PassiveSkill skills={skills} setSkills={setSkills} />
    </>
  );
}

function ActiveSkill({ skills, setSkills }: { skills: React.ComponentState; setSkills: React.ComponentState }) {
  const [deleteMode, setDeleteMode] = useState<true | false>(false);
  const [inputSkill, setInputSkill] = useState<React.ComponentState>({ skillName: "", TU: "", spirit: "", target: "", descEn: "", descId: "" });

  function addHandler() {
    const compare = skills?.find((s: React.ComponentState) => s?.activeSkills?.skillName === inputSkill?.skillName);

    if (compare) {
      alert("Skill sudah ditambahkan!");
      return;
    }

    setDeleteMode(false);

    setSkills([...skills, { activeSkills: inputSkill }]);
    setInputSkill({ skillName: "", TU: "", spirit: "", target: "", descEn: "", descId: "" });
  }

  function deleteHandler() {
    setDeleteMode(!deleteMode);
  }

  return (
    <div id="char-active-skill" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Active Skill</h3>
      <label htmlFor="skill-name">
        Skill Name :
        <input className={INPUT_STYLE} value={inputSkill.skillName} onChange={(e) => setInputSkill({ ...inputSkill, skillName: e.target.value })} type="text" name="skillName" id="skill-name" />
      </label>
      <label htmlFor="skill-spirit">
        Spirit :
        <input className={INPUT_STYLE} value={inputSkill.spirit} onChange={(e) => setInputSkill({ ...inputSkill, spirit: e.target.value })} type="number" name="spirit" id="skill-spirit" />
      </label>
      <label htmlFor="skill-target">
        Target :
        <input className={INPUT_STYLE} value={inputSkill.target} onChange={(e) => setInputSkill({ ...inputSkill, target: e.target.value })} type="text" name="target" id="skill-target" />
      </label>
      <label htmlFor="skill-tu">
        TU :
        <input className={INPUT_STYLE} value={inputSkill.TU} onChange={(e) => setInputSkill({ ...inputSkill, TU: e.target.value })} type="number" name="TU" id="skill-tu" />
      </label>
      <label htmlFor="desc-en">
        Description :
        <textarea className={TEXTAREA_STYLE} value={inputSkill.descEn} onChange={(e) => setInputSkill({ ...inputSkill, descEn: e.target.value })} name="descEn" id="desc-en" />
      </label>
      <label htmlFor="desc-id">
        Deskripsi :
        <textarea className={TEXTAREA_STYLE} value={inputSkill.descId} onChange={(e) => setInputSkill({ ...inputSkill, descId: e.target.value })} name="descId" id="desc-id" />
      </label>
      <button type="button" className={ADD_BUTTON_STYLE} onClick={addHandler}>
        Add
      </button>
      <button type="button" className={DELETE_BUTTON_STYLE} onClick={deleteHandler}>
        {deleteMode ? "Batalkan" : "Hapus"}
      </button>

      {skills?.filter((s: any) => s.activeSkills)?.length === 0 ? (
        <div>
          <p>Active Skill belum ditambah</p>
        </div>
      ) : (
        <div>
          {skills
            ?.filter((s: any) => s.activeSkills)
            ?.map((as: any, i: number) => (
              <>
                <ul key={i++}>
                  <li>
                    <strong>
                      Active Skill {i + 1}{" "}
                      {deleteMode && (
                        <span
                          datatype={as?.activeSkills?.skillName}
                          className={ICON_DELETE_STYLE}
                          onClick={() => {
                            const allow = confirm(`Ingin menghapus skill dengan nama ${as?.activeSkills?.skillName}`);
                            if (!allow) {
                              return;
                            }
                            setDeleteMode(false);
                            setSkills(skills.filter((s: any) => s?.activeSkills?.skillName !== as?.activeSkills?.skillName));
                          }}
                        >
                          X
                        </span>
                      )}
                    </strong>
                  </li>
                  <li>
                    <strong>Skill Name : </strong>
                    {as?.activeSkills?.skillName}
                  </li>
                  <li>
                    <strong>Skill Spirit : </strong>
                    {as?.activeSkills?.spirit}
                  </li>
                  <li>
                    <strong>Skill TU : </strong>
                    {as?.activeSkills?.TU}
                  </li>
                  <li>
                    <strong>Skill Target: </strong>
                    {as?.activeSkills?.target}
                  </li>
                  <li>
                    <strong>Skill Description : </strong>
                    {as?.activeSkills?.descEn}
                  </li>
                  <li>
                    <strong>Deskripsi Skill : </strong>
                    {as?.activeSkills?.descId}
                  </li>
                </ul>
                <br />
              </>
            ))}
        </div>
      )}
    </div>
  );
}

interface DataPassiveSkill {
  name: string;
  descEN: string;
  descID: string;
}

function PassiveSkill({ skills, setSkills }: { skills: React.ComponentState; setSkills: React.ComponentState }) {
  const [inputSkill, setInputSkill] = useState<React.ComponentState>({ name: "", descEN: "", descID: "" });
  const [dataPassiveSkill, setDataPassiveSkill] = useState<DataPassiveSkill[]>([]);
  const [deleteMode, setDeleteMode] = useState<true | false>(false);

  const [other, setOther] = useState<true | false>(true);

  async function getData() {
    try {
      const res = await axios.get("/api/gamelingo/evertale");

      const data = res.data;

      setDataPassiveSkill(data.passiveskills.passiveskills);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function addHandler() {
    const compare = skills?.find((s: React.ComponentState) => s?.passiveSkills?.name === inputSkill?.name);

    if (compare) {
      alert("Skill sudah ditambahkan!");
      return;
    }

    setDeleteMode(false);

    setSkills([...skills, { passiveSkills: inputSkill }]);
    console.log(skills.filter((s: any) => s.passiveSkills));
    console.log(skills.filter((s: any) => s.activeSKills));
    setInputSkill({ name: "", descEN: "", descID: "" });
  }

  function deleteHandler() {
    setDeleteMode(!deleteMode);
  }

  function selectChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const target = e.target.value;
    if (target === "other") {
      setInputSkill({ name: "", descEN: "", descID: "" });
      setOther(true);
      return;
    }
    setOther(false);
    const name = dataPassiveSkill.find((dps) => dps.name === target)?.name;
    const descEN = dataPassiveSkill.find((dps) => dps.name === target)?.descEN;
    const descID = dataPassiveSkill.find((dps) => dps.name === target)?.descID;

    setInputSkill({ name, descEN, descID });
  }

  return (
    <div id="character-passive-skill" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Passive Skill</h3>
      <select className={SELECT_STYLE} onChange={selectChangeHandler} name="passive-skill" id="passive-skill-select">
        {dataPassiveSkill.map((dp, i) => (
          <option value={dp.name} key={`passive-${i++}`}>
            {dp.name}
          </option>
        ))}
        <option value="other">Other</option>
      </select>
      <label htmlFor="passive-skill-name">
        Skill Name :
        <input className={INPUT_STYLE} value={inputSkill.name} onChange={(e) => setInputSkill({ ...inputSkill, name: e.target.value })} type="text" name="skillName" id="passive-skill-name" disabled={!other} />
      </label>
      <label htmlFor="passive-desc-en">
        Description :
        <textarea className={TEXTAREA_STYLE} value={inputSkill.descEN} onChange={(e) => setInputSkill({ ...inputSkill, descEN: e.target.value })} name="descEn" id="passive-desc-en" disabled={!other} />
      </label>
      <label htmlFor="passive-desc-id">
        Deskripsi :
        <textarea className={TEXTAREA_STYLE} value={inputSkill.descID} onChange={(e) => setInputSkill({ ...inputSkill, descID: e.target.value })} name="descId" id="passive-desc-id" disabled={!other} />
      </label>
      <button type="button" className={ADD_BUTTON_STYLE} onClick={addHandler}>
        Add
      </button>
      <button type="button" className={DELETE_BUTTON_STYLE} onClick={deleteHandler}>
        {deleteMode ? "Batalkan" : "Hapus"}
      </button>
      {skills?.filter((s: any) => s.passiveSkills)?.length === 0 ? (
        <div>
          <p>Passive Skill belum ditambah</p>
        </div>
      ) : (
        <div>
          {skills
            ?.filter((s: any) => s.passiveSkills)
            ?.map((ps: React.ComponentState, i: number) => (
              <>
                <ul key={i++}>
                  <li>
                    <strong>
                      Passive Skill {i + 1}{" "}
                      {deleteMode && (
                        <span
                          className={ICON_DELETE_STYLE}
                          onClick={() => {
                            const allow = confirm(`Ingin menghapus skill dengan nama ${ps?.passiveSkills?.name}`);
                            if (!allow) {
                              return;
                            }
                            setDeleteMode(false);
                            setSkills(skills.filter((s: any) => s?.passiveSkills?.name !== ps?.passiveSkills?.name));
                          }}
                        >
                          X
                        </span>
                      )}
                    </strong>
                  </li>
                  <li>
                    <strong>Skill Name : </strong>
                    {ps?.passiveSkills?.name}
                  </li>
                  <li>
                    <strong>Skill Description : </strong>
                    {ps?.passiveSkills?.descEN}
                  </li>
                  <li>
                    <strong>Deskripsi Skill : </strong>
                    {ps?.passiveSkills?.descID}
                  </li>
                </ul>
                <br />
              </>
            ))}
        </div>
      )}
    </div>
  );
}
