"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "forgot">("login")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(e.target as HTMLFormElement)

    try {
      if (activeTab === "login") {
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setMessage({ type: "error", text: error.message })
        } else {
          setMessage({ type: "success", text: "Login successful!" })
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1500)
        }
      } else if (activeTab === "signup") {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string
        const fullName = formData.get("fullName") as string

        if (password !== confirmPassword) {
          setMessage({ type: "error", text: "Passwords do not match!" })
          setIsLoading(false)
          return
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (error) {
          setMessage({ type: "error", text: error.message })
        } else {
          setMessage({
            type: "success",
            text: "Account created successfully! Please check your email to verify your account.",
          })
        }
      } else if (activeTab === "forgot") {
        const email = formData.get("email") as string

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        })

        if (error) {
          setMessage({ type: "error", text: error.message })
        } else {
          setMessage({ type: "success", text: "Password reset link sent to your email!" })
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred. Please try again." })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f8fbf6] flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-[#799584]/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#799584]"></div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#2d4a37] mb-2 tracking-tight">THAILI</h1>
            <p className="text-[#6b7c6f]">Your Chat & Deals Platform</p>
          </div>

          {activeTab !== "forgot" && (
            <div className="flex mb-8 bg-[#f0f5f2] rounded-xl p-1.5 border border-[#e1ebe4]">
              <button
                className={`flex-1 py-3 px-5 rounded-lg font-medium transition-all ${
                  activeTab === "login"
                    ? "bg-white text-[#799584] shadow-sm font-semibold"
                    : "text-[#6b7c6f] hover:text-[#799584]"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 px-5 rounded-lg font-medium transition-all ${
                  activeTab === "signup"
                    ? "bg-white text-[#799584] shadow-sm font-semibold"
                    : "text-[#6b7c6f] hover:text-[#799584]"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>
          )}

          {message && (
            <div
              className={`mb-6 p-3 rounded-lg text-center font-medium ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center mb-6">
              <div className="w-10 h-10 border-4 border-[#e1ebe4] border-t-[#799584] rounded-full animate-spin"></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {activeTab === "login" && (
              <>
                <h2 className="text-3xl font-semibold text-[#2d4a37] text-center mb-5 tracking-tight">Welcome Back</h2>
                <div>
                  <Label htmlFor="loginEmail" className="text-[#2d4a37] font-medium">
                    Email
                  </Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    name="email"
                    required
                    className="mt-2 border-2 border-[#e1ebe4] bg-[#fafcfb] focus:border-[#799584] focus:bg-white rounded-xl py-3.5 px-4 transition-all"
                  />
                </div>
                <div>
                  <Label htmlFor="loginPassword" className="text-[#2d4a37] font-medium">
                    Password
                  </Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    name="password"
                    required
                    className="mt-2 border-2 border-[#e1ebe4] bg-[#fafcfb] focus:border-[#799584] focus:bg-white rounded-xl py-3.5 px-4 transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#799584] hover:bg-[#6b8473] text-white py-4 rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#799584]/30 disabled:opacity-60 disabled:transform-none"
                >
                  Login
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab("forgot")}
                    className="text-[#799584] hover:text-[#6b8473] font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            )}

            {activeTab === "signup" && (
              <>
                <h2 className="text-3xl font-semibold text-[#2d4a37] text-center mb-5 tracking-tight">
                  Create Account
                </h2>
                <div>
                  <Label htmlFor="signupName" className="text-[#2d4a37] font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="signupName"
                    type="text"
                    name="fullName"
                    required
                    className="mt-2 border-2 border-[#e1ebe4] bg-[#fafcfb] focus:border-[#799584] focus:bg-white rounded-xl py-3.5 px-4 transition-all"
                  />
                </div>
                <div>
                  <Label htmlFor="signupEmail" className="text-[#2d4a37] font-medium">
                    Email
                  </Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    name="email"
                    required
                    className="mt-2 border-2 border-[#e1ebe4] bg-[#fafcfb] focus:border-[#799584] focus:bg-white rounded-xl py-3.5 px-4 transition-all"
                  />
                </div>
                <div>
                  <Label htmlFor="signupPassword" className="text-[#2d4a37] font-medium">
                    Password
                  </Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    className="mt-2 border-2 border-[#e1ebe4] bg-[#fafcfb] focus:border-[#799584] focus:bg-white rounded-xl py-3.5 px-4 transition-all"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-[#2d4a37] font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    required
                    minLength={6}
                    className="mt-2 border-2 border-[#e1ebe4] bg-[#fafcfb] focus:border-[#799584] focus:bg-white rounded-xl py-3.5 px-4 transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#799584] hover:bg-[#6b8473] text-white py-4 rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#799584]/30 disabled:opacity-60 disabled:transform-none"
                >
                  Sign Up
                </Button>
              </>
            )}

            {activeTab === "forgot" && (
              <>
                <h2 className="text-3xl font-semibold text-[#2d4a37] text-center mb-3 tracking-tight">
                  Reset Password
                </h2>
                <p className="text-[#6b7c6f] text-center mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div>
                  <Label htmlFor="resetEmail" className="text-[#2d4a37] font-medium">
                    Email
                  </Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    name="email"
                    required
                    className="mt-2 border-2 border-[#e1ebe4] bg-[#fafcfb] focus:border-[#799584] focus:bg-white rounded-xl py-3.5 px-4 transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#799584] hover:bg-[#6b8473] text-white py-4 rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#799584]/30 disabled:opacity-60 disabled:transform-none"
                >
                  Send Reset Link
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="text-[#799584] hover:text-[#6b8473] font-medium transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-[#799584] hover:text-[#6b8473] font-medium transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
