import { SetStateAction } from "react";

export const PreviewSkill = ({
  deleteMode,
  setDeleteMode,
  data,
  setData,
}: {
  deleteMode: boolean;
  setDeleteMode: React.Dispatch<SetStateAction<boolean>>;
  data: Evertale.Character.State;
  setData: React.Dispatch<SetStateAction<Evertale.Character.State>>;
}) => {
  function deleteHandler(e: React.MouseEvent<HTMLSpanElement>) {
    const skillName = (e.target as HTMLSpanElement).getAttribute("data-skillName");

    const filtered = data.charActiveSkill.filter((skill: Evertale.Character.ActiveSkill) => skill.skillName !== skillName);

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
          {data.charActiveSkill.map((as: Evertale.Character.ActiveSkill, i: number) => (
            <div key={`as-${i++}`} className="my-4">
              <p>
                <strong>Active Skill {i + 1}.</strong>{" "}
                {deleteMode && (
                  <span onClick={deleteHandler} data-skillName={as.skillName} className={"text-rose-800 cursor-pointer font-extrabold"}>
                    X
                  </span>
                )}
              </p>
              <p>
                <strong>Skill Name : </strong>
                {as.skillName}
              </p>
              <p>
                <strong>Skill Type : </strong>
                {as.typeSkill.join(", ")}
              </p>
              <p>
                <strong>Skill Target : </strong>
                {as.skillTarget}
              </p>
              <p>
                <strong>Skill Spirit : </strong>
                {as.skillSpirit}
              </p>
              <p>
                <strong>Skill TU : </strong>
                {as.skillTu}
              </p>
              <p>
                <strong>Description : </strong>
                {as.skillDescEn}
              </p>
              <p>
                <strong>Deskripsi : </strong>
                {as.skillDescId}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
