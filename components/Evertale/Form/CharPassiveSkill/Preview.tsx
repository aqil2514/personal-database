import { SetStateAction } from "react";
import { CharacterPassiveSkill, CharacterState } from "../../Interface";

export const PreviewSkill = ({ deleteMode, setDeleteMode, data, setData }: { deleteMode: boolean; setDeleteMode: React.Dispatch<SetStateAction<boolean>>; data: CharacterState; setData: React.Dispatch<SetStateAction<any>> }) => {
  function deleteHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const skillName = (e.target as HTMLSpanElement).getAttribute("data-skillName");

    const filtered = data.charPassiveSkill.filter((skill: CharacterPassiveSkill) => skill.name !== skillName);

    if (data.charPassiveSkill.length === 1) {
      setDeleteMode(false);
    }

    setData({ ...data, charPassiveSkill: filtered });
  }

  return (
    <div>
      {data.charPassiveSkill.length === 0 ? (
        <p>Belum ada data yang ditambahkan</p>
      ) : (
        <>
          {data.charPassiveSkill.map((as: CharacterPassiveSkill, i: number) => (
            <div key={`as-${i++}`} className="my-4">
              <p>
                <strong>Passive Skill {i + 1}.</strong>{" "}
                {deleteMode && (
                  <span onClick={deleteHandler} data-skillName={as.name} className={"text-rose-800 cursor-pointer font-extrabold"}>
                    X
                  </span>
                )}
              </p>
              <p>
                <strong>Skill Name : </strong>
                {as.name}
              </p>
              <p>
                <strong>Skill Type : </strong>
                {as.typeSkill.join(", ")}
              </p>
              <p>
                <strong>Description : </strong>
                {as.descEn}
              </p>
              <p>
                <strong>Deskripsi : </strong>
                {as.descId}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
