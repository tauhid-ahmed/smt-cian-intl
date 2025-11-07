"use client";

import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Heart, GraduationCap, Home, Utensils, DollarSign } from "lucide-react";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

interface DonationFormData {
  frequency: "one-time" | "monthly";
  amount: number;
  customAmount?: string;
  campaign: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  taxDeduction: boolean;
  newsletter: boolean;
  paymentMethod: "credit" | "paypal" | "apple";
}

interface GiftOption {
  amount: number;
  icon: React.ReactNode;
  description: string;
}

const giftOptions: GiftOption[] = [
  {
    amount: 25,
    icon: <Heart className="w-6 h-6" />,
    description: "Provides meals for a family for one week",
  },
  {
    amount: 50,
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Supplies educational materials for 10 children",
  },
  {
    amount: 100,
    icon: <Home className="w-6 h-6" />,
    description: "Funds a scholarship for one month",
  },
  {
    amount: 250,
    icon: <Utensils className="w-6 h-6" />,
    description: "Helps build sustainable housing",
  },
  {
    amount: 500,
    icon: <DollarSign className="w-6 h-6" />,
    description: "Provides water purification for 100 areas",
  },
];

const presetAmounts = [25, 50, 100, 250, 500, 1000];

const campaigns = [
  "General Fund",
  "Education Programs",
  "Healthcare Initiative",
  "Clean Water Project",
  "Emergency Relief",
  "Community Development",
];

