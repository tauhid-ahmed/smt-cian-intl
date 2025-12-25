import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button'; 
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface Artist {
    name: string;
    image: string;
}

const artists : Artist[] = [
    { name: "Liam Thompson", image: "/images/artist-image-collection/artist.png" },
    { name: "Sophie Green", image: "/images/artist-image-collection/artist-1.png" },
    { name: "Max Harrison", image: "/images/artist-image-collection/artist-2.png" },
    { name: "Ava Collins", image: "/images/artist-image-collection/artist-3.png" },
    { name: "Lucas Wright", image: "/images/artist-image-collection/artist-4.png" },
    { name: "Ella Davis", image: "/images/artist-image-collection/artist-5.png" },
    { name: "Ethan Parker", image: "/images/artist-image-collection/artist-6.png" },
    { name: "Maya Roberts", image: "/images/artist-image-collection/artist-7.png" },
    { name: "Jayden Lee", image: "/images/artist-image-collection/artist-8.png" }
];

const ArtistCard = ({artist}: {artist: Artist}) => {
    //todo: replace with actural artist id later
    return<Link href={'/artists/'+artist.name}>
        <div className="bg-gray-900 hover:border hover:border-b-gray-700 rounded-md transition-all cursor-pointer">
            <Image width={200} height={200} src={artist.image} alt="" className="w-full" />
            <p className="p-4 rounded-md overflow-hidden"> {artist.name} </p>
        </div>
    </Link>
}


const ArtistListSection = () => {
    return (
        <Container>
            <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 max-w-7xl mx-auto">
                {
                    artists.map((item: Artist, index: number) => {
                        return <ArtistCard artist={item} key={index} />
                    })
                }
            </div>
            <div className="flex items-center justify-center w-full my-6 mt-20">
                <Button>
                    See more
                </Button>
            </div>
        </Container>
    );
};

export default ArtistListSection;