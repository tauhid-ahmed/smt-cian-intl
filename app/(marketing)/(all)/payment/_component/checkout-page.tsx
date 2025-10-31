"use client"

import { useState } from "react"
import StepIndicator from "./step-indicator"
import ShippingForm from "./shipping-form"
import PaymentForm from "./payment-form"
import ReviewOrder from "./review-order"
import OrderConfirmed from "./order-confirmed"

type Step = 1 | 2 | 3 | 4

export interface CheckoutData {
  fullName: string
  email: string
  phoneNumber: string
  shippingAddress: string
  city: string
  postCode: string
  country: string
  paymentMethod: string
  cardNumber: string
  cardholderName: string
  expiryDate: string
  cvv: string
  zip: string
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState<Partial<CheckoutData>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleNextStep = (data: Partial<CheckoutData>) => {
    setFormData({ ...formData, ...data })

    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    console.log("Submit payment form:", data)
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleConfirmOrder = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setCurrentStep(4)
      setIsProcessing(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {currentStep < 4 && <StepIndicator currentStep={currentStep} />}

        {currentStep === 1 && <ShippingForm initialData={formData} onNext={handleNextStep} />}

        {currentStep === 2 && (
          <PaymentForm initialData={formData} onNext={handleNextStep} onBack={handlePreviousStep} />
        )}

        {currentStep === 3 && (
          <ReviewOrder
            data={formData as CheckoutData}
            onConfirm={handleConfirmOrder}
            onBack={handlePreviousStep}
            isProcessing={isProcessing}
          />
        )}

        {currentStep === 4 && <OrderConfirmed data={formData as CheckoutData} />}
      </div>
    </div>
  )
}
