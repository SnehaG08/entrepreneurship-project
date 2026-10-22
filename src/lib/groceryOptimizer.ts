const prices: Record<string, number> = { rice: 70, lentils: 140, tomato: 45, tomatoes: 45, spinach: 35, paneer: 320, milk: 65, onion: 40, onions: 40, potato: 35, potatoes: 35, carrot: 60, carrots: 60, curd: 80, oats: 180, tofu: 220, chicken: 260, eggs: 90 };
export function optimizeGroceries(meals: any[], inventory: any[], budget: number) {
  const have = new Set(inventory.filter(i => i.quantity > 0).map(i => i.foodName.toLowerCase()));
  const missing = new Map<string, number>();
  for (const m of meals) for (const ing of m.ingredients || []) { const n = String(ing.name).toLowerCase(); if (!have.has(n)) missing.set(n, (missing.get(n) || 0) + 1); }
  const items = [...missing].map(([name, uses]) => ({ name, quantity: 1, unit: "pack", estimatedCost: prices[name] || 80, priority: uses > 1 ? "high" : "normal", reason: `Needed for ${uses} planned meal${uses > 1 ? "s" : ""}.`, purchased: false }));
  const total = items.reduce((s, x) => s + x.estimatedCost, 0);
  return { items, estimatedTotal: total, budget, overBy: Math.max(0, total - budget) };
}
