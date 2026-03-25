"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function register(
  prevState: any,
  formData: FormData,
) {
  const name = (formData.get("name") as string).trim()
  const email = (formData.get("email") as string).trim().toLowerCase()
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "User already exists with this email" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })
    console.log("User created successfully:", newUser.email)
  } catch (error: any) {
    console.error("Prisma Registration Error:", error)
    if (error.code === 'P2031') {
        return { error: "Database needs to be a Replica Set. See instructions in chat." }
    }
    return { error: "Failed to create account. Check your database connection." }
  }

  redirect("/login")
}

export async function googleLogin() {
    // This is handled via auth.ts but exported here for the client form
}