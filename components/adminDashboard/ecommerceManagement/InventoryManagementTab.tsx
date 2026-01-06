import { Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetInventoryQuery, InventoryProduct } from "@/lib/api/adminApi";
import { useRouter } from "next/navigation";

const InventoryManagementTab = () => {
    const { data: inventoryRes, isLoading } = useGetInventoryQuery({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    const inventory = inventoryRes?.data || [];
    const router = useRouter();

    const handleAction = (item: InventoryProduct) => {
        let message = "";
        let variant: "success" | "warning" | "info" = "info";

        if (item.status === "Low Stock") {
            message = `${item.productName} is running low on stock (${item.stockLevel}). Reorder soon!`;
            variant = "warning";
        } else {
            message = `${item.productName} stock level is healthy.`;
            variant = "success";
        }

       setTimeout(() => {
        router.push(`/admin-dashboard/ecommerce/inventory/${item.productId}`);
       }, 1000);

        toast[variant](message);
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "Low Stock":
                return "bg-[#FFA1001A] text-[#FFA100] border border-[#FFA100]";
            case "Out of Stock":
                return "bg-red-500/10 text-red-500 border border-red-500";
            case "Ok":
            case "In Stock":
                return "bg-[#00FF1A1A] text-green-600 border border-green-600";
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
                                <th className="py-4 pr-4">Product Name</th>
                                <th className="py-4 pr-4 text-center">Stock Level</th>
                                <th className="py-4 pr-4 text-center">Reorder Point</th>
                                <th className="py-4 pr-4 text-center">Status</th>
                                <th className="py-4 pl-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-400">
                                        No inventory data found
                                    </td>
                                </tr>
                            ) : (
                                inventory.map((item) => (
                                    <tr
                                        key={item.productId}
                                        className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                                        <td className="py-4 pr-4 text-white text-sm">
                                            {item.productName}
                                        </td>
                                        <td className="py-4 pr-4 text-white text-sm text-center">
                                            {item.stockLevel}
                                        </td>
                                        <td className="py-4 pr-4 text-white text-sm text-center">
                                            {item.reorderPoint}
                                        </td>
                                        <td className="py-4 pr-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                                                    item.status
                                                )}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="pl-4 pt-4 pb-4 flex justify-end">
                                            <button
                                                className="text-white hover:text-blue-400 transition-colors"
                                                onClick={() => handleAction(item)}>
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
                    {inventory.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">No inventory data found</div>
                    ) : (
                        inventory.map((item) => (
                            <div
                                key={item.productId}
                                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-white font-medium text-sm">
                                        {item.productName}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                    <div>
                                        <span className="text-gray-400">Stock:</span>
                                        <span className="text-white ml-2">{item.stockLevel}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Reorder:</span>
                                        <span className="text-white ml-2">{item.reorderPoint}</span>
                                    </div>
                                    <div className="col-span-2 mt-1">
                                        <span className="text-gray-400">Status:</span>
                                        <span
                                            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                                                item.status
                                            )}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                                        onClick={() => handleAction(item)}>
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryManagementTab;