export default function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<DonationFormData>({
    defaultValues: {
      frequency: "one-time",
      amount: 25,
      customAmount: "",
      campaign: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      firstName: "",
      lastName: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      taxDeduction: false,
      newsletter: false,
      paymentMethod: "credit",
    },
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const frequency = watch("frequency");
  const customAmount = watch("customAmount");
  const paymentMethod = watch("paymentMethod");

  const totalAmount =
    isCustomAmount && customAmount
      ? parseFloat(customAmount)
      : selectedAmount || 0;

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustomAmount(false);
    setValue("amount", amount);
    setValue("customAmount", "");
  };

  const handleCustomAmountChange = (value: string) => {
    setIsCustomAmount(true);
    setSelectedAmount(null);
    setValue("customAmount", value);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts: string[] = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);

    const finalData = {
      ...data,
      amount: totalAmount,
    };

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Donation submitted:", finalData);
    alert(`Thank you for your donation of $${totalAmount}!`);
    setIsSubmitting(false);
  };

  return (
    <Section padding="lg" className="lg:pt-40!">
      <div className="max-w-4xl mx-auto">
        <FormProvider {...methods}>
          <div className="space-y-8">
            {/* How Your Gift Help */}
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">
                How Your Gift Help
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {giftOptions.slice(0, 3).map((option) => (
                  <button
                    key={option.amount}
                    type="button"
                    onClick={() => handleAmountClick(option.amount)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedAmount === option.amount
                        ? "bg-white text-black border-white"
                        : "bg-zinc-900 border-zinc-700 text-white hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      {option.icon}
                      <div className="text-2xl font-bold">${option.amount}</div>
                      <div className="text-xs">{option.description}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {giftOptions.slice(3).map((option) => (
                  <button
                    key={option.amount}
                    type="button"
                    onClick={() => handleAmountClick(option.amount)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedAmount === option.amount
                        ? "bg-white text-black border-white"
                        : "bg-zinc-900 border-zinc-700 text-white hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      {option.icon}
                      <div className="text-2xl font-bold">${option.amount}</div>
                      <div className="text-xs">{option.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Donation Frequency */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Donation Frequency
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setValue("frequency", "one-time")}
                  className={`py-4 rounded-xl font-medium transition-all ${
                    frequency === "one-time"
                      ? "bg-white text-black"
                      : "bg-zinc-900 text-white border border-zinc-700"
                  }`}
                >
                  One-Time Gift
                </button>
                <button
                  type="button"
                  onClick={() => setValue("frequency", "monthly")}
                  className={`py-4 rounded-xl font-medium transition-all ${
                    frequency === "monthly"
                      ? "bg-white text-black"
                      : "bg-zinc-900 text-white border border-zinc-700"
                  }`}
                >
                  Monthly Giving
                </button>
              </div>
            </div>

            {/* Select Gift Amount */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Select your Gift Amount
              </label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountClick(amount)}
                    className={`py-4 rounded-xl font-bold text-lg transition-all ${
                      selectedAmount === amount && !isCustomAmount
                        ? "bg-white text-black"
                        : "bg-zinc-900 text-white border border-zinc-700 hover:border-zinc-600"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Other Amount */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Other Amount
              </label>
              <Controller
                name="customAmount"
                control={control}
                rules={{
                  validate: (value) => {
                    if (isCustomAmount && value) {
                      const num = parseFloat(value);
                      if (isNaN(num) || num < 1)
                        return "Amount must be at least $1";
                      if (num > 1000000) return "Amount too large";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Enter amount"
                    onChange={(e) => {
                      field.onChange(e);
                      handleCustomAmountChange(e.target.value);
                    }}
                    className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                  />
                )}
              />
              {errors.customAmount && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.customAmount.message}
                </span>
              )}
            </div>

            {/* Campaign Your Gift */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Campaign Your gift
              </label>
              <Controller
                name="campaign"
                control={control}
                rules={{ required: "Please select a campaign" }}
                render={({ field }) => (
                  <div className="relative">
                    <select
                      {...field}
                      className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-zinc-500"
                    >
                      <option value="">
                        Choose where you'd like your donation to make the
                        greatest impact
                      </option>
                      {campaigns.map((campaign) => (
                        <option key={campaign} value={campaign}>
                          {campaign}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              />
              {errors.campaign && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.campaign.message}
                </span>
              )}
            </div>

            {/* Total Gift */}
            <div className="bg-zinc-900 rounded-xl p-4 flex justify-between items-center">
              <span className="font-semibold">Total Gift</span>
              <span className="text-2xl font-bold">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Payment Method
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="radio"
                        {...field}
                        value="credit"
                        checked={field.value === "credit"}
                        className="w-4 h-4 accent-white"
                      />
                    )}
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="radio"
                        {...field}
                        value="paypal"
                        checked={field.value === "paypal"}
                        className="w-4 h-4 accent-white"
                      />
                    )}
                  />
                  <span>Paypal</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="radio"
                        {...field}
                        value="apple"
                        checked={field.value === "apple"}
                        className="w-4 h-4 accent-white"
                      />
                    )}
                  />
                  <span>Apple Pay</span>
                </label>
              </div>
            </div>

            {/* Payment Information - Only show for credit card */}
            {paymentMethod === "credit" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Information</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <Controller
                    name="cardNumber"
                    control={control}
                    rules={{
                      required: "Card number is required",
                      validate: (value) => {
                        const cleaned = value.replace(/\s/g, "");
                        return (
                          cleaned.length === 16 ||
                          "Card number must be 16 digits"
                        );
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        onChange={(e) =>
                          field.onChange(formatCardNumber(e.target.value))
                        }
                        className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                      />
                    )}
                  />
                  {errors.cardNumber && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.cardNumber.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <Controller
                      name="expiryDate"
                      control={control}
                      rules={{
                        required: "Expiry date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          message: "Format: MM/YY",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          onChange={(e) =>
                            field.onChange(formatExpiry(e.target.value))
                          }
                          className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                        />
                      )}
                    />
                    {errors.expiryDate && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.expiryDate.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <Controller
                      name="cvv"
                      control={control}
                      rules={{
                        required: "CVV is required",
                        pattern: {
                          value: /^[0-9]{3,4}$/,
                          message: "CVV must be 3-4 digits",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                        />
                      )}
                    />
                    {errors.cvv && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.cvv.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Your Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Type here"
                        className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                      />
                    )}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Type here"
                        className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                      />
                    )}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Type your email"
                      className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                    />
                  )}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Street Address
                </label>
                <Controller
                  name="streetAddress"
                  control={control}
                  rules={{ required: "Street address is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Type here"
                      className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                    />
                  )}
                />
                {errors.streetAddress && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.streetAddress.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Type here"
                        className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                      />
                    )}
                  />
                  {errors.city && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    State
                  </label>
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Type here"
                        className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                      />
                    )}
                  />
                  {errors.state && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.state.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    ZIP Code
                  </label>
                  <Controller
                    name="zipCode"
                    control={control}
                    rules={{
                      required: "ZIP code is required",
                      pattern: {
                        value: /^[0-9]{5}$/,
                        message: "ZIP must be 5 digits",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Type here"
                        maxLength={5}
                        className="w-full border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-zinc-500"
                      />
                    )}
                  />
                  {errors.zipCode && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.zipCode.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tax Deduction Information */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Tax Deduction Information
                  </h4>
                  <p className="text-sm text-gray-300">
                    Your donation is tax-deductible to the fullest extent
                    allowed by law. We are a 501(c)(3) nonprofit organization.
                    <span className="font-semibold"> EIN: 12-3456789</span>
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    A receipt for your donation will be sent to your email
                    address for your tax records.
                  </p>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <Controller
                  name="taxDeduction"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={onChange}
                      className="w-5 h-5 bg-black border border-zinc-700 rounded cursor-pointer accent-white"
                    />
                  )}
                />
                <span className="text-sm">Make my donation anonymous</span>
              </label>
            </div>

            {/* Newsletter Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer mt-10">
              <Controller
                name="newsletter"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    className="w-5 h-5 bg-black border border-zinc-700 rounded cursor-pointer accent-white"
                  />
                )}
              />
              <span className="text-sm">
                Send me updates about your work and how my donation makes a
                difference
              </span>
            </label>

            {/* Submit Button */}
            <div className="px-4 md:px-10 lg:px-20">
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                variant="secondary"
                className="w-full"
              >
                {isSubmitting
                  ? "Processing..."
                  : `Complete Donation of $${totalAmount.toFixed(2)}`}
              </Button>
            </div>

            {/* Footer Text */}
            <p className="text-xs text-center text-gray-400">
              By completing this donation, you agree to our terms and
              conditions. Your payment information is encrypted and secure.
            </p>
          </div>
        </FormProvider>
      </div>
    </Section>
  );
}
