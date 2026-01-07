"use client";

import { useGetArtistsQuery } from "@/lib/api/commonApi";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Loader2, MapPin, Users, Award } from "lucide-react";
import Container from "@/components/layout/Container";

/* ------------------ Artist Card ------------------ */
const ArtistCard = ({ artist, index }: { artist: any; index: number }) => {
    // Determine the priority of images to show
    const displayImage = artist.image || artist.banner || "/images/artist-image-collection/artist.png";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <Link href={`/artists/${artist.id}`} className="block">
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-500 group-hover:border-yellow-500/50 group-hover:shadow-[0_0_30px_rgba(253,199,0,0.15)]">
                    {/* Background Image */}
                    <Image
                        src={displayImage}
                        alt={artist.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Content Corner (Location) */}
                    <div className="absolute top-4 left-4 z-20">
                        {artist.location && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                                <MapPin className="size-3 text-yellow-500" />
                                {artist.location}
                            </div>
                        )}
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="space-y-3">
                            {/* Genres */}
                            {artist.genres && artist.genres.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {artist.genres.slice(0, 2).map((genre: string) => (
                                        <span key={genre} className="text-[10px] font-bold text-yellow-500/90 uppercase tracking-widest bg-yellow-500/10 px-2 py-0.5 rounded">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300">
                                    {artist.name}
                                </h3>
                                <p className="text-sm text-zinc-400 line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {artist.bio}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                                    <Users className="size-3.5" />
                                    <span>{artist.followers > 1000 ? `${(artist.followers / 1000).toFixed(1)}k` : artist.followers}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                                    <Award className="size-3.5" />
                                    <span>{artist.awards} Awards</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const ArtistListSection = () => {
    const { data, isLoading, isError } = useGetArtistsQuery();
    const artists = data?.data || [];

    if (isLoading) {
        return (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="size-10 text-yellow-500 animate-spin" />
                <p className="text-zinc-500 font-medium animate-pulse uppercase tracking-[0.2em] text-xs">Curating the collective...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-24 text-center">
                <p className="text-zinc-500">Failed to load the collective. Please try again later.</p>
            </div>
        );
    }

    return (
        <Section className="pb-32">
            <Container>
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">
                            Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            The Collective <span className="text-zinc-700">Artists</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {artists.map((artist: any, index: number) => (
                        <ArtistCard key={artist.id} artist={artist} index={index} />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

/* ------------------ Supporting Component ------------------ */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <section className={`py-12 md:py-24 ${className}`}>
        {children}
    </section>
);

export default ArtistListSection;