"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/ui/card";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";

export default function ApplyVerificationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    licenseNumber: "",
    organization: "",
    email: "",
    name: "",
  });

  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/sign-in");
      return;
    }

    const checkApplicationStatus = async () => {
      try {
        const res = await fetch("/api/verification/status");
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Not Applied");
        }

        const rolePathMap: Record<string, string> = {
          ADMIN: "/admin",
          HOSPITAL_STAFF: "/hospital",
          PHARMACY_STAFF: "/pharmacy",
          VENDOR: "/vendor",
        };

        if (data.applicationStatus === "APPROVED") {
          const role = session.user.role?.toLowerCase() || "";
          router.push(`/dashboard/${role}`);
        } else if (data.hasApplied) {
          router.push("/application-status");
        } else {
          setFormData({
            licenseNumber: "",
            organization: "",
            email: session.user?.email || "",
            name: session.user?.name || "",
          });
          setChecking(false);
        }
      } catch (err) {
        // Not applied — show form
        setFormData({
          licenseNumber: "",
          organization: "",
          email: session.user?.email || "",
          name: session.user?.name || "",
        });
        setChecking(false);
      }
    };

    checkApplicationStatus();
  }, [session, status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/verification/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/application-status");
        window.location.href = "/application-status";
      } else {
        setStatusMsg(`❌ ${data.message || "Submission failed"}`);
      }
    } catch (err) {
      setStatusMsg("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Apply for Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            className="mb-4 w-full"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          >
            Logout
          </Button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                placeholder="Enter your license number"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                name="organization"
                placeholder="Enter your organization name"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </div>

            {statusMsg && (
              <p className="text-sm text-center text-red-500">{statusMsg}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Verification Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
