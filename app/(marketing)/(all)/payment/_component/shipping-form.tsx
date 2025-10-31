"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CheckoutData } from "./checkout-page"

interface ShippingFormProps {
  initialData: Partial<CheckoutData>
  onNext: (data: Partial<CheckoutData>) => void
}

export default function ShippingForm({ initialData, onNext }: ShippingFormProps) {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || "",
    email: initialData.email || "",
    phoneNumber: initialData.phoneNumber || "",
    shippingAddress: initialData.shippingAddress || "",
    city: initialData.city || "",
    postCode: initialData.postCode || "",
    country: initialData.country || "United States",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-white">Shipping Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-300 block mb-2 text-sm">Full Name</label>
            <Input
              type="text"
              name="fullName"
              placeholder="Type your name"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2 text-sm">Email Address</label>
            <Input
              type="email"
              name="email"
              placeholder="Type your email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2 text-sm">Phone Number</label>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Type your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-gray-300 block mb-2 text-sm">Shipping Address</label>
          <Input
            type="text"
            name="shippingAddress"
            placeholder="Type here"
            value={formData.shippingAddress}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-300 block mb-2 text-sm">City</label>
            <Input
              type="text"
              name="city"
              placeholder="Type here"
              value={formData.city}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2 text-sm">Post Code</label>
            <Input
              type="text"
              name="postCode"
              placeholder="Type here"
              value={formData.postCode}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2 text-sm">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="bg-gray-900 border border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg w-full px-3"
              required
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Bangladesh">Bangladesh</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" className="bg-white text-black hover:bg-gray-200 px-8 h-11 font-medium rounded-lg">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  )
}
