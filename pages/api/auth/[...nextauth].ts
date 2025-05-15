import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "models/User"; // sigurohu që rruga është korrekte

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });
        if (user && credentials?.password === user.password) {
          return { id: user._id, email: user.email, role: user.role };
        }

        throw new Error("Email ose fjalëkalim i pasaktë");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in/index",
  },
  secret: process.env.NEXTAUTH_SECRET,
});