"use client"

import { useState } from "react"
import StepIndicator from "./step-indicator"
import ShippingForm from "./shipping-form"
import PaymentForm from "./payment-form"
import ReviewOrder from "./review-order"
import OrderConfirmed from "./order-confirmed"
import Container from "@/components/layout/Container"
import { useGetCartQuery } from "@/lib/api/cartApi"
import { useCreateCheckoutMutation } from "@/lib/api/orderApi"
import { createPaymentMethod, confirmPaymentIntent } from "@/lib/stripe"
import { toast } from "react-hot-toast"

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
    subMethod: string
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
    const [orderId, setOrderId] = useState<string | null>(null)
    const [orderNumber, setOrderNumber] = useState<string | null>(null)

    const { data: cartResponse } = useGetCartQuery()
    const [createCheckout] = useCreateCheckoutMutation()

    const handleNextStep = (data: Partial<CheckoutData>) => {
        setFormData({ ...formData, ...data })

        if (currentStep < 4) {
            setCurrentStep((prev) => (prev + 1) as Step)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as Step)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const handleConfirmOrder = async () => {
        if (!cartResponse?.data?.items?.length) {
            toast.error("Your cart is empty")
            return
        }

        setIsProcessing(true)
        try {
            // 1. Create Checkout / Order in backend
            const checkoutResponse = await createCheckout({
                items: cartResponse.data.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color
                })),
                shippingInfo: {
                    fullName: formData.fullName!,
                    email: formData.email!,
                    phoneNumber: formData.phoneNumber!,
                    address: formData.shippingAddress!,
                    city: formData.city!,
                    postCode: formData.postCode!,
                    country: formData.country!
                }
            }).unwrap()

            const { orderId, clientSecret, paymentIntentId, orderNumber } = checkoutResponse.data
            setOrderId(orderId)
            setOrderNumber(orderNumber)

            // 2. Create Stripe Payment Method
            // Parse expiry date (MM/YY)
            const [exp_month, exp_year] = (formData.expiryDate || "12/30").split("/")
            const pmResponse = await createPaymentMethod({
                number: formData.cardNumber?.replace(/\s/g, "") || "",
                exp_month: exp_month || "12",
                exp_year: `20${exp_year || "30"}`,
                cvc: formData.cvv || "123"
            })

            // 3. Confirm Stripe Payment Intent
            await confirmPaymentIntent(paymentIntentId, pmResponse.id, clientSecret)

            // Success!
            toast.success("Order placed successfully!")
            setCurrentStep(4)
            window.scrollTo({ top: 0, behavior: "smooth" })
        } catch (error: any) {
            console.error("Order process error:", error)
            toast.error(error?.message || error?.data?.message || "Failed to process order")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-black px-4 py-12">
            <Container >
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
                        cartItems={cartResponse?.data?.items || []}
                    />
                )}

                {currentStep === 4 && <OrderConfirmed data={formData as CheckoutData} orderNumber={orderNumber} />}
            </Container>

        </div>
    )
}
