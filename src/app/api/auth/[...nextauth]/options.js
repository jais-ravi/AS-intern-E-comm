import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user-model";

export const authOption = {
  providers: [
    CredentialsProvider({
      id: "credentails",
      name: "Credentails",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentails) {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentails.identifier,
          });
          if (!user) {
            throw new Error("No User found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify you account");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentails.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Email or Password incorrect");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username; //TODO: may causes error
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
