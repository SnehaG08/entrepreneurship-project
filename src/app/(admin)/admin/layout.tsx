import { getServerSession } from "next-auth"; import { redirect } from "next/navigation"; import { authOptions } from "@/lib/auth";
export default async function AdminLayout({children}:{children:React.ReactNode}){const s=await getServerSession(authOptions);if(s?.user.role!=="admin")redirect("/dashboard");return <main className="container section">{children}</main>}
