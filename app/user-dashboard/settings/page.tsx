"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { useGetMeQuery } from "@/lib/api/authApi";
import { useUpdateProfileMutation } from "@/lib/api/userApi";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
    const { data: userData, isLoading: isUserLoading } = useGetMeQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    const [fullName, setFullName] = useState("");

    useEffect(() => {
        if (userData?.data?.fullName) {
            setFullName(userData.data.fullName);
        }
    }, [userData]);

    const handleSave = async () => {
        if (!fullName.trim()) {
            toast.error("Full name cannot be empty");
            return;
        }

        try {
            await updateProfile({ fullName }).unwrap();
            toast.success("Profile updated successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update profile");
        }
    };

    if (isUserLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 text-white max-w-2xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                    Update your personal profile information
                </p>
            </div>

            <div className="space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-white/10 shadow-xl">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                    />
                </div>

                <div className="flex justify-start">
                    <button
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20 active:scale-95"
                    >
                        {isUpdating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
