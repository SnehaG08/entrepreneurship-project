import type { Metadata } from "next"; import "./globals.css"; import Providers from "@/components/Providers";
export const metadata: Metadata = { title: "FreshWise AI — Eat Smart. Waste Less.", description: "Personalized food inventory, meal planning and waste reduction." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><Providers>{children}</Providers></body></html>; }
