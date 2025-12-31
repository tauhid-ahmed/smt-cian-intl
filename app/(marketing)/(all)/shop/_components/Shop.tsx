"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Star,
  Grid,
  List,
  Heart,
  ShoppingCart,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/Heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/lib/api/commonApi";

// ==================== TYPE DEFINITIONS ====================
interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface Filter {
  id: string;
  label: string;
  type: "checkbox" | "radio";
  options: FilterOption[];
}

interface FilterConfig {
  filters: Filter[];
}

interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  format: string;
}

interface FilterPanelProps {
  config: FilterConfig;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, value: string) => void;
  onClearAll: () => void;
}

export function FilterPanel({
  config,
  selectedFilters,
  onFilterChange,
  onClearAll,
}: FilterPanelProps) {
  const [expandedFilters, setExpandedFilters] = useState<
    Record<string, boolean>
  >({
    format: true,
    genre: true,
    artist: true,
    "price-range": true,
    "customer-rating": true,
    availability: true,
  });
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>(
    {}
  );

  const toggleFilter = (filterId: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  const handleSearch = (filterId: string, query: string) => {
    setSearchQueries((prev) => ({
      ...prev,
      [filterId]: query,
    }));
  };

  const getFilteredOptions = (filter: Filter) => {
    const query = searchQueries[filter.id]?.toLowerCase() || "";
    if (!query) return filter.options;
    return filter.options.filter((opt) =>
      opt.label.toLowerCase().includes(query)
    );
  };

  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className="w-full lg:w-72 bg-sidebar text-white rounded-lg">
      <div className="bg-sidebar p-4 rounded-t-lg">
        <Heading as="h3" size="h6">
          Filters
        </Heading>
      </div>

      {/* Search Box */}
      <div className="p-4 border-b border-zinc-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-stone-800 text-white pl-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-500" />
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 space-y-4">
        {config.filters.map((filter) => {
          const isExpanded = expandedFilters[filter.id];
          const filteredOptions = getFilteredOptions(filter);
          const hasSearch = ["genre", "artist"].includes(filter.id);

          return (
            <div
              key={filter.id}
              className="border-b border-zinc-700 pb-4 last:border-0"
            >
              {/* Filter Header */}
              <button
                onClick={() => toggleFilter(filter.id)}
                className="w-full flex items-center justify-between mb-3 hover:text-yellow-500 transition-colors"
              >
                <span className="font-semibold text-base">{filter.label}</span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {/* Filter Content */}
              {isExpanded && (
                <div className="space-y-2">
                  {/* Search for specific filters */}
                  {hasSearch && (
                    <div className="relative mb-2">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQueries[filter.id] || ""}
                        onChange={(e) =>
                          handleSearch(filter.id, e.target.value)
                        }
                        className="w-full bg-zinc-800 text-white pl-4 pr-10 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  )}

                  {/* Options */}
                  {filteredOptions.slice(0, 5).map((option) => {
                    const isChecked =
                      selectedFilters[filter.id]?.includes(option.value) ||
                      false;

                    return (
                      <label
                        key={option.value}
                        className="flex items-center justify-between cursor-pointer hover:bg-zinc-800 p-2 rounded transition-colors"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              onFilterChange(filter.id, option.value)
                            }
                            className="w-4 h-4 accent-yellow-500 cursor-pointer"
                          />
                          <span className="text-sm text-gray-300">
                            {option.label}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({option.count})
                        </span>
                      </label>
                    );
                  })}

                  {/* Show More */}
                  {filteredOptions.length > 5 && (
                    <button className="text-sm text-yellow-500 hover:text-yellow-400 mt-2 flex items-center gap-1">
                      + Show more
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Clear All Button */}
      {totalActiveFilters > 0 && (
        <div className="p-4 border-b border-gray-700">
          <Button
            onClick={onClearAll}
            variant="outline"
            className="w-full border-primary hover:border-primary"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}

// ==================== PRODUCT CARD COMPONENT ====================
function ProductCard({ product: product }) {
  return (
    <Link href={`/shop/${product.id}`}>
      <div className="rounded-lg overflow-hidden group relative border border-white/20">
        {/* Wishlist Icon */}
        <button className="absolute top-3 right-3 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors">
          <Heart className="w-5 h-5 text-white" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-3/2 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold uppercase">
              {product.badge}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-yellow-500 text-sm mb-1">{product.format}</p>
          <h3 className="text-white font-semibold mb-1 line-clamp-1">
            {product.artist}
          </h3>
          <p className="text-gray-400 text-sm mb-2 line-clamp-1">
            {product.title}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "fill-gray-600 text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          {/* Price and Cart */}
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-lg">
              ${product.price}
            </span>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ==================== MAIN SHOP COMPONENT ====================
function MusicShop() {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("most-recent");

  const filterConfig: FilterConfig = {
    filters: [
      {
        id: "format",
        label: "Format",
        type: "checkbox",
        options: [
          { value: "vinyl", label: "Vinyl Records", count: 45 },
          { value: "cd", label: "CDs", count: 89 },
          { value: "digital", label: "Digital Downloads", count: 120 },
          { value: "bundle", label: "Bundles", count: 12 },
        ],
      },
      {
        id: "genre",
        label: "Genre",
        type: "checkbox",
        options: [
          { value: "worship", label: "Worship", count: 45 },
          { value: "gospel", label: "Gospel", count: 67 },
          { value: "contemporary", label: "Contemporary Christian", count: 87 },
          { value: "hip-hop", label: "Hip Hop", count: 23 },
          { value: "acoustic", label: "Acoustic", count: 34 },
          { value: "rock", label: "Rock", count: 56 },
        ],
      },
      {
        id: "artist",
        label: "Artist",
        type: "checkbox",
        options: [
          { value: "elevation", label: "Elevation Worship", count: 12 },
          { value: "hillsong", label: "Hillsong United", count: 8 },
          { value: "maverick", label: "Maverick City Music", count: 15 },
          { value: "bethel", label: "Bethel Music", count: 10 },
        ],
      },
      {
        id: "price-range",
        label: "Price Range",
        type: "radio",
        options: [
          { value: "under-10", label: "Under to $10", count: 34 },
          { value: "10-20", label: "$10 - $20", count: 56 },
          { value: "20-30", label: "$20 - $30", count: 45 },
          { value: "over-50", label: "Over to $50", count: 12 },
        ],
      },
      {
        id: "customer-rating",
        label: "Customer Rating",
        type: "radio",
        options: [
          { value: "all", label: "All", count: 234 },
          { value: "5-star", label: "★★★★★ & Up", count: 156 },
          { value: "4-star", label: "★★★★ & Up", count: 189 },
          { value: "3-star", label: "★★★ & Up", count: 221 },
        ],
      },
      {
        id: "availability",
        label: "Availability",
        type: "checkbox",
        options: [
          { value: "in-stock", label: "In stock", count: 189 },
          { value: "pre-order", label: "Pre-Order", count: 12 },
          { value: "limited", label: "Limited Edition", count: 8 },
        ],
      },
    ],
  };

  const products: Product[] = [
    {
      id: 1,
      title: "The Altar and The Door",
      artist: "Casting Crowns",
      price: 16.99,
      rating: 5,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=400&h=400&fit=crop",
      badge: "Sale",
      format: "CD",
    },
    {
      id: 2,
      title: "A Beautiful Exchange",
      artist: "Hillsong Worship",
      price: 27.99,
      rating: 4,
      reviews: 112,
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      badge: "New",
      format: "Vinyl",
    },
    {
      id: 3,
      title: "Only Jesus",
      artist: "Casting Crowns",
      price: 22.99,
      rating: 5,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=400&fit=crop",
      badge: "Sale",
      format: "CD",
    },
    {
      id: 4,
      title: "Live from Atlanta",
      artist: "Maverick City Music",
      price: 21.99,
      rating: 5,
      reviews: 14,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      badge: "Great",
      format: "Digital",
    },
    {
      id: 5,
      title: "Live from Atlanta",
      artist: "Maverick City Music",
      price: 21.99,
      rating: 5,
      reviews: 14,
      image:
        "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=400&fit=crop",
      badge: "Great",
      format: "Digital",
    },
    {
      id: 6,
      title: "Praise & Worship Collection",
      artist: "Elevation Worship",
      price: 29.99,
      rating: 4,
      reviews: 127,
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
      badge: "New",
      format: "Vinyl",
    },
  ];

  const { data: allProductsData, isLoading: isProductsLoading } = useGetAllProductsQuery();
   
  const allProducts = allProductsData?.data

  const parsedProduct = allProducts?.map((product: any) => ({
    id: product.id,
    title: product.title,
    artist: product.artist?.name || '',
    price: product.price,
    rating: product.rating || 0,
    reviews: product.review_count || 0,
    image: product.image?.url || '',
    badge: product.on_sale ? 'Sale' : product.is_new ? 'New' : '',
    format: product.format || 'Digital',
  }));

  if (isProductsLoading) {
    return <div className="w-full h-[50vh] flex items-center justify-center text-lg">Loading...</div>;
  }
  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[filterId] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return {
        ...prev,
        [filterId]: newValues,
      };
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
  };

  return (
    <Section padding="md">
      <Container>
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterPanel
            config={filterConfig}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-zinc-800 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-lg font-semibold">
                {products.length} Products found
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm">View:</span>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-700"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-yellow-500 text-black"
                        : "bg-zinc-700"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm">Short by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-zinc-700 px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="most-recent">Most Recent</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {parsedProduct?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="px-3 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                &lt;
              </button>
              <button className="px-4 py-2 bg-white text-black rounded font-semibold">
                1
              </button>
              <button className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                2
              </button>
              <button className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                3
              </button>
              <button className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                4
              </button>
              <button className="px-3 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default MusicShop;
