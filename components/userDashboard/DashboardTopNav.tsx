"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell, X } from "lucide-react";

const DashboardTopNav = () => {
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);

  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profilePic: "/user1.png",
  };

  const notificationsCount = 3;

  const toggleNotificationsModal = () => {
    setIsNotificationsModalOpen((prev) => !prev);
  };

  // Mock notifications list
  const notifications = [
    {
      id: 1,
      avatar: "/user1.png",
      title: "New login from Chrome",
      time: "5 minutes ago",
    },
    {
      id: 2,
      avatar: "/user1.png",
      title: "Your password was changed successfully",
      time: "2 days ago",
    },
    {
      id: 3,
      avatar: "/user1.png",
      title: "New device signed in",
      time: "1 month ago",
    },
  ];

  return (
    <div>
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-[#1A1A1A] shadow-sm border-b border-gray-800">
        {/* Left side can remain empty or add a logo/title later */}
        <div />

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>

            {/* Avatar */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-700">
              <Image
                src={user.profilePic}
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Notifications */}
            <button
              onClick={toggleNotificationsModal}
              className="relative p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notificationsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      {isNotificationsModalOpen && (
        <div className="fixed top-16 right-6 z-50 w-96 max-w-full sm:w-96">
          <div className="bg-white shadow-xl rounded-lg border border-gray-200 p-0 relative overflow-hidden w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button
                onClick={toggleNotificationsModal}
                className="p-1.5 border border-gray-400 rounded-full bg-blue-500/10 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Unread + Mark all */}
            <div className="flex items-center justify-between px-4 py-3 font-semibold text-gray-700 border-b border-gray-100">
              <span className="text-sm">Unread</span>
              <button className="text-sm hover:underline">Mark all as read</button>
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src={n.avatar}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-800">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTopNav;
