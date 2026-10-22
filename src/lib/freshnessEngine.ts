export type FreshnessInput = { expiryDate?: string | Date | null; dateType?: string; status?: string; freshnessObservations?: string[]; category?: string };
export function getFreshness(item: FreshnessInput, now = new Date()) {
  const obs = (item.freshnessObservations || []).map(x => x.toLowerCase());
  if (item.status === "unsafe" || obs.some(x => ["mold", "slimy", "bad smell", "spoiled"].includes(x))) return { level: "red", score: 100, label: "Do not use", reason: "Marked unsafe or showing a reported spoilage sign." };
  if (!item.expiryDate) return { level: "green", score: 10, label: "Lower priority", reason: "No dated freshness signal; check before use." };
  const days = Math.ceil((new Date(item.expiryDate).getTime() - now.getTime()) / 86400000);
  if (days < 0 && item.dateType === "use-by") return { level: "red", score: 100, label: "Do not use", reason: "Past its use-by date. Follow official food-safety guidance." };
  if (days <= 2) return { level: "orange", score: 80, label: "Use soon", reason: `${item.dateType === "best-before" ? "Quality date" : "Relevant date"} is approaching; inspect before use.` };
  if (days <= 5) return { level: "yellow", score: 55, label: "Plan to use", reason: "Its estimated use window is approaching." };
  return { level: "green", score: 20, label: "Lower priority", reason: "No urgent dated signal right now." };
}
