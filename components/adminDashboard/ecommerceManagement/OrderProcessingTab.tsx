"use client";

import { Eye } from "lucide-react";

// Mock data
const contents = [
  {
    id: "SKU001",
    type: "Online",
    title: "John Doe",
    author: "3 Items",
    total: "$120",
    status: "Verified",
    date: "2025-10-31",
  },
  {
    id: "SKU002",
    type: "In-Store",
    title: "Jane Smith",
    author: "1 Item",
    total: "$45",
    status: "Pending",
    date: "2025-10-30",
  },
  {
    id: "SKU003",
    type: "Online",
    title: "Alice Johnson",
    author: "5 Items",
    total: "$250",
    status: "Cancelled",
    date: "2025-10-29",
  },
];

const OrderProcessingTab = () => {
  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-left text-white">
          <h1 className="font-semibold text-base sm:text-lg">
            Order Processing
          </h1>
          <h2 className="text-sm text-[#F2F2F2]">
            View, fulfill, and track orders
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                <th className="py-4 pr-4">Order ID</th>
                <th className="py-4 pr-4">Customer</th>
                <th className="py-4 pr-4">Items</th>
                <th className="py-4 pr-4">Total</th>
                <th className="py-4 pr-4">Status</th>
                <th className="py-4 pr-4">Date</th>
                <th className="py-4 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr
                  key={content.id}
                  className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                  <td className="py-4 pr-4 text-white text-sm">{content.id}</td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.title}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.author}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.total}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        content.status === "Verified"
                          ? "bg-[#497FF51A] text-[#497FF5] border border-[#497FF5]"
                          : content.status === "Pending"
                          ? "bg-[#FFA1001A] text-[#FFA100] border border-[#FFA100]"
                          : "bg-[#FF0000]/10 text-red-600 border border-red-600"
                      }`}>
                      {content.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.date}
                  </td>
                  <td className="pl-4 pt-4 pb-4 flex justify-end">
                    <button className="text-white">
                      <Eye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {contents.map((content) => (
            <div
              key={content.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-medium text-sm">
                  {content.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2">{content.type}</span>
                </div>
                <div>
                  <span className="text-gray-400">Items:</span>
                  <span className="text-white ml-2">{content.author}</span>
                </div>
                <div>
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white ml-2">{content.total}</span>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${
                      content.status === "Verified"
                        ? "bg-green-500/20 text-green-500"
                        : content.status === "Pending"
                        ? "bg-yellow-200 text-yellow-600"
                        : "bg-red-200 text-red-600"
                    }`}>
                    {content.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white ml-2">{content.date}</span>
                </div>
              </div>
              {/* Mobile Action Button */}
              <div className="flex justify-end">
                <button className="text-white">
                  <Eye />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProcessingTab;
