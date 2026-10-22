import { Schema, model, models } from "mongoose";
const InventorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, foodName: { type: String, required: true, trim: true }, category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 }, unit: { type: String, required: true }, purchaseDate: Date, expiryDate: Date,
  dateType: { type: String, enum: ["use-by", "best-before", "none"], default: "best-before" }, storageLocation: { type: String, required: true },
  price: { type: Number, min: 0, default: 0 }, imagePath: String, freshnessObservations: { type: [String], default: [] }, status: { type: String, enum: ["active", "depleted", "unsafe"], default: "active" }
}, { timestamps: true });
InventorySchema.index({ userId: 1, status: 1, expiryDate: 1 });
export default models.Inventory || model("Inventory", InventorySchema);
