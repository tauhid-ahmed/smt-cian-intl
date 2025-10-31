"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
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
} from "lucide-react";

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
  technicalDetails?: TechnicalDetail[];
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

interface MusicPlayerContextType {
  currentTrackId: string | null;
  isPlaying: boolean;
  playTrack: (trackId: string) => void;
  pauseTrack: () => void;
  toggleTrack: (trackId: string) => void;
}

// ==================== MUSIC PLAYER CONTEXT ====================
const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

const MusicPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const toggleTrack = (trackId: string) => {
    if (currentTrackId === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      playTrack(trackId);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{ currentTrackId, isPlaying, playTrack, pauseTrack, toggleTrack }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  }
  return context;
};

// ==================== COMPONENTS ====================
const StarRating = ({ rating, count }: { rating: number; count: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
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

const TrackListItem = ({ track, index }: { track: Track; index: number }) => {
  const { currentTrackId, isPlaying, toggleTrack } = useMusicPlayer();
  const isCurrentTrack = currentTrackId === track.id;
  const isTrackPlaying = isCurrentTrack && isPlaying;

  return (
    <div className="flex items-center justify-between py-3 hover:bg-zinc-900 px-4 rounded-lg transition-colors group">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => toggleTrack(track.id)}
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
            className={`text-white ${
              isCurrentTrack ? "text-yellow-500 font-medium" : ""
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
          className={`w-8 h-8 rounded-full border-2 transition-all ${
            selected === color ? "border-white scale-110" : "border-gray-700"
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
const ProductDetailSection = ({ product }: { product: Product }) => {
  const [selectedFormat, setSelectedFormat] = useState(product.formats[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.formats[0].colors?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT SIDE - Image Gallery & Track Preview */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                [Product Image]
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 overflow-x-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  className="w-20 h-20 bg-zinc-900 rounded-lg flex-shrink-0 hover:ring-2 hover:ring-white transition-all"
                >
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">
                    {i}
                  </div>
                </button>
              ))}
            </div>

            {/* Track Preview */}
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
                  />
                ))}
              </div>
            </div>
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
              <h3 className="font-semibold">Formate Selection</h3>

              {product.formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleFormatChange(format)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    selectedFormat.id === format.id
                      ? "border-white bg-zinc-900"
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{format.name}</span>
                    {format.badge && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          format.badgeColor === "red"
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
                {selectedFormat.badge && (
                  <span className="px-4 py-2 bg-red-600 rounded-lg text-sm font-medium">
                    {selectedFormat.badge}
                  </span>
                )}
                <span className="px-4 py-2 bg-zinc-800 rounded-lg text-sm border border-zinc-700">
                  Limited Edition
                </span>
                <span className="px-4 py-2 bg-zinc-800 rounded-lg text-sm border border-zinc-700">
                  In Stock
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
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
              <button className="flex-1 bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                ADD TO CART - ${(selectedFormat.price * quantity).toFixed(2)}
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-14 h-14 rounded-xl border-2 transition-all flex items-center justify-center ${
                  isFavorite
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

            {/* Payment Options */}
            <div className="pt-4">
              <p className="text-sm text-gray-400 mb-2">
                Or pay in 4 interest-free payments of $
                {(selectedFormat.price / 4).toFixed(2)}
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-zinc-800 rounded-lg text-xs border border-zinc-700">
                  Affirm
                </span>
                <span className="px-3 py-1 bg-zinc-800 rounded-lg text-xs border border-zinc-700">
                  Afterpay
                </span>
                <span className="px-3 py-1 bg-zinc-800 rounded-lg text-xs border border-zinc-700">
                  Klarna
                </span>
              </div>
            </div>

            {/* Accordion Sections */}
            <div>
              <AccordionSection title="Description" defaultOpen>
                <p>{product.description}</p>
              </AccordionSection>

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

              <AccordionSection title="Shipping & Returns">
                <p>
                  Free standard shipping on orders over $50. Express and
                  overnight shipping available. 30-day return policy for
                  unopened items in original condition.
                </p>
              </AccordionSection>

              <AccordionSection title="Technical Details">
                <div className="space-y-2">
                  {product.technicalDetails?.map((detail, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-400">{detail.label}:</span>
                      <span>{detail.value}</span>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== DEFAULT DATA ====================
const defaultProduct: Product = {
  id: "1",
  vendor: "Elevation Collective",
  title: "Echoes of Grace - Deluxe Edition",
  rating: 4,
  reviewCount: 150,
  testimonialCount: 45,
  formats: [
    {
      id: "vinyl",
      type: "vinyl",
      name: "Vinyl Record",
      price: 29.99,
      colors: ["white", "red", "blue"],
      stock: 3,
      badge: "Only 3 left!",
      badgeColor: "red",
    },
    {
      id: "cd",
      type: "cd",
      name: "CD",
      price: 14.99,
      stock: 50,
    },
    {
      id: "digital",
      type: "digital",
      name: "Digital Download",
      price: 9.99,
      stock: 999,
    },
    {
      id: "bundle",
      type: "bundle",
      name: "Bundle (Vinyl + Digital)",
      price: 34.99,
      originalPrice: 39.98,
      colors: ["white", "red", "blue"],
      stock: 10,
      badge: "Save $5",
    },
  ],
  tracks: [
    { id: "1", title: "Midnight Dreams", duration: "4:23" },
    { id: "2", title: "Electric Sunset", duration: "3:45" },
    { id: "3", title: "Neon Nights", duration: "5:12" },
    { id: "4", title: "City Lights", duration: "4:01" },
    { id: "5", title: "Starfall", duration: "3:58" },
  ],
  description:
    'Experience the powerful worship album "Echoes of Grace - Deluxe Edition" by Elevation Collective. This critically acclaimed collection features 12 tracks full of inspiring contemporary Christian music that has touched hearts worldwide. Recorded over 18 months in Nashville, Tennessee, this album represents a spiritual journey filled with messages of hope, redemption, and divine love. Each track pays meticulous attention to both musical excellence and lyrical depth, creating an immersive worship experience.',
  technicalDetails: [
    { label: "Format", value: "Vinyl LP" },
    { label: "Label", value: "Elevation Records" },
    { label: "Release Date", value: "March 15, 2024" },
    { label: "Genre", value: "Contemporary Christian" },
    { label: "Total Runtime", value: "52:18" },
  ],
};

// ==================== WRAPPER WITH PROVIDER ====================
export default function ProductDetail() {
  return (
    <MusicPlayerProvider>
      <ProductDetailSection product={defaultProduct} />
    </MusicPlayerProvider>
  );
}
