"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/ui/button";
import Link from "next/link";

interface Verification {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  designation: string;
  licenseNumber: string;
  licenseType: string;
  licenseIssuedBy: string;
  organization: string;
  idProofUrl?: string;
  licenseCertificateUrl?: string;
  addressProofUrl?: string;
  applicationStatus: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

interface UserRequest {
  _id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  isEmailVerified: boolean;
  isVerified: boolean;
  verification?: Verification;
}

export default function UserVerificationRequests() {
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [verifiedDocs, setVerifiedDocs] = useState<{ [key: string]: { idProof?: boolean; license?: boolean; address?: boolean } }>({});
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/verification/all")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((u: UserRequest) => u.verification?.applicationStatus === "PENDING");
        setRequests(filtered);

        const storedState = localStorage.getItem("verifiedDocs");
        const parsedStored = storedState ? JSON.parse(storedState) : {};

        const initial: any = {};
        filtered.forEach((u: UserRequest) => {
          if (u.verification) {
            initial[u.verification._id] = {
              idProof: parsedStored[u.verification._id]?.idProof || false,
              license: parsedStored[u.verification._id]?.license || false,
              address: parsedStored[u.verification._id]?.address || false,
            };
          }
        });
        setVerifiedDocs(initial);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const updateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const res = await fetch("/api/verification/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verificationId: id, status }),
    });

    if (res.ok) {
      setRequests((prev) => prev.filter((u) => u.verification?._id !== id));
    }
  };

  const handleCheckboxChange = (vid: string, field: "idProof" | "license" | "address", checked: boolean) => {
    setVerifiedDocs((prev) => {
      const updated = {
        ...prev,
        [vid]: {
          ...prev[vid],
          [field]: prev[vid][field] || checked,
        },
      };
      localStorage.setItem("verifiedDocs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-tr from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">User Verification Requests</h1>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full text-sm border-collapse rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Email</th>
              <th className="p-3 text-left font-semibold">Organization</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Documents</th>
              <th className="p-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {requests.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{user.name}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 text-gray-600">{user.organization}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm whitespace-nowrap ${
                      user.verification?.applicationStatus === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : user.verification?.applicationStatus === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.verification?.applicationStatus || "-"}
                  </span>
                </td>
                <td className="p-3">
                  {user.verification && (
                    <Button
                      className="text-white-700 underline hover:text-blue-900 text-xs px-3 py-1"
                      onClick={() => setActiveModal(user.verification!._id)}
                    >
                      View
                    </Button>
                  )}
                </td>
                <td className="p-3">
                  {user.verification?.applicationStatus === "PENDING" && (
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-xs"
                        onClick={() => updateStatus(user.verification!._id, "APPROVED")}
                        disabled={
                          !verifiedDocs[user.verification._id]?.idProof ||
                          !verifiedDocs[user.verification._id]?.license ||
                          !verifiedDocs[user.verification._id]?.address
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs"
                        onClick={() => updateStatus(user.verification!._id, "REJECTED")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {requests.map((user) => {
        const v = user.verification;
        return (
          v && activeModal === v._id && (
            <div key={v._id} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-xl relative">
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">Document Verification - {user.name}</h2>

                <div className="mb-4">
                  <p><strong>Full Name:</strong> {v.fullName}</p>
                  <p><strong>Email:</strong> {v.email}</p>
                  <p><strong>Phone Number:</strong> {v.phoneNumber}</p>
                  <p><strong>Designation:</strong> {v.designation}</p>
                  <p><strong>License Number:</strong> {v.licenseNumber}</p>
                  <p><strong>License Type:</strong> {v.licenseType}</p>
                  <p><strong>License Issued By:</strong> {v.licenseIssuedBy}</p>
                  <p><strong>Organization:</strong> {v.organization}</p>
                  <p><strong>Submitted At:</strong> {new Date(v.submittedAt).toLocaleString()}</p>
                </div>

                {v.idProofUrl && (
                  <div className="mb-4">
                    <p className="font-semibold text-gray-700 mb-1">ID Proof</p>
                    <iframe src={v.idProofUrl} className="w-full h-72 border" />
                    <label className="block mt-2 text-sm">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={verifiedDocs[v._id]?.idProof || false}
                        disabled={verifiedDocs[v._id]?.idProof}
                        onChange={(e) => handleCheckboxChange(v._id, "idProof", e.target.checked)}
                      />
                      Verified
                    </label>
                  </div>
                )}
                {v.licenseCertificateUrl && (
                  <div className="mb-4">
                    <p className="font-semibold text-gray-700 mb-1">License Certificate</p>
                    <iframe src={v.licenseCertificateUrl} className="w-full h-72 border" />
                    <label className="block mt-2 text-sm">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={verifiedDocs[v._id]?.license || false}
                        disabled={verifiedDocs[v._id]?.license}
                        onChange={(e) => handleCheckboxChange(v._id, "license", e.target.checked)}
                      />
                      Verified
                    </label>
                  </div>
                )}
                {v.addressProofUrl && (
                  <div className="mb-4">
                    <p className="font-semibold text-gray-700 mb-1">Address Proof</p>
                    <iframe src={v.addressProofUrl} className="w-full h-72 border" />
                    <label className="block mt-2 text-sm">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={verifiedDocs[v._id]?.address || false}
                        disabled={verifiedDocs[v._id]?.address}
                        onChange={(e) => handleCheckboxChange(v._id, "address", e.target.checked)}
                      />
                      Verified
                    </label>
                  </div>
                )}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}
