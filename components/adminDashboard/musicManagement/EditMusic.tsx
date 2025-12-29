/* eslint-disable prefer-const */
/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Upload,
  GripVertical,
  Trash2,
  Plus,
  Music,
  Image as ImageIcon,
  Clock,
  Tag,
  User,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, ChangeEvent, DragEvent } from "react";

// Type Definitions
interface Track {
  id: number;
  musicPhoto: string | null;
  musicPhotoFile: File | null;
  musicFile: File | null;
  trackName: string;
  genre: string;
  duration: string;
}

interface ProfileData {
  selectedArtist: string;
  productTitle: string;
  genre: string;
  verifiedBadge: boolean;
  profileImage: FileInfo | null;
  coverBanner: FileInfo | null;
  tracks: TrackInfo[];
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

interface TrackInfo {
  id: number;
  trackName: string;
  genre: string;
  duration: string;
  musicPhoto: FileInfo | null;
  musicFile: FileInfo | null;
}

export default function AddNewMusic() {
  const router = useRouter();
  const [verifiedBadge, setVerifiedBadge] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 1,
      musicPhoto: null,
      musicPhotoFile: null,
      musicFile: null,
      trackName: "",
      genre: "",
      duration: "",
    },
  ]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [coverBanner, setCoverBanner] = useState<string | null>(null);
  const [coverBannerFile, setCoverBannerFile] = useState<File | null>(null);
  const [productTitle, setProductTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const addTrack = (): void => {
    setTracks([
      ...tracks,
      {
        id: Date.now(),
        musicPhoto: null,
        musicPhotoFile: null,
        musicFile: null,
        trackName: "",
        genre: "",
        duration: "",
      },
    ]);
  };

  const removeTrack = (id: number): void => {
    if (tracks.length > 1) {
      setTracks(tracks.filter((track) => track.id !== id));
    }
  };

  const handleDragStart = (index: number): void => {
    dragItem.current = index;
    setDraggedItem(index);
  };

  const handleDragEnter = (index: number): void => {
    dragOverItem.current = index;
  };

  const handleDragEnd = (): void => {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const tracksCopy = [...tracks];
    const draggedItemContent = tracksCopy[dragItem.current];
    tracksCopy.splice(dragItem.current, 1);
    tracksCopy.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setDraggedItem(null);
    setTracks(tracksCopy);
  };

  // Profile Image Handlers
  const handleProfileImageClick = (): void => {
    profileInputRef.current?.click();
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Cover Banner Handlers
  const handleBannerClick = (): void => {
    bannerInputRef.current?.click();
  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverBannerFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setCoverBanner(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverBannerFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setCoverBanner(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Track Music Photo Handlers
  const handleTrackPhotoChange = (
    trackId: number,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setTracks(
            tracks.map((track) =>
              track.id === trackId
                ? {
                    ...track,
                    musicPhoto: e.target?.result as string,
                    musicPhotoFile: file,
                  }
                : track
            )
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTrackPhotoDrop = (
    trackId: number,
    e: DragEvent<HTMLDivElement>
  ): void => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setTracks(
            tracks.map((track) =>
              track.id === trackId
                ? {
                    ...track,
                    musicPhoto: e.target?.result as string,
                    musicPhotoFile: file,
                  }
                : track
            )
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Track Music File Handlers
  const handleTrackMusicChange = (
    trackId: number,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setTracks(
        tracks.map((track) =>
          track.id === trackId ? { ...track, musicFile: file } : track
        )
      );
    }
  };

  const handleTrackMusicDrop = (
    trackId: number,
    e: DragEvent<HTMLDivElement>
  ): void => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setTracks(
        tracks.map((track) =>
          track.id === trackId ? { ...track, musicFile: file } : track
        )
      );
    }
  };

  // Track Input Handlers
  const handleTrackNameChange = (trackId: number, value: string): void => {
    setTracks(
      tracks.map((track) =>
        track.id === trackId ? { ...track, trackName: value } : track
      )
    );
  };

  const handleTrackGenreChange = (trackId: number, value: string): void => {
    setTracks(
      tracks.map((track) =>
        track.id === trackId ? { ...track, genre: value } : track
      )
    );
  };

  const handleTrackDurationChange = (trackId: number, value: string): void => {
    setTracks(
      tracks.map((track) =>
        track.id === trackId ? { ...track, duration: value } : track
      )
    );
  };

  // Create Profile Handler
  const handleCreateProfile = (): FormData => {
    const formData = new FormData();
    formData.append("selectedArtist", selectedArtist);
    formData.append("productTitle", productTitle);
    formData.append("genre", genre);
    formData.append("verifiedBadge", String(verifiedBadge));

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    if (coverBannerFile) {
      formData.append("coverBanner", coverBannerFile);
    }

    tracks.forEach((track, index) => {
      formData.append(`tracks[${index}][id]`, String(track.id));
      formData.append(`tracks[${index}][trackName]`, track.trackName);
      formData.append(`tracks[${index}][genre]`, track.genre);
      formData.append(`tracks[${index}][duration]`, track.duration);

      if (track.musicPhotoFile) {
        formData.append(`tracks[${index}][musicPhoto]`, track.musicPhotoFile);
      }

      if (track.musicFile) {
        formData.append(`tracks[${index}][musicFile]`, track.musicFile);
      }
    });

    console.log("=== FORM DATA CONTENTS ===");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    return formData;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 sm:p-6 lg:p-8">
      <div className="w-full mx-auto max-w-7xl">
        {/* Header with gradient accent */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Artist Profile
            </h1>
          </div>
          <p className="text-neutral-400 ml-7">
            Create and manage your music collection
          </p>
        </div>

        {/* Artist Information Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700/50 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <User className="text-yellow-500" size={24} />
            <h2 className="text-xl font-bold text-white">Artist Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Artist Name
              </label>
              <input
                type="text"
                placeholder="Enter artist name"
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                className="w-full block px-4 py-3 border border-neutral-600 bg-neutral-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-neutral-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Track Management Section */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700/50 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Music className="text-yellow-500" size={24} />
              <h2 className="text-xl font-bold text-white">Track List</h2>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">
                {tracks.length} {tracks.length === 1 ? "Track" : "Tracks"}
              </span>
            </div>
            <button
              onClick={addTrack}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-105"
            >
              <Plus size={18} />
              Add Track
            </button>
          </div>

          <div className="space-y-4">
            {/* Desktop Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 text-sm font-semibold text-neutral-400 px-4 pb-2 border-b border-neutral-700">
              <div className="col-span-1 flex justify-center">Order</div>
              <div className="col-span-1 flex items-center gap-2">
                <ImageIcon size={14} />
                Cover
              </div>
              <div className="col-span-3">Track Title</div>
              <div className="col-span-2 flex items-center gap-2">
                <Tag size={14} />
                Genre
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Clock size={14} />
                Duration
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Music size={14} />
                Audio File
              </div>
              <div className="col-span-1"></div>
            </div>

            {/* Track Rows */}
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`transition-all duration-200 ${
                  draggedItem === index
                    ? "opacity-40 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                {/* Desktop Layout */}
                <div
                  className="hidden lg:grid grid-cols-12 gap-4 items-center bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 rounded-xl p-4 transition-all group"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="col-span-1 flex justify-center">
                    <div className="w-8 h-8 rounded-lg bg-neutral-700 flex items-center justify-center cursor-move group-hover:bg-neutral-600 transition-colors">
                      <GripVertical size={16} className="text-neutral-400" />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleTrackPhotoChange(track.id, e)}
                      className="hidden"
                      id={`track-photo-${track.id}`}
                    />
                    <div
                      onClick={() =>
                        document
                          .getElementById(`track-photo-${track.id}`)
                          ?.click()
                      }
                      onDrop={(e) => handleTrackPhotoDrop(track.id, e)}
                      onDragOver={(e) => e.preventDefault()}
                      className="w-14 h-14 border-2 border-dashed border-neutral-600 rounded-xl flex items-center justify-center bg-neutral-800 cursor-pointer hover:border-yellow-500 hover:bg-neutral-700 overflow-hidden transition-all group/upload"
                    >
                      {track.musicPhoto ? (
                        <img
                          src={track.musicPhoto}
                          alt="Track"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload
                          size={20}
                          className="text-neutral-500 group-hover/upload:text-yellow-500 transition-colors"
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Enter track title"
                      value={track.trackName}
                      onChange={(e) =>
                        handleTrackNameChange(track.id, e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-neutral-600 bg-neutral-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-neutral-500 transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="e.g., Gospel"
                      value={track.genre}
                      onChange={(e) =>
                        handleTrackGenreChange(track.id, e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-neutral-600 bg-neutral-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-neutral-500 transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="MM:SS"
                      value={track.duration}
                      onChange={(e) =>
                        handleTrackDurationChange(track.id, e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-neutral-600 bg-neutral-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-neutral-500 transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleTrackMusicChange(track.id, e)}
                      className="hidden"
                      id={`track-music-${track.id}`}
                    />
                    <div
                      onClick={() =>
                        document
                          .getElementById(`track-music-${track.id}`)
                          ?.click()
                      }
                      onDrop={(e) => handleTrackMusicDrop(track.id, e)}
                      onDragOver={(e) => e.preventDefault()}
                      className="w-full h-11 border-2 border-dashed border-neutral-600 rounded-lg flex items-center justify-center bg-neutral-900/50 cursor-pointer hover:border-yellow-500 hover:bg-neutral-700 overflow-hidden transition-all group/music"
                    >
                      {track.musicFile ? (
                        <div className="flex items-center gap-2 px-3">
                          <Music
                            size={14}
                            className="text-yellow-500 flex-shrink-0"
                          />
                          <span className="text-xs text-neutral-300 truncate">
                            {track.musicFile.name}
                          </span>
                        </div>
                      ) : (
                        <Upload
                          size={16}
                          className="text-neutral-500 group-hover/music:text-yellow-500 transition-colors"
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeTrack(track.id)}
                      disabled={tracks.length === 1}
                      className="w-10 h-10 border border-neutral-600 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-400 hover:border-red-500 hover:bg-red-950/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-neutral-400 disabled:hover:border-neutral-600 disabled:hover:bg-transparent"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-700 flex items-center justify-center cursor-move">
                        <GripVertical size={16} className="text-neutral-400" />
                      </div>
                      <span className="text-sm font-semibold text-neutral-400">
                        Track {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeTrack(track.id)}
                      disabled={tracks.length === 1}
                      className="w-9 h-9 border border-neutral-600 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-400 hover:border-red-500 hover:bg-red-950/50 transition-all disabled:opacity-40"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-2">
                        <ImageIcon size={12} />
                        Track Cover
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleTrackPhotoChange(track.id, e)}
                        className="hidden"
                        id={`track-photo-mobile-${track.id}`}
                      />
                      <div
                        onClick={() =>
                          document
                            .getElementById(`track-photo-mobile-${track.id}`)
                            ?.click()
                        }
                        onDrop={(e) => handleTrackPhotoDrop(track.id, e)}
                        onDragOver={(e) => e.preventDefault()}
                        className="w-20 h-20 border-2 border-dashed border-neutral-600 rounded-xl flex items-center justify-center bg-neutral-800 cursor-pointer hover:border-yellow-500 transition-all overflow-hidden"
                      >
                        {track.musicPhoto ? (
                          <img
                            src={track.musicPhoto}
                            alt="Track"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload size={20} className="text-neutral-500" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-2">
                        Track Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter track title"
                        value={track.trackName}
                        onChange={(e) =>
                          handleTrackNameChange(track.id, e.target.value)
                        }
                        className="w-full px-3 py-2.5 border border-neutral-600 bg-neutral-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-neutral-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-2">
                        <Tag size={12} />
                        Genre
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Gospel, Worship"
                        value={track.genre}
                        onChange={(e) =>
                          handleTrackGenreChange(track.id, e.target.value)
                        }
                        className="w-full px-3 py-2.5 border border-neutral-600 bg-neutral-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-neutral-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-2">
                        <Clock size={12} />
                        Duration
                      </label>
                      <input
                        type="text"
                        placeholder="MM:SS"
                        value={track.duration}
                        onChange={(e) =>
                          handleTrackDurationChange(track.id, e.target.value)
                        }
                        className="w-full px-3 py-2.5 border border-neutral-600 bg-neutral-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-neutral-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-2">
                        <Music size={12} />
                        Audio File
                      </label>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleTrackMusicChange(track.id, e)}
                        className="hidden"
                        id={`track-music-mobile-${track.id}`}
                      />
                      <div
                        onClick={() =>
                          document
                            .getElementById(`track-music-mobile-${track.id}`)
                            ?.click()
                        }
                        onDrop={(e) => handleTrackMusicDrop(track.id, e)}
                        onDragOver={(e) => e.preventDefault()}
                        className="w-full h-12 border-2 border-dashed border-neutral-600 rounded-lg flex items-center justify-center bg-neutral-900/50 cursor-pointer hover:border-yellow-500 transition-all overflow-hidden"
                      >
                        {track.musicFile ? (
                          <div className="flex items-center gap-2 px-3">
                            <Music
                              size={14}
                              className="text-yellow-500 flex-shrink-0"
                            />
                            <span className="text-xs text-neutral-300 truncate">
                              {track.musicFile.name}
                            </span>
                          </div>
                        ) : (
                          <Upload size={16} className="text-neutral-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={() => router.push("/admin-dashboard/music-management")}
            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateProfile}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/30 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Save size={18} />
           Upload Music
          </button>
        </div>
      </div>
    </div>
  );
}
