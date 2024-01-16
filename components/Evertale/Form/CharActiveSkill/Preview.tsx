import { SetStateAction } from "react";
import { CharacterActiveSkill, CharacterState } from "../../Interface";

export const PreviewSkill = ({ deleteMode, setDeleteMode, data, setData }: { deleteMode: boolean; setDeleteMode: React.Dispatch<SetStateAction<boolean>>; data: CharacterState; setData: React.Dispatch<SetStateAction<any>> }) => {
  function deleteHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const skillName = (e.target as HTMLSpanElement).getAttribute("data-skillName");

    const filtered = data.charActiveSkill.filter((skill: CharacterActiveSkill) => skill.name !== skillName);

    if (data.charActiveSkill.length === 1) {
      setDeleteMode(false);
    }

    setData({ ...data, charActiveSkill: filtered });
  }

  return (
    <div>
      {data.charActiveSkill.length === 0 ? (
        <p>Belum ada data yang ditambahkan</p>
      ) : (
        <>
          {data.charActiveSkill.map((as: CharacterActiveSkill, i: number) => (
            <div key={`as-${i++}`} className="my-4">
              <p>
                <strong>Active Skill {i + 1}.</strong>{" "}
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
                <strong>Skill Target : </strong>
                {as.target}
              </p>
              <p>
                <strong>Skill Spirit : </strong>
                {as.spirit}
              </p>
              <p>
                <strong>Skill TU : </strong>
                {as.TU}
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
