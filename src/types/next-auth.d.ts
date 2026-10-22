import "next-auth";
declare module "next-auth" { interface Session { user: { id: string; role: "user" | "admin"; name?: string | null; email?: string | null } } interface User { role: "user" | "admin" } }
declare module "next-auth/jwt" { interface JWT { id: string; role: "user" | "admin" } }
