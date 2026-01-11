'use client'

import { useState } from "react";
import { Heart, ShoppingCart, Star, Trash2, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useGetWhishlistQuery, useToggleWhishlistMutation } from "@/lib/api/commonApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Page() {
    const [page, setPage] = useState(1);
    const limit = 8; // Adjust limit as needed

    const { data: whishListData, isLoading, isFetching, isSuccess } = useGetWhishlistQuery({
        page,
        limit
    });

    const [toggleWishlist, { isLoading: isToggling }] = useToggleWhishlistMutation();

    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            const res = await toggleWishlist({ productId }).unwrap();
            if (res.success) {
                toast.success("Removed from wishlist");
            }
        } catch (error) {
            toast.error("Failed to remove from wishlist");
            console.error(error);
        }
    };

    const whishlistItems = whishListData?.data || [];

    const meta = whishListData?.meta;

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                            }`}
                    />
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="p-6 space-y-8">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-48 bg-gray-800" />
                    <Skeleton className="h-5 w-72 bg-gray-800" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="border border-gray-800 rounded-2xl bg-gray-900/50 p-4 space-y-4">
                            <Skeleton className="h-48 w-full rounded-xl bg-gray-800" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-3/4 bg-gray-800" />
                                <Skeleton className="h-4 w-1/2 bg-gray-800" />
                                <div className="flex justify-between items-center pt-4">
                                    <Skeleton className="h-8 w-20 bg-gray-800" />
                                    <Skeleton className="h-10 w-28 bg-gray-800" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 text-white min-h-screen">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        My Wishlist
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        You have {meta?.total || 0} items saved in your wishlist
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            {isSuccess && whishlistItems.length > 0 ? (
                <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                        {whishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative border border-gray-800 rounded-3xl bg-gray-900/40 hover:bg-gray-900/60 hover:border-gray-700 transition-all duration-300 overflow-hidden"
                            >
                                {/* Product Image Container */}
                                <div className="relative w-full h-56 overflow-hidden">
                                    <Image
                                        src={item.mainImage || "/placeholder-product.jpg"}
                                        alt={item.mainImage || "Product"}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-60" />

                                    {/* Top Right Actions */}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <button
                                            onClick={() => handleRemoveFromWishlist(item.productId)}
                                            disabled={isToggling}
                                            className="p-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-red-500 transition-all duration-300 group/btn"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                    </div>

                                    {/* Bottom Left Category Badge */}
                                    {item.category && (
                                        <div className="absolute bottom-3 left-3 bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                            {item.category}
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-5 space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-yellow-500 text-xs font-medium uppercase tracking-widest">{item.artist?.name || 'Various Artists'}</p>
                                        <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-yellow-400 transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        {renderStars(item.rating || 0)}
                                        <span className="text-gray-500 text-xs font-semibold">
                                            ({item.rating || 0})
                                        </span>
                                    </div>

                                    {/* Price and Actions */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex flex-col">
                                            {item.discountPrice && item.discountPrice < item.price ? (
                                                <>
                                                    <span className="text-xs text-gray-500 line-through">${item.price}</span>
                                                    <span className="text-2xl font-black text-white">${item.discountPrice}</span>
                                                </>
                                            ) : (
                                                <span className="text-2xl font-black text-white">${item.price}</span>
                                            )}
                                        </div>
                                        <Link href={`/shop/${item.id}`}>
                                            <Button className="rounded-full bg-white text-black hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold text-xs h-10 px-6">
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                View Product
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {meta && meta.totalPage > 1 && (
                        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-800 pt-8">
                            <p className="text-sm text-gray-400 font-medium">
                                Showing <span className="text-white">{(page - 1) * meta.limit + 1}</span> to <span className="text-white">{Math.min(page * meta.limit, meta.total)}</span> of <span className="text-white">{meta.total}</span> items
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={page === 1 || isFetching}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-600 rounded-xl w-10 h-10 disabled:opacity-30 transition-all"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>

                                <div className="flex items-center gap-1 mx-2">
                                    {[...Array(meta.totalPage)].map((_, i) => {
                                        const p = i + 1;
                                        // Show only current, first, last and 1 neighbor
                                        if (p === 1 || p === meta.totalPage || (p >= page - 1 && p <= page + 1)) {
                                            return (
                                                <Button
                                                    key={p}
                                                    variant={page === p ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setPage(p)}
                                                    className={`w-10 h-10 rounded-xl font-bold transition-all ${page === p
                                                        ? 'bg-white text-black hover:bg-white'
                                                        : 'border-gray-700 bg-transparent text-gray-400 hover:text-white hover:border-gray-500'
                                                        }`}
                                                >
                                                    {p}
                                                </Button>
                                            );
                                        }
                                        if (p === page - 2 || p === page + 2) {
                                            return <span key={p} className="text-gray-600 px-1">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    disabled={page === meta.totalPage || isFetching}
                                    onClick={() => setPage((p) => Math.min(meta.totalPage, p + 1))}
                                    className="border-gray-700 bg-transparent text-white hover:bg-gray-800 hover:border-gray-600 rounded-xl w-10 h-10 disabled:opacity-30 transition-all"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-800 rounded-3xl bg-gray-900/20">
                    <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                        <Heart className="w-12 h-12 text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Your wishlist is empty
                    </h3>
                    <p className="text-gray-500 max-w-sm">
                        Keep track of the products you love. They will show up here so you can easily find them again.
                    </p>
                    <Button
                        onClick={() => window.location.href = '/products'}
                        className="mt-8 bg-white text-black hover:bg-yellow-400 transition-all rounded-full px-8 h-12 font-bold"
                    >
                        Browse Products
                    </Button>
                </div>
            )}
        </div>
    );
}

