"use client";

import { Eye } from "lucide-react";
import { toast } from "sonner";

// Mock data
const contents = [
  {
    id: "SKU001",
    type: "Online",
    title: "John Doe",
    author: "3 Items",
    total: "$120",
    status: "Pending",
    date: "2025-10-31",
  },
  {
    id: "SKU002",
    type: "In-Store",
    title: "Jane Smith",
    author: "1 Item",
    total: "$45",
    status: "Shifted",
    date: "2025-10-30",
  },
  {
    id: "SKU003",
    type: "Online",
    title: "Alice Johnson",
    author: "5 Items",
    total: "$250",
    status: "Processing",
    date: "2025-10-29",
  },
  {
    id: "SKU004",
    type: "Online",
    title: "Bob Brown",
    author: "2 Items",
    total: "$80",
    status: "Delivered",
    date: "2025-10-28",
  },
];

const InventoryManagementTab = () => {
  const handleEyeByStatus = (id: string) => {
    const content = contents.find((c) => c.id === id);
    if (!content) return;

    let message = "";
    let variant: "success" | "warning" | "info" = "info";

    switch (content.status) {
      case "Pending":
        message = `${content.title}'s order is pending. Take necessary action.`;
        variant = "warning";
        break;
      case "Shifted":
        message = `${content.title}'s order has been shifted successfully.`;
        variant = "info";
        break;
      case "Processing":
        message = `${content.title}'s order is currently being processed.`;
        variant = "info";
        break;
      case "Delivered":
        message = `${content.title}'s order has been delivered.`;
        variant = "success";
        break;
      default:
        message = `${content.title}'s order status: ${content.status}`;
        variant = "info";
    }

    // Low stock override
    const numItems = parseInt(content.author.split(" ")[0], 10); // extract number from "2 Items"
    if (numItems <= 2) {
      message = `${content.author} running low on stock. Review inventory to prevent stockout.`;
      variant = "warning";
    }

    // Trigger toast dynamically with proper variant
    toast[variant](message);
  };

  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-left text-white">
          <h1 className="font-semibold text-base sm:text-lg">
            Inventory Management
          </h1>
          <h2 className="text-sm text-[#F2F2F2]">
            Monitor stock levels and receive reorder alerts
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                <th className="py-4 pr-4">Product</th>
                <th className="py-4 pr-4">SKU</th>
                <th className="py-4 pr-4">Stock Level</th>
                <th className="py-4 pr-4">Recorder Point</th>
                <th className="py-4 pr-4">Status</th>
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
                        content.status === "Pending"
                          ? "bg-[#FFA1001A] text-[#FFA100] border border-[#FFA100]"
                          : content.status === "Shifted"
                          ? "bg-[#FF00FA1A] text-[#FF00FA] border border-[#FF00FA]"
                          : content.status === "Processing"
                          ? "bg-[#497FF51A] text-[#497FF5] border border-[#497FF5]"
                          : "bg-[#00FF1A1A] text-green-600 border border-green-600"
                      }`}>
                      {content.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.date}
                  </td>
                  <td className="pl-4 pt-4 pb-4 flex justify-end">
                    <button
                      className="text-white"
                      onClick={() => handleEyeByStatus(content.id)}>
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
                      content.status === "Pending"
                        ? "bg-yellow-200 text-yellow-600"
                        : content.status === "Shifted"
                        ? "bg-[#FF00FA1A] text-[#FF00FA]"
                        : content.status === "Processing"
                        ? "bg-blue-200 text-blue-600"
                        : "bg-green-200 text-green-600"
                    }`}>
                    {content.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white ml-2">{content.date}</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="text-white"
                  onClick={() => handleEyeByStatus(content.id)}>
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

export default InventoryManagementTab;
