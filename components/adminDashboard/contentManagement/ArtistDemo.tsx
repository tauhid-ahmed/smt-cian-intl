/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { useGetAllDemoArtistSubmissionQuery } from "@/lib/api/userApi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Submission {
  id: string;
  fullName: string;
  songTitle: string;
  genre: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  daysAgo: string;
  title: string;
  audioUrl: string;
}

export default function DemoSubmissions() {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllDemoArtistSubmissionQuery(undefined);

  const submissions: Submission[] =
    (Array.isArray(data?.data) ? data?.data : data?.data ? [data.data] : []).map((item: any) => ({
      id: item.id,
      fullName: item.fullName,
      songTitle: item.songTitle,
      genre: item.genre,
      status: item.status,
      createdAt: item.createdAt,
      daysAgo: formatDaysAgo(item.createdAt),
      title: item.songTitle,
      audioUrl: item.audioUrl,
    })) || [];

  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  function handlePlay(submission: Submission) {
    if (playingId === submission.id) {
      currentAudio?.pause();
      setPlayingId(null);
      return;
    }
    currentAudio?.pause();
    const audio = new Audio(submission.audioUrl);
    audio.play();
    setCurrentAudio(audio);
    setPlayingId(submission.id);
    audio.onended = () => setPlayingId(null);
  }

  function formatDaysAgo(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? "Today" : `${diffDays} day(s) ago`;
  }

  return (
    <div className="min-h-screen bg-black text-white md:p-8 lg:p-0 p-5">
      <div className="w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">New Demo Submissions</h1>
          <p className="text-gray-400 text-sm">
            {submissions.filter((s) => s.status === "PENDING").length} pending review
          </p>
        </div>

        <div className="space-y-0">
          {isLoading && <p className="text-gray-400">Loading submissions...</p>}
          {error && <p className="text-red-500">Failed to load submissions.</p>}

          {submissions.map((submission, index) => (
            <div
              key={submission.id}
              className={`flex items-center justify-between py-6 px-4 hover:bg-zinc-900/50 transition-colors ${
                index !== submissions.length - 1 ? "border-b border-zinc-800" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePlay(submission)}
                  className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  {playingId === submission.id ? (
                    <Pause className="w-5 h-5 fill-white text-white ml-0.5" />
                  ) : (
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  )}
                </button>

                <div>
                  <h3 className="text-base font-medium mb-1">{submission.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{submission.genre}</span>
                    <span>•</span>
                    <span>{submission.daysAgo}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => router.push(`/admin-dashboard/content/artist-demo-details/${submission.id}`)}
                >
                  Details
                </Button>

                {submission.status === "APPROVED" ? (
                  <span className="px-3 py-1 text-xs font-semibold text-green-400 bg-green-400/10 border border-green-400/20 rounded">
                    APPROVED
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

