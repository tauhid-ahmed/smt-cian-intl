"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function Page() {
  // Mock data for purchase history with item names
  const purchaseData = [
    {
      id: "ORD-78945",
      date: "2024-01-15",
      items: ["Wireless Earbuds", "Phone Case",],
      total: "$245.99",
      status: "completed",
    },
    {
      id: "ORD-78942",
      date: "2024-01-12",
      items: ["Smartwatch"],
      total: "$89.99",
      status: "completed",
    },
    {
      id: "ORD-78938",
      date: "2024-01-08",
      items: [
        "Bluetooth Speaker",
        "HDMI Cable",
      ],
      total: "$412.50",
      status: "failed",
    },
    {
      id: "ORD-78931",
      date: "2024-01-03",
      items: ["Laptop Sleeve", "USB Hub"],
      total: "$156.75",
      status: "completed",
    },
    {
      id: "ORD-78925",
      date: "2023-12-28",
      items: ["Desk Lamp", "Notebook", "Pen Set"],
      total: "$298.30",
      status: "completed",
    },
  ];

  const handleDelete = (orderId: string) => {
    console.log("Deleting order:", orderId);
    // Add delete confirmation or API logic
  };

  const getStatusVariant = (status: string) => {
    return status === "completed" ? "default" : "destructive";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Purchase History</h1>
        <p className="text-gray-400 mt-2">
          View and manage your previous purchases
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-gray-400 hover:bg-transparent">
              <TableHead className="text-white font-semibold py-4">
                Order ID
              </TableHead>
              <TableHead className="text-white font-semibold py-4">
                Date
              </TableHead>
              <TableHead className="text-white font-semibold py-4">
                Items
              </TableHead>
              <TableHead className="text-white font-semibold py-4">
                Total Amount
              </TableHead>
              <TableHead className="text-white font-semibold py-4">
                Status
              </TableHead>
              <TableHead className="text-white font-semibold text-right py-4">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {purchaseData.map((order) => (
              <TableRow
                key={order.id}
                className="border-b-2 border-gray-400 last:border-b-0 hover:bg-[#2a2a2a] transition-colors"
              >
                <TableCell className="font-medium text-white py-4">
                  {order.id}
                </TableCell>
                <TableCell className="text-gray-300 py-4">
                  {formatDate(order.date)}
                </TableCell>

                {/* Items Column */}
                <TableCell className="text-gray-300 py-4">
                  <div className="flex flex-col">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="text-sm text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </TableCell>

                <TableCell className="text-gray-300 py-4">
                  {order.total}
                </TableCell>

                <TableCell className="py-4">
                  <Badge
                    variant={getStatusVariant(order.status)}
                    className={
                      order.status === "completed"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </TableCell>

                <TableCell className="text-right py-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(order.id)}
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty state (optional) */}
      {purchaseData.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No purchase history found.
        </div>
      )}
    </div>
  );
}
