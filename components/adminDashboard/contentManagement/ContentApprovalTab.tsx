"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

// Mock contents data
const mockContents = [
  {
    id: 1,
    type: "Blog",
    title: "The Rise of Indie Music",
    author: "Alex Johnson",
    date: "2025-10-20",
    status: "Verified",
  },
  {
    id: 2,
    type: "Testimony",
    title: "How Jazz Changed My Life",
    author: "Maria Lopez",
    date: "2025-10-21",
    status: "Pending",
  },
  {
    id: 3,
    type: "Feature",
    title: "Top 10 Guitar Solos",
    author: "Chris Evans",
    date: "2025-10-19",
    status: "Not Verified",
  },
];

const ContentApprovalTab = () => {
  const [contents, setContents] = useState(mockContents);

  const handleApprove = (id) => {
    setContents(
      contents.map((item) =>
        item.id === id ? { ...item, status: "Verified" } : item
      )
    );
  };

  const handleReject = (id) => {
    setContents(
      contents.map((item) =>
        item.id === id ? { ...item, status: "Not Verified" } : item
      )
    );
  };

  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-left text-white">
          <h1 className="font-semibold text-base sm:text-lg">
            Content Approval
          </h1>
          <h2 className="text-sm text-[#F2F2F2]">
            Handle blog posts, testimonies, and featured content
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                <th className="py-4 pr-4">Type</th>
                <th className="py-4 pr-4">Title</th>
                <th className="py-4 pr-4">Author</th>
                <th className="py-4 pr-4">Date</th>
                <th className="py-4 pr-4">Status</th>
                <th className="py-4 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr
                  key={content.id}
                  className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.type}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.title}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.author}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {content.date}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        content.status === "Verified"
                          ? "bg-[#497FF51A] text-[#497FF5] border border-[#497FF5]"
                          : content.status === "Pending"
                          ? "bg-[#FFA1001A] text-[#FFA100] border border-[#FFA100]"
                          : "bg-[#FF0000]/10 text-red-600 border border-red-600"
                      }`}>
                      {content.status}
                    </span>
                  </td>
                  <td className="pl-4 pt-4 pb-4 flex justify-end">
                    {/* Buttons responsive */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:ml-6 w-full sm:w-auto">
                      <button
                        onClick={() => handleApprove(content.id)}
                        disabled={content.status === "Verified"}
                        className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md transition-colors w-full sm:w-auto ${
                          content.status === "Verified"
                            ? "bg-[#11820080]/50 text-green-200/50"
                            : content.status === "Pending"
                            ? "bg-[#11820080] hover:bg-green-600 text-white"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}>
                        <Check className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleReject(content.id)}
                        disabled={content.status === "Not Verified"}
                        className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md transition-colors w-full sm:w-auto ${
                          content.status === "Not Verified"
                            ? "bg-red-800 text-red-200"
                            : content.status === "Pending"
                            ? "bg-[#E6000080] hover:bg-red-600 text-white"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {contents.map((content) => (
            <div
              key={content.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-medium text-sm">
                  {content.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2">{content.type}</span>
                </div>
                <div>
                  <span className="text-gray-400">Author:</span>
                  <span className="text-white ml-2">{content.author}</span>
                </div>
                <div>
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white ml-2">{content.date}</span>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${
                      content.status === "Verified"
                        ? "bg-green-500/20 text-green-500"
                        : content.status === "Pending"
                        ? "bg-yellow-200 text-yellow-600"
                        : "bg-red-200 text-red-600"
                    }`}>
                    {content.status}
                  </span>
                </div>
              </div>

              {/* Mobile Action Buttons (added) */}
              <div className="flex flex-col sm:flex-row gap-3 sm:ml-6 w-full sm:w-auto">
                <button
                  onClick={() => handleApprove(content.id)}
                  disabled={content.status === "Verified"}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md transition-colors w-full sm:w-auto ${
                    content.status === "Verified"
                      ? "bg-[#11820080]/50 text-green-200/50"
                      : content.status === "Pending"
                      ? "bg-[#11820080] hover:bg-green-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}>
                  <Check className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleReject(content.id)}
                  disabled={content.status === "Not Verified"}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md transition-colors w-full sm:w-auto ${
                    content.status === "Not Verified"
                      ? "bg-red-800 text-red-200"
                      : content.status === "Pending"
                      ? "bg-[#E6000080] hover:bg-red-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentApprovalTab;
