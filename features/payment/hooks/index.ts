"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  CardDetails,
  CreatePaymentResponse,
  PaymentData,
  StripeError,
  StripePaymentIntent,
  StripePaymentMethod,
} from "../types";

interface UseStripePaymentReturn<T extends PaymentData> {
  processPayment: (
    paymentData: T,
    cardDetails: CardDetails
  ) => Promise<boolean>;
  isProcessing: boolean;
  error: string | null;
  clearError: () => void;
}

export const useStripePayment = <T extends PaymentData>(
  createEndpoint: string
): UseStripePaymentReturn<T> => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);
  const token = localStorage.getItem("accessToken");

  const processPayment = async (
    paymentData: T,
    cardDetails: CardDetails
  ): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Create donation/order and get payment intent
      const createResponse = await fetch(`${createEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!createResponse.ok) {
        const errorData = (await createResponse.json()) as { message?: string };
        throw new Error(errorData.message || "Failed to create payment intent");
      }

      const createData = (await createResponse.json()) as {
        data: CreatePaymentResponse;
      };
      const { paymentIntentId, clientSecret } = createData.data;

      // Step 2: Create payment method with Stripe
      const paymentMethodData = new URLSearchParams({
        type: "card",
        "card[number]": cardDetails.number,
        "card[exp_month]": cardDetails.exp_month,
        "card[exp_year]": cardDetails.exp_year,
        "card[cvc]": cardDetails.cvc,
      });

      const stripePublishableKey =
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!stripePublishableKey) {
        throw new Error("Stripe publishable key is not configured");
      }

      const paymentMethodResponse = await fetch(
        "https://api.stripe.com/v1/payment_methods",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${stripePublishableKey}`,
          },
          body: paymentMethodData.toString(),
        }
      );

      if (!paymentMethodResponse.ok) {
        const errorData = (await paymentMethodResponse.json()) as StripeError;
        throw new Error(
          errorData.error.message || "Failed to create payment method"
        );
      }

      const paymentMethodResult =
        (await paymentMethodResponse.json()) as StripePaymentMethod;
      const paymentMethodId = paymentMethodResult.id;

      // Step 3: Confirm payment intent
      const confirmData = new URLSearchParams({
        payment_method: paymentMethodId,
        client_secret: clientSecret || "",
      });

      const confirmResponse = await fetch(
        `https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${stripePublishableKey}`,
          },
          body: confirmData.toString(),
        }
      );

      if (!confirmResponse.ok) {
        const errorData = (await confirmResponse.json()) as StripeError;
        throw new Error(
          errorData.error.message || "Payment confirmation failed"
        );
      }

      const confirmResult =
        (await confirmResponse.json()) as StripePaymentIntent;

      if (confirmResult.status === "succeeded") {
        toast.success("Payment successful!");
        return true;
      } else if (confirmResult.status === "requires_action") {
        throw new Error("Payment requires additional authentication");
      } else {
        throw new Error(`Payment status: ${confirmResult.status}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Payment failed";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { processPayment, isProcessing, error, clearError };
};
