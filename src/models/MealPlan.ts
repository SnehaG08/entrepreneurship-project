import { Schema, model, models } from "mongoose";
const MealPlanSchema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, date: { type: String, required: true }, meals: [Schema.Types.Mixed], plannedCalories: Number, plannedProtein: Number, plannedCarbs: Number, plannedFat: Number, status: { type: String, default: "planned" } }, { timestamps: true });
MealPlanSchema.index({ userId: 1, date: 1 }, { unique: true });
export default models.MealPlan || model("MealPlan", MealPlanSchema);
