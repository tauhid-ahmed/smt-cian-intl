"use client";

import { useForm, FormProvider, Controller } from "react-hook-form";
import { useState } from "react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/Heading";

interface ContactFormData {
  inquiryType: string;
  name: string;
  email: string;
  phone?: string;
  orderNumber?: string;
  message: string;
  newsletter: boolean;
}

const inquiryTypes = [
  "General Inquiry",
  "Product Support",
  "Order Status",
  "Returns & Refunds",
  "Technical Issue",
  "Partnership",
  "Other",
];

export default function ContactForm() {
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const methods = useForm<ContactFormData>({
    defaultValues: {
      inquiryType: "",
      name: "",
      email: "",
      phone: "",
      orderNumber: "",
      message: "",
      newsletter: false,
    },
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = methods;

  const messageValue = watch("message");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    setSubmitSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      reset();
      setCharCount(0);
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <Section>
      <Container>
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <Heading as="h2" size="h3" align="center">
            Send Us a Message
          </Heading>

          <FormProvider {...methods}>
            <div className="space-y-6">
              {/* Inquiry Type Dropdown */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="inquiryType"
                  className="text-white text-sm font-medium"
                >
                  Inquiry Type*
                </label>
                <Controller
                  name="inquiryType"
                  control={control}
                  rules={{ required: "Please select an inquiry type" }}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        id="inquiryType"
                        className={`bg-black border ${
                          errors.inquiryType
                            ? "border-red-500"
                            : "border-gray-700"
                        } rounded-lg px-4 py-3 text-white appearance-none w-full focus:outline-none focus:border-gray-500 transition-colors cursor-pointer`}
                      >
                        <option value="" className="text-gray-500">
                          Your name
                        </option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                        >
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
                {errors.inquiryType && (
                  <span className="text-red-500 text-sm">
                    {errors.inquiryType.message}
                  </span>
                )}
              </div>

              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-white text-sm font-medium"
                >
                  Your Name*
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Name must not exceed 100 characters",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className={`bg-black border ${
                        errors.name ? "border-red-500" : "border-gray-700"
                      } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors`}
                    />
                  )}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-white text-sm font-medium"
                >
                  Email Address*
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    validate: (value) =>
                      validateEmail(value) ||
                      "Please enter a valid email address",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="your.email@gmail.com"
                      className={`bg-black border ${
                        errors.email ? "border-red-500" : "border-gray-700"
                      } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors`}
                    />
                  )}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-white text-sm font-medium"
                >
                  Phone Number (Optional)
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    validate: (value) =>
                      validatePhone(value || "") ||
                      "Please enter a valid phone number",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-45687"
                      className={`bg-black border ${
                        errors.phone ? "border-red-500" : "border-gray-700"
                      } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors`}
                    />
                  )}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Order Number Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="orderNumber"
                  className="text-white text-sm font-medium"
                >
                  Order Number (If applicable)
                </label>
                <Controller
                  name="orderNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="orderNumber"
                      type="text"
                      placeholder="Enter order number"
                      className="bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                    />
                  )}
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-white text-sm font-medium"
                >
                  Message*
                </label>
                <Controller
                  name="message"
                  control={control}
                  rules={{
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Message must not exceed 1000 characters",
                    },
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <textarea
                        {...field}
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        maxLength={1000}
                        onChange={(e) => {
                          field.onChange(e);
                          setCharCount(e.target.value.length);
                        }}
                        className={`bg-black border ${
                          errors.message ? "border-red-500" : "border-gray-700"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors w-full resize-none`}
                      />
                      <div className="absolute bottom-3 right-4 text-gray-500 text-sm">
                        {charCount}/1000
                      </div>
                    </div>
                  )}
                />
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Newsletter Checkbox */}
              <div className="flex items-center gap-3">
                <Controller
                  name="newsletter"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={value}
                      onChange={onChange}
                      className="w-5 h-5 bg-black border border-gray-700 rounded cursor-pointer accent-white"
                    />
                  )}
                />
                <label
                  htmlFor="newsletter"
                  className="text-white text-sm cursor-pointer"
                >
                  Send me update about new releases
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  isSubmitting
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : submitSuccess
                    ? "bg-green-600 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {isSubmitting
                  ? "Sending..."
                  : submitSuccess
                  ? "✓ Message Sent!"
                  : "Send Message"}
              </button>

              {/* Response Time */}
              <p className="text-center text-gray-400 text-sm">
                We typically respond within 24-48 hours
              </p>
            </div>
          </FormProvider>
        </div>
      </Container>
    </Section>
  );
}
