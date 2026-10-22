import { getFreshness } from "./freshnessEngine";
type R = { _id?: unknown; name: string; ingredients: { name?: string }[]; dietaryTags?: string[]; allergens?: string[]; calories?: number; protein?: number; cookingTime?: number; estimatedCost?: number; mealType?: string; [key: string]: unknown };
export function recommendMeals(recipes: R[], inventory: any[], profile: any) {
  const available = new Map(inventory.filter(i => getFreshness(i).level !== "red" && i.quantity > 0).map(i => [i.foodName.toLowerCase(), getFreshness(i).score]));
  const allergies = (profile.allergies || []).map((x: string) => x.toLowerCase());
  return recipes.filter(r => {
    const tags = (r.dietaryTags || []).map(x => x.toLowerCase());
    const diet = profile.dietaryPreference?.toLowerCase();
    return (!diet || diet === "omnivore" || tags.includes(diet)) && !(r.allergens || []).some(a => allergies.includes(a.toLowerCase()));
  }).map(r => {
    const names = r.ingredients.map(x => (x.name || "").toLowerCase()); const have = names.filter(x => available.has(x)); const missing = names.filter(x => !available.has(x));
    const urgent = have.reduce((s, x) => s + (available.get(x)! >= 55 ? 1 : 0), 0);
    const nutritionFit = Math.max(0, 25 - Math.abs((r.calories || 500) - (profile.calorieTarget || 2000) / 3) / 30);
    const score = have.length * 10 + urgent * 18 + nutritionFit - missing.length * 4 - (r.estimatedCost || 0) / 50;
    return { ...r, availableIngredients: have, missingIngredients: missing, score: Math.round(score), reason: urgent ? `Uses ${urgent} ingredient${urgent > 1 ? "s" : ""} that should be prioritized.` : have.length ? `Makes good use of ${have.slice(0, 2).join(" and ")} already at home.` : "Fits your saved food preferences and nutrition target." };
  }).sort((a, b) => b.score - a.score);
}
