import mongoose, { Schema } from "mongoose";

interface CharacterPassiveSkill {
  skillName: String;
  typeSkill: String;
  skillDescEn: String;
  skillDescId: String;
}

const CharacterPassiveSkillSchema = new Schema<CharacterPassiveSkill>(
  {
    skillName: { type: String, required: true },
    typeSkill: { type: String, required: true },
    skillDescEn: { type: String, required: true },
    skillDescId: { type: String, required: true },
  },
  { timestamps: true }
);

const Passive = mongoose.models.passive || mongoose.model("passive", CharacterPassiveSkillSchema);
export default Passive;
