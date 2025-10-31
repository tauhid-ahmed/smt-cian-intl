"use client";

import React from "react";
import { Package, Heart, Star } from "lucide-react";

export default function Page() {
  // Mock data for cards with Lucide icons
  const cardData = [
    { name: "Total Orders", value: "24", icon: <Package className="w-8 h-8 text-blue-400" /> },
    { name: "Wishlist Items", value: "8", icon: <Heart className="w-8 h-8 text-pink-400" /> },
    { name: "Reviews Written", value: "12", icon: <Star className="w-8 h-8 text-yellow-400" /> },
  ];

  // Mock data for recent activities
  const activities = [
    { name: "Order Placed", details: "Order #ORD-78945", time: "2 hours ago" },
    { name: "Review Submitted", details: "iPhone 15 Pro Case", time: "1 day ago" },
    { name: "Order Delivered", details: "Order #ORD-78231", time: "3 days ago" },
    { name: "Review Submitted", details: "Wireless Earbuds", time: "1 week ago" },
  ];

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Manage your account, orders, and all preferences
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-6 mb-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-400 rounded-lg p-5 w-[260px] hover:border-gray-500 transition-all"
          >
            <div>
              <h3 className="text-gray-400 text-sm font-medium">{card.name}</h3>
              <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
            </div>
            <div className="shrink-0">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="border border-gray-400 rounded-lg p-6">
        <h1 className="text-xl font-semibold text-white mb-4">
          Recent Activity
        </h1>
        <div>
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 hover:bg-[#2e2e2e] rounded-md transition-colors"
            >
              <div>
                <h3 className="font-medium text-white">{activity.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
              </div>
              <div className="text-sm text-gray-300">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
