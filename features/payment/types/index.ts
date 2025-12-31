export interface StripePaymentMethod {
  id: string;
  object: string;
  billing_details: {
    address: Record<string, string | null>;
    email: string | null;
    name: string | null;
    phone: string | null;
  };
  card: {
    brand: string;
    checks: Record<string, string | null>;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    last4: string;
  };
  created: number;
  customer: string | null;
  livemode: boolean;
  type: string;
}

export interface StripePaymentIntent {
  id: string;
  object: string;
  amount: number;
  currency: string;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "succeeded"
    | "canceled";
  client_secret: string;
  created: number;
  livemode: boolean;
}

export interface StripeError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

export interface CreatePaymentResponse {
  paymentIntentId: string;
  clientSecret?: string;
}

export interface DonationPaymentData {
  amount: number;
  currency: string;
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  campaign: string;
  donationFrequency?: "one-time" | "monthly";
  isAnonymous?: boolean;
}

export interface ProductPaymentData {
  amount: number;
  currency: string;
  productId: string;
  quantity: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export type PaymentData = DonationPaymentData | ProductPaymentData;

export interface CardDetails {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
}

export interface CardFormData {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}
