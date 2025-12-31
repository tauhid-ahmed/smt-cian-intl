"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { formatCurrency } from "../utils";

import {
  CardDetails,
  DonationPaymentData,
  PaymentData,
  ProductPaymentData,
} from "../types";
import { useStripePayment } from "../hooks";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

interface BasePaymentButtonProps<T extends PaymentData> {
  amount: number;
  currency?: string;
  createEndpoint: string;
  buttonText?: string;
  buttonVariant?: ButtonVariant;
  buttonClassName?: string;
  paymentData: T;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  cardDetails: CardDetails;
}

export type DonationPaymentButtonProps =
  BasePaymentButtonProps<DonationPaymentData> & {
    type: "donation";
  };

export type ProductPaymentButtonProps =
  BasePaymentButtonProps<ProductPaymentData> & {
    type: "product";
  };

export type PaymentButtonProps =
  | DonationPaymentButtonProps
  | ProductPaymentButtonProps;

export function PaymentButton(props: PaymentButtonProps) {
  const {
    amount,
    currency = "usd",
    createEndpoint,
    paymentData,
    cardDetails,
  } = props;

  const { processPayment, isProcessing } =
    useStripePayment<typeof paymentData>(createEndpoint);

  const handleClick = async () => {
    const success = await processPayment(paymentData, cardDetails);
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full"
      disabled={isProcessing}
      size="lg"
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing Payment...
        </>
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" /> Pay ${amount}
        </>
      )}
    </Button>
  );
}
