'use client'
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button'; 
import { ArtistData } from '@/lib/api/adminApi';
import { useGetArtistsQuery } from '@/lib/api/commonApi'; 
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


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

const convertNameToSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
}

const ArtistCard = ({artist}: {artist: Artist}) => {
    //todo: replace with actural artist id later
    return<Link href={'/artists/'+convertNameToSlug(artist.name)}>
        <div className="bg-gray-900 hover:border hover:border-b-gray-700 rounded-md transition-all cursor-pointer">
            <Image width={200} height={200} src={artist.image} alt="" className="w-full" />
            <p className="p-4 rounded-md overflow-hidden"> {artist.name} </p>
        </div>
    </Link>
}


const ArtistListSection = () => {
    const { data: artistsData, isLoading } = useGetArtistsQuery();

    if (isLoading) {
        return <div className='w-full h-48 flex items-center justify-center'>
            <div className="flex items-center gap-4">
                <Loader className='animate-spin text-gray-400' size={24} /> Loading...
            </div>
        </div>;
    }

    return (
        <Container>
            <div className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 max-w-7xl mx-auto">
                {
                    artistsData?.data?.map((item: ArtistData, index: number) => {
                        return <ArtistCard artist={{name: item.name, image: item.image || "/images/artist-image-collection/artist.png"}} key={index} />
                    })
                }
            </div>
            <div className="flex items-center justify-center w-full my-6 mt-20">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                    See more
                </Button>
            </div>
        </Container>
    );
};

export default ArtistListSection;