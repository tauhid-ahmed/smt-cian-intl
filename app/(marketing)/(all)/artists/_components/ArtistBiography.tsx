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
import { Heading } from "@/components/Heading";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
    <Section padding="lg">
      <Container className="space-y-8">
        <Heading as="h2" size="h3" align="center">
          Artist Biography
        </Heading>
        <div className="grid lg:grid-cols-2 gap-8 content-center">
          {/* Left Column - Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-linear-to-br from-blue-900/20 to-purple-900/20">
            <Image
              fill
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
            />
          </div>

          {/* Right Column - Highlights & Social */}
          <div className="flex flex-col text-white/80 font-bold">
            <div className="space-y-4">
              <Heading as="h3" size="h5">
                Artist Highlights
              </Heading>

              <div className="space-y-8 border-b pb-10 border-muted">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="size-5 shrink-0" />
                  <div>
                    <p>Based in</p>
                    <p className="text-lg font-medium">
                      {data.highlights.location.city},{" "}
                      {data.highlights.location.state}
                    </p>
                  </div>
                </div>

                {/* Genre */}
                <div className="flex items-start gap-4">
                  <Music className="size-5 shrink-0" />
                  <div>
                    <p>Genre</p>
                    <p className="text-lg font-medium">
                      {data.highlights.genre}
                    </p>
                  </div>
                </div>

                {/* Years Active */}
                <div className="flex items-start gap-4">
                  <Calendar className="size-5 shrink-0" />
                  <div>
                    <p>Years Active</p>
                    <p className="text-lg">
                      {data.highlights.yearsActive.start}-
                      {data.highlights.yearsActive.end}
                    </p>
                  </div>
                </div>

                {/* Awards */}
                <div className="flex items-start gap-4">
                  <Award className="size-5 shrink-0" />
                  <div>
                    <p>Awards</p>
                    <p className="text-lg">{data.highlights.awards}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-1 mt-8">
              <Heading size="h6" as="h3">
                Social Links
              </Heading>
              <div className="flex gap-4 mb-6">
                {data.socialLinks.instagram && (
                  <Button variant="link" size="icon" asChild>
                    <Link href={data.socialLinks.instagram} target="_blank">
                      <Instagram className="size-6" />
                    </Link>
                  </Button>
                )}
                {data.socialLinks.twitter && (
                  <Button variant="link" size="icon" asChild>
                    <Link href={data.socialLinks.twitter} target="_blank">
                      <Twitter className="size-6" />
                    </Link>
                  </Button>
                )}
                {data.socialLinks.tiktok && (
                  <Button variant="link" size="icon" asChild>
                    <Link href={data.socialLinks.tiktok} target="_blank">
                      <Twitter className="size-6" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* Email Button */}
              {data.socialLinks.email && (
                <Button size="lg" className="w-full" asChild>
                  <Link href={data.socialLinks.tiktok} target="_blank">
                    <Mail className="size-6" />
                    Email Artist
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            {displayedBio.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          {data.biography.length > 2 && (
            <Button
              variant="outline"
              onClick={() => setShowFullStory(!showFullStory)}
            >
              {showFullStory ? "Show Less" : "Read Full Story"}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default ArtistBiography;
