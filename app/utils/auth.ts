import { getUserByEmail } from "@/actions/user"
import  prisma  from "./db"
import { env } from "@/env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { Account, AuthOptions, Profile, Session, User } from "next-auth"
import { type JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { sendEmail } from "@/actions/email"
import {currentProfile} from "@/actions/current-profile";

import { siteConfig } from "./site"
import { MagicLinkEmail } from "@/emails/magic-link-email"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: env.NODE_ENV === "development",
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 daysd
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    verifyRequest: "/signin/magic-link-signin",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Email({
      type: "email",
      async sendVerificationRequest({
        identifier,
        url,
      }: {
        identifier: string
        url: string
      }) {
        try {
          const emailSent = await sendEmail({
            from: env.RESEND_EMAIL_FROM,
            to: [identifier],
            subject: `${siteConfig.name} magic link sign in`,
            react: MagicLinkEmail({ identifier, url }),
          })
          return void { success: true, data: emailSent }
        } catch (error) {
          throw new Error("Failed to send verification email")
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null

        const user = await getUserByEmail(credentials.email)
        if (!user) return null

        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          String(user.passwordHash)
        )

        return passwordIsValid ? user : null
      },
    }),
  ],
  jwt: {
    encode({ secret, token }) {
      if (!token) throw new Error("No token to encode")
      return jwt.sign(token, secret)
    },
    decode({ secret, token }) {
      if (!token) throw new Error("No token to decode")
      const decodedToken = jwt.verify(token, secret)
      return typeof decodedToken === "string"
        ? (JSON.parse(decodedToken) as JWT)
        : decodedToken
    },
  },
  callbacks: {
    jwt: async (params) => {
      if (params.user) {
        params.token.email = params.user.email;
        params.token.id = params.user?.id;
        // Call the currentProfile function to handle Xata API call
        await currentProfile(params.token, params.token, params.user.id);
      }

      return params.token;
    },
    session: async (params) => {
      if (params.session.user) {
        // Fetch user from the database using Prisma
        const prismaUser = await prisma.user.findFirst({
          where: {
            email: params.token.email,
          },
        });
    
        // Update username if not present
        if (prismaUser && !prismaUser.username) {
          await prisma.user.update({
            where: {
              id: prismaUser.id,
            },
            data: {
              username: prismaUser.name?.split(" ").join("").toLowerCase(),
            },
          });
        }
    
        // Return the updated session
        return {
          ...params.session,
          user: {
            ...params.session.user,
            email: params.token.email,
            id: params.token.id as string,
            username: prismaUser?.username,
            // You may add other properties here as needed
          },
        };
      }
    
      // Return the original session if there's no user in the session
      return params.session;
    }
    
  }

}