// ============================================================
// FILE: app/donate/page.tsx
// Usage Example for Your Donation Form
// ============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DonationPayment } from "@/features/payment/components/DonationPayment";
import { DonationPaymentData } from "@/features/payment/types";

export default function DonatePage() {
  const router = useRouter();

  // Your collected form data
  const [formData, setFormData] = useState({
    // Gift Amount
    selectedGiftAmount: 25, // $25, $50, $100, $250, $500
    customAmount: 0,

    // Donation Frequency
    donationFrequency: "one-time" as "one-time" | "monthly",

    // Select Gift Amount (monthly)
    monthlyAmount: 25,

    // Other Amount
    otherAmount: 0,

    // Campaign Type
    campaignType: "",

    // User Information
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",

    // Optional
    isAnonymous: false,
  });

  // Calculate final amount (in cents for Stripe)
  const getFinalAmount = (): number => {
    if (formData.otherAmount > 0) {
      return formData.otherAmount * 100; // Convert to cents
    }

    if (formData.donationFrequency === "monthly") {
      return formData.monthlyAmount * 100;
    }

    return formData.selectedGiftAmount * 100;
  };

  // Prepare payment data from your form
  const preparePaymentData = (): DonationPaymentData => {
    return {
      amount: getFinalAmount(),
      currency: "usd",
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      streetAddress: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      phoneNumber: formData.phoneNumber,
      campaign: formData.campaignType || "General",
      donationFrequency: formData.donationFrequency,
      isAnonymous: formData.isAnonymous,
    };
  };

  const handlePaymentSuccess = () => {
    console.log("✅ Donation successful!");

    // Redirect to thank you page
    router.push("/thank-you");

    // Or show success message
    // toast.success('Thank you for your donation!');
  };

  const handlePaymentError = (error: string) => {
    console.error("❌ Payment failed:", error);

    // Show error message to user
    // You can add additional error handling here
  };

  // Check if form is complete
  const isFormComplete = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.streetAddress.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.zipCode.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      getFinalAmount() >= 100 // Minimum $1.00
    );
  };

  return (
    <div className="container mx-auto max-w-4xl p-8">
      {/* Your existing donation form UI */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Gift Amount Selection */}
        <section>
          <h2 className="text-xl font-semibold mb-4">How Your Gift Helps</h2>
          <div className="grid grid-cols-3 gap-4">
            {[25, 50, 100, 250, 500].map((amount) => (
              <button
                key={amount}
                onClick={() =>
                  setFormData({ ...formData, selectedGiftAmount: amount })
                }
                className={`p-4 border-2 rounded-lg ${
                  formData.selectedGiftAmount === amount
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="text-2xl font-bold">${amount}</div>
                <div className="text-sm text-gray-600">One-Time Gift</div>
              </button>
            ))}
          </div>
        </section>

        {/* Donation Frequency */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Donation Frequency</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() =>
                setFormData({ ...formData, donationFrequency: "one-time" })
              }
              className={`p-4 border-2 rounded-lg ${
                formData.donationFrequency === "one-time"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              One-Time Gift
            </button>
            <button
              onClick={() =>
                setFormData({ ...formData, donationFrequency: "monthly" })
              }
              className={`p-4 border-2 rounded-lg ${
                formData.donationFrequency === "monthly"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              Monthly Giving
            </button>
          </div>
        </section>

        {/* User Information Form */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-3 border rounded-lg col-span-2"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={formData.streetAddress}
              onChange={(e) =>
                setFormData({ ...formData, streetAddress: e.target.value })
              }
              className="p-3 border rounded-lg col-span-2"
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
              className="p-3 border rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="p-3 border rounded-lg"
            />
          </div>
        </section>

        {/* Campaign Selection */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Campaign (Optional)</h2>
          <input
            type="text"
            placeholder="e.g., Healthcare, Education"
            value={formData.campaignType}
            onChange={(e) =>
              setFormData({ ...formData, campaignType: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
        </section>

        {/* Anonymous Donation */}
        <section>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) =>
                setFormData({ ...formData, isAnonymous: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span>Make this donation anonymous</span>
          </label>
        </section>

        {/* Total Amount Display */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total Gift:</span>
            <span>${(getFinalAmount() / 100).toFixed(2)}</span>
          </div>
        </section>

        {/* Payment Button - This is what you need! */}
        <DonationPayment
          donationData={preparePaymentData()}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />

        {/* Form validation message */}
        {!isFormComplete() && (
          <p className="text-sm text-red-500 text-center">
            Please fill in all required fields before proceeding to payment
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ALTERNATIVE: More Flexible Approach
// ============================================================

// If you want more control over the button appearance:
/*
import { PaymentButton } from '@/features/payment';

<PaymentButton
  type="donation"
  amount={getFinalAmount()}
  currency="usd"
  createEndpoint="/api/donations/create"
  buttonText={`Complete Donation of $${(getFinalAmount() / 100).toFixed(2)}`}
  buttonVariant="default"
  buttonClassName="w-full h-14 text-lg font-semibold"
  paymentData={preparePaymentData()}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
  disabled={!isFormComplete()}
/>
*/
