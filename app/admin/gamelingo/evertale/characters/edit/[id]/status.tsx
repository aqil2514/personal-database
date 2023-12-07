import { useState } from "react";
import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE, SELECT_STYLE, TEXTAREA_STYLE, ADD_BUTTON_STYLE, useCharacter, useStatus } from "./form";
import axios from "axios";

export default function CharStatus() {
  const { character, setCharacter } = useCharacter();
  return (
    <div id="character-status" className={SECTION_STYLE}>
      <h3 className={SECTION_TITLE_STYLE}>Character Status</h3>
      <label htmlFor="unit-name">
        {" "}
        Unit Name :{" "}
        <input className={INPUT_STYLE} value={character?.charStatus?.charName} onChange={(e) => setCharacter({ ...character, charStatus: { ...character, charName: e.target.value } })} type="text" name="charName" id="unit-name" />
      </label>
      <label htmlFor="unit-link">
        {" "}
        Link Character Post :{" "}
        <input className={INPUT_STYLE} value={character?.charStatus?.charLink} onChange={(e) => setCharacter({ ...character, charStatus: { ...character, charLink: e.target.value } })} type="text" name="charLink" id="unit-link" required />
      </label>
      <label htmlFor="select-status-element">
        {" "}
        Element :{" "}
        <select
          className={SELECT_STYLE}
          value={character?.charStatus?.statusElement}
          onChange={(e) => setCharacter({ ...character, charStatus: { ...character, statusElement: e.target.value } })}
          name="statusElement"
          id="select-element"
          required
        >
          <option value="null">Select Element</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Earth">Earth</option>
          <option value="Storm">Storm</option>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </label>
      <Weapon />

      <LeaderSkill />

      <Conjures />
    </div>
  );
}

