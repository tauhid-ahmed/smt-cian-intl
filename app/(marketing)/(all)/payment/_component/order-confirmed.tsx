import { CheckCircle } from "lucide-react"
import type { CheckoutData } from "./checkout-page"
import crypto from "crypto";

interface OrderConfirmedProps {
    data: CheckoutData
    orderNumber?: string | null
}

export default function OrderConfirmed({ data, orderNumber: passedOrderNumber }: OrderConfirmedProps) {
    const randomString = crypto.randomBytes(4).toString("hex").toUpperCase();
    const orderNumber = passedOrderNumber || `#MUS-${randomString}`;

    return (
        <div className="text-center space-y-6">
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <CheckCircle className="w-16 h-16 text-black" />
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h2>
                <p className="text-gray-400">Thank you for your purchase, {data.fullName}!</p>
                <p className="text-gray-400">A confirmation email has been sent to {data.email}</p>
            </div>

            <div className="border border-gray-700 rounded-lg p-8 inline-block">
                <p className="text-gray-400 mb-2">Order Number</p>
                <p className="text-2xl font-bold text-white">{orderNumber}</p>
            </div>
        </div>
    )
}
