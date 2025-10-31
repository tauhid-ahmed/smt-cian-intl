"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Edit3,
  FolderKanban,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { OverviewTab } from "@/components/account/OverviewTab";
import { ProjectsTab } from "@/components/account/ProjectsTab";
import { TransactionsTab } from "@/components/account/TransactionsTab";
import { KYCDocumentsTab } from "@/components/account/KYCDocumentsTab";

// Status badge component moved outside
const StatusBadge = ({ status }: { status: string }) => (
  <div
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
      status === "active"
        ? "bg-green-100 text-green-800 border border-green-200"
        : "bg-red-100 text-red-800 border border-red-200"
    }`}
  >
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </div>
);

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy user data
  const user = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    status: "active",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    nid: "1234567890123",
    userId: "USR-001",
    joinDate: "2024-01-15",
    walletBalance: 1250.75,
    totalProjects: 12,
    kycStatus: "verified",
  };

  // Tabs configuration
  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "transactions", label: "Transactions", icon: Wallet },
    { id: "kyc", label: "KYC & Documents", icon: ShieldCheck },
  ];

  // Tab components
  const tabComponents = {
    overview: <OverviewTab user={user} />,
    projects: <ProjectsTab />,
    transactions: <TransactionsTab />,
    kyc: <KYCDocumentsTab />,
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/users"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {user.name}
                </h1>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <p className="text-gray-600 text-sm sm:text-base truncate">
                    @{user.username}
                  </p>
                  <StatusBadge status={user.status} />
                </div>
              </div>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
            <Edit3 className="w-4 h-4" />
            Edit User
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide space-x-4 sm:space-x-8 pb-2 -mx-2 px-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-2 sm:px-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      isActive ? "text-blue-600" : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium text-sm sm:text-base">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Scroll indicators */}
          <div className="absolute inset-y-0 left-0 w-6 bg-linear-to-r from-white to-transparent pointer-events-none sm:hidden" />
          <div className="absolute inset-y-0 right-0 w-6 bg-linear-to-l from-white to-transparent pointer-events-none sm:hidden" />
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-w-0">
        {tabComponents[activeTab as keyof typeof tabComponents]}
      </div>
    </div>
  );
}