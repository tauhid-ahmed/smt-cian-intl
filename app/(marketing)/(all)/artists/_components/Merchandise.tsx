"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Type Definitions
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ArtistMerchandiseProps {
  products?: Product[];
}

function ProductCard({ product }) {
  return (
    <div className="rounded-2xl overflow-hidden group text-center border border-white/30">
      {/* Product Image */}
      <div className="relative aspect-3/2 overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 size-full"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <p className="text-sm text-white/80 mb-1 text-left">
          {product.category}
        </p>
        <Heading as="h3" size="h6">
          {product.name}
        </Heading>

        <div className="flex items-center justify-between gap-3 mt-2">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <Button variant="secondary">
            <ShoppingBag className="w-4 h-4" />
            Shop
          </Button>
        </div>
      </div>
    </div>
  );
}

// Default Products Data
const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Gibson Lea Paul",
    category: "Album",
    price: 38.0,
    image:
      "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=800&h=800&fit=crop",
  },
  {
    id: 2,
    name: "Pearl Export Series",
    category: "Apparel",
    price: 25.0,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop",
  },
  {
    id: 3,
    name: "Feder Stratocaster",
    category: "Poster",
    price: 55.0,
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop",
  },
  {
    id: 4,
    name: "Roland V-Drums TD-17",
    category: "Vinyl",
    price: 60.1,
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=800&fit=crop",
  },
];

// Main Artist Merchandise Component
const ArtistMerchandise: React.FC<ArtistMerchandiseProps> = ({
  products = defaultProducts,
}) => {
  return (
    <Section padding="lg">
      <Container>
        <div className="flex flex-col gap-8">
          <Heading align="center" size="h3" as="h2">
            Artist Merchandise
          </Heading>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ArtistMerchandise;
