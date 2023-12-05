import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: { account: any; profile: any }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.startsWith("muhamadaqil383@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
