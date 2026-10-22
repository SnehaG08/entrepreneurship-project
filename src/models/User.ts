import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true, select: false }, role: { type: String, enum: ["user", "admin"], default: "user" },
  dateOfBirth: Date, height: Number, weight: Number, sexForCalculation: { type: String, enum: ["male", "female", "skip"] },
  fitnessGoal: { type: String, enum: ["lose", "maintain", "gain", "muscle"] }, activityLevel: String,
  dietaryPreference: { type: String, default: "omnivore" }, allergies: { type: [String], default: [] }, healthConsiderations: { type: [String], default: [] },
  householdSize: { type: Number, min: 1, default: 1 }, groceryBudget: { type: Number, min: 0, default: 0 }, budgetPeriod: { type: String, default: "weekly" },
  cuisinePreferences: { type: [String], default: ["Indian"] }, calorieTarget: Number, onboardingCompleted: { type: Boolean, default: false }
}, { timestamps: true });
export default models.User || model("User", UserSchema);
