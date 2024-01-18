import mongoose, { Schema } from "mongoose";

const TypeSkillSchema = new Schema<Evertale.Misc.TypeSkill>({
  typeActiveSkill: [String],
  typePassiveSkill: [String],
  typeCharTeam: [String],
  typeLeaderSkill: [String],
});

export const TypeSkill = mongoose.models.TypeSkill || mongoose.model("TypeSkill", TypeSkillSchema);
