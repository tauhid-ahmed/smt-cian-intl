"use client";

import React, { useState } from "react";
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
import { Trash2, AlertCircle, Eye } from "lucide-react";
import { useGetMyOrdersQuery } from "@/lib/api/orderApi";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Page() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error } = useGetMyOrdersQuery({
        page,
        limit: 5,
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    const purchaseData = data?.data || [];
    const meta = data?.meta;

    const handleDelete = (orderId: string) => {
        console.log("Deleting order:", orderId);
        // Add delete confirmation or API logic
    };

    const getStatusVariant = (status: string) => {
        const s = status?.toUpperCase();
        if (["COMPLETED", "SUCCEEDED", "DELIVERED"].includes(s)) return "default";
        if (["FAILED", "CANCELLED"].includes(s)) return "destructive";
        return "secondary";
    };

    const getStatusClasses = (status: string) => {
        const s = status?.toUpperCase();
        if (["COMPLETED", "SUCCEEDED", "DELIVERED"].includes(s))
            return "bg-green-500/20 text-green-400 border-green-500/30";
        if (["FAILED", "CANCELLED"].includes(s))
            return "bg-red-500/20 text-red-400 border-red-500/30";
        if (["PROCESSING", "PENDING", "SHIPPED"].includes(s))
            return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (isError) {
        return (
            <div className="p-6 text-white flex flex-col items-center justify-center min-h-[400px]">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-white">Failed to load orders</h2>
                <p className="text-gray-400 mt-2">
                    {(error as any)?.data?.message || "Something went wrong while fetching your purchase history."}
                </p>
                <Button
                    variant="outline"
                    className="mt-6 border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </div>
        );
    }

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
                                Order Number
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
                        {isLoading ? (
                            // Skeleton rows
                            Array.from({ length: 5 }).map((_, idx) => (
                                <TableRow key={idx} className="border-b-2 border-gray-400">
                                    <TableCell><Skeleton className="h-6 w-24 bg-gray-700" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-32 bg-gray-700" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-48 bg-gray-700" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20 bg-gray-700" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-24 rounded-full bg-gray-700" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto bg-gray-700" /></TableCell>
                                </TableRow>
                            ))
                        ) : purchaseData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                                    No purchase history found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            purchaseData.map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="border-b-2 border-gray-400 last:border-b-0 hover:bg-[#2a2a2a] transition-colors"
                                >
                                    <TableCell className="font-medium text-white py-4">
                                        {order.orderNumber}
                                    </TableCell>
                                    <TableCell className="text-gray-300 py-4">
                                        {formatDate(order.createdAt)}
                                    </TableCell>

                                    {/* Items Column */}
                                    <TableCell className="text-gray-300 py-4">
                                        <div className="flex flex-col">
                                            {order.items.map((item, idx) => (
                                                <span key={item.id || idx} className="text-sm text-gray-300">
                                                    {item.title} x {item.quantity}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-gray-300 py-4">
                                        ${order.totalAmount.toFixed(2)}
                                    </TableCell>

                                    <TableCell className="py-4">
                                        <Badge
                                            variant={getStatusVariant(order.status)}
                                            className={getStatusClasses(order.status)}
                                        >
                                            {order.status.charAt(0).toUpperCase() +
                                                order.status.slice(1).toLowerCase()}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="text-right py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/user-dashboard/orders/${order.id}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(order.id)}
                                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {!isLoading && meta && meta.totalPage > 1 && (
                <div className="mt-8 flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        Showing {(page - 1) * meta.limit + 1} to {Math.min(page * meta.limit, meta.total)} of {meta.total} orders
                    </p>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === meta.totalPage}
                            onClick={() => setPage((p) => Math.min(meta.totalPage, p + 1))}
                            className="border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
