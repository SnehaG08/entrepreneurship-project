import { Schema, model, models } from "mongoose";
const ItemSchema = new Schema({ name: String, quantity: Number, unit: String, estimatedCost: Number, actualCost: Number, priority: String, reason: String, purchased: { type: Boolean, default: false } });
const ShoppingListSchema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, items: [ItemSchema], estimatedTotal: Number, budget: Number, status: { type: String, default: "active" } }, { timestamps: true });
export default models.ShoppingList || model("ShoppingList", ShoppingListSchema);
