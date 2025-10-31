import React, { useState } from "react";
import { Check, X } from "lucide-react";

const reviews = [
  {
    id: 1,
    title: "Vinyl Record - Jazz Collection",
    content: "Amazing quality! The sound is crystal clear.",
    author: "John Doe",
    rating: 5,
    status: "pending",
  },
  {
    id: 2,
    title: "Artist T-Shirt",
    content: "Great design, fits perfectly.",
    author: "Jane Smith",
    rating: 4,
    status: "pending",
  },
  {
    id: 3,
    title: "Concert Ticket Bundle",
    content: "Best concert experience ever!",
    author: "Mike Johnson",
    rating: 5,
    status: "pending",
  },
  {
    id: 4,
    title: "Exclusive Art Print",
    content: "Nice but expected better quality for the price.",
    author: "Sarah Wilson",
    rating: 4,
    status: "pending",
  },
];

export default function ReviewModerationTab() {
  const [reviewList, setReviewList] = useState(reviews);

  const handleApprove = (id) => {
    setReviewList(
      reviewList.map((review) =>
        review.id === id ? { ...review, status: "approved" } : review
      )
    );
  };

  const handleReject = (id) => {
    setReviewList(
      reviewList.map((review) =>
        review.id === id ? { ...review, status: "rejected" } : review
      )
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">
            {i < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="text-left text-white mb-8">
        <h1 className="font-semibold text-base sm:text-lg">
          Review Moderation
        </h1>
        <h2 className="text-sm text-[#F2F2F2]">
          Approve or reject customer submissions
        </h2>
      </div>

      <div className="space-y-4">
        {reviewList.map((review) => (
          <div
            key={review.id}
            className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
            {/* Responsive flex layout */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <h3 className="text-lg font-normal">{review.title}</h3>
                  <span className="px-3 py-1 text-xs rounded-full border border-[#FFA100] bg-[#FFA1001A] text-[#FFA100]">
                    Pending
                  </span>
                </div>

                <p className="text-[#808080] mb-3">{review.content}</p>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#808080] text-base">
                    By {review.author}
                  </span>
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Buttons responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:ml-6 w-full sm:w-auto">
                <button
                  onClick={() => handleApprove(review.id)}
                  disabled={review.status !== "pending"}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md transition-colors w-full sm:w-auto ${
                    review.status === "approved"
                      ? "bg-[#11820080]/50 text-green-200/50"
                      : review.status === "pending"
                      ? "bg-[#11820080] hover:bg-green-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}>
                  <Check className="w-4 h-4" />
                  Approve
                </button>

                <button
                  onClick={() => handleReject(review.id)}
                  disabled={review.status !== "pending"}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md transition-colors w-full sm:w-auto ${
                    review.status === "rejected"
                      ? "bg-red-800 text-red-200"
                      : review.status === "pending"
                      ? "bg-[#E6000080] hover:bg-red-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}>
                  <X className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
