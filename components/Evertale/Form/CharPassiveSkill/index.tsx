"use client";

import React, { useState } from "react";
import { SECTION_STYLE, SECTION_TITLE_STYLE, INPUT_STYLE, TEXTAREA_STYLE, ADD_BUTTON_STYLE, ICON_DELETE_STYLE, DELETE_BUTTON_STYLE, SELECT_STYLE } from "@/app/components/Styles";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { PlusCircleFill, XCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import { StateType, useData } from "..";
import { CharacterPassiveSkill } from "../../Interface";
import { SectionWrapper } from "@/components/General/Wrapper";
import { Setting } from "./Setting";
import { PreviewSkill } from "./Preview";

type PassiveSkillState = {
  skillName: string;
  typeSkill: string[];
  skillDescEn: string;
  skillDescId: string;
};

// export default function CharPassiveSkills() {
//   const { data, setData } = useData();
//   const [inputSkill, setInputSkill] = useState<PassiveSkillState>({
//     skillName: "",
//     typeSkill: [],
//     skillDescEn: "",
//     skillDescId: "",
//   });

//   const [deleteMode, setDeleteMode] = useState<Boolean>(false);
//   const [uniqueSkill, setUniqueSkill] = React.useState(false);

//   const addHandler = () => {
//     if (inputSkill.typeSkill.length === 0) {
//       alert("Tipe Skill belum dipilih / difiksasi");
//       return;
//     }
//     if (Array.isArray(data.charPassiveSkill)) {
//       setData({
//         ...data,
//         charPassiveSkill: [...data.charPassiveSkill, { ...inputSkill }],
//       });
//     } else {
//       setData({
//         ...data,
//         charPassiveSkill: [{ ...inputSkill }],
//       });
//     }
//     const els = document.querySelectorAll("#passive-skill-type-container label input");
//     els.forEach((el: any) => {
//       el.checked = false;
//     });
//     setInputSkill({ skillName: "", typeSkill: [], skillDescEn: "", skillDescId: "" });
//   };

//   const deleteHandler = (i: number) => {
//     const updatedSkills = data.charPassiveSkill.filter((_: any, index: number) => index !== i - 1);

//     setData({ ...data, charPassiveSkill: updatedSkills });
//   };

//   return (
//     <div id="char-passive-skill" className={SECTION_STYLE}>
//       {/* Setting Skills  */}
//       <div>
//         <h3 className={SECTION_TITLE_STYLE}>Character Passive Skill</h3>
//         <label htmlFor="char-passive-checkbox" className="block">
//           <input
//             type="checkbox"
//             checked={uniqueSkill}
//             onChange={() => {
//               setUniqueSkill(!uniqueSkill);
//               setInputSkill({
//                 skillName: "",
//                 typeSkill: [],
//                 skillDescEn: "",
//                 skillDescId: "",
//               });
//             }}
//             name="char-passive-checkbox"
//             id="char-passive-checkbox"
//           />
//           <span>Unique Skill / New Skill</span>
//         </label>

//         {uniqueSkill && (
//           <div>
//             <label htmlFor="skill-name">
//               Skill Name :
//               <input className={INPUT_STYLE} value={inputSkill.skillName} onChange={(e) => setInputSkill({ ...inputSkill, skillName: e.target.value })} type="text" name="skillName" id="skill-name" />
//             </label>
//             <TypeSkill inputSkill={inputSkill} setInputSkill={setInputSkill} />

//             <label htmlFor="desc-en">
//               Description :
//               <textarea className={TEXTAREA_STYLE} value={inputSkill.skillDescEn} onChange={(e) => setInputSkill({ ...inputSkill, skillDescEn: e.target.value })} name="descEn" id="desc-en" />
//             </label>
//             <label htmlFor="desc-id">
//               Deskripsi :
//               <textarea
//                 className={TEXTAREA_STYLE}
//                 value={inputSkill.skillDescId}
//                 onChange={(e) => setInputSkill({ ...inputSkill, skillDescId: e.target.value })}
//                 name="descId"
//                 id="desc-id"
//                 onKeyDown={(e) => {
//                   if (e.ctrlKey && e.key === "Enter") {
//                     addHandler();
//                   }
//                 }}
//               />
//               <p className="block">(CTRL + Enter untuk menambah state)</p>
//             </label>
//           </div>
//         )}

//         {!uniqueSkill && <NonUniqueSkill inputSkill={inputSkill} setInputSkill={setInputSkill} addHandler={addHandler} />}

//         <button type="button" onClick={addHandler} className={ADD_BUTTON_STYLE}>
//           Add
//         </button>
//         <button type="button" className={DELETE_BUTTON_STYLE} onClick={() => setDeleteMode(!deleteMode)}>
//           {deleteMode ? "Batalkan" : "Hapus"}
//         </button>
//       </div>

//       {/* Tampilan Skills  */}
//   <div>
//     {data.charPassiveSkill.length === 0 ? (
//       <p>Belum ada data yang ditambahkan</p>
//     ) : (
//       <>
//         {data.charPassiveSkill.map((ps: CharacterPassiveSkill, i: number) => (
//           <div key={`as-${i++}`} className="my-4">
//             <p>
//               <strong>Passive Skill {i + 1}.</strong>{" "}
//               {deleteMode && (
//                 <span onClick={() => deleteHandler(i)} className={ICON_DELETE_STYLE + " font-extrabold"}>
//                   X
//                 </span>
//               )}
//             </p>
//             <p>
//               <strong>Skill Name : </strong>
//               {ps.name}
//             </p>
//             <p>
//               <strong>Skill Type : </strong>
//               {ps.typeSkill.join(", ")}
//             </p>
//             <p>
//               <strong>Description : </strong>
//               {ps.descEn}
//             </p>
//             <p>
//               <strong>Deskripsi : </strong>
//               {ps.descId}
//             </p>
//           </div>
//         ))}
//       </>
//     )}
//   </div>
//     </div>
//   );
// }

export default function CharPassiveSkills() {
  const { data, setData }: StateType = useData();
  const [deleteMode, setDeleteMode] = React.useState<boolean>(false);
  return (
    <SectionWrapper id="passive-skill-setting-container">
      <Setting data={data} setData={setData} setDeleteMode={setDeleteMode} deleteMode={deleteMode} />
      <PreviewSkill deleteMode={deleteMode} setDeleteMode={setDeleteMode} data={data} setData={setData} />
    </SectionWrapper>
  );
}
