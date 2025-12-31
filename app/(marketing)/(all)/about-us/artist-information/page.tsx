/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, ChangeEvent } from "react";
import {

  User,
  Music,
  FileText,
  Video,
  CheckCircle2,
} from "lucide-react";
import { useAddDemoArtistSubmissionMutation } from "@/lib/api/userApi";

interface FormDataType {
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
  const [formData, setFormData] = useState<FormDataType>({
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

  const [addDemoArtistSubmission, { isLoading }] = useAddDemoArtistSubmissionMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: keyof FormDataType) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.musicFile) {
      alert("Please upload a music file.");
      return;
    }

    const body = new FormData();

    // Append files
    if (formData.musicFile) body.append("audio", formData.musicFile);
    if (formData.pressKit) body.append("pressKit", formData.pressKit);

    // Append JSON data as string
    const dataJson = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phone,
      location: formData.location,
      socialMedia: formData.socialMedia || null,
      songTitle: formData.songTitle,
      genre: formData.genre,
      briefBio: formData.briefBio,
      whyJoin: formData.whyJoin,
      videoLink: formData.videoLinks || null,
    };
    body.append("data", JSON.stringify(dataJson));

    try {
      const response = await addDemoArtistSubmission(body).unwrap();
      alert("Demo submitted successfully!");
      console.log(response);
      setFormData({
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
    } catch (error: any) {
      console.error(error);
      alert("Failed to submit demo. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-3">
            Submit Your Demo
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Join the CiAN Collective family. Share your God-given talent with us.
          </p>
        </div>

        <div className="space-y-8">
          {/* Artist Info */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <User className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">Artist Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Full Name *</label>
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
                  <label className="block text-gray-300 text-sm mb-2">Email *</label>
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
                  <label className="block text-gray-300 text-sm mb-2">Phone *</label>
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
                <label className="block text-gray-300 text-sm mb-2">Location *</label>
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
                <label className="block text-gray-300 text-sm mb-2">Social Media Links</label>
                <input
                  type="text"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  placeholder="Instagram, Twitter, etc."
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Music Submission */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Music className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">Music Submission</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Song Title *</label>
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
                  <label className="block text-gray-300 text-sm mb-2">Genre *</label>
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
                  Upload Music File <span className="text-gray-400 text-xs">(MP3/WAV)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".mp3,.wav"
                    onChange={(e) => handleFileChange(e, "musicFile")}
                    className="hidden"
                    id="musicFile"
                  />
                  <label
                    htmlFor="musicFile"
                    className="flex items-center justify-center w-full bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-lg px-6 py-8 cursor-pointer hover:border-yellow-500 hover:bg-gray-900/70 transition-all duration-300"
                  >
                    <div className="text-center">
                      <Music className="mx-auto mb-3 text-gray-400" size={32} />
                      <p className="text-gray-300 text-sm mb-1">
                        {formData.musicFile ? formData.musicFile.name : "Click to upload music file"}
                      </p>
                      <p className="text-gray-500 text-xs">MP3 or WAV files supported</p>
                    </div>
                  </label>
                </div>
                {formData.musicFile && (
                  <div className="flex items-center gap-2 mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <CheckCircle2 className="text-yellow-500" size={16} />
                    <p className="text-yellow-500 text-sm">
                      {formData.musicFile.name}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Streaming Links</label>
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

          {/* About You */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">About You</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Brief Bio *</label>
                <textarea
                  name="briefBio"
                  value={formData.briefBio}
                  onChange={handleInputChange}
                  placeholder="Tell us about your musical journey..."
                  rows={4}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Why join?</label>
                <textarea
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  placeholder="Share your vision and alignment..."
                  rows={4}
                  className="w-full bg-gray-900/50 border border-gray-600 rounded px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Supporting Materials */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Video className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">Supporting Materials (Optional)</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Press Kit / EPK <span className="text-gray-400 text-xs">(PDF/Image)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, "pressKit")}
                    className="hidden"
                    id="pressKit"
                  />
                  <label
                    htmlFor="pressKit"
                    className="flex items-center justify-center w-full bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-lg px-6 py-8 cursor-pointer hover:border-yellow-500 hover:bg-gray-900/70 transition-all duration-300"
                  >
                    <div className="text-center">
                      <FileText className="mx-auto mb-3 text-gray-400" size={32} />
                      <p className="text-gray-300 text-sm mb-1">
                        {formData.pressKit ? formData.pressKit.name : "Click to upload press kit"}
                      </p>
                      <p className="text-gray-500 text-xs">PDF or image files supported</p>
                    </div>
                  </label>
                </div>
                {formData.pressKit && (
                  <div className="flex items-center gap-2 mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <CheckCircle2 className="text-yellow-500" size={16} />
                    <p className="text-yellow-500 text-sm">
                      {formData.pressKit.name}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Music Video Links</label>
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

          {/* Ministry Alignment */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="text-yellow-500" size={20} />
              <h2 className="text-xl font-semibold text-yellow-500">Ministry Alignment</h2>
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
                  I confirm that my music aligns with Christian values and the mission of CiAN Collective
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
                  I understand that this submission is not a guarantee of acceptance or representation
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-12 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50 ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Demo for Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
