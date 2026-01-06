import { Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetAllOrdersQuery, Order } from "@/lib/api/adminApi"; 
import { useRouter } from "next/navigation";

const OrderProcessingTab = () => {
    const router = useRouter() 
    const { data: ordersRes, isLoading } = useGetAllOrdersQuery({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    const orders = ordersRes?.data || [];

    const handleEyeByStatus = (order: Order) => {
        let message = "";
        let variant: "success" | "warning" | "info" | "error" = "info";
        setTimeout(() => {
            router.push(`/admin-dashboard/ecommerce/order/${order.id}`);
        }, 1000);
        switch (order.status) {
            case "PENDING":
                message = `${order.user?.fullName}'s order is pending. Take necessary action.`;
                variant = "warning";
                break;
            case "SHIPPED":
                message = `${order.user?.fullName}'s order has been shipped successfully.`;
                variant = "info";
                break;
            case "PROCESSING":
                message = `${order.user?.fullName}'s order is currently being processed.`;
                variant = "info";
                break;
            case "DELIVERED":
                message = `${order.user?.fullName}'s order has been delivered.`;
                variant = "success";
                break;
            case "CANCELLED":
                message = `${order.user?.fullName}'s order was cancelled.`;
                variant = "error";
                break;
            default:
                message = `${order.user?.fullName}'s order status: ${order.status}`;
                variant = "info";
        }

        // Low items alert (example logic)
        if (order.itemsCount <= 1) {
            message = `${order.user?.fullName} ordered 1 item. Review order details.`;
            variant = "info";
        }

        toast[variant](message);
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-[#FFA1001A] text-[#FFA100] border border-[#FFA100]";
            case "SHIPPED":
                return "bg-[#FF00FA1A] text-[#FF00FA] border border-[#FF00FA]";
            case "PROCESSING":
                return "bg-[#497FF51A] text-[#497FF5] border border-[#497FF5]";
            case "DELIVERED":
                return "bg-[#00FF1A1A] text-green-600 border border-green-600";
            case "CANCELLED":
                return "bg-red-500/10 text-red-500 border border-red-500";
            default:
                return "bg-gray-500/10 text-gray-500 border border-gray-500";
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64 border border-white rounded-xl">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-left text-white">
                    <h1 className="font-semibold text-base sm:text-lg">
                        Order Processing
                    </h1>
                    <h2 className="text-sm text-[#F2F2F2]">
                        View, fulfill, and track orders
                    </h2>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                            <th className="py-4 pr-4">Order Number</th>
                            <th className="py-4 pr-4">Customer</th>
                            <th className="py-4 pr-4">Items</th>
                            <th className="py-4 pr-4">Total</th>
                            <th className="py-4 pr-4">Status</th>
                            <th className="py-4 pr-4">Date</th>
                            <th className="py-4 pl-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-8 text-center text-gray-400">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                                    <td className="py-4 pr-4 text-white text-sm">
                                        {order.orderNumber}
                                    </td>
                                    <td className="py-4 pr-4 text-white text-sm">
                                        {order.user?.fullName || "N/A"}
                                    </td>
                                    <td className="py-4 pr-4 text-white text-sm">
                                        {order.itemsCount} {order.itemsCount === 1 ? "Item" : "Items"}
                                    </td>
                                    <td className="py-4 pr-4 text-white text-sm">
                                        ${order.totalAmount.toLocaleString()}
                                    </td>
                                    <td className="py-4 pr-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                                                order.status
                                            )}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4 text-white text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="pl-4 pt-4 pb-4 flex justify-end">
                                        <button
                                            className="text-white hover:text-blue-400 transition-colors"
                                            onClick={() => handleEyeByStatus(order)}>
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {orders.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No orders found</div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-white font-medium text-sm">
                                    {order.user?.fullName || "N/A"}
                                </h3>
                                <span className="text-xs text-gray-500">{order.orderNumber}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                <div>
                                    <span className="text-gray-400">Items:</span>
                                    <span className="text-white ml-2">
                                        {order.itemsCount}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Total:</span>
                                    <span className="text-white ml-2">${order.totalAmount}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Status:</span>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${getStatusStyles(
                                            order.status
                                        )}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-gray-400">Date:</span>
                                    <span className="text-white ml-2">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                                    onClick={() => handleEyeByStatus(order)}>
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderProcessingTab;
