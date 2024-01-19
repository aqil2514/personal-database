import { useCharacter } from "..";
import { ComparingData } from "@/components/Evertale/Utils/JSX";

export default function Verifying({ isVerified, setIsVerified, char }: { isVerified: boolean; setIsVerified: React.Dispatch<React.SetStateAction<boolean>>; char: Evertale.Character.State }) {
  const init = useCharacter();
  const oldCS = init.charStatus as Evertale.Character.Status;
  const newCS = char.charStatus as Evertale.Character.Status;
  return (
    <div className="bg-slate-100 my-4 rounded-xl">
      <h2 className="text-center font-bold text-yellow-600">Verifying Area</h2>
      <details>
        <summary>Lihat Data</summary>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-center font-bold text-yellow-600">Old Data</h3>
            <ComparingData<Evertale.Character.Status> subfield="charName" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Name" />
            <ComparingData<Evertale.Character.Status> subfield="charRank" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Rank" />
            <ComparingData<Evertale.Character.Status> subfield="charTeam" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Team" />
            <ComparingData<Evertale.Character.Status> subfield="charElement" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Element" />
            <ComparingData<Evertale.Character.Status> subfield="charLeaderSkill" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Leader Skill" />
            <ComparingData<Evertale.Character.Status> subfield="charWeapon1" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Weapon 1" />
            <ComparingData<Evertale.Character.Status> subfield="charWeapon2" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Weapon 2" />
            <ComparingData<Evertale.Character.Status> subfield="isConjured" oldCS={oldCS} newCS={newCS} dataFor="old" title="Is Conjured" />
            <ComparingData<Evertale.Character.Status> subfield="charConjure" oldCS={oldCS} newCS={newCS} dataFor="old" title="Unit Conjure" />
          </div>
          <div>
            <h3 className="text-center font-bold text-yellow-600">New Data</h3>
            <ComparingData<Evertale.Character.Status> subfield="charName" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Name" />
            <ComparingData<Evertale.Character.Status> subfield="charRank" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Rank" />
            <ComparingData<Evertale.Character.Status> subfield="charTeam" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Team" />
            <ComparingData<Evertale.Character.Status> subfield="charElement" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Element" />
            <ComparingData<Evertale.Character.Status> subfield="charLeaderSkill" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Leader Skill" />
            <ComparingData<Evertale.Character.Status> subfield="charWeapon1" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Weapon 1" />
            <ComparingData<Evertale.Character.Status> subfield="charWeapon2" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Weapon 2" />
            <ComparingData<Evertale.Character.Status> subfield="isConjured" oldCS={oldCS} newCS={newCS} dataFor="new" title="Is Conjured" />
            <ComparingData<Evertale.Character.Status> subfield="charConjure" oldCS={oldCS} newCS={newCS} dataFor="new" title="Unit Conjure" />
          </div>
        </div>
      </details>
    </div>
  );
}
