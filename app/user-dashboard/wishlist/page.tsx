import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

export default function Page() {
  // Mock data for wishlist products
  const wishlistProducts = [
    {
      id: 1,
      artist: "Casting Crowns",
      album: "The Altar and The Door",
      rating: 5,
      reviews: 252,
      price: "$16.99",
      image: "/example.jpg",
      tag: "Pre-Order",
      category: "CD",
    },
    {
      id: 2,
      artist: "Hillsong Worship",
      album: "A Beautiful Exchange",
      rating: 5,
      reviews: 189,
      price: "$27.99",
      image: "/example.jpg",
      tag: "Sale",
      category: "Digital",
    },
    {
      id: 3,
      artist: "Casting Crowns",
      album: "Only Jesus",
      rating: 5,
      reviews: 167,
      price: "$22.99",
      image: "/example.jpg",
      tag: "",
      category: "Vinyl",
    },
    {
      id: 4,
      artist: "Maverick City Music",
      album: "Live from Atlanta",
      rating: 5,
      reviews: 304,
      price: "$21.99",
      image: "/example.jpg",
      tag: "New",
      category: "CD",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Wishlist</h1>
        <p className="text-gray-400 mt-2">
          Your saved products and favourite artists
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-700 rounded-2xl bg-gray-900/50 hover:border-gray-600 transition-colors overflow-hidden"
          >
            {/* Product Image Container */}
            <div className="relative w-full h-48">
              {/* Image */}
              <Image
                src={product.image}
                alt={`${product.artist} - ${product.album}`}
                className="object-cover w-full h-full"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Top Left Tag Badge */}
              {product.tag && (
                <div className="absolute top-2 left-2 bg-gray-500/10 border border-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {product.tag}
                </div>
              )}

              {/* Top Right Heart Icon */}
              <button className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                <Heart className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </button>

              {/* Bottom Left Category Badge */}
              <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
                {product.category}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
              <div>
                <h3 className="font-semibold text-gray-400 text-base">
                  {product.artist}
                </h3>
                <p className="text-white text-lg">{product.album}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                {renderStars(product.rating)}
                <span className="text-gray-500 text-sm">
                  ({product.reviews})
                </span>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-white">
                  {product.price}
                </span>
                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (optional) */}
      {wishlistProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500">
            Start adding your favorite products to your wishlist
          </p>
        </div>
      )}
    </div>
  );
}
