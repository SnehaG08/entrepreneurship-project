import { NextResponse } from "next/server"; import { connectDB } from "@/lib/db"; import { requireUser } from "@/lib/api"; import Activity from "@/models/Activity";
export async function GET(){const a=await requireUser();if(a.error)return a.error;await connectDB();return NextResponse.json(await Activity.find({userId:a.session!.user.id,type:"discard"}).sort({date:-1}).lean())}
