import React, { useState } from "react";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null); // 'approve' or 'reject'
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const handleApprove = (id) => {
    setReviewList((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status: "approved" } : review
      )
    );
    setDialogOpen(false);
  };

  const handleReject = (id) => {
    setReviewList((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status: "rejected" } : review
      )
    );
    setDialogOpen(false);
  };

  const openDialog = (action, reviewId) => {
    setCurrentAction(action);
    setSelectedReviewId(reviewId);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentAction(null);
    setSelectedReviewId(null);
  };

  const getDialogContent = () => {
    const review = reviewList.find((r) => r.id === selectedReviewId);
    if (!review) return null;

    if (currentAction === "approve") {
      return {
        title: "Approve Review",
        message:
          "Are you sure you want to approve this review? It will be visible to the public.",
        confirmText: "Approve",
        confirmAction: () => handleApprove(selectedReviewId),
        confirmStyle: "bg-[#11820080] hover:bg-green-600 text-white",
      };
    } else {
      return {
        title: "Reject Review",
        message:
          "Are you sure you want to reject this review? It will be removed from public view.",
        confirmText: "Reject",
        confirmAction: () => handleReject(selectedReviewId),
        confirmStyle: "bg-[#E6000080] hover:bg-red-600 text-white",
      };
    }
  };

  const renderStars = (rating) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );

  const renderStatusBadge = (status) => {
    let badgeStyle = "";
    let badgeText = "";

    switch (status) {
      case "approved":
        badgeStyle = "border-green-500 bg-green-500/20 text-green-400";
        badgeText = "Approved";
        break;
      case "rejected":
        badgeStyle = "border-red-500 bg-red-500/20 text-red-400";
        badgeText = "Rejected";
        break;
      default:
        badgeStyle = "border-[#FFA100] bg-[#FFA1001A] text-[#FFA100]";
        badgeText = "Pending";
    }

    return (
      <span className={`px-3 py-1 text-xs rounded-full border ${badgeStyle}`}>
        {badgeText}
      </span>
    );
  };

  const dialogContent = getDialogContent();

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <h3 className="text-lg font-normal">{review.title}</h3>
                  {renderStatusBadge(review.status)}
                </div>

                <p className="text-[#808080] mb-3">{review.content}</p>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[#808080] text-base">
                    By {review.author}
                  </span>
                  {renderStars(review.rating)}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:ml-6 w-full sm:w-auto">
                <button
                  onClick={() => openDialog("approve", review.id)}
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
                  onClick={() => openDialog("reject", review.id)}
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

      {/* Single Dialog for both Approve and Reject */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#171717] border-none w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[714px]">
          <DialogHeader>
            <DialogTitle className="md:text-xl text-lg font-semibold text-left">
              {dialogContent?.title}
            </DialogTitle>

            <div className="mt-4">
              <p className="text-white text-base">{dialogContent?.message}</p>

              <div className="flex items-center justify-center gap-3 mt-6 ">
                <button
                  onClick={closeDialog}
                  className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors border hover:border-white rounded-md">
                  Cancel
                </button>
                <button
                  onClick={dialogContent?.confirmAction}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md transition-colors ${dialogContent?.confirmStyle}`}>
                  {currentAction === "approve" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  {dialogContent?.confirmText}
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
