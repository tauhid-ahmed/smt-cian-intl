"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Upload,
  User,
  Music,
  FileText,
  Video,
  CheckCircle2,
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  socialMedia: string;
  songTitle: string;
  genre: string;
  musicFile: File | null;
  streamingLinks: string;
  briefBio: string;
  whyJoin: string;
  pressKit: File | null;
  videoLinks: string;
  ministryAlignment: boolean;
  understandTerms: boolean;
}

export default function DemoSubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    socialMedia: "",
    songTitle: "",
    genre: "",
    musicFile: null,
    streamingLinks: "",
    briefBio: "",
    whyJoin: "",
    pressKit: null,
    videoLinks: "",
    ministryAlignment: false,
    understandTerms: false,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-3">
            Submit Your Demo
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Join the CiAN Collective family. Share your God-given talent with
            us.
          </p>
        </div>

        <div className="space-y-8">
          {/* Artist Information Section */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <User className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">
                Artist Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1(555) 000-0000"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State/Country"
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Social Media Links
                </label>
                <input
                  type="text"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  placeholder="Instagram, Twitter, Facebook, etc."
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Music Submission Section */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Music className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">
                Music Submission
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Song Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="songTitle"
                    value={formData.songTitle}
                    onChange={handleInputChange}
                    placeholder="Enter song title"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Genre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    placeholder="e.g., Gospel, Worship"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Upload Music File{" "}
                  <span className="text-gray-400 text-xs">(MP3/WAV)</span>
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-500 transition-colors cursor-pointer bg-gray-900/30">
                  <input
                    type="file"
                    accept=".mp3,.wav"
                    onChange={(e) => handleFileChange(e, "musicFile")}
                    className="hidden"
                    id="music-upload"
                  />
                  <label htmlFor="music-upload" className="cursor-pointer">
                    <Upload
                      className="mx-auto text-yellow-500 mb-3"
                      size={32}
                    />
                    <p className="text-gray-300 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-500 text-sm">
                      MP3 or WAV (MAX. 50MB)
                    </p>
                    {formData.musicFile && (
                      <p className="text-yellow-500 text-sm mt-2">
                        Selected: {formData.musicFile.name}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-2">OR</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Streaming Links
                </label>
                <input
                  type="text"
                  name="streamingLinks"
                  value={formData.streamingLinks}
                  onChange={handleInputChange}
                  placeholder="Spotify, SoundCloud, YouTube links"
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* About You Section */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">
                About You
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Brief Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="briefBio"
                  value={formData.briefBio}
                  onChange={handleInputChange}
                  placeholder="Tell us about your musical journey and ministry..."
                  rows={4}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Why do you want to join CiAN Collective?
                </label>
                <textarea
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  placeholder="Share your vision and how you align with our mission..."
                  rows={4}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Supporting Materials Section */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Video className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">
                Supporting Materials (Optional)
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Press Kit / EPK
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors cursor-pointer bg-gray-900/30">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "pressKit")}
                    className="hidden"
                    id="press-kit-upload"
                  />
                  <label htmlFor="press-kit-upload" className="cursor-pointer">
                    <Upload
                      className="mx-auto text-yellow-500 mb-2"
                      size={28}
                    />
                    <p className="text-gray-300 text-sm mb-1">
                      Upload Press Kit
                    </p>
                    <p className="text-gray-500 text-xs">PDF, DOC, DOCX</p>
                    {formData.pressKit && (
                      <p className="text-yellow-500 text-sm mt-2">
                        Selected: {formData.pressKit.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Music Video Links
                </label>
                <input
                  type="text"
                  name="videoLinks"
                  value={formData.videoLinks}
                  onChange={handleInputChange}
                  placeholder="YouTube, Vimeo links"
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Ministry Alignment Section */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">
                Ministry Alignment
              </h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="ministryAlignment"
                  checked={formData.ministryAlignment}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 bg-gray-900 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  required
                />
                <span className="text-gray-300 text-sm group-hover:text-gray-200">
                  I confirm that my music aligns with Christian values and the
                  mission of CiAN Collective
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="understandTerms"
                  checked={formData.understandTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 bg-gray-900 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  required
                />
                <span className="text-gray-300 text-sm group-hover:text-gray-200">
                  I understand that this submission is not a guarantee of
                  acceptance or representation
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-12 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
            >
              Submit Demo for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
