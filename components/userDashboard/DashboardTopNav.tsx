"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell, KeyRound, X } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardTopNav = () => {
  const pathname = usePathname();

  // Derive page title from URL path
  const pageTitle = React.useMemo(() => {
    if (!pathname || pathname === "/") return "Dashboard";
    const parts = pathname.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1];
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  }, [pathname]);

  const user = {
    firstName: "John",
    lastName: "Doe",
    profilePic: "/user1.png",
  };

  const notificationsCount = 3;

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // only one modal is open at a time
  const togglePasswordModal = () => {
    setIsPasswordModalOpen((prev) => {
      const newState = !prev;
      if (newState) setIsNotificationsModalOpen(false);
      return newState;
    });
  };

  const toggleNotificationsModal = () => {
    setIsNotificationsModalOpen((prev) => {
      const newState = !prev;
      if (newState) setIsPasswordModalOpen(false);
      return newState;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Password changed:", { oldPassword, newPassword });
    togglePasswordModal();
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
      <div className="flex items-center justify-between px-6 py-2.5 bg-white shadow-sm">
        {/* Page Title */}
        <div className="text-xl font-semibold text-gray-900">{pageTitle}</div>

        <div className="flex items-center gap-6">
          {/* Key Icon */}
          <button
            onClick={togglePasswordModal}
            className="bg-gray-100 p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition-colors"
          >
            <KeyRound className="w-5 h-5 text-gray-700" />
          </button>

          {/* Notifications */}
          <button
            onClick={toggleNotificationsModal}
            className="relative bg-gray-100 p-2 rounded-full border border-gray-300 hover:bg-gray-200 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10 rounded-full p-0.5 bg-linear-to-r from-[#FFBC6F] via-[#F176B7] to-[#3797CD]">
              <div className="w-full h-full rounded-full bg-black overflow-hidden">
                <Image
                  src={user.profilePic}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed top-16 right-6 z-50">
          <div className="bg-white shadow-xl rounded-lg w-80 border border-gray-200 p-5 relative">
            {/* Close Button */}
            <button
              onClick={togglePasswordModal}
              className="absolute top-3 right-3 p-1.5 border border-gray-400 rounded-full bg-blue-500/10 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            <form onSubmit={handleSubmit}>
              {/* Old Password */}
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              {/* New Password */}
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
