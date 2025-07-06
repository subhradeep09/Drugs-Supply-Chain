"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/ui/card";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";
import { UploadCloud, LogOut, Loader2, CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ApplyVerificationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(1);
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

  const [uploadedFiles, setUploadedFiles] = useState({
    idProofFile: null,
    licenseCertificateFile: null,
    addressProofFile: null,
  });

  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) return router.push("/sign-in");

    const checkStatus = async () => {
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
      } catch {
        setFormData((prev) => ({
          ...prev,
          name: session.user?.name || "",
          email: session.user?.email || "",
        }));
        setChecking(false);
      }
    };

    checkStatus();
  }, [session, status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setUploadedFiles((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const removeFile = (fileType) => {
    setFormData((prev) => ({ ...prev, [fileType]: null }));
    setUploadedFiles((prev) => ({ ...prev, [fileType]: null }));
    // Reset the file input
    document.getElementById(fileType).value = "";
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    } catch {
      setStatusMsg("\u274c Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || checking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-800">
        <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200 dark:border-zinc-700 shadow-lg">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Checking verification status...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">This won't take long</p>
        </div>
      </div>
    );
  }

  const renderFileUpload = (name, label, required = true) => {
    const file = uploadedFiles[name];
    
    return (
      <div className="space-y-2">
        <Label className="text-gray-700 dark:text-gray-300 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex items-center justify-center w-full">
          <label className={`flex flex-col items-center justify-center w-full min-h-32 border-2 ${file ? 'border-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-dashed border-gray-300 dark:border-zinc-600'} rounded-xl bg-white/50 dark:bg-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-700/50 cursor-pointer transition-all duration-200 group`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              {file ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center bg-white dark:bg-zinc-700 rounded-lg px-3 py-2 mb-2 w-full max-w-xs">
                    <span className="truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                      {file.name}
                    </span>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(name);
                      }}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400">Click to change file</span>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF, JPG, PNG (MAX. 5MB)</p>
                </>
              )}
            </div>
            <Input 
              type="file" 
              id={name}
              name={name} 
              onChange={handleFileChange} 
              required={required && !file}
              className="hidden" 
            />
          </label>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    const commonInputStyle = "rounded-xl border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 px-4 py-3 text-gray-800 dark:text-gray-200";

    if (step === 1) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">Full Name</Label>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className={commonInputStyle}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">Email</Label>
              <Input 
                name="email" 
                value={formData.email} 
                readOnly 
                className="bg-gray-100 dark:bg-zinc-700 cursor-not-allowed text-gray-600 dark:text-gray-400 px-4 py-3 rounded-xl" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">Phone Number</Label>
              <Input 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                required 
                className={commonInputStyle}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">Designation</Label>
              <Input 
                name="designation" 
                value={formData.designation} 
                onChange={handleChange} 
                required 
                className={commonInputStyle}
              />
            </div>
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">Organization</Label>
              <Input 
                name="organization" 
                value={formData.organization} 
                onChange={handleChange} 
                required 
                className={commonInputStyle}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">License Number</Label>
              <Input 
                name="licenseNumber" 
                value={formData.licenseNumber} 
                onChange={handleChange} 
                required 
                className={commonInputStyle}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">License Type</Label>
              <Input 
                name="licenseType" 
                value={formData.licenseType} 
                onChange={handleChange} 
                required 
                className={commonInputStyle}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">Issued By</Label>
              <Input 
                name="licenseIssuedBy" 
                value={formData.licenseIssuedBy} 
                onChange={handleChange} 
                required 
                className={commonInputStyle}
              />
            </div>
          </div>
        </div>
      );
    } else if (step === 3) {
      return (
        <div className="space-y-8">
          {renderFileUpload("idProofFile", "ID Proof")}
          {renderFileUpload("licenseCertificateFile", "License Certificate")}
          {renderFileUpload("addressProofFile", "Address Proof (Optional)", false)}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <Card className="w-full max-w-3xl rounded-2xl shadow-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-gray-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Verification Application</CardTitle>
            <CardDescription className="text-indigo-100">Complete your profile to access all features</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium">
              Step {step} of 3
            </div>
            <Button 
              variant="ghost" 
              onClick={() => signOut({ callbackUrl: "/sign-in" })} 
              className="hover:bg-white/10 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>

        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out ${
                step === 1 ? "w-1/3 bg-indigo-500" : 
                step === 2 ? "w-2/3 bg-purple-500" : 
                "w-full bg-pink-500"
              }`}
            ></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}

            {statusMsg && (
              <div className={`p-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                statusMsg.includes("\u274c")
                  ? "bg-red-100/80 dark:bg-red-900/50 text-red-700 dark:text-red-200"
                  : "bg-green-100/80 dark:bg-green-900/50 text-green-700 dark:text-green-200"
              }`}>
                {statusMsg.replace("\u274c", "").trim()}
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              {step > 1 ? (
                <Button 
                  type="button" 
                  onClick={prevStep} 
                  variant="outline" 
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
              ) : (
                <div></div> // Empty div to maintain space
              )}
              
              {step < 3 ? (
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  className="ml-auto gap-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="ml-auto bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:from-indigo-700 hover:to-pink-700 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 gap-1"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      Submit Application <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}