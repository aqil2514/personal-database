import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email === "muhamadaqil383@gmail.com") return true;

      return false;
    },
  },
});
export { handler as GET, handler as POST };