function Weapon() {
  const { dataWeapon } = useStatus();
  const { character, setCharacter } = useCharacter();

  return (
    <>
      <label htmlFor="select-weapon-1">
        {" "}
        Select First Weapon :{" "}
        <select
          className={SELECT_STYLE}
          name="firstWeapon"
          value={character?.charStatus?.firstWeapon}
          onChange={(e) => setCharacter({ ...character, charStatus: { ...character, firstWeapon: e.target.value } })}
          id="select-weapon-1"
          required
        >
          <option value="null">Select First Weapon</option>
          {dataWeapon &&
            dataWeapon?.map((dw: React.ComponentState) => (
              <option value={dw.name} key={dw.id} id={dw.id}>
                {dw.name}
              </option>
            ))}
        </select>
      </label>
      <label htmlFor="select-weapon-2">
        {" "}
        Select Second Weapon :{" "}
        <select className={SELECT_STYLE} name="secondWeapon" value={character?.charStatus?.secondWeapon} onChange={(e) => setCharacter({ ...character, charStatus: { ...character, secondWeapon: e.target.value } })} id="select-second-weapon">
          <option>Select Second Weapon</option>
          {dataWeapon?.map((dw: React.ComponentState) => (
            <option value={dw.name} key={dw.id} id={dw.id}>
              {dw.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

function LeaderSkill() {
  const { dataLeaderSkill } = useStatus();
  const [addMode, setAddMode] = useState(false);
  const [leaderSkill, setLeaderSkill] = useState({ name: "", descEN: "", descID: "" });
  const [loading, setLoading] = useState(false);
  const { character, setCharacter } = useCharacter();

  async function clickHandler() {
    const { name, descEN, descID } = leaderSkill;
    try {
      setLoading(true);
      const res = await axios.post("/api/gamelingo/evertale", {
        formBodyDLS: {
          name,
          descEN,
          descID,
        },
        typeData: "leaderSkill",
      });

      const { data } = res;

      alert(data.msg);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <label htmlFor="add-dls-checkbox">
        <input type="checkbox" name="add-dls-checkbox" id="add-dls-checkbox" onChange={() => setAddMode(!addMode)} checked={addMode} /> Leader Skill Baru <br />
      </label>
      {!addMode && (
        <label htmlFor="leader-skill">
          {" "}
          Leader Skill : {""}
          <select className={SELECT_STYLE} value={character?.charStatus?.leaderSkill} onChange={(e) => setCharacter({ ...character, charStatus: { ...character, leaderSkill: e.target.value } })} name="leaderSkill" id="leader-skill">
            <option value="null">Select Leader Skill</option>
            {dataLeaderSkill &&
              dataLeaderSkill?.map((dls: React.ComponentState) => (
                <option key={dls.id} value={dls.id}>
                  {dls.name}
                </option>
              ))}
          </select>
        </label>
      )}
      {addMode && (
        <>
          <label htmlFor="new-leader-skill-name">
            Leader Skill Name :
            <input
              type="text"
              className={INPUT_STYLE}
              value={loading ? "Mengirim Data..." : leaderSkill.name}
              disabled={loading}
              onChange={(e) => setLeaderSkill({ ...leaderSkill, name: e.target.value })}
              placeholder="Leader Skill Name..."
              name="new-leader-skill-name"
              id="new-leader-skill-name"
            />
          </label>
          <label htmlFor="new-leader-skill-desc-en">
            Leader Skill Description :
            <textarea
              className={TEXTAREA_STYLE}
              value={loading ? "Mengirim Data..." : leaderSkill.descEN}
              disabled={loading}
              onChange={(e) => setLeaderSkill({ ...leaderSkill, descEN: e.target.value })}
              placeholder="Leader Skill Description..."
              name="new-leader-skill-desc-en"
              id="new-leader-skill-desc-en"
            />
          </label>
          <label htmlFor="new-leader-skill-desc-id">
            Deskripsi Leader Skill:
            <textarea
              className={TEXTAREA_STYLE}
              value={loading ? "Mengirim Data..." : leaderSkill.descID}
              disabled={loading}
              onChange={(e) => setLeaderSkill({ ...leaderSkill, descID: e.target.value })}
              placeholder="Deskripsi Leader Skill..."
              name="new-leader-skill-desc-id"
              id="new-leader-skill-desc-id"
            />
          </label>
          <button onClick={clickHandler} disabled={loading} className={ADD_BUTTON_STYLE + " block"} type="button">
            {loading ? "Mengirim Data" : "Tambah Leader Skill Baru"}
          </button>
        </>
      )}
    </>
  );
}

function Conjures() {
  const { dataUnitConjure } = useStatus();
  const [addMode, setAddMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conjures, setConjures] = useState({ name: "", link: "" });
  const { character, setCharacter } = useCharacter();

  async function clickHandler() {
    const { name, link } = conjures;
    try {
      setLoading(true);
      const res = await axios.post("/api/gamelingo/evertale", {
        formBodyConjures: {
          name,
          link,
        },
        typeData: "conjures",
      });

      const { data } = res;

      alert(data.msg);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <label htmlFor="add-conjures-checkbox">
        <input type="checkbox" name="add-conjures-checkbox" id="add-conjures-checkbox" onChange={() => setAddMode(!addMode)} checked={addMode} /> Conjures Baru <br />
      </label>
      {!addMode && (
        <label htmlFor="conjures">
          {" "}
          Conjures : {""}
          <select className={SELECT_STYLE} value={character?.charStatus?.conjures} onChange={(e) => setCharacter({ ...character, charStatus: { ...character, conjures: e.target.value } })} name="conjures" id="conjures">
            <option value={"null"}>Select Conjures</option>
            {dataUnitConjure &&
              dataUnitConjure?.map((du: React.ComponentState) => (
                <option value={du.id} key={du.id}>
                  {du.name}
                </option>
              ))}
          </select>
        </label>
      )}
      {addMode && (
        <>
          <label htmlFor="new-leader-skill-name">
            Conjures Name :
            <input
              type="text"
              className={INPUT_STYLE}
              value={loading ? "Mengirim Data..." : conjures.name}
              disabled={loading}
              onChange={(e) => setConjures({ ...conjures, name: e.target.value })}
              placeholder="Leader Skill Name..."
              name="new-leader-skill-name"
              id="new-leader-skill-name"
            />
          </label>
          <label htmlFor="new-leader-skill-desc-en">
            Conjures Link :
            <textarea
              className={TEXTAREA_STYLE}
              value={loading ? "Mengirim Data..." : conjures.link}
              disabled={loading}
              onChange={(e) => setConjures({ ...conjures, link: e.target.value })}
              placeholder="Leader Skill Description..."
              name="new-leader-skill-desc-en"
              id="new-leader-skill-desc-en"
            />
          </label>
          <button onClick={clickHandler} disabled={loading} className={ADD_BUTTON_STYLE + " block"} type="button">
            {loading ? "Mengirim Data" : "Tambah Conjures Baru"}
          </button>
        </>
      )}
    </>
  );
}
