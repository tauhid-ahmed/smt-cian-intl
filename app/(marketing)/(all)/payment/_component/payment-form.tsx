// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft } from "lucide-react"
// import type { CheckoutData } from "./checkout-page"
// import { Heading } from "@/components/Heading"

// interface PaymentFormProps {
//   initialData: Partial<CheckoutData>
//   onNext: (data: Partial<CheckoutData>) => void
//   onBack: () => void
// }

// export default function PaymentForm({ initialData, onNext, onBack }: PaymentFormProps) {
//   const [formData, setFormData] = useState({
//     paymentMethod: initialData.paymentMethod || "stripe",
//     cardNumber: initialData.cardNumber || "",
//     cardholderName: initialData.cardholderName || "",
//     expiryDate: initialData.expiryDate || "",
//     cvv: initialData.cvv || "",
//     zip: initialData.zip || "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handlePaymentMethodChange = (method: string) => {
//     setFormData((prev) => ({ ...prev, paymentMethod: method }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onNext(formData)
//   }

//   return (
//     <div>
//       <Heading as="h3" size="h3" className="font-semibold text-white mb-8">Payment Details</Heading>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="text-gray-300 mb-4 block text-sm">Select Payment Method</label>
//           <div className="flex gap-3 flex-wrap">
//             {[
//               { value: "stripe", label: "Stripe" },
//               { value: "card", label: "Card" },
//               { value: "apple", label: "Apple Pay" },
//               { value: "google", label: "Google Pay" },
//             ].map((method) => (
//               <button
//                 key={method.value}
//                 type="button"
//                 onClick={() => handlePaymentMethodChange(method.value)}
//                 className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${formData.paymentMethod === method.value
//                   ? "bg-blue-600 border-blue-600 text-white"
//                   : "bg-gray-700 border-gray-700 text-white hover:border-gray-600"
//                   }`}
//               >
//                 {method.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-4 pt-4">
//           <div>
//             <label className="text-gray-300 block mb-2 text-sm">Card Number</label>
//             <Input
//               type="text"
//               name="cardNumber"
//               placeholder="1234 5678 9012 3456"
//               value={formData.cardNumber}
//               onChange={handleChange}
//               className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-gray-300 block mb-2 text-sm">Cardholder Name</label>
//               <Input
//                 type="text"
//                 name="cardholderName"
//                 placeholder="John Doe"
//                 value={formData.cardholderName}
//                 onChange={handleChange}
//                 className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-gray-300 block mb-2 text-sm">Expiry Date</label>
//               <Input
//                 type="text"
//                 name="expiryDate"
//                 placeholder="MM/YY"
//                 value={formData.expiryDate}
//                 onChange={handleChange}
//                 className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-gray-300 block mb-2 text-sm">CVV</label>
//               <Input
//                 type="text"
//                 name="cvv"
//                 placeholder="123"
//                 value={formData.cvv}
//                 onChange={handleChange}
//                 className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-gray-300 block mb-2 text-sm">ZIP</label>
//               <Input
//                 type="text"
//                 name="zip"
//                 placeholder="12345"
//                 value={formData.zip}
//                 onChange={handleChange}
//                 className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-4 pt-6">
//           <Button
//             type="button"
//             onClick={onBack}
//             variant="outline"
//             className="gap-2 border-gray-700 text-white hover:bg-gray-900 h-11 rounded-lg bg-transparent"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//           <Button
//             type="submit"
//             className="ml-auto bg-white text-black hover:bg-gray-200 px-8 h-11 font-medium rounded-lg"
//           >
//             Continue to Review
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }


//! Try - 1

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ArrowLeft } from "lucide-react"
// import type { CheckoutData } from "./checkout-page"
// import { Heading } from "@/components/Heading"

// interface PaymentFormProps {
//   initialData: Partial<CheckoutData>
//   onNext: (data: Partial<CheckoutData>) => void
//   onBack: () => void
// }

// export default function PaymentForm({ initialData, onNext, onBack }: PaymentFormProps) {
//   const [formData, setFormData] = useState({
//     paymentMethod: initialData.paymentMethod || "stripe",
//     subMethod: initialData.subMethod || "card",
//     cardNumber: initialData.cardNumber || "",
//     cardholderName: initialData.cardholderName || "",
//     expiryDate: initialData.expiryDate || "",
//     cvv: initialData.cvv || "",
//     zip: initialData.zip || "",
//     country: initialData.country || "United States",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handlePaymentMethodChange = (method: string) => {
//     setFormData((prev) => ({ ...prev, paymentMethod: method }))
//   }

//   const handleSubMethodChange = (subMethod: string) => {
//     setFormData((prev) => ({ ...prev, subMethod }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onNext(formData)
//   }

