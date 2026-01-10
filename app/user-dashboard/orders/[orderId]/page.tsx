"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleMyOrderQuery } from "@/lib/api/orderApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function OrderDetailsPage() {
    const { orderId } = useParams();
    const router = useRouter();
    const { data: response, isLoading, isError } = useGetSingleMyOrderQuery(orderId as string);

    const order = response?.data;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
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

    if (isLoading) {
        return (
            <div className="p-6 text-white space-y-6">
                <Skeleton className="h-10 w-48 bg-gray-800" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-64 col-span-2 bg-gray-800" />
                    <Skeleton className="h-64 bg-gray-800" />
                </div>
            </div>
        );
    }

    if (isError || !order) {
        return (
            <div className="p-6 text-white text-center">
                <h2 className="text-2xl font-bold">Order not found</h2>
                <Button variant="outline" className="mt-4" onClick={() => router.back()}>
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className="p-6 text-white max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <Button
                        variant="ghost"
                        className="p-0 hover:bg-transparent text-gray-400 hover:text-white mb-2"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Orders
                    </Button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>
                        <Badge className={getStatusClasses(order.status)}>
                            {order.status}
                        </Badge>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-gray-400 flex items-center justify-end gap-2">
                        <Calendar className="h-4 w-4" />
                        Placed on {formatDate(order.createdAt)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-gray-800 bg-[#222]">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-400" />
                                Order Items
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-[#252525] border border-gray-800">
                                        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-800 flex-shrink-0">
                                            <Image
                                                src={item.imageUrl || item.product?.mainImage || "/images/placeholder.jpg"}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="text-sm text-gray-400">
                                                {item.size && `Size: ${item.size}`}
                                                {item.size && item.color && " | "}
                                                {item.color && `Color: ${item.color}`}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-gray-300">
                                                    Quantity: <span className="text-white font-medium">{item.quantity}</span>
                                                </p>
                                                <p className="text-blue-400 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-gray-800 bg-[#222]">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-green-400" />
                                Shipping Information
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Customer</p>
                                    <p className="text-white font-medium">{order.shippingInfo.fullName}</p>
                                    <p className="text-gray-400 text-sm">{order.shippingInfo.email}</p>
                                    <p className="text-gray-400 text-sm">{order.shippingInfo.phoneNumber}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Shipping Address</p>
                                    <p className="text-white font-medium">
                                        {order.shippingInfo.address}<br />
                                        {order.shippingInfo.city}, {order.shippingInfo.postCode}<br />
                                        {order.shippingInfo.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Payment & Summary */}
                <div className="space-y-6">
                    {/* Payment Status */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-gray-800 bg-[#222]">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-purple-400" />
                                Payment Details
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Status</span>
                                <Badge variant="outline" className="border-green-500/30 text-green-400">
                                    {order.paymentStatus}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Method</span>
                                <span className="text-white font-medium">{order.paymentMethod || "CARD"}</span>
                            </div>
                            {order.paymentIntentId && (
                                <div className="pt-2">
                                    <p className="text-[10px] text-gray-500 uppercase mb-1">Transaction ID</p>
                                    <p className="text-xs text-gray-400 font-mono break-all">{order.paymentIntentId}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-gray-800 bg-[#222]">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5 text-yellow-500" />
                                Order Summary
                            </h2>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white">${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-white">${order.shippingCharge.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Tax</span>
                                <span className="text-white">${order.tax.toFixed(2)}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-green-400">
                                    <span>Discount</span>
                                    <span>-${order.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-white">Total</span>
                                <span className="text-2xl font-bold text-yellow-500">${order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}