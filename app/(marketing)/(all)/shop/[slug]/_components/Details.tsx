"use client";

import { useState } from "react";
import {
    Star,
    Play,
    Pause,
    Volume2,
    ShoppingCart,
    Heart,
    Shield,
    CreditCard,
    Truck,
    RotateCcw,
    ChevronDown,
    ChevronRight,
    Loader2,
} from "lucide-react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { useGetSingleProductQuery } from "@/lib/api/commonApi";
import { useMusicPlayer } from "@/providers/MusicPlayer";
import { useAddToCartMutation } from "@/lib/api/cartApi";
import { toast } from "react-hot-toast";

// ==================== TYPE DEFINITIONS ====================
interface Track {
    id: string;
    title: string;
    duration: string;
    audioUrl?: string;
}

interface Product {
    id: string;
    vendor: string;
    title: string;
    rating: number;
    reviewCount: number;
    testimonialCount: number;
    formats: FormatOption[];
    tracks: Track[];
    description: string;
    trackList?: string;
    shippingInfo?: string;
    returnPolicy?: string;
    technicalDetails?: TechnicalDetail[];
    productType?: string;
}

interface FormatOption {
    id: string;
    type: "vinyl" | "cd" | "digital" | "bundle";
    name: string;
    price: number;
    originalPrice?: number;
    colors?: string[];
    stock: number;
    badge?: string;
    badgeColor?: string;
}

interface TechnicalDetail {
    label: string;
    value: string;
}

// ==================== COMPONENTS ====================
const StarRating = ({ rating, count }: { rating: number; count: number }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-700 text-gray-700"
                            }`}
                    />
                ))}
            </div>
            <span className="text-gray-400 text-sm">({count} Reviews)</span>
        </div>
    );
};

const TrackListItem = ({
    track,
    index,
    vendor,
    artwork,
    allTracks
}: {
    track: any;
    index: number;
    vendor: string;
    artwork: string;
    allTracks: any[];
}) => {
    const { currentTrack, isPlaying, open, togglePlay } = useMusicPlayer();
    const isCurrentTrack = currentTrack?.id === track.id;
    const isTrackPlaying = isCurrentTrack && isPlaying;

    const handleToggle = () => {
        if (isCurrentTrack) {
            togglePlay();
        } else {
            // Map tracks to global player format
            const mappedTrack = {
                id: track.id,
                title: track.title,
                artist: vendor,
                url: track.audioUrl || "",
                artwork: artwork,
                duration: track.duration
            };

            const mappedPlaylist = allTracks.map(t => ({
                id: t.id,
                title: t.title,
                artist: vendor,
                url: t.audioUrl || "",
                artwork: artwork,
                duration: t.duration
            }));

            open(mappedTrack, mappedPlaylist);
        }
    };

    return (
        <div className="flex items-center justify-between py-3 hover:bg-zinc-900 px-4 rounded-lg transition-colors group">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={handleToggle}
                    className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                    {isTrackPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                    ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                </button>

                <div className="flex items-center gap-3 flex-1">
                    <span className="text-gray-400 w-6">{index}.</span>
                    <span
                        className={`text-white ${isCurrentTrack ? "text-yellow-500 font-medium" : ""
                            }`}
                    >
                        {track.title}
                    </span>
                </div>
            </div>

            <span className="text-gray-400 text-sm">{track.duration}</span>
        </div>
    );
};

const ColorSelector = ({
    colors,
    selected,
    onSelect,
}: {
    colors: string[];
    selected: string;
    onSelect: (color: string) => void;
}) => {
    const colorMap: Record<string, string> = {
        white: "bg-white",
        red: "bg-red-500",
        blue: "bg-blue-500",
        black: "bg-black",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
    };

    return (
        <div className="flex gap-2">
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => onSelect(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${selected === color ? "border-white scale-110" : "border-gray-700"
                        } ${colorMap[color] || "bg-gray-500"}`}
                />
            ))}
        </div>
    );
};

const AccordionSection = ({
    title,
    children,
    defaultOpen = false,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-t border-zinc-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-white hover:text-gray-300 transition-colors"
            >
                <span className="font-semibold">{title}</span>
                {isOpen ? (
                    <ChevronDown className="w-5 h-5" />
                ) : (
                    <ChevronRight className="w-5 h-5" />
                )}
            </button>
            {isOpen && (
                <div className="pb-6 text-gray-300 text-sm leading-relaxed">
                    {children}
                </div>
            )}
        </div>
    );
};

