"use client";

import React, { useState } from "react";
import { Star, Edit, X, Plus } from "lucide-react";

type TabType = "artist" | "product" | "website";

export default function Page() {
    const [activeTab, setActiveTab] = useState<TabType>("artist");

    // Mock data for product reviews
    const productReviews = [
        {
            id: 1,
            product: "Amazing Grace - Digital Album",
            date: "October 12, 2025",
            content:
                "Absolutely beautiful revolution! The vocals are angelic and the arrangement is perfect for worship.",
            rating: 5,
        },
        {
            id: 2,
            product: "Contemporary Christian Favourites",
            date: "September 8, 2025",
            content:
                "Great collection of modern worship songs. Would love to see more variety in the next edition.",
            rating: 4,
        },
        {
            id: 3,
            product: "Holy Spirit Hymns - MP3",
            date: "August 20, 2025",
            content:
                "These classic hymns bring so much peace. Perfect for daily meditation and prayer time.",
            rating: 5,
        },
    ];

    // Mock data for artist reviews
    const artistReviews = [
        {
            id: 1,
            artist: "John Doe",
            date: "October 15, 2025",
            content:
                "An incredible artist with a heart for worship. Every performance is spirit-filled.",
            rating: 5,
        },
    ];

    // Mock data for website reviews
    const websiteReviews = [
        {
            id: 1,
            date: "October 20, 2025",
            content: "The website is very easy to navigate and the checkout process was seamless.",
            rating: 5,
        },
    ];

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                            }`}
                    />
                ))}
            </div>
        );
    };

    const tabs = [
        { id: "artist", label: "Artist Review" },
        { id: "product", label: "Product Review" },
        { id: "website", label: "Website Review" },
    ];

    return (
        <div className="p-6 text-white bg-[#0A0A0A] min-h-screen">
            {/* Header */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Review Management</h1>
                    <p className="text-gray-400 mt-2">
                        View and edit your submitted reviews across different categories
                    </p>
                </div>
                <button className="flex items-center gap-2 border border-gray-500 text-black px-4 py-2 rounded-lg bg-gray-100 transition-colors font-semibold text-sm">
                    <Plus className="w-4 h-4" />
                    Add Review
                </button>
            </div>

            {/* Tabs System */}
            <div className="flex gap-4 mb-8 border-b border-gray-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`pb-4 px-2 text-sm font-medium transition-all relative ${activeTab === tab.id
                                ? "text-white"
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="space-y-8">
                {activeTab === "artist" && (
                    <div className="space-y-6">
                        {artistReviews.length > 0 ? (
                            artistReviews.map((review) => (
                                <div key={review.id} className="border border-gray-800 rounded-xl p-6 bg-[#111111]">
                                    <h2 className="text-xl font-bold text-white">{review.artist}</h2>
                                    <div className="flex items-center gap-4 text-gray-400 mb-4 mt-1">
                                        {renderStars(review.rating)}
                                        <span>{review.date}</span>
                                    </div>
                                    <p className="text-gray-400 mb-6 leading-relaxed">{review.content}</p>
                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-2 border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800">
                                            <Edit className="w-4 h-4" />
                                            Edit Review
                                        </button>
                                        <button className="flex items-center gap-2 border border-red-900 text-red-500 px-4 py-2 rounded-lg hover:bg-red-900/10 transition-colors font-semibold text-sm">
                                            <X className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No artist reviews found.</p>
                        )}
                    </div>
                )}

                {activeTab === "product" && (
                    <div className="space-y-6">
                        {productReviews.map((review) => (
                            <div key={review.id} className="border border-gray-800 rounded-xl p-6 bg-[#111111]">
                                <h2 className="text-xl font-bold text-white">{review.product}</h2>
                                <div className="flex items-center gap-4 text-gray-400 mb-4 mt-1">
                                    {renderStars(review.rating)}
                                    <span>{review.date}</span>
                                </div>
                                <p className="text-gray-400 mb-6 leading-relaxed">{review.content}</p>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800">
                                        <Edit className="w-4 h-4" />
                                        Edit Review
                                    </button>
                                    <button className="flex items-center gap-2 border border-red-900 text-red-500 px-4 py-2 rounded-lg hover:bg-red-900/10 transition-colors font-semibold text-sm">
                                        <X className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "website" && (
                    <div className="space-y-6">
                        {websiteReviews.map((review) => (
                            <div key={review.id} className="border border-gray-800 rounded-xl p-6 bg-[#111111]">
                                <h2 className="text-xl font-bold text-white">Website Experience</h2>
                                <div className="flex items-center gap-4 text-gray-400 mb-4 mt-1">
                                    {renderStars(review.rating)}
                                    <span>{review.date}</span>
                                </div>
                                <p className="text-gray-400 mb-6 leading-relaxed">{review.content}</p>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 border border-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800">
                                        <Edit className="w-4 h-4" />
                                        Edit Review
                                    </button>
                                    <button className="flex items-center gap-2 border border-red-900 text-red-500 px-4 py-2 rounded-lg hover:bg-red-900/10 transition-colors font-semibold text-sm">
                                        <X className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}