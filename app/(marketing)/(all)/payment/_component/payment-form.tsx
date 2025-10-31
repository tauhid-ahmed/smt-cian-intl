"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import type { CheckoutData } from "./checkout-page"

interface PaymentFormProps {
  initialData: Partial<CheckoutData>
  onNext: (data: Partial<CheckoutData>) => void
  onBack: () => void
}

export default function PaymentForm({ initialData, onNext, onBack }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    paymentMethod: initialData.paymentMethod || "stripe",
    cardNumber: initialData.cardNumber || "",
    cardholderName: initialData.cardholderName || "",
    expiryDate: initialData.expiryDate || "",
    cvv: initialData.cvv || "",
    zip: initialData.zip || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-white">Payment Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-gray-300 mb-4 block text-sm">Select Payment Method</label>
          <div className="flex gap-3 flex-wrap">
            {[
              { value: "stripe", label: "Stripe" },
              { value: "card", label: "Card" },
              { value: "apple", label: "Apple Pay" },
              { value: "google", label: "Google Pay" },
            ].map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => handlePaymentMethodChange(method.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${formData.paymentMethod === method.value
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-700 border-gray-700 text-white hover:border-gray-600"
                  }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div>
            <label className="text-gray-300 block mb-2 text-sm">Card Number</label>
            <Input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 block mb-2 text-sm">Cardholder Name</label>
              <Input
                type="text"
                name="cardholderName"
                placeholder="John Doe"
                value={formData.cardholderName}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-gray-300 block mb-2 text-sm">Expiry Date</label>
              <Input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-2 text-sm">CVV</label>
              <Input
                type="text"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-2 text-sm">ZIP</label>
              <Input
                type="text"
                name="zip"
                placeholder="12345"
                value={formData.zip}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="gap-2 border-gray-700 text-white hover:bg-gray-900 h-11 rounded-lg bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            type="submit"
            className="ml-auto bg-white text-black hover:bg-gray-200 px-8 h-11 font-medium rounded-lg"
          >
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  )
}
