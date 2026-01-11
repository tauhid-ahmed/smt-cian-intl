import React, { useState } from "react";
import { Check, X, Loader2, Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useGetProductReviewsQuery, useUpdateReviewStatusMutation, ProductReview } from "@/lib/api/commonApi";
import { toast } from "sonner";
import Image from "next/image";

export default function ReviewModerationTab() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const { data: reviewsRes, isLoading, isFetching } = useGetProductReviewsQuery({
        page,
        limit,
    });

    const [updateStatus, { isLoading: isUpdating }] = useUpdateReviewStatusMutation();

    const reviews = reviewsRes?.data || [];
    const meta = reviewsRes?.meta;

    const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
        try {
            const result = await updateStatus({ id, status }).unwrap();
            if (result.success) {
                toast.success(`Review ${status.toLowerCase()} successfully`);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to ${status.toLowerCase()} review`);
        }
    };

    const renderStars = (rating: number) => (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                />
            ))}
        </div>
    );

    const renderStatusBadge = (status: string) => {
        let badgeStyle = "";
        let badgeText = "";

        switch (status) {
            case "APPROVED":
                badgeStyle = "border-green-500 bg-green-500/20 text-green-400";
                badgeText = "Approved";
                break;
            case "REJECTED":
                badgeStyle = "border-red-500 bg-red-500/20 text-red-400";
                badgeText = "Rejected";
                break;
            default:
                badgeStyle = "border-[#FFA100] bg-[#FFA1001A] text-[#FFA100]";
                badgeText = "Pending";
        }

        return (
            <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border ${badgeStyle}`}>
                {badgeText}
            </span>
        );
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left text-white mb-8">
                <div>
                    <h1 className="font-semibold text-base sm:text-lg">
                        Review Moderation
                    </h1>
                    <h2 className="text-sm text-[#F2F2F2]">
                        Approve or reject customer submissions
                    </h2>
                </div>
                {isFetching && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 border border-dashed border-gray-700 rounded-xl">
                        No reviews found for moderation.
                    </div>
                ) : (
                    reviews.map((review: ProductReview) => (
                        <div
                            key={review.id}
                            className="bg-[#1A1A1A]/40 border border-white/10 rounded-xl p-4 sm:p-6 w-full transition-all hover:border-white/20">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* User & Product Info */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-800 shrink-0">
                                                {review.user?.image ? (
                                                    <Image
                                                        src={review.user.image}
                                                        alt={review.user.fullName}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <User className="w-full h-full p-2 text-gray-500" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium text-sm">{review.user?.fullName}</h4>
                                                <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        {renderStatusBadge(review.status)}
                                    </div>

                                    <div className="flex items-center gap-3 mb-4 p-2 bg-white/5 rounded-lg border border-white/10 w-fit">
                                        <div className="relative w-12 h-12 rounded overflow-hidden">
                                            <Image
                                                src={review.product?.mainImage || "/placeholder.png"}
                                                alt={review.product?.title || "Product"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Product</p>
                                            <h3 className="text-sm text-white font-medium">{review.product?.title}</h3>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        {renderStars(review.rating)}
                                    </div>

                                    <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{review.comment}"</p>

                                    {/* Media Gallery */}
                                    {review.media && review.media.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {review.media.map((item, index) => (
                                                <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                                                    <Image
                                                        src={item}
                                                        alt={`Review media ${index + 1}`}
                                                        fill
                                                        className="object-cover cursor-pointer hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-row lg:flex-col gap-3 justify-center">
                                    <button
                                        onClick={() => handleAction(review.id, "APPROVED")}
                                        disabled={review.status === "APPROVED" || isUpdating}
                                        className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-all text-sm font-semibold ${review.status === "APPROVED"
                                            ? "bg-green-500/20 text-green-500 cursor-not-allowed border border-green-500/30"
                                            : "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20"
                                            }`}>
                                        <Check className="w-4 h-4" />
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => handleAction(review.id, "REJECTED")}
                                        disabled={review.status === "REJECTED" || isUpdating}
                                        className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-all text-sm font-semibold ${review.status === "REJECTED"
                                            ? "bg-red-500/20 text-red-500 cursor-not-allowed border border-red-500/30"
                                            : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20"
                                            }`}>
                                        <X className="w-4 h-4" />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {meta && meta.total > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-white">
                    <p className="text-sm text-gray-400">
                        Showing <span className="text-white font-medium">{reviews.length}</span> of <span className="text-white font-medium">{meta.total}</span> reviews
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1 || isFetching}
                            className="p-2 border border-white/10 rounded-lg hover:bg-white/5 disabled:opacity-30 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-medium px-2">
                            Page {page} of {meta.totalPage || 1}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(meta.totalPage || 1, p + 1))}
                            disabled={page >= (meta.totalPage || 1) || isFetching}
                            className="p-2 border border-white/10 rounded-lg hover:bg-white/5 disabled:opacity-30 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
