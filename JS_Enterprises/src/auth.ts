import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import authConfig from "./auth.config"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        // Clean user input
        const cleanEmail = (credentials.email as string).trim().toLowerCase()
        console.log("Authorize: Finding user with email:", cleanEmail)

        const user = await prisma.user.findUnique({
          where: { email: cleanEmail }
        })

        if (!user) {
          console.log("Authorize: User not found in database")
          return null
        }
        
        if (!user.password) {
          console.log("Authorize: User exists but has no password (signed in with Google?)")
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        console.log("Authorize: Password match result:", passwordsMatch)

        if (passwordsMatch) return user

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as any
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  }
})