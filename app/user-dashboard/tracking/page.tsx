import React from "react";
import { Package, MapPin, CheckCircle, Circle } from "lucide-react";

const OrderTrackingPage = () => {
  // Dummy orders data (this will be replaced with actual data comming from API)
  const orders = [
    {
      id: "ORD-2024-004",
      orderedDate: "October 18, 2025",
      estimatedDelivery: "October 22, 2025",
      deliveryProgress: 60,
      items: [
        { name: "Worship Collection Vinyl" },
        { name: "Limited Edition Poster" },
      ],
      trackingNumber: "1Z999AA10123456784",
      updates: [
        {
          status: "Order Confirmed",
          location: "Nashville, TN",
          date: "Oct 18, 9:00 AM",
          completed: true,
        },
        {
          status: "Shipped",
          location: "Memphis, TN",
          date: "Oct 18, 2:00 PM",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Louisville, KY",
          date: "Oct 19, 10:00 AM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Expected",
          date: "Oct 22, 12:00 PM",
          completed: false,
        },
      ],
    },
    {
      id: "ORD-2024-005",
      orderedDate: "October 16, 2025",
      estimatedDelivery: "October 25, 2025",
      deliveryProgress: 20,
      items: [{ name: "Christian Artist T-Shirt" }],
      trackingNumber: "Pending",
      updates: [
        {
          status: "Order Received",
          location: "Processing Center",
          date: "Oct 18, 9:00 AM",
          completed: true,
        },
        {
          status: "Processing",
          location: "Processing Center",
          date: "Oct 18, 2:00 PM",
          completed: true,
        },
      ],
      isActive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
        <p className="text-gray-400">Track your physical product shipments</p>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="space-y-4">
            {/* Order Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mb-1">{order.id}</h2>
                <p className="text-sm text-gray-400">
                  Ordered on {order.orderedDate}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Estimated Delivery</p>
                <p className="text-sm font-semibold">
                  {order.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Delivery Progress</span>
                <span className="text-sm font-semibold">
                  {order.deliveryProgress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${order.deliveryProgress}%` }}
                />
              </div>
            </div>

            {/* Items and Tracking */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 mb-2">Items</p>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm font-medium">
                    {item.name}
                  </p>
                ))}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-2">Tracking Number</p>
                <p className="text-sm font-mono">{order.trackingNumber}</p>
              </div>
            </div>

            {/* Shipping Updates */}
            <div
              className={`border rounded-lg p-6 ${
                order.isActive
                  ? "border-gray-500 bg-gray-950/20"
                  : "border-gray-700 bg-gray-900/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5" />
                <h3 className="font-semibold">Shipping Updates</h3>
              </div>

              <div className="space-y-4">
                {order.updates.map((update, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      {update.completed ? (
                        <CheckCircle className="w-5 h-5 text-white shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600 shrink-0" />
                      )}
                      {idx < order.updates.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            update.completed ? "bg-white" : "bg-gray-700"
                          }`}
                        />
                      )}
                    </div>

                    {/* Update Content */}
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4
                          className={`font-semibold ${
                            update.completed ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {update.status}
                        </h4>
                        <span
                          className={`text-sm ${
                            update.completed ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {update.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin
                          className={`w-4 h-4 ${
                            update.completed ? "text-gray-400" : "text-gray-600"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            update.completed ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {update.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
