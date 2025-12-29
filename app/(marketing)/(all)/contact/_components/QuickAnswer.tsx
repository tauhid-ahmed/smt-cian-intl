"use client";

import { useState } from "react";
import {
  Package,
  RefreshCw,
  User,
  HelpCircle,
  Calendar,
  Tag,
  ChevronDown,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  variant: "white" | "dark";
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: <Package className="w-6 h-6" />,
    variant: "white",
    faqs: [
      {
        question: "What are your shipping options?",
        answer:
          "We offer Standard (5-7 business days), Express (2-3 business days), and Overnight shipping. Free standard shipping is available on orders over $50.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to over 100 countries worldwide. International shipping times vary by destination, typically 7-14 business days. Customs fees may apply.",
      },
      {
        question: "How can I track my order?",
        answer:
          'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in your account under "Order History".',
      },
      {
        question: "What if my package is lost or damaged?",
        answer:
          "Contact us immediately if your package arrives damaged or doesn't arrive within the expected timeframe. We'll work with the carrier to resolve the issue or send a replacement.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: <RefreshCw className="w-6 h-6" />,
    variant: "dark",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of delivery. Items must be unused, in original packaging, and with all tags attached. Some exclusions apply.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          'Log into your account, go to "Order History", select the order, and click "Return Items". Follow the prompts to print your prepaid return label.',
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are processed within 5-7 business days after we receive your return. The refund will go back to your original payment method.",
      },
      {
        question: "Can I exchange an item?",
        answer:
          "We don't offer direct exchanges. Please return the item for a refund and place a new order for the item you want.",
      },
    ],
  },
  {
    id: "account",
    title: "Account Help",
    icon: <User className="w-6 h-6" />,
    variant: "dark",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          'Click "Sign Up" in the top right corner, enter your email and create a password. You can also sign up during checkout.',
      },
      {
        question: "I forgot my password. What should I do?",
        answer:
          'Click "Forgot Password" on the login page. Enter your email, and we\'ll send you a link to reset your password.',
      },
      {
        question: "How do I update my account information?",
        answer:
          'Log into your account and go to "Account Settings". You can update your email, password, shipping addresses, and payment methods there.',
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, contact our customer support team to request account deletion. Please note this action is permanent and cannot be undone.",
      },
    ],
  },
  {
    id: "product",
    title: "Product Questions",
    icon: <HelpCircle className="w-6 h-6" />,
    variant: "dark",
    faqs: [
      {
        question: "How do I know which size to order?",
        answer:
          "Each product page has a detailed size chart. We recommend measuring yourself and comparing to our charts for the best fit.",
      },
      {
        question: "Are your products authentic?",
        answer:
          "Yes, we only sell 100% authentic products. All items come directly from authorized distributors and include original packaging.",
      },
      {
        question: "How do I care for my product?",
        answer:
          "Care instructions are included on the product tag and in the product description. Generally, we recommend following the manufacturer's guidelines.",
      },
      {
        question: "When will out-of-stock items be available?",
        answer:
          "Restock dates vary by product. Sign up for email notifications on the product page to be alerted when items are back in stock.",
      },
    ],
  },
  {
    id: "subscription",
    title: "Subscription Help",
    icon: <Calendar className="w-6 h-6" />,
    variant: "dark",
    faqs: [
      {
        question: "How does the subscription work?",
        answer:
          "Subscribe to get regular deliveries at a discounted rate. Choose your delivery frequency (monthly, bi-monthly, or quarterly) and save 15% on each order.",
      },
      {
        question: "Can I skip or pause my subscription?",
        answer:
          'Yes, you can skip upcoming deliveries or pause your subscription anytime from your account dashboard under "Manage Subscriptions".',
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          'Log into your account, go to "Manage Subscriptions", and select "Cancel". You can cancel anytime with no penalties or fees.',
      },
      {
        question: "Can I change my subscription items?",
        answer:
          "Yes, you can modify your subscription items, quantities, or delivery frequency at any time before your next scheduled shipment.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment Issues",
    icon: <Tag className="w-6 h-6" />,
    variant: "dark",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.",
      },
      {
        question: "Why was my payment declined?",
        answer:
          "Common reasons include insufficient funds, incorrect card details, or bank security blocks. Contact your bank or try a different payment method.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use industry-standard SSL encryption and are PCI-DSS compliant. We never store your full credit card information on our servers.",
      },
      {
        question: "Can I use multiple payment methods for one order?",
        answer:
          "Currently, we only support one payment method per order. You can use gift cards in combination with a primary payment method.",
      },
    ],
  },
];

export default function QuickAnswerSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("shipping");
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const currentCategory = faqCategories.find(
    (cat) => cat.id === selectedCategory
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Quick Answer
          </h2>
          <p className="text-gray-400 text-lg">
            Need an answer fast? Check our FAQ
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setOpenFAQIndex(0);
              }}
              className={`
                flex items-center gap-4 px-6 py-5 rounded-2xl
                transition-all duration-300 transform
                ${
                  selectedCategory === category.id
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-zinc-800 text-white hover:bg-zinc-800 border border-zinc-700"
                }
              `}
            >
              <div className="shrink-0">{category.icon}</div>
              <span className="font-semibold text-lg text-left">
                {category.title}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="bg-zinc-900 rounded-3xl p-8 md:p-12">
          <div className="space-y-4">
            {currentCategory?.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-750 transition-colors"
                >
                  <span className="text-white font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 shrink-0 transition-transform duration-300 ${
                      openFAQIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still Need Help Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Still need help? We&apos;re here for you!
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
