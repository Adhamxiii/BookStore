"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const FormLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      const res = await login({ email, password });
      const data = res.data;
      if (!res.success || data?.success === false) {
        throw new Error(data?.error || "Login failed");
      }
      //   if (data?.token) {
      //     try {
      //       localStorage.setItem("token", data.token);
      //       localStorage.setItem("role", data.role || "user");
      //     } catch (_) {}
      //   }
      const redirect =
        data?.redirect || (data?.data?.role === "admin" ? "/admin" : "/");
      router.replace(redirect);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] max-w-screen-xl mx-auto items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-8">
      <Card className="w-[500px] shadow-lg border border-gray-100">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to manage your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 my-auto inline-flex h-8 items-center rounded px-2 text-xs text-gray-600 hover:text-gray-900"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center text-sm text-gray-600">
          <Link className="opacity-80" href="/register">
            Don't have an account? Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormLogin;
