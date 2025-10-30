"use client";

import TextOpacityAnimation from "@/components/animations/TextOpacity";
import FAQ from "@/components/FAQ";
import TextField from "@/features/auth/components/TextField";
import { FormProvider, useForm } from "react-hook-form";

const faqData = [
  {
    question: "What is Cian Intl?",
    answer:
      "Cian Intl is a platform that allows users to discover artists and shop for unique products.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach out via the contact page or send us an email at support@cianintl.com.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we have a 30-day refund policy for eligible purchases.",
  },
];

export default function FaqPage() {
  const signupForm = useForm();

  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="max-w-96 py-10 mx-auto">
        <FormProvider {...signupForm}>
          <form>
            <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
            <TextField name={""} label="Email" />
          </form>
        </FormProvider>
      </div>

      <TextOpacityAnimation />
      <h1 className="text-3xl font-bold text-center mb-12">
        Frequently asked questions
      </h1>
      <FAQ items={faqData} />
    </div>
  );
}
