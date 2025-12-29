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
    Facebook,
} from "lucide-react";
import { Heading } from "@/components/Heading";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { useGetSingleArtistQuery } from "@/lib/api/commonApi";
import { useParams } from "next/navigation";

// Loading Skeleton Component
const ArtistBiographySkeleton = () => {
    return (
        <Section padding="lg">
            <Container className="space-y-8">
                <Skeleton className="h-10 w-64 mx-auto" />
                <div className="grid lg:grid-cols-2 gap-8 content-center">
                    {/* Left Column - Image Skeleton */}
                    <Skeleton className="relative rounded-2xl aspect-4/3" />

                    {/* Right Column - Highlights Skeleton */}
                    <div className="flex flex-col space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <div className="space-y-8 border-b pb-10 border-muted">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <Skeleton className="size-5 shrink-0 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-6 w-32" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 mt-8">
                            <Skeleton className="h-6 w-32" />
                            <div className="flex gap-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="size-10 rounded-full" />
                                ))}
                            </div>
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-10 w-40" />
                </div>
            </Container>
        </Section>
    );
};

const ArtistBiography = () => {
    const [showFullStory, setShowFullStory] = useState(false);
    const {slug}  = useParams(); 
 
    const { data , isLoading, isError } = useGetSingleArtistQuery(slug as string);

    const artistData = data?.data;

    // Show loading state
    if (isLoading) {
        return <ArtistBiographySkeleton />;
    }

    // Show error state
    if (isError || !artistData) {
        return (
            <Section padding="lg">
                <Container className="text-center space-y-4">
                    <Heading as="h2" size="h3">
                        Unable to Load Artist Biography
                    </Heading>
                    <p className="text-gray-400 text-center">
                        We couldn&rsquo;t load the artist information. Please try again later.
                    </p>
                </Container>
            </Section>
        );
    }

    // Transform API data to component structure
    const biography = artistData.bio
        ? artistData.bio.split('\n\n').filter(p => p.trim())
        : [];

    const displayedBio = showFullStory
        ? biography
        : biography.slice(0, 2);

    return (
        <Section padding="lg">
            <Container className="space-y-8">
                <Heading as="h2" size="h3" align="center">
                    Artist Biography
                </Heading>
                <div className="grid lg:grid-cols-2 gap-8 content-center">
                    {/* Left Column - Image */}
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-linear-to-br from-blue-900/20 to-purple-900/20">
                        {artistData.image ? (
                            <Image
                                fill
                                src={artistData?.image}
                                alt={artistData.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40">
                                <Music className="size-24 text-white/40" />
                            </div>
                        )}
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
                                {artistData.name}
                            </Heading>

                            <div className="space-y-8 border-b pb-10 border-muted">
                                {/* Location */}
                                {artistData.location ? (
                                    <div className="flex items-start gap-4">
                                        <MapPin className="size-5 shrink-0" />
                                        <div>
                                            <p>Based in</p>
                                            <p className="text-lg font-medium">
                                                {artistData.location}
                                            </p>
                                        </div>
                                    </div>
                                ): <p> No location data provided</p>}

                                {/* Genre */}
                                {artistData.genres && artistData.genres.length > 0 ?    (
                                    <div className="flex items-start gap-4">
                                        <Music className="size-5 shrink-0" />
                                        <div>
                                            <p>Genre</p>
                                            <p className="text-lg font-medium">
                                                {artistData.genres.join(", ")}
                                            </p>
                                        </div>
                                    </div>
                                ): <p> No genre data provided</p>}

                                {/* Years Active */}
                                {artistData.activeYearsStart ? (
                                    <div className="flex items-start gap-4">
                                        <Calendar className="size-5 shrink-0" />
                                        <div>
                                            <p>Years Active</p>
                                            <p className="text-lg">
                                                {artistData.activeYearsStart}-
                                                {artistData.activeYearsEnd || "Present"}
                                            </p>
                                        </div>
                                    </div>
                                ): <p> No years active data provided</p>}

                                {/* Awards */}
                                {artistData.awards !== undefined ? (
                                    <div className="flex items-start gap-4">
                                        <Award className="size-5 shrink-0" />
                                        <div>
                                            <p>Awards</p>
                                            <p className="text-lg">{artistData.awards}</p>
                                        </div>
                                    </div>
                                ): <p> No awards data provided</p>}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-1 mt-8">
                            <Heading size="h6" as="h3">
                                Social Links
                            </Heading>
                            <div className="flex flex-wrap gap-4 mb-6">
                                <Button variant="link" size="icon" asChild>
                                    <Link href={artistData.instagram || "#"} target="_blank" className={!artistData.instagram ? "pointer-events-none opacity-50" : ""}>
                                        <Instagram className="size-6" />
                                    </Link>
                                </Button>
                                <Button variant="link" size="icon" asChild>
                                    <Link href={artistData.twitter || "#"} target="_blank" className={!artistData.twitter ? "pointer-events-none opacity-50" : ""}>
                                        <Twitter className="size-6" />
                                    </Link>
                                </Button>
                                <Button variant="link" size="icon" asChild>
                                    <Link href={artistData.facebook || "#"} target="_blank" className={!artistData.facebook ? "pointer-events-none opacity-50" : ""}>
                                        <Facebook className="size-6" />
                                    </Link>
                                </Button>
                                <Button variant="link" size="icon" asChild>
                                    <Link href={artistData.tiktok || "#"} target="_blank" className={!artistData.tiktok ? "pointer-events-none opacity-50" : ""}>
                                        <Twitter className="size-6" />
                                    </Link>
                                </Button>
                            </div>

                            <Button
                                size="lg"
                                className="w-full"
                                asChild
                                disabled={!artistData.website}
                            >
                                <Link
                                    href={artistData.website || "#"}
                                    target="_blank"
                                >
                                    <Mail className="size-6 mr-2" />
                                    {artistData.website ? "Visit Website" : "No Website"}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Biography Section */}
                {biography.length > 0 && (
                    <div className="space-y-6">
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            {displayedBio.map((paragraph, index) => (
                                <p key={index} className="text-base md:text-lg">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        {biography.length > 2 && (
                            <Button
                                variant="outline"
                                onClick={() => setShowFullStory(!showFullStory)}
                            >
                                {showFullStory ? "Show Less" : "Read Full Story"}
                            </Button>
                        )}
                    </div>
                )}
            </Container>
        </Section>
    );
};

export default ArtistBiography;