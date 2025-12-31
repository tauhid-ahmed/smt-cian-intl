"use client";
import { Upload, Music, Save } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

// Mock data for demonstration
const mockArtists = [
  { id: "1", name: "Artist One" },
  { id: "2", name: "Artist Two" },
  { id: "3", name: "Artist Three" },
  { id: "4", name: "Artist Four" },
];

const mockAlbums = [
  { id: "1", title: "Album One" },
  { id: "2", title: "Album Two" },
  { id: "3", title: "Album Three" },
];

export default function AddNewMusic() {
  const [openArtistPopover, setOpenArtistPopover] = React.useState(false);
  const [openAlbumPopover, setOpenAlbumPopover] = React.useState(false);
  const [artistSearch, setArtistSearch] = useState("");
  const [albumSearch, setAlbumSearch] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    albumId: "",
    language: "English",
    artistIds: [] as string[],
    audioFile: null as File | null,
  });
  const [isAddingMusic, setIsAddingMusic] = useState(false);

  const filteredArtists = mockArtists.filter((artist) =>
    artist.name.toLowerCase().includes(artistSearch.toLowerCase())
  );

  const filteredAlbums = mockAlbums.filter((album) =>
    album.title.toLowerCase().includes(albumSearch.toLowerCase())
  );

  const handleArtistSelect = (artistId: string) => {
    const currentArtists = formData.artistIds;
    if (currentArtists.includes(artistId)) {
      setFormData({
        ...formData,
        artistIds: currentArtists.filter((id) => id !== artistId),
      });
    } else {
      setFormData({
        ...formData,
        artistIds: [...currentArtists, artistId],
      });
    }
  };

  const getSelectedArtistNames = () => {
    return formData.artistIds
      .map((id) => {
        const artist = mockArtists.find((a) => a.id === id);
        return artist?.name || "";
      })
      .filter((name) => name);
  };

  const getSelectedAlbumTitle = () => {
    if (!formData.albumId) return "";
    const album = mockAlbums.find((a) => a.id === formData.albumId);
    return album?.title || "";
  };

  const handleAlbumSelect = (albumId: string) => {
    setFormData({
      ...formData,
      albumId: albumId === formData.albumId ? "" : albumId,
    });
    setOpenAlbumPopover(false);
  };

  const handleAudioFileChange = (file: File | null) => {
    if (file && file.type.startsWith("audio/")) {
      setFormData({ ...formData, audioFile: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingMusic(true);
    setTimeout(() => {
      setIsAddingMusic(false);
      alert("Music added successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 sm:p-6 lg:p-8">
      <div className="w-full mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-linear-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Add New Music
            </h1>
          </div>
          <p className="text-neutral-400 ml-7">
            Add a new music to the music library
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700/50 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Music className="text-yellow-500" size={20} />
              Music Information
            </h2>

            <div className="space-y-6">
              {/* Music Title & Genre */}
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                <div className="w-full">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Music Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter music title"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Genre *
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) =>
                      setFormData({ ...formData, genre: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all">
                    <option value="">Select Genre</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="R&B">R&B</option>
                    <option value="Country">Country</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Classical">Classical</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Reggae">Reggae</option>
                    <option value="Gospel">Gospel</option>
                  </select>
                </div>
              </div>

              {/* Language & Album */}

              <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                <div className="w-full">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Language *
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bengali">Bengali</option>
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Album (Optional)
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenAlbumPopover(!openAlbumPopover)}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all flex items-center justify-between">
                      <span>
                        {!formData.albumId
                          ? "Select album..."
                          : getSelectedAlbumTitle()}
                      </span>
                      <ChevronsUpDown className="opacity-50" size={16} />
                    </button>
                    {openAlbumPopover && (
                      <div className="absolute z-50 w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl">
                        <div className="p-2">
                          <input
                            type="text"
                            placeholder="Search albums..."
                            value={albumSearch}
                            onChange={(e) => setAlbumSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {filteredAlbums.length === 0 ? (
                            <div className="text-neutral-400 py-4 text-center text-sm">
                              No album found.
                            </div>
                          ) : (
                            filteredAlbums.map((album) => (
                              <button
                                key={album.id}
                                type="button"
                                onClick={() => handleAlbumSelect(album.id)}
                                className="w-full px-4 py-2 text-left hover:bg-neutral-700 text-white flex items-center justify-between">
                                <span>{album.title}</span>
                                <Check
                                  className={
                                    formData.albumId === album.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }
                                  size={16}
                                />
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Artists Multi-select */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Artists *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenArtistPopover(!openArtistPopover)}
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all flex items-center justify-between">
                    <span>
                      {formData.artistIds.length === 0
                        ? "Select artists..."
                        : `${formData.artistIds.length} artist(s) selected`}
                    </span>
                    <ChevronsUpDown className="opacity-50" size={16} />
                  </button>
                  {openArtistPopover && (
                    <div className="absolute z-50 w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search artists..."
                          value={artistSearch}
                          onChange={(e) => setArtistSearch(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {filteredArtists.length === 0 ? (
                          <div className="text-neutral-400 py-4 text-center text-sm">
                            No artist found.
                          </div>
                        ) : (
                          filteredArtists.map((artist) => (
                            <button
                              key={artist.id}
                              type="button"
                              onClick={() => handleArtistSelect(artist.id)}
                              className="w-full px-4 py-2 text-left hover:bg-neutral-700 text-white flex items-center justify-between">
                              <span>{artist.name}</span>
                              <Check
                                className={
                                  formData.artistIds.includes(artist.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                }
                                size={16}
                              />
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {formData.artistIds.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {getSelectedArtistNames().map((name, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center gap-2">
                        <span className="text-sm text-yellow-300">{name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleArtistSelect(formData.artistIds[index])
                          }
                          className="text-yellow-300 hover:text-yellow-200">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter music description"
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Audio Upload Section */}
          <div className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700/50 rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Music className="text-yellow-500" size={20} />
              Audio File
            </h2>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Audio File *
              </label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  handleAudioFileChange(e.target.files?.[0] || null)
                }
                className="hidden"
                id="audio-file"
              />
              <div
                onClick={() => document.getElementById("audio-file")?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleAudioFileChange(e.dataTransfer.files?.[0] || null);
                }}
                onDragOver={(e) => e.preventDefault()}
                className="w-full h-48 border-2 border-dashed border-neutral-600 rounded-xl flex items-center justify-center bg-neutral-800 cursor-pointer hover:border-yellow-500 hover:bg-neutral-700 transition-all group">
                {formData.audioFile ? (
                  <div className="text-center px-4">
                    <Music size={32} className="text-yellow-500 mx-auto mb-2" />
                    <p className="text-neutral-300 text-sm font-medium truncate">
                      {formData.audioFile.name}
                    </p>
                    <p className="text-neutral-500 text-xs mt-1">
                      {(formData.audioFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload
                      size={32}
                      className="text-neutral-500 group-hover:text-yellow-500 transition-colors mx-auto mb-2"
                    />
                    <p className="text-neutral-400 text-sm">
                      Click or drag to upload audio
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
              disabled={isAddingMusic}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAddingMusic}
              className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/30 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              {isAddingMusic ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Add Music
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
