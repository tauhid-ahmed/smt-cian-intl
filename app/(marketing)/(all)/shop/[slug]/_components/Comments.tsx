"use client";

import { useState } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Image,
  Video,
  ChevronDown,
} from "lucide-react";
import { Heading } from "@/components/Heading";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

// ==================== TYPE DEFINITIONS ====================
interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  notHelpful: number;
  verified?: boolean;
  images?: string[];
  videos?: string[];
  badge?: "Testimony" | "Verified Purchase";
}

interface RatingData {
  stars: number;
  percentage: number;
}

interface ReviewSectionProps {
  averageRating?: number;
  totalReviews?: number;
  ratingBreakdown?: RatingData[];
  reviews?: Review[];
}

// ==================== STAR RATING COMPONENT ====================
const StarRating = ({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeMap[size]} ${
            star <= rating
              ? "fill-yellow-500 text-yellow-500"
              : "fill-gray-700 text-gray-700"
          }`}
        />
      ))}
    </div>
  );
};

// ==================== RATING BREAKDOWN COMPONENT ====================
const RatingBreakdown = ({ ratings }: { ratings: RatingData[] }) => {
  return (
    <div className="space-y-3 w-full">
      {ratings.map((rating) => (
        <div key={rating.stars} className="flex items-center gap-4">
          <div className="text-lg font-medium w-3 text-white">
            {rating.stars}
          </div>
          <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 shrink-0" />
          <div className="flex-1 w-full relative h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-yellow-500 rounded-full transition-all duration-500 h-full"
              style={{ width: `${rating.percentage}%` }}
            />
          </div>
          <div className="text-lg font-medium w-12 text-right text-white">
            {rating.percentage}%
          </div>
        </div>
      ))}
    </div>
  );
};

// ==================== REVIEW CARD COMPONENT ====================
const ReviewCard = ({ review }: { review: Review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpful);
  const [userVote, setUserVote] = useState<"helpful" | "not-helpful" | null>(
    null
  );

  const handleVote = (voteType: "helpful" | "not-helpful") => {
    if (userVote === voteType) {
      if (voteType === "helpful") {
        setHelpfulCount((prev) => prev - 1);
      } else {
        setNotHelpfulCount((prev) => prev - 1);
      }
      setUserVote(null);
    } else {
      if (userVote === "helpful") {
        setHelpfulCount((prev) => prev - 1);
      } else if (userVote === "not-helpful") {
        setNotHelpfulCount((prev) => prev - 1);
      }

      if (voteType === "helpful") {
        setHelpfulCount((prev) => prev + 1);
      } else {
        setNotHelpfulCount((prev) => prev + 1);
      }
      setUserVote(voteType);
    }
  };

  return (
    <div className="border-b border-zinc-800 pb-8">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-700 shrink-0"></div>
            <div className="">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <StarRating rating={review.rating} size="sm" />
                  {review.badge && (
                    <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {review.badge}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-1">
                {review.title}
              </h3>

              <p className="text-gray-400 text-sm mb-3">
                by {review.author} | {review.date}
              </p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">{review.content}</p>

          {(review.images || review.videos) && (
            <div className="flex gap-3 mb-4">
              {review.images?.map((img, idx) => (
                <div
                  key={`img-${idx}`}
                  className="w-20 h-20 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center justify-center overflow-hidden"
                >
                  <Image className="w-8 h-8 text-gray-500" />
                </div>
              ))}
              {review.videos?.map((vid, idx) => (
                <div
                  key={`video-${idx}`}
                  className="w-20 h-20 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center justify-center"
                >
                  <Video className="w-8 h-8 text-gray-500" />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Helpful?</span>
            <button
              onClick={() => handleVote("helpful")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                userVote === "helpful"
                  ? "border-white bg-white text-black"
                  : "border-zinc-700 text-white hover:border-zinc-600"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">{helpfulCount}</span>
            </button>
            <button
              onClick={() => handleVote("not-helpful")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                userVote === "not-helpful"
                  ? "border-white bg-white text-black"
                  : "border-zinc-700 text-white hover:border-zinc-600"
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span className="text-sm font-medium">{notHelpfulCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== DEFAULT DATA ====================
const defaultRatingBreakdown: RatingData[] = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

const defaultReviews: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    date: "March 15, 2024",
    rating: 5,
    title: "This Album Changed My Life",
    content:
      "I discovered this album during one of the darkest periods of my life. I was struggling with anxiety and felt disconnected from my faith. The lyrics in 'Grace Abounds' spoke directly to my heart and reminded me of God's unfailing love. I've been listening to this on repeat for weeks now, and it has become my daily source of encouragement. The production quality on vinyl is absolutely stunning - you can hear every instrument with such clarity. This is more than just music; it's a tool for worship and healing.",
    helpful: 87,
    notHelpful: 5,
    badge: "Testimony",
    images: ["img1", "img2"],
  },
  {
    id: "2",
    author: "Sarah M.",
    date: "March 15, 2024",
    rating: 5,
    title: "This Album Changed My Life",
    content:
      "I discovered this album during one of the darkest periods of my life. I was struggling with anxiety and felt disconnected from my faith. The lyrics in 'Grace Abounds' spoke directly to my heart and reminded me of God's unfailing love. I've been listening to this on repeat for weeks now, and it has become my daily source of encouragement.",
    helpful: 87,
    notHelpful: 5,
  },
  {
    id: "3",
    author: "Sarah M.",
    date: "March 15, 2024",
    rating: 5,
    title: "This Album Changed My Life",
    content:
      "I discovered this album during one of the darkest periods of my life. I was struggling with anxiety and felt disconnected from my faith. The lyrics in 'Grace Abounds' spoke directly to my heart and reminded me of God's unfailing love. I've been listening to this on repeat for weeks now, and it has become my daily source of encouragement. The production quality on vinyl is absolutely stunning - you can hear every instrument with such clarity. This is more than just music; it's a tool for worship and healing.",
    helpful: 87,
    notHelpful: 5,
    videos: ["video1", "video2"],
  },
];

// ==================== MAIN COMPONENT ====================
export default function CustomerReviewsSection({
  averageRating = 4.8,
  totalReviews = 127,
  ratingBreakdown = defaultRatingBreakdown,
  reviews = defaultReviews,
}: ReviewSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  const filters = [
    { id: "all", label: "All Reviews" },
    { id: "5stars", label: "5 Stars" },
    { id: "4stars", label: "4 Starts" },
    { id: "photos", label: "With Photos", icon: <Image className="w-4 h-4" /> },
    { id: "videos", label: "With Videos", icon: <Video className="w-4 h-4" /> },
    { id: "testimonies", label: "Testimonies Only" },
  ];

  return (
    <Section>
      <Container className="max-w-7xl mx-auto">
        <Heading as="h2" size="h4">
          Customer Reviews & Testimonials
        </Heading>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-7xl font-bold mb-2">{averageRating}</div>
            <div className="text-gray-400 text-lg mb-4">out of 5</div>
            <StarRating rating={5} size="lg" />
            <div className="text-gray-400 mt-3">
              Based on {totalReviews} reviews
            </div>
          </div>

          <div className="flex items-center">
            <RatingBreakdown ratings={ratingBreakdown} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-12">
          <div className="flex flex-wrap gap-2">
            <label className="w-full font-medium text-white mr-2 self-center block">
              Filter Reviews:
            </label>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? "bg-yellow-500 text-black"
                    : "bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600"
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-white block w-full">
              Short by:
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-zinc-600 cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Load More Reviews
          </button>
        </div>
      </Container>
    </Section>
  );
}
