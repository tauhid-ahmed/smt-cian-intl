"use client"

import { Button } from "@/components/ui/button"
import type { CheckoutData } from "./checkout-page"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Heading } from "@/components/Heading"
import Image from "next/image"
import { CartItem } from "@/lib/api/cartApi"

interface ReviewOrderProps {
    data: CheckoutData
    onConfirm: () => void
    onBack: () => void
    isProcessing: boolean
    cartItems: CartItem[]
}

export default function ReviewOrder({ data, onConfirm, onBack, isProcessing, cartItems }: ReviewOrderProps) {
    const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0)
    const shipping = 0.0 // Set to 0 as seen in cart page
    const tax = 0.0 // Adjusted based on cart page
    const total = subtotal + shipping + tax

    return (
        <div className="space-y-6">
            <Heading as="h4" size="h4" className="font-semibold text-white mb-8">
                Review Your Order
            </Heading>

            {/* Order Summary */}
            <div className="border border-gray-700 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-white mb-4">Order Summary</h3>
                {cartItems.map((product) => (
                    <div key={product.id} className="flex sm:flex-row flex-col gap-4 pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                        <div className="relative w-20 h-20 rounded overflow-hidden">
                            <Image
                                src={product.image || "/images/placeholder.jpg"}
                                alt={product.title}
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-white">{product.title}</h4>
                            <p className="text-sm text-gray-400">Qty: {product.quantity}</p>
                            {(product.size || product.color) && (
                                <p className="text-xs text-gray-500">
                                    {product.size ? `Size: ${product.size}` : ""}
                                    {product.size && product.color ? " | " : ""}
                                    {product.color ? `Color: ${product.color}` : ""}
                                </p>
                            )}
                        </div>
                        <div className="text-right text-white font-medium">${(product.price * product.quantity).toFixed(2)}</div>
                    </div>
                ))}
            </div>

            {/* Shipping Information */}
            <div className="border border-gray-700 rounded-lg p-6">
                <Heading as="h4" size="h4" className="font-semibold text-white mb-8">Shipping Information</Heading>
                <div className="space-y-1 text-sm md:text-base lg:text-lg text-gray-300">
                    <p>{data.fullName}</p>
                    <p>Address: {data.shippingAddress}</p>
                    <p>City: {data.city}</p>
                    <p>Post code: {data.postCode}</p>
                    <p>Country: {data.country}</p>
                    <div className="pt-3 border-t border-gray-700 mt-3">
                        <p>{data.email}</p>
                        <p>{data.phoneNumber}</p>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-white mb-4">Payment Method</h3>
                <div className="inline-block bg-blue-600 px-4 py-2 rounded text-white font-medium">
                    {data.paymentMethod?.toUpperCase() || "Card"}
                </div>
                <p className="mt-2 text-sm text-gray-400">
                    Card ending in {data.cardNumber?.slice(-4)}
                </p>
            </div>

            {/* Price Breakdown */}
            <div className="border border-gray-700 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-white mb-4">Price Breakdown</h3>
                <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-500 font-medium">Free</span>
                </div>
                {tax > 0 && (
                    <div className="flex justify-between text-gray-300">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                )}
                <div className="border-t border-gray-700 pt-3 flex justify-between text-white font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-yellow-500">${total.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
                <Button
                    type="button"
                    onClick={onBack}
                    disabled={isProcessing}
                    variant="outline"
                    className="gap-2 border-gray-700 text-white hover:bg-gray-900 hover:text-white h-11 rounded-lg bg-transparent"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isProcessing}
                    className="md:ml-auto lg:ml-auto bg-white text-black hover:bg-gray-200 px-8 h-11 font-medium rounded-lg gap-2"
                >
                    {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isProcessing ? "Processing" : "Confirm Order"}
                </Button>
            </div>
        </div>
    )
}
