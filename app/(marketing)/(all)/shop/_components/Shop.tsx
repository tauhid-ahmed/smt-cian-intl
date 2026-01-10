/* eslint-disable @typescript-eslint/no-explicit-any */
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
    Loader2,
    CheckIcon,
    Package,
} from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/Heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductData, useGetAllProductsQuery, useToggleWhishlistMutation } from "@/lib/api/commonApi";

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


function ProductCard({ product, viewMode }: { product: any, viewMode: "grid" | "list" }) {
    const [toggleWhishlist, { isLoading, isSuccess }] = useToggleWhishlistMutation()

    const isList = viewMode === "list";

    return (
        <div className={`rounded-lg overflow-hidden group relative border border-white/10 bg-zinc-900/50 hover:border-white/20 transition-all ${isList ? "flex flex-col sm:flex-row" : "flex flex-col"}`}>
            {/* Wishlist Icon */}
            <button
                className={`absolute top-3 right-3 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors ${isList ? "sm:top-4 sm:right-4" : ""}`}
                title="Add to Wishlist"
                onClick={(e) => {
                    e.preventDefault();
                    toggleWhishlist({ productId: product.id });
                }}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : isSuccess ? (
                    <CheckIcon className="w-5 h-5 text-green-500" />
                ) : (
                    <Heart className="w-5 h-5 text-white" />
                )}
            </button>

            {/* Product Image */}
            <Link href={`/shop/${product.id}`} className={`${isList ? "w-full sm:w-64" : "w-full"}`}>
                <div className={`relative overflow-hidden ${isList ? "aspect-video sm:aspect-square h-full" : "aspect-[4/3]"}`}>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                        <div className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                            {product.badge}
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className={`p-4 flex flex-col justify-between flex-1 ${isList ? "p-6" : ""}`}>
                <Link href={`/shop/${product.id}`}>
                    <div className="space-y-1">
                        <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest">{product.format}</p>
                        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1 group-hover:text-yellow-500 transition-colors">
                            {product.artist}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                            {product.title}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                                            ? "fill-yellow-500 text-yellow-500"
                                            : "fill-zinc-700 text-zinc-700"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-zinc-500">({product.reviews} reviews)</span>
                        </div>
                    </div>
                </Link>

                {/* Price and Cart */}
                <div className={`flex items-center justify-between mt-4 ${isList ? "sm:mt-0" : ""}`}>
                    <div className="flex flex-col">
                        <span className="text-white font-black text-xl">
                            ${product.price}
                        </span>
                    </div>
                    <button className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-yellow-500 transition-all text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-yellow-500/20 active:scale-95">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

function MusicShop() {
    const [selectedFilters, setSelectedFilters] = useState<
        Record<string, string[]>
    >({});
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("most-recent");
    const [searchQuery, setSearchQuery] = useState("");

    const filterConfig: FilterConfig = {
        filters: [
            {
                id: "category",
                label: "Category",
                type: "checkbox",
                options: [
                    { value: "vinyl", label: "Vinyl Records", count: 45 },
                    { value: "cd", label: "CDs", count: 89 },
                    { value: "digital", label: "Digital Downloads", count: 120 },
                    { value: "accessories", label: "Accessories", count: 12 },
                    { value: "merch", label: "Merchandise", count: 64 },
                ],
            },
            {
                id: "price-range",
                label: "Price Range",
                type: "radio",
                options: [
                    { value: "0-20", label: "Under $20", count: 34 },
                    { value: "20-50", label: "$20 - $50", count: 56 },
                    { value: "50-100", label: "$50 - $100", count: 45 },
                    { value: "100-1000", label: "Over $100", count: 12 },
                ],
            },
            {
                id: "customer-rating",
                label: "Customer Rating",
                type: "radio",
                options: [
                    { value: "5", label: "5 Stars", count: 156 },
                    { value: "4", label: "4 Stars & Up", count: 189 },
                    { value: "3", label: "3 Stars & Up", count: 221 },
                ],
            },
        ],
    };

    // Construct API params from state
    const getQueryParams = () => {
        const params: any = {};

        if (searchQuery) {
            params.search = searchQuery;
        }

        // Price range mapping
        if (selectedFilters["price-range"]?.length) {
            const range = selectedFilters["price-range"][0]; // It's radio-like
            const [min, max] = range.split("-");
            params.minPrice = Number(min);
            if (max) params.maxPrice = Number(max);
        }

        // Rating mapping
        if (selectedFilters["customer-rating"]?.length) {
            params.rating = selectedFilters["customer-rating"][0];
        }

        // Category mapping
        if (selectedFilters["category"]?.length) {
            params.category = selectedFilters["category"].join(",");
        }

        return params;
    };

    const { data: allProductsData, isLoading: isProductsLoading } = useGetAllProductsQuery(getQueryParams());

    const allProducts = allProductsData?.data || [];

    const parsedProduct = allProducts.map((product: any) => ({
        id: product.id,
        title: product.title,
        artist: product.artist?.name || '',
        price: product.price,
        rating: product?.averageRating || 0,
        reviews: product?.totalReviews || 0,
        image: product.mainImage || '',
        badge: product?.productType === 'REGULAR' ? '' : product?.productType,
        format: product?.category || 'Digital',
    }));

    const handleFilterChange = (filterId: string, value: string) => {
        setSelectedFilters((prev) => {
            const current = prev[filterId] || [];

            // For radio-like behavior on price-range and rating
            if (filterId === "price-range" || filterId === "customer-rating") {
                return {
                    ...prev,
                    [filterId]: current.includes(value) ? [] : [value],
                };
            }

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
        setSearchQuery("");
    };

    return (
        <Section padding="md">
            <Container>
                <div className="flex flex-col lg:flex-row gap-6">
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
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-stone-800 text-white pl-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-500" />
                            </div>
                        </div>

                        {/* Dynamically render FilterPanel content here to use local state for search */}
                        <div className="p-4 space-y-4">
                            {filterConfig.filters.map((filter) => (
                                <div key={filter.id} className="border-b border-zinc-700 pb-4 last:border-0">
                                    <h4 className="font-semibold text-base mb-3">{filter.label}</h4>
                                    <div className="space-y-2">
                                        {filter.options.map((option) => {
                                            const isChecked = selectedFilters[filter.id]?.includes(option.value);
                                            return (
                                                <label key={option.value} className="flex items-center justify-between cursor-pointer hover:bg-zinc-800 p-2 rounded transition-colors text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={() => handleFilterChange(filter.id, option.value)}
                                                            className="w-4 h-4 accent-yellow-500"
                                                        />
                                                        <span className="text-gray-300">{option.label}</span>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Clear All */}
                        {(Object.keys(selectedFilters).length > 0 || searchQuery) && (
                            <div className="p-4 border-t border-zinc-700">
                                <Button onClick={handleClearAll} variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                                    Clear All
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="bg-zinc-800 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="text-lg font-semibold">
                                {isProductsLoading ? "Searching..." : `${allProducts.length} Products found`}
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                {/* View Toggle */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">View:</span>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded ${viewMode === "list"
                                            ? "bg-yellow-500 text-black"
                                            : "bg-zinc-700"
                                            }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded ${viewMode === "grid"
                                            ? "bg-yellow-500 text-black"
                                            : "bg-zinc-700"
                                            }`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="  items-center gap-2 hidden">
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

                        {/* Products Content */}
                        {isProductsLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="bg-zinc-900 animate-pulse h-80 rounded-lg"></div>
                                ))}
                            </div>
                        ) : allProducts.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p className="text-xl">No products matched your criteria</p>
                                <Button variant="link" onClick={handleClearAll} className="text-yellow-500 mt-2">
                                    Reset all filters
                                </Button>
                            </div>
                        ) : (
                            <div
                                className={`grid gap-6 ${viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                                    : "grid-cols-1"
                                    }`}
                            >
                                {parsedProduct.map((product) => (
                                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                                ))}
                            </div>
                        )}

                        {/* Pagination (Simplified for now as API response meta wasn't fully used) */}
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button className="px-3 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors">
                                &lt;
                            </button>
                            <button className="px-4 py-2 bg-white text-black rounded font-semibold">
                                1
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
