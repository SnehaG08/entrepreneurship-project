import { Schema, model, models } from "mongoose";
const NotificationSchema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, inventoryId: { type: Schema.Types.ObjectId, ref: "Inventory" }, title: String, message: String, kind: String, dismissed: { type: Boolean, default: false } }, { timestamps: true });
NotificationSchema.index({ userId: 1, inventoryId: 1 }, { unique: true, sparse: true });
export default models.Notification || model("Notification", NotificationSchema);
