export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard/:path*","/onboarding/:path*","/inventory/:path*","/priorities/:path*","/meal-planner/:path*","/recipes/:path*","/shopping/:path*","/nutrition/:path*","/waste-tracker/:path*","/notifications/:path*","/profile/:path*","/settings/:path*","/admin/:path*"] };
