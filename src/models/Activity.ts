import { Schema, model, models } from "mongoose";
const ActivitySchema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, type: { type: String, enum: ["consume", "discard", "adjust", "purchase", "meal", "nutrition"], required: true }, itemName: String, inventoryId: Schema.Types.ObjectId, quantity: Number, unit: String, cost: Number, calories: Number, protein: Number, carbs: Number, fat: Number, fiber: Number, date: { type: Date, default: Date.now }, metadata: Schema.Types.Mixed, dedupeKey: { type: String, unique: true, sparse: true } }, { timestamps: true });
ActivitySchema.index({ userId: 1, date: -1 });
export default models.Activity || model("Activity", ActivitySchema);
