"use client";
import React from "react";
import { Star } from "lucide-react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  showReviews?: boolean;
  reviewCount?: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
  showReviews = false,
  reviewCount = 0,
  editable = false,
  onChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const renderStar = (index: number) => {
    const diff = rating - index;

    if (diff >= 1) {
      return <FaStar key={index} className="text-yellow-500" />;
    } else if (diff >= 0.75) {
      return <FaStar key={index} className="text-yellow-500" />;
    } else if (diff >= 0.5) {
      return <FaStarHalfAlt key={index} className="text-yellow-500" />;
    } else if (diff >= 0.25) {
      return <FaStarHalfAlt key={index} className="text-yellow-500" />;
    } else {
      return <FaRegStar key={index} className="text-gray-300" />;
    }
  };

  const handleClick = (index: number) => {
    if (editable && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex gap-1 ${sizeClasses[size]} ${
          editable ? "cursor-pointer" : ""
        }`}
      >
        {[...Array(maxRating)].map((_, i) => (
          <span key={i} onClick={() => handleClick(i)}>
            {renderStar(i)}
          </span>
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600">
          {rating.toFixed(1)}/{maxRating}
        </span>
      )}
      {showReviews && reviewCount > 0 && (
        <span className="text-sm text-gray-600">
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}

// ==================== TYPE DEFINITIONS ====================
interface RatingData {
  stars: number;
  percentage: number;
}

interface RatingBreakdownProps {
  ratings?: RatingData[];
}

// ==================== DEFAULT DATA ====================
const defaultRatings: RatingData[] = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

// ==================== MAIN COMPONENT ====================
export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({
  ratings = defaultRatings,
}) => {
  return (
    <div className="w-full max-w-4xl bg-black text-white p-8">
      <div className="space-y-4">
        {ratings.map((rating) => (
          <div key={rating.stars} className="flex items-center gap-4">
            {/* Star Number */}
            <div className="text-3xl font-bold w-8 text-right">
              {rating.stars}
            </div>

            {/* Star Icon */}
            <Star className="w-7 h-7 fill-yellow-500 text-yellow-500 shrink-0" />

            {/* Progress Bar */}
            <div className="flex-1 relative h-8 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${rating.percentage}%` }}
              />
            </div>

            {/* Percentage */}
            <div className="text-3xl font-bold w-24 text-right">
              {rating.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
