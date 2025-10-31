import { Package, CreditCard, CheckCircle } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, icon: Package, label: "Shipping" },
    { number: 2, icon: CreditCard, label: "Payment" },
    { number: 3, icon: CheckCircle, label: "Review" },
  ]

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-2 text-white">Checkout</h1>
      <p className="text-gray-400 mb-10">Complete your purchase in 3 steps</p>

      <div className="flex items-center justify-center gap-4 md:gap-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center gap-4 md:gap-8">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${currentStep >= step.number
                  ? "bg-white border-white text-black"
                  : "bg-gray-800 border-gray-600 text-gray-400"
                }`}
            >
              <step.icon className="w-6 h-6" />
            </div>

            {index < steps.length - 1 && (
              <div
                className={`hidden md:block h-1 w-16 transition-all ${currentStep > step.number ? "bg-white" : "bg-gray-700"
                  }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
