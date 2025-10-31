"use client"

import { Button } from "@/components/ui/button"
import type { CheckoutData } from "./checkout-page"
import { ArrowLeft, Loader2 } from "lucide-react"

interface ReviewOrderProps {
  data: CheckoutData
  onConfirm: () => void
  onBack: () => void
  isProcessing: boolean
}

export default function ReviewOrder({ data, onConfirm, onBack, isProcessing }: ReviewOrderProps) {
  const products = [
    {
      id: 1,
      name: "Professional Studio Headphones",
      qty: 1,
      price: 299.99,
      image: "/orange-headphones.jpg",
    },
    {
      id: 2,
      name: "Professional Studio Headphones",
      qty: 2,
      price: 299.99,
      image: "/pink-diamond.jpg",
    },
  ]

  const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0)
  const shipping = 15.0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Review Your Order</h2>

      {/* Order Summary */}
      <div className="border border-gray-700 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-white mb-4">Order Summary</h3>
        {products.map((product) => (
          <div key={product.id} className="flex gap-4 pb-4 border-b border-gray-700 last:border-0 last:pb-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-white">{product.name}</h4>
              <p className="text-sm text-gray-400">Qty: {product.qty}</p>
            </div>
            <div className="text-right text-white font-medium">${(product.price * product.qty).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Shipping Information */}
      <div className="border border-gray-700 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Shipping Information</h3>
        <div className="space-y-1 text-sm text-gray-300">
          <p>{data.fullName}</p>
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
      </div>

      {/* Price Breakdown */}
      <div className="border border-gray-700 rounded-lg p-6 space-y-3">
        <h3 className="font-semibold text-white mb-4">Price Breakdown</h3>
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-700 pt-3 flex justify-between text-white font-bold text-lg">
          <span>Total Amount</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <Button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          variant="outline"
          className="gap-2 border-gray-700 text-white hover:bg-gray-900 h-11 rounded-lg bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isProcessing}
          className="ml-auto bg-white text-black hover:bg-gray-200 px-8 h-11 font-medium rounded-lg gap-2"
        >
          {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
          {isProcessing ? "Processing" : "Confirm Order"}
        </Button>
      </div>
    </div>
  )
}
