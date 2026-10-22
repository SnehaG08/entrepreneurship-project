import { Schema, model, models } from "mongoose";
const IngredientSchema = new Schema({ name: String, quantity: Number, unit: String }, { _id: false });
const RecipeSchema = new Schema({ name: { type: String, required: true, unique: true }, description: String, ingredients: [IngredientSchema], instructions: [String], cuisine: String, mealType: String, dietaryTags: [String], allergens: [String], servings: Number, calories: Number, protein: Number, carbs: Number, fat: Number, fiber: Number, preparationTime: Number, cookingTime: Number, estimatedCost: Number, image: String }, { timestamps: true });
RecipeSchema.index({ dietaryTags: 1, mealType: 1 });
export default models.Recipe || model("Recipe", RecipeSchema);
