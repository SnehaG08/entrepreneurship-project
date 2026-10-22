import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";
export async function requireUser(admin = false) { const session = await getServerSession(authOptions); if (!session?.user?.id) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }; if (admin && session.user.role !== "admin") return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) }; return { session }; }
export const fail = (error: unknown, status = 400) => NextResponse.json({ error: error instanceof Error ? error.message : "Request failed" }, { status });
