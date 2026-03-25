"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

export async function login(
  prevState: any,
  formData: FormData,
) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Please enter both email and password." }
  }

  try {
    console.log("Attempting login for:", email)
    await signIn("credentials", {
        email,
        password,
        redirectTo: "/"
    })
  } catch (error) {
    if (isRedirectError(error)) {
        throw error
    }
    if (error instanceof AuthError) {
      console.error("Auth.js Error Type:", error.type)
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." }
        default:
          return { error: "Something went wrong during login." }
      }
    }
    console.error("Unexpected Login Error:", error)
    throw error
  }
}

export async function googleLogin() {
    await signIn("google", { redirectTo: "/" })
}