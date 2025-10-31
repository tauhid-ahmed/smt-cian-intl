"use client";

import { useState } from "react";
import {
  MapPin,
  Music,
  Calendar,
  Award,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";

const ArtistBiography = ({
  data = {
    name: "Grace Rivers",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=800&fit=crop",
    highlights: {
      location: { city: "Nashville", state: "TN" },
      genre: "Contemporary Worship",
      yearsActive: { start: 2015, end: "Present" },
      awards: 3,
    },
    socialLinks: {
      instagram: "https://instagram.com/gracerivets",
      twitter: "https://twitter.com/gracerivets",
      tiktok: "https://tiktok.com/@gracerivets",
      email: "contact@gracerivets.com",
    },
    biography: [
      "Grace Rivers began her musical journey in a small church in Nashville, where her passion for worship music first took root. Growing up in a family of musicians, she was surrounded by melodies that spoke of faith, hope, and redemption. At the age of 16, she wrote her first worship song, which would eventually become the title track of her debut album.",
      "Her music is characterized by heartfelt lyrics, soaring melodies, and a genuine desire to connect people with their faith. Drawing inspiration from her personal journey through trials and triumphs, Grace creates songs that resonate with authenticity and vulnerability. She believes that worship is not just about music—it's about creating moments where hearts can encounter the divine.",
      "Throughout her career, Grace has toured extensively, leading worship at churches, conferences, and festivals around the world. Her ministry extends beyond the stage, as she regularly mentors young worship leaders and partners with organizations that support vulnerable communities. For Grace, music is a vehicle for transformation, both personal and collective.",
      "What drives her music is a simple yet profound mission: to create space for authentic worship that moves beyond performance into genuine encounter. Whether she's writing in her home studio or leading thousands in worship, Grace remains committed to crafting songs that point hearts toward heaven and inspire faith in everyday life.",
    ],
  },
}) => {
  const [showFullStory, setShowFullStory] = useState(false);

  const displayedBio = showFullStory
    ? data.biography
    : data.biography.slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16">
          Artist Biography
        </h1>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-blue-900/20 to-purple-900/20">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)",
                }}
              ></div>
            </div>
          </div>

          {/* Right Column - Highlights & Social */}
          <div className="flex flex-col justify-between">
            {/* Highlights */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Artist Highlights</h2>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Based in</p>
                    <p className="text-lg font-medium">
                      {data.highlights.location.city},{" "}
                      {data.highlights.location.state}
                    </p>
                  </div>
                </div>

                {/* Genre */}
                <div className="flex items-start gap-4">
                  <Music className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Genre</p>
                    <p className="text-lg font-medium">
                      {data.highlights.genre}
                    </p>
                  </div>
                </div>

                {/* Years Active */}
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Years Active</p>
                    <p className="text-lg font-medium">
                      {data.highlights.yearsActive.start}-
                      {data.highlights.yearsActive.end}
                    </p>
                  </div>
                </div>

                {/* Awards */}
                <div className="flex items-start gap-4">
                  <Award className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Awards</p>
                    <p className="text-lg font-medium">
                      {data.highlights.awards}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Social Links</h2>

              <div className="flex gap-4 mb-6">
                {data.socialLinks.instagram && (
                  <a
                    href={data.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center"
                  >
                    <Instagram className="w-6 h-6 text-black" />
                  </a>
                )}
                {data.socialLinks.twitter && (
                  <a
                    href={data.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center"
                  >
                    <Twitter className="w-6 h-6 text-black" />
                  </a>
                )}
                {data.socialLinks.tiktok && (
                  <a
                    href={data.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center"
                  >
                    <Music className="w-6 h-6 text-black" />
                  </a>
                )}
              </div>

              {/* Email Button */}
              {data.socialLinks.email && (
                <a
                  href={`mailto:${data.socialLinks.email}`}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 transition-colors text-black font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email Artist
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Biography Text */}
        <div className="max-w-4xl">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            {displayedBio.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Read More Button */}
          {data.biography.length > 2 && (
            <button
              onClick={() => setShowFullStory(!showFullStory)}
              className="mt-8 px-8 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all font-medium"
            >
              {showFullStory ? "Show Less" : "Read Full Story"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistBiography;
