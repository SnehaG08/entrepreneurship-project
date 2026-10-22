import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{ts,tsx}"], theme: { extend: { colors: { forest: "#166534", emerald: "#10B981", cream: "#FAFAF5", ink: "#172B20" }, boxShadow: { soft: "0 12px 40px rgba(20,83,45,.08)" } } }, plugins: [] } satisfies Config;
