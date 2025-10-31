"use client";

import React from "react";
import { DollarSign, Heart, FileText, Download } from "lucide-react";
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

export default function Page() {
  // Mock data for donor cards
  const cardData = [
    { 
      name: "Total Donated", 
      value: "$12,450", 
      icon: <DollarSign className="w-8 h-8 text-gray-200" /> 
    },
    { 
      name: "Number of Donations", 
      value: "24", 
      icon: <Heart className="w-8 h-8 text-gray-200" /> 
    },
    { 
      name: "Total Tax Receipts", 
      value: "18", 
      icon: <FileText className="w-8 h-8 text-gray-200" /> 
    },
  ];

  // Mock data for donation history
  const donationHistory = [
    {
      id: "DON-78945",
      date: "2024-01-15",
      campaign: "Education Fund",
      amount: "$2,120",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "DON-78942",
      date: "2024-01-12",
      campaign: "Health Initiative",
      amount: "$500",
      paymentMethod: "PayPal",
      status: "completed",
    },
    {
      id: "DON-78938",
      date: "2024-01-08",
      campaign: "Disaster Relief",
      amount: "$1,000",
      paymentMethod: "Bank Transfer",
      status: "pending",
    },
    {
      id: "DON-78931",
      date: "2024-01-03",
      campaign: "Children's Program",
      amount: "$250",
      paymentMethod: "Credit Card",
      status: "completed",
    },
    {
      id: "DON-78925",
      date: "2023-12-28",
      campaign: "Education Fund",
      amount: "$1,500",
      paymentMethod: "PayPal",
      status: "completed",
    },
  ];

  // Mock data for tax receipts
  const taxReceipts = [
    {
      id: "TR-2025-001",
      taxYear: "2024",
      receiptNumber: "TR-2024-001",
      totalAmount: "$3,620",
      dateIssued: "2024-01-20",
      status: "available",
    },
    {
      id: "TR-2024-015",
      taxYear: "2023",
      receiptNumber: "TR-2023-015",
      totalAmount: "$8,830",
      dateIssued: "2024-01-05",
      status: "available",
    },
    {
      id: "TR-2024-014",
      taxYear: "2023",
      receiptNumber: "TR-2023-014",
      totalAmount: "$1,250",
      dateIssued: "2023-12-30",
      status: "available",
    },
  ];

  const handleDownload = (receiptId: string) => {
    console.log("Downloading receipt:", receiptId);
    // Add download logic here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusVariant = (status: string) => {
    if (status === "completed" || status === "available") return "default";
    if (status === "pending") return "secondary";
    return "destructive";
  };

  const getStatusClass = (status: string) => {
    if (status === "completed" || status === "available") 
      return "bg-green-500/20 text-green-400 border-green-500/30";
    if (status === "pending") 
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Donor Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Manage your donations and contributions
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

      {/* Donation History Section */}
      <div className="border border-gray-400 rounded-lg p-6 mb-8">
        <h1 className="text-xl font-semibold text-white mb-4">Donation History</h1>
        <div className="overflow-hidden rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-gray-400 hover:bg-transparent">
                <TableHead className="text-white font-semibold py-4">Date</TableHead>
                <TableHead className="text-white font-semibold py-4">Campaign</TableHead>
                <TableHead className="text-white font-semibold py-4">Amount</TableHead>
                <TableHead className="text-white font-semibold py-4">Payment Method</TableHead>
                <TableHead className="text-white font-semibold py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationHistory.map((donation) => (
                <TableRow
                  key={donation.id}
                  className="border-b-2 border-gray-500 last:border-b-0 hover:bg-[#2a2a2a] transition-colors"
                >
                  <TableCell className="text-gray-300 py-4">
                    {formatDate(donation.date)}
                  </TableCell>
                  <TableCell className="font-medium text-white py-4">
                    {donation.campaign}
                  </TableCell>
                  <TableCell className="text-gray-300 py-4">
                    {donation.amount}
                  </TableCell>
                  <TableCell className="text-gray-300 py-4">
                    {donation.paymentMethod}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant={getStatusVariant(donation.status)}
                      className={getStatusClass(donation.status)}
                    >
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Available Tax Receipts Section */}
      <div className="border border-gray-400 rounded-lg p-6">
        <h1 className="text-xl font-semibold text-white mb-4">Available Tax Receipts</h1>
        <div className="overflow-hidden rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-gray-500 hover:bg-transparent">
                <TableHead className="text-white font-semibold py-4">Tax Year</TableHead>
                <TableHead className="text-white font-semibold py-4">Receipt Number</TableHead>
                <TableHead className="text-white font-semibold py-4">Total Amount</TableHead>
                <TableHead className="text-white font-semibold py-4">Date Issued</TableHead>
                <TableHead className="text-white font-semibold py-4">Status</TableHead>
                <TableHead className="text-white font-semibold text-right py-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxReceipts.map((receipt) => (
                <TableRow
                  key={receipt.id}
                  className="border-b-2 border-gray-400 last:border-b-0 hover:bg-[#2a2a2a] transition-colors"
                >
                  <TableCell className="text-gray-300 py-4">
                    {receipt.taxYear}
                  </TableCell>
                  <TableCell className="font-medium text-white py-4">
                    {receipt.receiptNumber}
                  </TableCell>
                  <TableCell className="text-gray-300 py-4">
                    {receipt.totalAmount}
                  </TableCell>
                  <TableCell className="text-gray-300 py-4">
                    {formatDate(receipt.dateIssued)}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant={getStatusVariant(receipt.status)}
                      className={getStatusClass(receipt.status)}
                    >
                      {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(receipt.id)}
                      className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}