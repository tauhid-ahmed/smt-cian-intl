"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetInventoryDetailQuery } from "@/lib/api/adminApi";
import { ArrowLeft, Package, AlertTriangle, CheckCircle, RefreshCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const InventoryDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data, isLoading, isError, refetch } = useGetInventoryDetailQuery(id as string);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-zinc-500 animate-spin mb-4" />
                <p className="text-zinc-400">Loading inventory details...</p>
            </div>
        );
    }

    if (isError || !data?.success) {
        return (
            <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="text-red-500 w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Error Loading Details</h1>
                <p className="text-zinc-400 mb-6 max-w-md">Failed to retrieve inventory information for this product. Please check your connection or try again later.</p>
                <div className="flex gap-4">
                    <Button onClick={() => router.back()} variant="outline">Go Back</Button>
                    <Button onClick={() => refetch()} className="bg-white text-black hover:bg-zinc-200">Try Again</Button>
                </div>
            </div>
        );
    }

    const inventory = data.data;

    return (
        <div className="min-h-screen bg-black text-white p-6 lg:p-10 flex items-center justify-center">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-8 text-zinc-400 hover:text-white hover:bg-zinc-800/50 -ml-4"
                >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back to Inventory
                </Button>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm overflow-hidden backdrop-blur-md shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Package size={160} />
                    </div>

                    <div className="flex flex-col md:flex-row relative z-10">
                        {/* Image Section */}
                        <div className="md:w-2/5 bg-zinc-800/20 flex items-center justify-center p-8 lg:p-12 border-b md:border-b-0 md:border-r border-zinc-800/50">
                            <div className="relative w-full aspect-square rounded-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={inventory.mainImage}
                                    alt={inventory.productName}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:w-3/5 p-8 lg:p-12 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                    <span className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em]">Live Inventory</span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                                    {inventory.productName}
                                </h1>

                                <div className="grid grid-cols-2 gap-8 mb-10">
                                    <div className="relative">
                                        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Current Stock</p>
                                        <p className="text-5xl font-bold text-white tracking-tighter">{inventory.stockLevel}</p>
                                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-zinc-800 rounded-full" />
                                    </div>
                                    <div className="relative">
                                        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Reorder Point</p>
                                        <p className="text-5xl font-bold text-zinc-400 tracking-tighter">{inventory.reorderPoint}</p>
                                        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-zinc-800 rounded-full" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border ${inventory.status.toLowerCase().includes('low')
                                        ? 'bg-red-500/10 border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                                        }`}>
                                        {inventory.status.toLowerCase().includes('low') ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                        <span className="text-sm font-bold uppercase tracking-wide">{inventory.status}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center">
                                <RefreshCcw className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Product Identifier</p>
                                <p className="text-xs text-zinc-300 font-mono mt-0.5">{inventory.productId}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Last Synced</p>
                                <p className="text-xs text-zinc-300 mt-0.5">Just now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryDetails;