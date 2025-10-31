"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";

// Type Definitions
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

interface ArtistMerchandiseProps {
  products?: Product[];
}

// Reusable Product Card Component
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-200 rounded-2xl overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 bg-gray-200">
        <p className="text-sm text-gray-700 mb-1">{product.category}</p>
        <h3 className="text-xl font-bold text-black mb-4">{product.name}</h3>

        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-black">
            ${product.price.toFixed(2)}
          </span>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium border border-gray-300">
            <ShoppingBag className="w-4 h-4" />
            Shop
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen bg-black text-white px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12">
          Artist Merchandise
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="px-8 py-4 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all font-medium text-lg">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistMerchandise;
