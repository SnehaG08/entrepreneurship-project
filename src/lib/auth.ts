import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "./db";
import User from "@/models/User";
import { allowRequest } from "./rateLimit";
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, pages: { signIn: "/login" },
  providers: [Credentials({ name: "Email and password", credentials: { email: {}, password: {} }, async authorize(raw, req) {
    const ip = String(req.headers?.["x-forwarded-for"] || req.headers?.["x-real-ip"] || "local");
    if (!allowRequest(`login:${ip}`, 8)) throw new Error("Too many login attempts. Try again later.");
    const parsed = z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse(raw); if (!parsed.success) return null;
    await connectDB(); const user = await User.findOne({ email: parsed.data.email.toLowerCase() }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return null;
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  } })],
  callbacks: { async jwt({ token, user }) { if (user) { token.id = user.id; token.role = user.role; } return token; }, async session({ session, token }) { session.user.id = token.id; session.user.role = token.role; return session; } }
};
