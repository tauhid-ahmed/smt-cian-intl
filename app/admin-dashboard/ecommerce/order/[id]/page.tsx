"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetSingleOrderQuery, useUpdateOrderStatusMutation } from "@/lib/api/adminApi";
import {
    ArrowLeft,
    Package,
    Truck,
    CreditCard,
    Calendar,
    User,
    MapPin,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const OrderDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: response, isLoading, isError, refetch } = useGetSingleOrderQuery(id as string);
    const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

    const handleStatusChange = async (newStatus: string) => {
        try {
            await updateStatus({ orderId: id as string, status: newStatus }).unwrap();
            toast.success(`Order status updated to ${newStatus}`);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update order status");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-zinc-500 animate-spin mb-4" />
                <p className="text-zinc-400">Loading order details...</p>
            </div>
        );
    }

    if (isError || !response?.success) {
        return (
            <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="text-red-500 w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Error Loading Order</h1>
                <p className="text-zinc-400 mb-6 max-w-md">Failed to retrieve details for this order. Please check your connection or try again later.</p>
                <div className="flex gap-4">
                    <Button onClick={() => router.back()} variant="outline">Go Back</Button>
                    <Button onClick={() => refetch()} className="bg-white text-black hover:bg-zinc-200">Try Again</Button>
                </div>
            </div>
        );
    }

    const order = response.data;

    const getStatusStyles = (status: string) => {
        switch (status.toUpperCase()) {
            case "COMPLETED":
            case "SUCCEEDED":
            case "PAID":
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "PROCESSING":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "PENDING":
                return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            case "CANCELLED":
            case "FAILED":
                return "bg-red-500/10 text-red-500 border-red-500/20";
            default:
                return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 lg:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="mb-4 text-zinc-400 hover:text-white hover:bg-zinc-800/50 -ml-4"
                        >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Back to Orders
                        </Button>
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-black tracking-tight uppercase">
                                Order <span className="text-zinc-500">{order.orderNumber}</span>
                            </h1>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                                {order.status === "PROCESSING" ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                {order.status}
                            </div>

                            <Select onValueChange={handleStatusChange} disabled={isUpdating}>
                                <SelectTrigger className="w-fit h-7 border-zinc-800 bg-zinc-900/50 text-[10px] font-black uppercase tracking-wider rounded-full px-3">
                                    <SelectValue placeholder="Update Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                                    <SelectItem value="PENDING" className="text-[10px] font-bold uppercase tracking-widest focus:bg-zinc-800 focus:text-white">PENDING</SelectItem>
                                    <SelectItem value="PROCESSING" className="text-[10px] font-bold uppercase tracking-widest focus:bg-zinc-800 focus:text-white">PROCESSING</SelectItem>
                                    <SelectItem value="SHIPPED" className="text-[10px] font-bold uppercase tracking-widest focus:bg-zinc-800 focus:text-white">SHIPPED</SelectItem>
                                    <SelectItem value="DELIVERED" className="text-[10px] font-bold uppercase tracking-widest focus:bg-zinc-800 focus:text-white">DELIVERED</SelectItem>
                                    <SelectItem value="CANCELLED" className="text-[10px] font-bold uppercase tracking-widest focus:bg-red-900/50 focus:text-red-500">CANCELLED</SelectItem>
                                    <SelectItem value="REFUNDED" className="text-[10px] font-bold uppercase tracking-widest focus:bg-zinc-800 focus:text-white">REFUNDED</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <p className="text-zinc-500 text-sm mt-2 flex items-center gap-2">
                            Placed on {order.createdAt ? format(new Date(order.createdAt), "PPP p") : "Unknown date"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800/50 font-bold h-12 px-6 rounded-xl">
                            Download Receipt
                        </Button>
                        {order.payment?.receiptUrl && (
                            <Button asChild className="bg-white text-black hover:bg-zinc-200 font-bold h-12 px-6 rounded-xl">
                                <a href={order.payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                                    Stripe Receipt <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Items List */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-3xl overflow-hidden backdrop-blur-sm">
                            <div className="px-8 py-6 border-b border-zinc-800/60 flex items-center justify-between">
                                <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Order Items ({order.items.length})
                                </h2>
                            </div>
                            <div className="divide-y divide-zinc-800/60">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-8 flex gap-6 hover:bg-zinc-800/10 transition-colors">
                                        <div className="w-24 h-24 bg-zinc-800 rounded-2xl overflow-hidden ring-1 ring-white/5 shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                                    <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider">
                                                        {item.product.category} • {item.product.productType}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-white">${item.price}</p>
                                                    <p className="text-zinc-500 text-xs mt-1">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex gap-4">
                                                {item.size && (
                                                    <div className="px-2 py-1 bg-zinc-800/50 rounded-md text-[10px] font-bold text-zinc-400 border border-zinc-700/50">
                                                        SIZE: {item.size}
                                                    </div>
                                                )}
                                                {item.color && (
                                                    <div className="px-2 py-1 bg-zinc-800/50 rounded-md text-[10px] font-bold text-zinc-400 border border-zinc-700/50">
                                                        COLOR: {item.color}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Calculation Section */}
                            <div className="p-8 bg-zinc-900/60 border-t border-zinc-800/60">
                                <div className="max-w-xs ml-auto space-y-4">
                                    <div className="flex justify-between text-zinc-500 text-sm font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-zinc-300 font-bold">${order.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-500 text-sm font-medium">
                                        <span>Shipping Charge</span>
                                        <span className="text-zinc-300 font-bold">${order.shippingCharge}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-500 text-sm font-medium">
                                        <span>Tax</span>
                                        <span className="text-zinc-300 font-bold">${order.tax}</span>
                                    </div>
                                    {order.discount > 0 && (
                                        <div className="flex justify-between text-emerald-500 text-sm font-medium">
                                            <span>Discount</span>
                                            <span className="font-bold">-${order.discount}</span>
                                        </div>
                                    )}
                                    <div className="pt-4 border-t border-zinc-800/60 flex justify-between items-end">
                                        <span className="text-white font-black uppercase tracking-wider text-xs">Total Amount</span>
                                        <span className="text-3xl font-black text-white tracking-tighter">${order.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Timeline or Notes could go here */}
                    </div>

                    {/* Sidebar - Shipping & Payment Info */}
                    <div className="space-y-8">
                        {/* Customer & Shipping Info */}
                        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 text-white opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                                <Truck size={120} />
                            </div>

                            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Shipping Details
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Customer</p>
                                    <p className="text-white font-bold flex items-center gap-2">
                                        <User size={14} className="text-zinc-500" />
                                        {order.shippingInfo.fullName}
                                    </p>
                                    <p className="text-zinc-400 text-xs mt-1">{order.shippingInfo.email}</p>
                                    <p className="text-zinc-400 text-xs mt-0.5">{order.shippingInfo.phoneNumber}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Delivery Address</p>
                                    <div className="text-sm text-zinc-300 leading-relaxed">
                                        {order.shippingInfo.address}<br />
                                        {order.shippingInfo.city}, {order.shippingInfo.postCode}<br />
                                        {order.shippingInfo.country}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Shipment Status</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <Truck size={14} className="text-zinc-400" />
                                        </div>
                                        <span className="text-xs text-zinc-400 italic">
                                            {order.shippingInfo.carrier || "Carrier not assigned yet"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 text-white opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                                <CreditCard size={120} />
                            </div>

                            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Payment Info
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Method</p>
                                        <p className="text-white font-bold flex items-center gap-2">
                                            {order.paymentMethod === "CARD" ? "Visa / Mastercard" : order.paymentMethod}
                                        </p>
                                    </div>
                                    <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(order.paymentStatus)}`}>
                                        {order.paymentStatus}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Transaction ID</p>
                                    <p className="text-xs text-zinc-400 font-mono break-all">{order.paymentIntentId}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Total Paid</p>
                                    <p className="text-2xl font-black text-white italic tracking-tighter">${order.payment?.amount}</p>
                                    <p className="text-[10px] text-zinc-600 font-bold mt-1 uppercase flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        Paid on {order.payment?.paidAt ? format(new Date(order.payment.paidAt), "MMM d, yyyy") : "Not paid yet"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
