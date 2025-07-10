"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/app/ui/button";
import { Input } from "@/app/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.ok) {
      let session = await getSession();
      const maxRetries = 10;
      let retries = 0;
      while (!session && retries < maxRetries) {
        await new Promise((r) => setTimeout(r, 200));
        session = await getSession();
        retries++;
      }

      if (!session) {
        setError("Session load failed.");
        setIsLoading(false);
        return;
      }
       try {
  await fetch('/api/verification/update-activity', { method: 'POST' });
} catch (err) {
  console.warn('Failed to update user activity timestamp:', err);
}
      try {
        const res = await fetch("/api/verification/status");
        const data = await res.json();

        if (res.status === 404 || !data.hasApplied) {
          // Not applied
          router.push("/apply-verification");
        } else if (res.ok && data.applicationStatus === "APPROVED") {
          const role = session.user?.role?.toLowerCase() || "";
          router.push(`/dashboard/${role}`);
        } else {
          // PENDING or REJECTED
          router.push("/application-status");
        }
      } catch (err) {
        console.error("Verification check error:", err);
        setError("Something went wrong. Try again.");
      }
    } else {
      setError(result?.error || "Invalid credentials");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