// ==================== MAIN COMPONENT ====================
const ProductDetailSection = ({ product, apiProduct }: { product: Product, apiProduct: any }) => {
    const [selectedFormat, setSelectedFormat] = useState(product.formats[0]);
    const [selectedColor, setSelectedColor] = useState(
        product.formats[0].colors?.[0] || ""
    );
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeImage, setActiveImage] = useState(apiProduct.mainImage);

    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= selectedFormat.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleFormatChange = (format: FormatOption) => {
        setSelectedFormat(format);
        if (format.colors && format.colors.length > 0) {
            setSelectedColor(format.colors[0]);
        }
        setQuantity(1);
    };

    const handleAddToCart = async () => {
        try {
            await addToCart({ productId: product.id, quantity }).unwrap();
            toast.success("Added to cart successfully!");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add to cart");
        }
    };

    return (
        <Section>
            <div className="min-h-screen bg-black text-white">
                <Container className="max-w-7xl! mx-auto!">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* LEFT SIDE - Image Gallery & Track Preview */}
                        <div className="space-y-6">
                            {/* Main Product Image */}
                            <div className="relative aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                                <Image
                                    src={activeImage || "/images/placeholder.jpg"}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Thumbnail Gallery */}
                            {apiProduct.gallery && apiProduct.gallery.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
                                    <button
                                        onClick={() => setActiveImage(apiProduct.mainImage)}
                                        className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImage === apiProduct.mainImage ? "border-yellow-500" : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image src={apiProduct.mainImage} alt="Main" fill className="object-cover" />
                                    </button>
                                    {apiProduct.gallery.map((img: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImage === img ? "border-yellow-500" : "border-transparent opacity-60 hover:opacity-100"
                                                }`}
                                        >
                                            <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Track Preview */}
                            {product.tracks.length > 0 && (
                                <div className="bg-zinc-900 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Volume2 className="w-5 h-5 text-white" />
                                        <h3 className="text-white font-semibold">
                                            Track Preview (30-90s samples)
                                        </h3>
                                    </div>

                                    <div className="space-y-1">
                                        {product.tracks.map((track, index) => (
                                            <TrackListItem
                                                key={track.id}
                                                track={track}
                                                index={index + 1}
                                                vendor={product.vendor}
                                                artwork={apiProduct.mainImage}
                                                allTracks={product.tracks}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT SIDE - Product Details */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-black text-xs font-bold">E</span>
                                    </div>
                                    <span className="text-gray-400">{product.vendor}</span>
                                </div>

                                <h1 className="text-4xl font-bold mb-3">{product.title}</h1>

                                <div className="flex items-center gap-4">
                                    <StarRating
                                        rating={product.rating}
                                        count={product.reviewCount}
                                    />
                                    <span className="text-gray-400 text-sm">
                                        {product.testimonialCount} Testimonies
                                    </span>
                                </div>
                            </div>

                            {/* Format Selection */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Format Selection</h3>

                                {product.formats.map((format) => (
                                    <button
                                        key={format.id}
                                        onClick={() => handleFormatChange(format)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${selectedFormat.id === format.id
                                            ? "border-white bg-zinc-900"
                                            : "border-zinc-800 hover:border-zinc-700"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium">{format.name}</span>
                                            {format.badge && (
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${format.badgeColor === "red"
                                                        ? "bg-red-600"
                                                        : "bg-zinc-700"
                                                        }`}
                                                >
                                                    {format.badge}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {format.originalPrice && (
                                                <span className="text-gray-500 line-through">
                                                    ${format.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                            <span className="font-bold">
                                                ${format.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </button>
                                ))}

                                {/* Color Selection */}
                                {selectedFormat.colors && selectedFormat.colors.length > 0 && (
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">
                                            Color:
                                        </label>
                                        <ColorSelector
                                            colors={selectedFormat.colors}
                                            selected={selectedColor}
                                            onSelect={setSelectedColor}
                                        />
                                    </div>
                                )}

                                {/* Stock Badges */}
                                <div className="flex gap-3">
                                    {selectedFormat.stock < 5 && selectedFormat.stock > 0 && (
                                        <span className="px-4 py-2 bg-red-600 rounded-lg text-sm font-medium">
                                            Only {selectedFormat.stock} left!
                                        </span>
                                    )}
                                    <span className="px-4 py-2 bg-zinc-800 rounded-lg text-sm border border-zinc-700">
                                        Limited Edition
                                    </span>
                                    <span className="px-4 py-2 bg-zinc-800 rounded-lg text-sm border border-zinc-700">
                                        {selectedFormat.stock > 0 ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <span className="text-2xl">-</span>
                                    </button>
                                    <span className="text-2xl font-bold w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= selectedFormat.stock}
                                        className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <span className="text-2xl">+</span>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart || selectedFormat.stock === 0}
                                    className="flex-1 bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isAddingToCart ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <ShoppingCart className="w-5 h-5" />
                                    )}
                                    {isAddingToCart ? "ADDING..." : `ADD TO CART - $${(selectedFormat.price * quantity).toFixed(2)}`}
                                </button>

                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`w-14 h-14 rounded-xl border-2 transition-all flex items-center justify-center ${isFavorite
                                        ? "bg-red-500 border-red-500"
                                        : "border-zinc-700 hover:border-zinc-600"
                                        }`}
                                >
                                    <Heart
                                        className={`w-6 h-6 ${isFavorite ? "fill-white" : ""}`}
                                    />
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="space-y-3 pt-4 border-t border-zinc-800">
                                <div className="flex items-center gap-3 text-sm">
                                    <Shield className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-300">
                                        Secure Checkout - SSL Encrypted
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CreditCard className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-300">
                                        Payment Options: Credit Card, PayPal, Apple Pay
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Truck className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-300">
                                        Free Shipping on orders over $50
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <RotateCcw className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-300">30-Day Return Policy</span>
                                </div>
                            </div>

                            {/* Accordion Sections */}
                            <div>
                                <AccordionSection title="Description" defaultOpen>
                                    <p>{product.description}</p>
                                </AccordionSection>

                                {product.tracks.length > 0 && (
                                    <AccordionSection title="Track list">
                                        <div className="space-y-2">
                                            {product.tracks.map((track, i) => (
                                                <div key={track.id} className="flex justify-between">
                                                    <span>
                                                        {i + 1}. {track.title}
                                                    </span>
                                                    <span className="text-gray-500">{track.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionSection>
                                )}

                                <AccordionSection title="Shipping & Returns">
                                    <p>
                                        Free standard shipping on orders over $50. Express and
                                        overnight shipping available. 30-day return policy for
                                        unopened items in original condition.
                                    </p>
                                </AccordionSection>

                                {product.technicalDetails && product.technicalDetails.length > 0 && (
                                    <AccordionSection title="Technical Details">
                                        <div className="space-y-2">
                                            {product.technicalDetails.map((detail, i) => (
                                                <div key={i} className="flex justify-between">
                                                    <span className="text-gray-400">{detail.label}:</span>
                                                    <span>{detail.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionSection>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </Section>
    );
};

// ==================== WRAPPER WITH PROVIDER ====================
export default function ProductDetail({ slug }: { slug: string }) {
    const { data: apiResponse, isLoading, isError } = useGetSingleProductQuery(slug);

    if (isLoading) {
        return (
            <div className="min-h-screen py-24 flex flex-col items-center justify-center bg-black">
                <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mb-4" />
                <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-medium">Retrieving product record...</p>
            </div>
        );
    }

    if (isError || !apiResponse) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Item Not Found</h2>
                    <p className="text-zinc-500">The requested product could not be located in our archives.</p>
                </div>
            </div>
        );
    }

    const apiProduct = apiResponse.data;

    // Map API data to UI-compatible Product interface
    const product: Product = {
        id: apiProduct.id,
        vendor: apiProduct.artist?.name || "Cian Collective",
        title: apiProduct.title,
        rating: 4.8, // Default
        reviewCount: 42, // Default
        testimonialCount: 18, // Default
        description: apiProduct.description,
        shippingInfo: apiProduct.shippingInfo,
        tracks: apiProduct.tracks?.map((t: any) => ({
            id: t.id,
            title: t.name,
            duration: t.duration,
            audioUrl: t.url
        })) || [],
        formats: [
            {
                id: "standard",
                type: "digital",
                name: apiProduct.productType || "Standard Edition",
                price: apiProduct.price,
                originalPrice: apiProduct.discountPrice,
                stock: apiProduct.stock,
                colors: apiProduct.colors || [],
            }
        ],
        technicalDetails: [
            { label: "Category", value: apiProduct.category },
            { label: "Type", value: apiProduct.productType },
            { label: "Release date", value: new Date(apiProduct.createdAt).toLocaleDateString() },
            { label: "Policy", value: apiProduct.returnPolicy || "Standard Return Policy" }
        ]
    };

    return (
        <ProductDetailSection product={product} apiProduct={apiProduct} />
    );
}