//   return (
//     <div>
//       <Heading as="h3" size="h3" className="font-semibold text-white mb-8">
//         Payment Details
//       </Heading>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* ---- Payment Method Section ---- */}
//         <div>
//           <label className="text-gray-300 mb-4 block text-sm">Select Payment Method</label>
//           <div className="flex gap-3 flex-wrap">
//             {[
//               { value: "stripe", label: "Stripe" },
//             ].map((method) => (
//               <button
//                 key={method.value}
//                 type="button"
//                 onClick={() => handlePaymentMethodChange(method.value)}
//                 className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${formData.paymentMethod === method.value
//                   ? "bg-blue-600 border-blue-600 text-white"
//                   : "bg-gray-700 border-gray-700 text-white hover:border-gray-600"
//                   }`}
//               >
//                 {method.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ---- Conditional Stripe Section ---- */}
//         {formData.paymentMethod === "stripe" && (
//           <div className="space-y-6 mt-6">
//             {/* Sub-method selection */}
//             <div>
//               <label className="text-gray-300 mb-4 block text-sm">Select Payment Option</label>
//               <div className="flex gap-3 flex-wrap">
//                 {[
//                   { value: "card", label: "Card" },
//                   { value: "apple", label: "Apple Pay" },
//                   { value: "google", label: "Google Pay" },
//                 ].map((option) => (
//                   <button
//                     key={option.value}
//                     type="button"
//                     onClick={() => handleSubMethodChange(option.value)}
//                     className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${formData.subMethod === option.value
//                       ? "bg-gray-200 text-black border-gray-200"
//                       : "bg-gray-800 text-white border-gray-700 hover:border-gray-600"
//                       }`}
//                   >
//                     {option.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* ---- Card Form ---- */}
//             {formData.subMethod === "card" && (
//               <div className="space-y-4 pt-4">
//                 <div>
//                   <label className="text-gray-300 block mb-2 text-sm">Card Number</label>
//                   <Input
//                     type="text"
//                     name="cardNumber"
//                     placeholder="1234 5678 9012 3456"
//                     value={formData.cardNumber}
//                     onChange={handleChange}
//                     className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-gray-300 block mb-2 text-sm">Cardholder Name</label>
//                     <Input
//                       type="text"
//                       name="cardholderName"
//                       placeholder="John Doe"
//                       value={formData.cardholderName}
//                       onChange={handleChange}
//                       className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="text-gray-300 block mb-2 text-sm">Expiry Date</label>
//                     <Input
//                       type="text"
//                       name="expiryDate"
//                       placeholder="MM/YY"
//                       value={formData.expiryDate}
//                       onChange={handleChange}
//                       className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="text-gray-300 block mb-2 text-sm">CVV</label>
//                     <Input
//                       type="text"
//                       name="cvv"
//                       placeholder="123"
//                       value={formData.cvv}
//                       onChange={handleChange}
//                       className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="text-gray-300 block mb-2 text-sm">ZIP</label>
//                     <Input
//                       type="text"
//                       name="zip"
//                       placeholder="12345"
//                       value={formData.zip}
//                       onChange={handleChange}
//                       className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-600 h-12 rounded-lg"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ---- Buttons ---- */}
//         <div className="flex gap-4 pt-6">
//           <Button
//             type="button"
//             onClick={onBack}
//             variant="outline"
//             className="gap-2 border-gray-700 text-white hover:bg-gray-900 h-11 rounded-lg bg-transparent"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//           <Button
//             type="submit"
//             className="ml-auto bg-white text-black hover:bg-gray-200 px-8 h-11 font-medium rounded-lg"
//           >
//             Continue to Payment
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }

//! Try - 3

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Check } from "lucide-react"
import type { CheckoutData } from "./checkout-page"
import { Heading } from "@/components/Heading"

interface PaymentFormProps {
  initialData: Partial<CheckoutData>
  onNext: (data: Partial<CheckoutData>) => void
  onBack: () => void
}

export default function PaymentForm({ initialData, onNext, onBack }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    paymentMethod: initialData.paymentMethod || "",
    subMethod: initialData.subMethod || "card",
    cardNumber: initialData.cardNumber || "",
    cardholderName: initialData.cardholderName || "",
    expiryDate: initialData.expiryDate || "",
    cvv: initialData.cvv || "",
    zip: initialData.zip || "",
    country: initialData.country || "United States",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: prev.paymentMethod === method ? "" : method, // toggle select/unselect
    }))
  }

  const handleSubMethodChange = (subMethod: string) => {
    setFormData((prev) => ({ ...prev, subMethod }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <div>
      <Heading as="h4" size="h4" className="font-semibold text-white mb-8">
        Payment Details
      </Heading>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ---- Payment Method Section ---- */}
        <div>
          <label className="text-gray-300 mb-4 block text-sm">Select Payment Method</label>
          <div className="flex gap-3 flex-wrap">
            {[
              { value: "stripe", label: "Stripe" },
            ].map((method) => {
              const isSelected = formData.paymentMethod === method.value
              return (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => handlePaymentMethodChange(method.value)}
                  className={`relative px-6 py-3 rounded-lg font-medium transition-all border-2 flex items-center justify-center ${isSelected
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-700 border-gray-700 text-white hover:border-gray-600"
                    }`}
                >
                  {method.label}
                  {isSelected && (
                    <span className="absolute -top-2 -right-2 bg-white rounded-full p-[2px]">
                      <Check className="w-3 h-3 text-blue-600" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ---- Conditional Stripe Section ---- */}
        {formData.paymentMethod === "stripe" && (
          <div className="space-y-6 mt-6">
            {/* Sub-method selection */}
            <div>
              <label className="text-gray-300 mb-4 block text-sm">Select Payment Option</label>
              <div className="flex gap-3 flex-wrap">
                {[
                  { value: "card", label: "Card" },
                  { value: "apple", label: "Apple Pay" },
                  { value: "google", label: "Google Pay" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSubMethodChange(option.value)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${formData.subMethod === option.value
                      ? "bg-gray-200 text-black border-gray-200"
                      : "bg-gray-800 text-white border-gray-700 hover:border-gray-600"
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ---- Card Form ---- */}
            {formData.subMethod === "card" && (
              <div className="space-y-4 pt-4">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 md:gap-4 lg:gap-6 space-y-2">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-4 lg:gap-6 space-y-2">
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-4 lg:gap-6 space-y-2">
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
            )}
          </div>
        )}

        {/* ---- Buttons ---- */}
        <div className="flex flex-wrap gap-4 pt-6">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="gap-2 border-gray-700 text-white hover:bg-gray-900 h-11 rounded-lg bg-transparent hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            type="submit"
            className="md:ml-auto lg:ml-auto bg-white text-black hover:bg-gray-200 px-8 h-11 font-medium rounded-lg"
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  )
}

