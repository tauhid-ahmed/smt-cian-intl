'use client'

import Newsletter from "@/components/Newsletter";
import ArtistBiography from "./_components/ArtistBiography";
import Discography from "./_components/Discography";
import Intro from "./_components/Intro";
import ArtistMerchandise from "./_components/Merchandise";
import Service from "./_components/Service";
import Stats from "./_components/Stats";
import Studio from "./_components/Studio";
import Testimonial from "./_components/Testimonial";
import { useParams } from "next/navigation";

export default function ArtistsPage() {
    const { slug } = useParams();

    return (
        <>
            <Intro />
            <Stats />
            <Service />
            <ArtistBiography />
            <Discography />
            <Studio />
            <Testimonial artistId={slug as string} />
            <ArtistMerchandise />
            <Newsletter />
        </>
    );
}
