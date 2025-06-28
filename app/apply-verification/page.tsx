"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/app/ui/card";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";
import { UploadCloud, LogOut, Loader2, CheckCircle2 } from "lucide-react";

export default function ApplyVerificationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    designation: "",
    licenseNumber: "",
    licenseType: "",
    licenseIssuedBy: "",
    organization: "",
    idProofFile: null,
    licenseCertificateFile: null,
    addressProofFile: null,
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

        if (data.applicationStatus === "APPROVED") {
          const role = session.user.role?.toLowerCase() || "";
          router.push(`/dashboard/${role}`);
        } else if (data.hasApplied) {
          router.push("/application-status");
        } else {
          setFormData((prev) => ({
            ...prev,
            name: session.user?.name || "",
            email: session.user?.email || "",
          }));
          setChecking(false);
        }
      } catch (err) {
        setFormData((prev) => ({
          ...prev,
          name: session.user?.name || "",
          email: session.user?.email || "",
        }));
        setChecking(false);
      }
    };

    checkApplicationStatus();
  }, [session, status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      const res = await fetch("/api/verification/apply", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/application-status");
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-background p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Checking your verification status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] dark:from-[#232526] dark:to-[#414345] p-6">
      <Card className="w-full max-w-3xl shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white flex justify-between items-center">
          <div>
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              Welcome, {session?.user?.name || "User"}!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Complete your profile to unlock all features.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 gap-2"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-semibold text-xl">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    readOnly
                    className="bg-muted rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+91-XXXXXXXXXX"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="bg-background rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    name="designation"
                    placeholder="Doctor / Vendor / Pharmacist"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="bg-background rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-semibold text-xl">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    name="organization"
                    placeholder="Hospital / Pharmacy / Vendor Company"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="bg-background rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    placeholder="Enter your license number"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                    className="bg-background rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseType">License Type</Label>
                  <Input
                    id="licenseType"
                    name="licenseType"
                    placeholder="Drug / GST / Medical Council"
                    value={formData.licenseType}
                    onChange={handleChange}
                    required
                    className="bg-background rounded-lg shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseIssuedBy">Issued By</Label>
                  <Input
                    id="licenseIssuedBy"
                    name="licenseIssuedBy"
                    placeholder="Authority Name"
                    value={formData.licenseIssuedBy}
                    onChange={handleChange}
                    required
                    className="bg-background rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-semibold text-xl">Document Upload</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idProofFile">Government ID Proof</Label>
                  <div className="flex items-center gap-4">
                    <label className="w-full">
                      <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground text-center">
                          {formData.idProofFile
                            ? formData.idProofFile.name
                            : "Upload PDF or Image (Max 5MB)"}
                        </p>
                      </div>
                      <Input
                        id="idProofFile"
                        name="idProofFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licenseCertificateFile">License Certificate</Label>
                  <div className="flex items-center gap-4">
                    <label className="w-full">
                      <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground text-center">
                          {formData.licenseCertificateFile
                            ? formData.licenseCertificateFile.name
                            : "Upload PDF or Image (Max 5MB)"}
                        </p>
                      </div>
                      <Input
                        id="licenseCertificateFile"
                        name="licenseCertificateFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressProofFile">Address Proof (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <label className="w-full">
                      <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground text-center">
                          {formData.addressProofFile
                            ? formData.addressProofFile.name
                            : "Upload PDF or Image (Max 5MB)"}
                        </p>
                      </div>
                      <Input
                        id="addressProofFile"
                        name="addressProofFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {statusMsg && (
              <div
                className={`p-4 rounded-lg ${
                  statusMsg.includes("❌")
                    ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300"
                    : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {statusMsg.includes("❌") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )}
                  <p>{statusMsg.replace("❌", "").trim()}</p>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit Verification Request"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
