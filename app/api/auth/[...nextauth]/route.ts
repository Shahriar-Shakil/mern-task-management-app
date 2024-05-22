import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/actions/auth";
import { getCurrentUser } from "@/data/getCurrentUser";

const expireIn = Number(process.env.COOKIE_EXPIRATION_DAYS) || 24;
export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: expireIn * 60 * 60, // 23 hours
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

        if (user?.id) {
          return { ...user, accessToken: session.accessToken };
        } else return null;
      },
    }),
  ],
  callbacks: {
    //  =====> Add Below Callbacks <=====
    jwt: async ({ token, user }) => {
      if (user) {
        // Note that this if condition is needed
        token.user = { ...user };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        // Note that this if condition is needed
        session.user = token.user;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
