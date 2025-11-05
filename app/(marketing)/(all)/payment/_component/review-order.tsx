"use client"

import { Button } from "@/components/ui/button"
import type { CheckoutData } from "./checkout-page"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Heading } from "@/components/Heading"
import Image from "next/image"
import product1 from "../../../../../public/img-3.jpg";
import product2 from "../../../../../public/example.jpg"

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
      image: product1,
    },
    {
      id: 2,
      name: "Professional Studio Headphones",
      qty: 2,
      price: 299.99,
      image: product2,
    },
  ]

  const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0)
  const shipping = 15.0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="space-y-6">
      <Heading as="h4" size="h4" className="font-semibold text-white mb-8">
        Review Your Order
      </Heading>

      {/* Order Summary */}
      <div className="border border-gray-700 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-white mb-4">Order Summary</h3>
        {products.map((product) => (
          <div key={product.id} className="flex sm:flex-row flex-col gap-4 pb-4 border-b border-gray-700 last:border-0 last:pb-0">
            <Image
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded object-cover"
              height={20}
              width={20}
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
        <Heading as="h4" size="h4" className="font-semibold text-white mb-8">Shipping Information</Heading>
        <div className="space-y-1 text-sm md:text-base lg:text-lg text-gray-300">
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
