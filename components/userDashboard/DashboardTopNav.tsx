"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell, LogOut, X } from "lucide-react";
import { useAuth } from "@/features/auth/provider/AuthProvider";
import { useGetMeQuery } from "@/lib/api/authApi";
import { Button } from "../ui/button";

const DashboardTopNav = () => {
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
        useState(false);

    // Dummy users data
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

    const { openSignUp, openSignIn } = useAuth();
    const { data: meData, isLoading } = useGetMeQuery();

    const signOut = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div>
            {/* Top Navigation */}
            <div className="flex items-center justify-between px-6 py-2.5 bg-[#1A1A1A] shadow-sm border-b border-gray-800">
                {/* Left side can remain empty or add a logo/title later */}
                <div />

                {/* Right Side */}
                <div className="flex items-center gap-6">
                    {/* User Info */}
                    <div className="flex items-center gap-5">


                        {/* Notifications */}
                        <button
                            onClick={toggleNotificationsModal}
                            className="relative p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors hidden"
                        >
                            <Bell className="w-5 h-5 text-gray-300" />
                            {notificationsCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 rounded-full text-xs text-white flex items-center justify-center">
                                    {notificationsCount}
                                </span>
                            )}
                        </button>

                        {/* Avatar */}
                        <div className="flex-1 flex items-center gap-4 justify-end">
                            {isLoading ? (
                                <div className="flex items-center gap-2 animate-pulse">
                                    <div className='size-12 bg-gray-200/30 rounded-full' />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-base h-6 w-24 bg-gray-200/30 rounded-sm whitespace-nowrap text-ellipsis overflow-hidden" />
                                        <span className="text-sm h-4 w-16 bg-gray-200/30 rounded-sm whitespace-nowrap text-ellipsis overflow-hidden" />
                                    </div>
                                </div>

                            ) : (
                                <div className="flex items-center gap-2">
                                    <Image src={meData?.data?.image || "https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._SX1080_FMjpg_.jpg"} className="size-12 rounded-full object-cover" alt="User avatar" width={48} height={48} />
                                    <div className="flex flex-col">
                                        <span className="text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                                            {meData?.data?.fullName}
                                        </span>
                                        <span className="text-sm text-gray-100 whitespace-nowrap text-ellipsis overflow-hidden">
                                            {meData?.data?.email}
                                        </span>
                                    </div>
                                    <Button variant="default" size="icon" onClick={() => { signOut() }} > <LogOut className="h-4 w-4" /> </Button>
                                </div>
                            )}
                        </div>

                      
                    </div>
                </div>
            </div>

            {/* Notifications Modal */}
            {isNotificationsModalOpen && (
                <div className="fixed top-16 right-6 z-50 w-96 max-w-full sm:w-96">
                    <div className="bg-white shadow-xl rounded-lg border border-gray-200 p-0 relative overflow-hidden w-full">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                            <h2 className="text-lg text-gray-800 font-semibold">Notifications</h2>
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
                            <button className="text-sm hover:underline">
                                Mark all as read
                            </button>
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
