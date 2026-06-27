import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserAuthService } from "../utils/userAuthService";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      setMessage("No payment reference found.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await UserAuthService.authenticatedRequest(
          `${API_BASE}/orders/${reference}/verify`,
          { method: "POST" },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.msg || "Verification failed");
        }

        const data = await response.json();

        // 🔍 Log the actual response to see its structure
        console.log("✅ Verification response:", data);

        // Paystack response structure:
        // {
        //   "status": true,                 // boolean – overall success
        //   "message": "Verification successful",
        //   "data": {
        //     "status": "success",          // transaction status (string)
        //     "reference": "...",
        //     ...
        //   }
        // }
        //
        // Your backend might wrap it further – we handle both cases.

        // Determine if payment succeeded
        const isSuccess =
          // Top-level status is true (Paystack native)
          (data.status === true || data.status === "true") &&
          // And inner transaction status is "success" (string)
          (data.data?.status === "success" || data.data?.status === true);

        if (isSuccess) {
          setStatus("success");
          setMessage("✅ Payment successful! Your order is confirmed.");
        } else {
          setStatus("failed");
          setMessage("❌ Payment was not successful. Please try again.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("We could not verify your payment. Please contact support.");
      }
    };

    verifyPayment();
  }, [reference]);

  // Redirect to orders on success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => navigate("/dashboard?tab=orders"), 5000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-4">
        {status === "verifying" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0C850C] mx-auto" />
            <p className="text-gray-600">Verifying your payment...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-5xl">✅</div>
            <h2 className="text-2xl font-bold text-[#0C850C]">{message}</h2>
            <p className="text-sm text-gray-500">Redirecting to your orders…</p>
          </>
        )}
        {(status === "failed" || status === "error") && (
          <>
            <div className="text-5xl">❌</div>
            <h2 className="text-2xl font-bold text-red-600">{message}</h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 bg-[#0C850C] text-white px-6 py-2 rounded-lg"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;
