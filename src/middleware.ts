import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
});

// export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"],
};
