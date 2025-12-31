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
    id: string; 
}
 


const ArtistCard = ({artist}: {artist: Artist}) => {
    //todo: replace with actural artist id later
    return<Link href={'/artists/'+artist.id}>
        <div className="bg-gray-900 hover:border hover:border-b-gray-700 rounded-md transition-all cursor-pointer">
            <Image width={200} height={200} src={artist.image} alt="" className="w-full aspect-square object-cover" />
            <p className="p-4 rounded-md overflow-hidden"> {artist.name} </p>
        </div>
    </Link>
}


const ArtistListSection = () => {
    const { data, isLoading } = useGetArtistsQuery();
    const artistsData = data?.data
    console.log("Artists data:", artistsData);


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
                    artistsData?.map((item: ArtistData, index: number) => {
                        return <ArtistCard artist={{name: item.name, image: item.image || "/images/artist-image-collection/artist.png" , id: item.id }} key={index} />
                    })
                }
            </div>
            <div className="  items-center justify-center w-full my-6 mt-20 hidden">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                    See more
                </Button>
            </div>
        </Container>
    );
};

export default ArtistListSection;