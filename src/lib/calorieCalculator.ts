export type CalorieInput = { age: number; height: number; weight: number; sex: "male" | "female" | "skip"; activity: string; goal: string };
export function bmi(weight: number, heightCm: number) { return +(weight / ((heightCm / 100) ** 2)).toFixed(1); }
export function calorieTarget(i: CalorieInput) {
  const base = i.sex === "female" ? 10 * i.weight + 6.25 * i.height - 5 * i.age - 161 : i.sex === "male" ? 10 * i.weight + 6.25 * i.height - 5 * i.age + 5 : 10 * i.weight + 6.25 * i.height - 5 * i.age - 78;
  const mult: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725, extreme: 1.9 };
  const maintenance = base * (mult[i.activity] || 1.2);
  const adjustment = i.age < 18 ? 0 : i.goal === "lose" ? -300 : i.goal === "gain" || i.goal === "muscle" ? 250 : 0;
  return Math.max(1400, Math.round(maintenance + adjustment));
}
