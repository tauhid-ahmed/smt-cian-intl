import Section from '@/components/layout/Section';
import React from 'react';
import Container from '@/components/layout/Container';
import Image from 'next/image';
import { StarRating } from '@/components/StarRating';

type ProductCardProps = {
    category: string;
    name: string;
    image: string;
    rating: number;
    price: number;
}
const ProductCard = ({ category, name, image, rating, price }: ProductCardProps) => {
    return <div className='border border-gray-700 rounded-xl overflow-hidden'>
        <Image src={image} alt="" width={420} height={420} className='w-full aspect-4/4 object-cover border-none'/>
        <div className='p-4 space-y-2'>
            <p className='text-sm text-gray-400'>{category}</p>
            <h1 className='text-xl font-semibold'>{name}</h1>
            <StarRating rating={rating} size='sm' />
            <p className='text-xl font-semibold'>{price}</p>
        </div>
    </div>
}

const totalItem : ProductCardProps[] = [
    {
        category: "Album",
        name: "Album 1",
        image: "https://picsum.photos/200",
        rating: 4.5,
        price: 19.99,   
    },
    {
        category: "Album",
        name: "Album 2",
        image: "https://picsum.photos/201",
        rating: 4.1,
        price: 14.99,   
    }, 
    {
        category: "Album",
        name: "Album 3",
        image: "https://picsum.photos/202",
        rating: 4.9,
        price: 19.99,   
    }, 
    {
        category: "Album",
        name: "Album 4",
        image: "https://picsum.photos/203",
        rating: 4.7,
        price: 9.99,   
    }, 
    {
        category: "Album",
        name: "Album 5",
        image: "https://picsum.photos/204",
        rating: 4.3,
        price: 14.99,   
    }, 
]

const RelatedAlbums = () => {
    return (
        <Section padding='sm'>
           <Container className="max-w-7xl mx-auto">
                <h1 className='text-4xl text-center font-semibold mb-18'> You might also like</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 '>
                   {
                    totalItem.map((item, index) => {
                        const { category, name, image, rating, price } = item;
                        return <ProductCard key={index} category={category} name={name} image={image} rating={rating} price={price} />
                    })
                   }
                </div>
                <div className="text-center mt-24 mb-36">
                    <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                        View All form This Artist
                    </button>
                </div>
            </Container>
        </Section>
    );
};

export default RelatedAlbums;