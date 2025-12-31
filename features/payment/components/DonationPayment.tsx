import { DonationPaymentData } from "../types";
import { formatCurrency } from "../utils";
import { PaymentButton } from "./PaymentButton";

interface DonationPaymentProps {
  donationData: DonationPaymentData;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function DonationPayment({
  donationData,
  onSuccess,
  onError,
}: DonationPaymentProps) {
  console.log(donationData);
  return (
    <PaymentButton
      type="donation"
      amount={donationData.amount}
      currency={donationData.currency}
      createEndpoint={`${process.env.NEXT_PUBLIC_API_BASE_URL}/donations/create`}
      buttonText={`Complete Donation`}
      buttonVariant="default"
      buttonClassName="w-full h-12 text-lg"
      paymentData={donationData}
      onSuccess={onSuccess}
      onError={onError}
      cardDetails={donationData.cardDetails}
    />
  );
}
