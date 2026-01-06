"use client";

import { useParams, useRouter } from "next/navigation";
import {
    Copy,
    Eye,
    Mail,
    Instagram,
    Phone,
    Play,
    Pause,
    MapPin,
    Calendar,
    Music2,
    FileText,
    Check,
    X,
    ArrowLeft,
    Loader,
} from "lucide-react";
import { useState } from "react";
import { useGetSingleDemoArtistSubmissionQuery } from "@/lib/api/userApi";
import { useUpdateDemoStatusMutation } from "@/lib/api/adminApi";
import toast from "react-hot-toast";

export default function DemoDetails() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const { data, isLoading, error } = useGetSingleDemoArtistSubmissionQuery(
        typeof id === "string" ? id : ""
    );

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [updateDemoStatus, { isLoading: isUpdating }] = useUpdateDemoStatusMutation();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-400 text-lg">Loading demo details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center p-4">
                <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md text-center">
                    <p className="text-red-400 text-lg">Failed to load demo details.</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!data?.data) {
        return (
            <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center">
                <p className="text-gray-400 text-lg">No data found.</p>
            </div>
        );
    }

    const demo = data.data;

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handlePlayAudio = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        } else {
            const newAudio = new Audio(demo.audioUrl);
            newAudio.play();
            setAudio(newAudio);
            setIsPlaying(true);
            newAudio.onended = () => setIsPlaying(false);
        }
    };

    const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
        if (!demo.id) return;

        try {
            await updateDemoStatus({ id: demo.id, status }).unwrap();
            toast.success(`Artist demo ${status.toLowerCase()} successfully!`);
            setTimeout(() => {
                router.push("/admin-dashboard/content?tab=tab3");
            }, 1500);
        } catch (err) {
            console.error(`Failed to ${status.toLowerCase()} demo:`, err);
            toast.error(`Failed to ${status.toLowerCase()} artist demo. Please try again.`);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-linear-to-b from-zinc-900 to-zinc-950 rounded-3xl p-8 md:p-10 shadow-2xl border border-zinc-800">
                    {/* Header Section */}
                    <div className="mb-8 pb-8 border-b border-zinc-800">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    {demo.fullName}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-yellow-500" />
                                        <span>{demo.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Music2 size={18} className="text-yellow-500" />
                                        <span>{demo.genre}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={18} className="text-yellow-500" />
                                        <span>{new Date(demo.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${demo.status === "APPROVED" ? "bg-green-500" :
                                            demo.status === "REJECTED" ? "bg-red-500" :
                                                "bg-yellow-500"
                                            }`} />
                                        <span className={`text-sm font-medium ${demo.status === "APPROVED" ? "text-green-400" :
                                            demo.status === "REJECTED" ? "text-red-400" :
                                                "text-yellow-400"
                                            }`}>
                                            {demo.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 ">
                            {/* Approve Button */}
                            {demo.status === "PENDING" && (
                                <>
                                    <button
                                        onClick={() => handleStatusUpdate("APPROVED")}
                                        disabled={isUpdating}
                                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-xl transition shadow-lg hover:shadow-green-500/50 whitespace-nowrap"
                                    >
                                        {isUpdating ? <Loader className="animate-spin" size={18} /> : <Check size={18} />}
                                        Approve Request
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate("REJECTED")}
                                        disabled={isUpdating}
                                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-xl transition shadow-lg hover:shadow-red-500/50 whitespace-nowrap"
                                    >
                                        {isUpdating ? <Loader className="animate-spin" size={18} /> : <X size={18} />}
                                        Reject Request
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => router.push("/admin-dashboard/content?tab=tab3")}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition group border rounded-xl p-1 whitespace-nowrap"
                            >
                                <ArrowLeft />
                                <span className="font-medium">Back to list</span>
                            </button>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="text-yellow-500" size={24} />
                            <h2 className="text-2xl font-bold">Artist Bio</h2>
                        </div>
                        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
                            <p className="text-gray-300 leading-relaxed">{demo.briefBio}</p>
                        </div>
                    </div>

                    {/* Music Player Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Music2 className="text-yellow-500" size={24} />
                            <h2 className="text-2xl font-bold">Demo Track</h2>
                        </div>
                        <div className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handlePlayAudio}
                                        className="w-14 h-14 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 rounded-full transition shadow-lg hover:shadow-yellow-500/50"
                                    >
                                        {isPlaying ? (
                                            <Pause size={24} className="text-black" />
                                        ) : (
                                            <Play size={24} className="text-black ml-1" />
                                        )}
                                    </button>
                                    <div>
                                        <p className="font-semibold text-lg">{demo.songTitle}</p>
                                        <p className="text-gray-400 text-sm">
                                            {isPlaying ? "Now Playing..." : "Click to play"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <div className="grid gap-3">
                            <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <Mail className="text-yellow-500" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Email</p>
                                        <span className="text-gray-200">{demo.email}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(demo.email, "email")}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-zinc-700 rounded-lg transition"
                                >
                                    {copiedField === "email" ? (
                                        <Check size={18} className="text-green-500" />
                                    ) : (
                                        <Copy size={18} />
                                    )}
                                </button>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <Phone className="text-yellow-500" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                                        <span className="text-gray-200">{demo.phoneNumber}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        demo.phoneNumber &&
                                        copyToClipboard(demo.phoneNumber, "phone")
                                    }
                                    className="p-2 text-gray-400 hover:text-white hover:bg-zinc-700 rounded-lg transition"
                                >
                                    {copiedField === "phone" ? (
                                        <Check size={18} className="text-green-500" />
                                    ) : (
                                        <Copy size={18} />
                                    )}
                                </button>
                            </div>

                            {/* Social Media */}
                            <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <Instagram className="text-yellow-500" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Instagram</p>
                                        <span className="text-gray-200">{demo.socialMedia}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        demo.socialMedia &&
                                        copyToClipboard(demo.socialMedia, "social")
                                    }
                                    className="p-2 text-gray-400 hover:text-white hover:bg-zinc-700 rounded-lg transition"
                                >
                                    {copiedField === "social" ? (
                                        <Check size={18} className="text-green-500" />
                                    ) : (
                                        <Copy size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Supporting Materials */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Press Kit & Materials</h2>
                        <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700 hover:border-zinc-600 transition">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <FileText className="text-yellow-500" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Attachment</p>
                                        <span className="text-gray-200 text-sm">
                                            {demo.pressKitUrl
                                                ? demo.pressKitUrl.split("/").pop()
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                                <a
                                    href={demo.pressKitUrl || ""}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-2 items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition shadow-lg hover:shadow-yellow-500/50"
                                >
                                    <Eye size={18} />
                                    View
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
