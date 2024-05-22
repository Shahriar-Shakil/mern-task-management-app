import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAccessToken } from "@/actions/auth";
import { getCurrentUser } from "@/data/getCurrentUser";

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours
  },
  pages: {
    signIn: "/login",
    newUser: "/registration",
  },
  providers: [
    CredentialsProvider({
      id: "email",
      name: "email",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "bruce@wayne.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const session = await getAccessToken({
          email: credentials.email,
          password: credentials.password,
        });
        if (!session.accessToken) {
          return null;
        }
        const user = await getCurrentUser(session.accessToken);

        if (user?.username) {
          return { ...user, accessToken: session.accessToken };
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = user?.accessToken;
      }
      //   console.log("user user", account);
      //   console.log("user profile", profile);
      return token;
    },
    async session({ session, token, user }) {
      //   console.log("session", session);
      //   console.log("token", token);
      //   console.log("user", user);

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
