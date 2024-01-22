import mongoose, { Schema } from "mongoose";

const CharacterPassiveSkillSchema = new Schema<Evertale.Character.PassiveSkill>(
  {
    skillName: { type: String, required: true },
    typeSkill: { type: [String], required: true },
    skillDescEn: { type: String, required: true },
    skillDescId: { type: String, required: true },
  },
  { timestamps: true }
);

const Passive = mongoose.models.passive || mongoose.model("passive", CharacterPassiveSkillSchema);
export default Passive;
