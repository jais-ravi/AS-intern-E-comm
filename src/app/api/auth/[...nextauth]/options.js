import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user-model";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials", // Fixed typo: changed 'credentails' to 'credentials'
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentials.email, // Fixed: `credentials.email` instead of `credentials.identifier`
          });
          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Email or Password incorrect");
          }
        } catch (err) {
          throw new Error(err.message); // Improved error handling
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // If user or profile exists, set the username
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.username = user.username || profile?.name; 
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the token data to the session
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
        session.user.username = token.username || ""; // Use username or fallback to empty string
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        if (!profile?.email) {
          throw new Error("No email available from Google profile");
        }

        await dbConnect();
        try {
          // Upsert (Create if not exists, otherwise update)
          await UserModel.findOneAndUpdate(
            { email: profile.email },
            {
              $set: {
                email: profile.email,
                username: profile.name,
                isVerified: true, 
                verifyCode:"",
              },
            },
            { upsert: true, new: true }
          );
        } catch (error) {
          throw new Error("Failed to upsert user");
        }
      }
      return true; // Allow sign-in for other providers as well
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the home page after successful sign-in
      return baseUrl;
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
