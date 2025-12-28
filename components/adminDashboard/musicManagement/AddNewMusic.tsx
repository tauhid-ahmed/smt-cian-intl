/* eslint-disable prefer-const */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Upload, GripVertical, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, ChangeEvent, DragEvent } from "react";

// Type Definitions
interface Track {
  id: number;
  musicPhoto: string | null;
  musicPhotoFile: File | null;
  musicFile: File | null;
  trackName: string;
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

  const handleTrackDurationChange = (trackId: number, value: string): void => {
    setTracks(
      tracks.map((track) =>
        track.id === trackId ? { ...track, duration: value } : track
      )
    );
  };

  // Create Profile Handler
  const handleCreateProfile = (): FormData => {
    // Create FormData object
    const formData = new FormData();

    // Add text fields
    formData.append("selectedArtist", selectedArtist);
    formData.append("productTitle", productTitle);
    formData.append("genre", genre);
    formData.append("verifiedBadge", String(verifiedBadge));

    // Add profile image file
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    // Add cover banner file
    if (coverBannerFile) {
      formData.append("coverBanner", coverBannerFile);
    }

    // Add tracks data
    tracks.forEach((track, index) => {
      formData.append(`tracks[${index}][id]`, String(track.id));
      formData.append(`tracks[${index}][trackName]`, track.trackName);
      formData.append(`tracks[${index}][duration]`, track.duration);

      // Add track music photo file
      if (track.musicPhotoFile) {
        formData.append(`tracks[${index}][musicPhoto]`, track.musicPhotoFile);
      }

      // Add track music file
      if (track.musicFile) {
        formData.append(`tracks[${index}][musicFile]`, track.musicFile);
      }
    });

    // Log FormData contents
    console.log("=== FORM DATA CONTENTS ===");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }
    console.log("===========================");

    // Also log as regular object for easy viewing
    const profileDataObject: ProfileData = {
      selectedArtist,
      productTitle,
      genre,
      verifiedBadge,
      profileImage: profileImageFile
        ? {
            name: profileImageFile.name,
            size: profileImageFile.size,
            type: profileImageFile.type,
          }
        : null,
      coverBanner: coverBannerFile
        ? {
            name: coverBannerFile.name,
            size: coverBannerFile.size,
            type: coverBannerFile.type,
          }
        : null,
      tracks: tracks.map((track) => ({
        id: track.id,
        trackName: track.trackName,
        duration: track.duration,
        musicPhoto: track.musicPhotoFile
          ? {
              name: track.musicPhotoFile.name,
              size: track.musicPhotoFile.size,
              type: track.musicPhotoFile.type,
            }
          : null,
        musicFile: track.musicFile
          ? {
              name: track.musicFile.name,
              size: track.musicFile.size,
              type: track.musicFile.type,
            }
          : null,
      })),
    };

    console.log(JSON.stringify(profileDataObject, null, 2));
    console.log("===========================");

    // Return formData for actual API submission
    return formData;
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <div className="w-full mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Artist Profile
          </h1>
        </div>

        {/* Music Management Section */}
        <div className="border border-neutral-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 ">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Music Management
            </h2>
          </div>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h3 className="text-base font-semibold text-white">Track List</h3>
              <button
                onClick={addTrack}
                className="flex items-center gap-2 text-sm text-white hover:text-neutral-300"
              >
                <Plus size={18} />
                Add Track
              </button>
            </div>

            <div className="space-y-3">
              {/* Header Row - Hidden on mobile */}
              <div className="hidden lg:grid grid-cols-12 gap-3 text-sm font-medium text-neutral-400 px-2">
                <div className="col-span-1"></div>
                <div className="col-span-1">Music Photo</div>
                <div className="col-span-4">Track Name</div>
                <div className="col-span-3">Music Duration</div>
                <div className="col-span-2">Upload Music</div>
                <div className="col-span-1"></div>
              </div>

