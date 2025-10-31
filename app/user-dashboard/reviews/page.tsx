import React from "react";
import { Star, Edit, X, Plus } from "lucide-react";

export default function Page() {
  // Mock data for reviews
  const reviews = [
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Review Management</h1>
          <p className="text-gray-400 mt-2">
            View and edit your submitted reviews
          </p>
        </div>
        <button className="flex items-center gap-2 border border-gray-500 text-black px-4 py-2 rounded-lg bg-gray-100 transition-colors font-semibold text-sm">
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-400 rounded-xl p-4"
          >
            {/* Product Title */}
            <h2 className="text-xl font-bold text-white">
              {review.product}
            </h2>

            {/* Date and Rating */}
            <div className="flex items-center gap-4 text-gray-400 mb-2">
              {renderStars(review.rating)}
              <span>{review.date}</span>
            </div>

            {/* Review Content */}
            <p className="text-gray-400 mb-6 leading-relaxed">
              {review.content}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 border border-gray-200 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                <Edit className="w-4 h-4" />
                Edit Review
              </button>
              <button className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}