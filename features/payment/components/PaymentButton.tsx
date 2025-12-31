"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, Lock } from "lucide-react";
import {
  formatCardNumber,
  formatCurrency,
  getCardBrand,
  validateCardNumber,
} from "../utils";
import {
  CardDetails,
  CardFormData,
  DonationPaymentData,
  PaymentData,
  ProductPaymentData,
} from "../types";
import { useState } from "react";
import { useStripePayment } from "../hooks";

const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number must be at most 19 digits")
    .refine((val) => validateCardNumber(val), "Invalid card number"),
  expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid month (01-12)"),
  expYear: z
    .string()
    .regex(/^\d{4}$/, "Year must be 4 digits")
    .refine((year) => {
      const currentYear = new Date().getFullYear();
      return parseInt(year) >= currentYear;
    }, "Card has expired"),
  cvc: z
    .string()
    .min(3, "CVC must be 3 or 4 digits")
    .max(4, "CVC must be 3 or 4 digits")
    .regex(/^\d+$/, "CVC must contain only numbers"),
});

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
    buttonText = "Pay Now",
    buttonVariant = "default",
    buttonClassName = "",
    paymentData,
    onSuccess,
    onError,
    disabled = false,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { processPayment, isProcessing } =
    useStripePayment<typeof paymentData>(createEndpoint);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  });

  const cardNumber = watch("cardNumber");

  const onSubmit = async (formData: CardFormData) => {
    const cardDetails: CardDetails = {
      number: formData.cardNumber.replace(/\s/g, "") || "4242424242424242",
      exp_month: formData.expMonth || "12",
      exp_year: formData.expYear || "2030",
      cvc: formData.cvc || "123",
    };

    const fullPaymentData = {
      ...paymentData,
      amount,
      currency,
    };

    const success = await processPayment(fullPaymentData, cardDetails);

    if (success) {
      setIsOpen(false);
      reset();
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onError) {
        onError("Payment failed. Please try again.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          className={buttonClassName}
          disabled={disabled}
        >
          <Lock className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Secure Payment
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center justify-between mt-2">
              <span>Total Amount:</span>
              <span className="text-lg font-bold text-foreground">
                {formatCurrency(amount, currency)}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                {...register("cardNumber")}
                onChange={(e) => {
                  e.target.value = formatCardNumber(e.target.value);
                }}
                disabled={isProcessing}
                className="pr-16"
              />
              {cardNumber && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {getCardBrand(cardNumber)}
                </span>
              )}
            </div>
            {errors.cardNumber && (
              <p className="text-sm text-red-500">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expMonth">Month</Label>
              <Input
                id="expMonth"
                placeholder="MM"
                maxLength={2}
                {...register("expMonth")}
                disabled={isProcessing}
              />
              {errors.expMonth && (
                <p className="text-sm text-red-500">
                  {errors.expMonth.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expYear">Year</Label>
              <Input
                id="expYear"
                placeholder="YYYY"
                maxLength={4}
                {...register("expYear")}
                disabled={isProcessing}
              />
              {errors.expYear && (
                <p className="text-sm text-red-500">{errors.expYear.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                maxLength={4}
                {...register("cvc")}
                disabled={isProcessing}
                type="password"
              />
              {errors.cvc && (
                <p className="text-sm text-red-500">{errors.cvc.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted p-3 rounded-md">
            <Lock className="h-3 w-3" />
            <span>Your payment information is encrypted and secure</span>
          </div>

          <Button
            type="submit"
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
                <Lock className="mr-2 h-4 w-4" />
                Pay {formatCurrency(amount, currency)}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