              {/* Track Rows */}
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`transition-opacity ${
                    draggedItem === index ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {/* Desktop Layout */}
                  <div
                    className="hidden lg:grid grid-cols-12 gap-3 items-center"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="col-span-1 flex justify-center">
                      <GripVertical
                        size={20}
                        className="text-neutral-500 cursor-move"
                      />
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
                        className="w-12 h-12 border border-neutral-700 rounded-lg flex items-center justify-center bg-neutral-800 cursor-pointer hover:bg-neutral-700 overflow-hidden"
                      >
                        {track.musicPhoto ? (
                          <img
                            src={track.musicPhoto}
                            alt="Track"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload size={18} className="text-neutral-400" />
                        )}
                      </div>
                    </div>
                    <div className="col-span-4">
                      <input
                        type="text"
                        placeholder="Enter track name"
                        value={track.trackName}
                        onChange={(e) =>
                          handleTrackNameChange(track.id, e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="text"
                        placeholder="Enter duration time"
                        value={track.duration}
                        onChange={(e) =>
                          handleTrackDurationChange(track.id, e.target.value)
                        }
                        className="w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500"
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
                        className="w-full h-11 border border-neutral-700 rounded-lg flex items-center justify-center bg-neutral-800 cursor-pointer hover:bg-neutral-700 overflow-hidden"
                      >
                        {track.musicFile ? (
                          <span className="text-xs text-neutral-300 truncate px-2">
                            {track.musicFile.name}
                          </span>
                        ) : (
                          <Upload size={18} className="text-neutral-400" />
                        )}
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => removeTrack(track.id)}
                        className="w-11 h-11 border border-neutral-700 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-400 hover:border-red-700 hover:bg-red-950"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile/Tablet Layout */}
                  <div className="lg:hidden border border-neutral-700 rounded-xl p-4 bg-neutral-800 space-y-4">
                    <div className="flex items-start gap-3">
                      <GripVertical
                        size={20}
                        className="text-neutral-500 cursor-move shrink-0 mt-2"
                      />
                      <div className="flex-1 space-y-4">
                        {/* Music Photo */}
                        <div>
                          <label className="block text-xs font-medium text-neutral-400 mb-2">
                            Music Photo
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleTrackPhotoChange(track.id, e)
                            }
                            className="hidden"
                            id={`track-photo-mobile-${track.id}`}
                          />
                          <div
                            onClick={() =>
                              document
                                .getElementById(
                                  `track-photo-mobile-${track.id}`
                                )
                                ?.click()
                            }
                            onDrop={(e) => handleTrackPhotoDrop(track.id, e)}
                            onDragOver={(e) => e.preventDefault()}
                            className="w-16 h-16 border border-neutral-700 rounded-lg flex items-center justify-center bg-neutral-800 cursor-pointer hover:bg-neutral-700 overflow-hidden"
                          >
                            {track.musicPhoto ? (
                              <img
                                src={track.musicPhoto}
                                alt="Track"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Upload size={20} className="text-neutral-400" />
                            )}
                          </div>
                        </div>

                        {/* Track Name */}
                        <div>
                          <label className="block text-xs font-medium text-neutral-400 mb-2">
                            Track Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter track name"
                            value={track.trackName}
                            onChange={(e) =>
                              handleTrackNameChange(track.id, e.target.value)
                            }
                            className="w-full px-3 py-2 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-sm"
                          />
                        </div>

                        {/* Music Duration */}
                        <div>
                          <label className="block text-xs font-medium text-neutral-400 mb-2">
                            Music Duration
                          </label>
                          <input
                            type="text"
                            placeholder="Enter duration time"
                            value={track.duration}
                            onChange={(e) =>
                              handleTrackDurationChange(
                                track.id,
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-sm"
                          />
                        </div>

                        {/* Upload Music */}
                        <div>
                          <label className="block text-xs font-medium text-neutral-400 mb-2">
                            Upload Music
                          </label>
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) =>
                              handleTrackMusicChange(track.id, e)
                            }
                            className="hidden"
                            id={`track-music-mobile-${track.id}`}
                          />
                          <div
                            onClick={() =>
                              document
                                .getElementById(
                                  `track-music-mobile-${track.id}`
                                )
                                ?.click()
                            }
                            onDrop={(e) => handleTrackMusicDrop(track.id, e)}
                            onDragOver={(e) => e.preventDefault()}
                            className="w-full h-11 border border-neutral-700 rounded-lg flex items-center justify-center bg-neutral-800 cursor-pointer hover:bg-neutral-700 overflow-hidden"
                          >
                            {track.musicFile ? (
                              <span className="text-xs text-neutral-300 truncate px-2">
                                {track.musicFile.name}
                              </span>
                            ) : (
                              <Upload size={18} className="text-neutral-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeTrack(track.id)}
                        className="w-10 h-10 border border-neutral-700 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-400 hover:border-red-700 hover:bg-red-950 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Profile Button */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => router.push('/admin-dashboard/music-management')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-sm transition-colors"
          >
            Cancle
          </button>
          <button
            onClick={handleCreateProfile}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-sm transition-colors"
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
}
