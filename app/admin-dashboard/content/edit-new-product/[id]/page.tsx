
"use client";
import * as React from "react";
import { useState, useRef, ChangeEvent } from "react";
import { Upload, Plus, Trash2, X, Loader, AlertCircle, Play, Pause } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import {
    useGetSingleProductQuery,
    useUpdateSingleProductMutation,
} from "@/lib/api/adminApi";
import { useGetArtistsQuery } from "@/lib/api/commonApi";

interface Track {
    id: number | string;
    name: string;
    duration: string;
    url?: string;
    musicFile: File | null;
}

interface GalleryImage {
    id: number;
    url: string;
    file: File | null;
}

interface ColorVariant {
    id: number;
    color: string;
}

interface ValidationErrors {
    productTitle?: string;
    category?: string;
    artist?: string;
    price?: string;
    stockQuantity?: string;
    mainCoverImage?: string;
    tracks?: string;
}

export default function UpdateProductPage() {
    const [isUpdating, setIsUpdating] = useState(false);

    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string;

    if (!productId) throw new Error("Product ID is required for update page");

    const { data: singleProductRes } = useGetSingleProductQuery(productId);
    const { data: artistRes } = useGetArtistsQuery();
    const [updateProduct] = useUpdateSingleProductMutation();

    const [productTitle, setProductTitle] = useState("");
    const [category, setCategory] = useState("");
    const [selectedArtist, setSelectedArtist] = useState("");
    const [mainCoverImage, setMainCoverImage] = useState<string | null>(null);
    const [mainCoverFile, setMainCoverFile] = useState<File | null>(null);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [discountPrice, setDiscountPrice] = useState<number>(0);
    const [stockQuantity, setStockQuantity] = useState<number>(0);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<ColorVariant[]>([]);
    const [colorInput, setColorInput] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [shippingInfo, setShippingInfo] = useState("");
    const [returnPolicy, setReturnPolicy] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {}
    );
    const [showValidation, setShowValidation] = useState(false);

    const mainCoverRef = useRef<HTMLInputElement>(null);
    const galleryRef = useRef<HTMLInputElement>(null);


    React.useEffect(() => {
        if (!singleProductRes?.data) return;

        const p = singleProductRes.data;

        setProductTitle(p.title);
        setCategory(p.category);
        setSelectedArtist(p.artistId);
        setPrice(p.price);
        setDiscountPrice(p.discountPrice);
        setStockQuantity(p.stock);
        setProductDescription(p.description || "");
        setShippingInfo(p.shippingInfo || "");
        setReturnPolicy(p.returnPolicy || "");
        setSelectedSizes(p.sizes || []);

        setColors(
            (p.colors || []).map((c: string) => ({
                id: Date.now() + Math.random(),
                color: c,
            }))
        );

        setTracks(
            (p.tracks || []).map((t: any, index: number) => ({
                id: t.id || `track-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
                name: t.name || "",
                duration: t.duration || "0:00",
                url: t.url,
                musicFile: null,
            }))
        );

        setMainCoverImage(p.mainImage);
        setGalleryImages(
            (p.gallery || []).map((url: string) => ({
                id: Date.now() + Math.random(),
                url,
                file: null,
            }))
        );
    }, [singleProductRes]);


    const handleMainCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setMainCoverFile(file);
        setMainCoverImage(URL.createObjectURL(file));
    };

    const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imgs = files.map((f) => ({
            id: Date.now() + Math.random(),
            url: URL.createObjectURL(f),
            file: f,
        }));
        setGalleryImages((prev) => [...prev, ...imgs]);
    };

    const removeGalleryImage = (id: number) =>
        setGalleryImages((prev) => prev.filter((img) => img.id !== id));

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleMusicFileChange = (
        trackId: number | string,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Extract duration
        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
            const formatted = formatDuration(audio.duration);
            setTracks((prev) =>
                prev.map((t) => (t.id === trackId ? { ...t, musicFile: file, duration: formatted } : t))
            );
            URL.revokeObjectURL(audio.src);
        };
    };

    const addTrack = () =>
        setTracks((prev) => [
            ...prev,
            {
                id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: "",
                duration: "",
                musicFile: null
            },
        ]);
    const removeTrack = (id: number | string) =>
        setTracks((prev) => prev.filter((t) => t.id !== id));

    const updateTrack = (id: number | string, field: "name" | "duration", value: string) =>
        setTracks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
        );

    const togglePlay = (track: Track) => {
        if (currentTrack?.id === track.id) {
            if (audioRef.current) {
                if (isPlaying) {
                    audioRef.current.pause();
                } else {
                    audioRef.current.play().catch(console.error);
                }
            }
        } else {
            setCurrentTrack(track);
        }
    };

    React.useEffect(() => {
        if (currentTrack && audioRef.current) {
            const url = currentTrack.musicFile ? URL.createObjectURL(currentTrack.musicFile) : currentTrack.url;
            if (url) {
                audioRef.current.src = url;
                audioRef.current.play().catch(err => {
                    console.error("Playback failed:", err);
                    setIsPlaying(false);
                });
                setIsPlaying(true);
            }
        }
    }, [currentTrack]);

    const toggleSize = (size: string) =>
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );

    const addColor = () => {
        if (!colorInput.trim()) return;
        setColors((prev) => [...prev, { id: Date.now(), color: colorInput }]);
        setColorInput("");
    };

    const removeColor = (id: number) =>
        setColors((prev) => prev.filter((c) => c.id !== id));
    const handleColorKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addColor();
        }
    };

    const handleUpdate = async () => {
        const errors: ValidationErrors = {};

        if (!productTitle.trim()) errors.productTitle = "Title is required";
        if (!category.trim()) errors.category = "Category is required";
        if (!selectedArtist) errors.artist = "Artist is required";
        if (price <= 0) errors.price = "Price must be greater than 0";
        if (stockQuantity < 0) errors.stockQuantity = "Stock must be >= 0";
        if (!mainCoverImage) errors.mainCoverImage = "Main cover is required";
        if (tracks.length === 0) errors.tracks = "At least 1 track required";

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            setShowValidation(true);
            return;
        }

        setIsUpdating(true);

        const formData = new FormData();
        const data = {
            title: productTitle,
            category: category,
            artistId: selectedArtist,
            price: Number(price),
            discountPrice: Number(discountPrice),
            stock: Number(stockQuantity),
            description: productDescription,
            shippingInfo: shippingInfo,
            returnPolicy: returnPolicy,
        };

        formData.append("data", JSON.stringify(data));

        mainCoverFile && formData.append("mainImage", mainCoverFile);
        galleryImages.forEach(
            (img) => img.file && formData.append("gallery", img.file)
        );

        tracks.forEach((track, idx) => {
            track.musicFile && formData.append(`trackFiles`, track.musicFile);
        });

        colors.forEach((c, idx) => formData.append(`colors[${idx}]`, c.color));
        selectedSizes.forEach((s, idx) => formData.append(`sizes[${idx}]`, s));

        try {
            console.log("=== FormData Contents ===");
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: File { name: ${value.name}, size: ${value.size} }`);
                } else {
                    console.log(`${key}:`, value);
                }
            }
            console.log("=========================");

            await updateProduct({ id: productId, body: formData }).unwrap();
            router.back();
        } catch (err) {
            console.error("Failed to update product:", err);
        } finally {
            setIsUpdating(false);
        }
    };


    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-7xl mx-auto">
                {/* Left Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Product Title *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product title"
                                        value={productTitle}
                                        onChange={(e) => setProductTitle(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500"
                                    />
                                </div>

                                {/* Category selector */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            if (showValidation) {
                                                setValidationErrors((prev) => ({
                                                    ...prev,
                                                    category: undefined,
                                                }));
                                            }
                                        }}
                                        className={`w-full px-4 py-2.5 border ${validationErrors.category
                                            ? "border-red-500"
                                            : "border-neutral-700"
                                            } bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500`}
                                    >
                                        <option value="" disabled className="text-neutral-500">
                                            Select category
                                        </option>
                                        <option value="vinyl">Vinyl Records</option>
                                        <option value="cd">CDs</option>
                                        <option value="cassette">Cassettes</option>
                                        <option value="digital">Digital Downloads</option>
                                        <option value="merchandise">Merchandise</option>
                                        <option value="apparel">Apparel</option>
                                        <option value="posters">Posters & Prints</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="collectibles">Collectibles</option>
                                        <option value="instruments">Instruments</option>
                                        <option value="equipment">Audio Equipment</option>
                                        <option value="books">Books & Magazines</option>
                                    </select>
                                    {validationErrors.category && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {validationErrors.category}
                                        </p>
                                    )}
                                </div>

                                {/* Artist selector */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Artist *
                                    </label>
                                    <select
                                        value={selectedArtist}
                                        onChange={(e) => {
                                            setSelectedArtist(e.target.value);
                                            if (showValidation) {
                                                setValidationErrors((prev) => ({
                                                    ...prev,
                                                    artist: undefined,
                                                }));
                                            }
                                        }}
                                        className={`w-full px-4 py-2.5 border ${validationErrors.artist
                                            ? "border-red-500"
                                            : "border-neutral-700"
                                            } bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500`}
                                    >
                                        <option value="" disabled className="text-neutral-500">
                                            Select artist
                                        </option>
                                        {artistRes?.data?.map((artist: any) => (
                                            <option key={artist.id} value={artist.id}>
                                                {artist.name}
                                            </option>
                                        ))}
                                    </select>
                                    {validationErrors.artist && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {validationErrors.artist}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">
                                Media Upload
                            </h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Main Cover image *
                                </label>
                                <input
                                    ref={mainCoverRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMainCoverChange}
                                    className="hidden"
                                />
                                <div
                                    onClick={() => mainCoverRef.current?.click()}
                                    className="w-full h-48 border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 overflow-hidden transition-colors"
                                >
                                    {mainCoverImage ? (
                                        <img
                                            src={mainCoverImage}
                                            alt="Main Cover"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                                            <span className="text-sm text-neutral-500">
                                                Upload Image
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Product Gallery
                                </label>
                                <input
                                    ref={galleryRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleGalleryChange}
                                    className="hidden"
                                />
                                <div className="grid grid-cols-5 gap-2">
                                    {galleryImages.map((img) => (
                                        <div key={img.id} className="relative group">
                                            <div className="w-full h-20 border border-neutral-700 rounded-lg overflow-hidden bg-neutral-800">
                                                <img
                                                    src={img.url}
                                                    alt="Gallery"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeGalleryImage(img.id)}
                                                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    <div
                                        onClick={() => galleryRef.current?.click()}
                                        className="w-full h-20 border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 transition-colors"
                                    >
                                        <Upload className="w-5 h-5 text-neutral-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Music Tracks */}
                        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-white">
                                    Music (Track list) *
                                </h2>
                                <button
                                    onClick={addTrack}
                                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                                >
                                    <Plus className="w-4 h-4" /> Add New
                                </button>
                            </div>
                            <div className="space-y-3">
                                {tracks.map((track) => (
                                    <div
                                        key={track.id}
                                        className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700/50 hover:border-neutral-600 transition-all group"
                                    >
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            <div className="col-span-1">
                                                <div className="relative w-10 h-10">
                                                    <button
                                                        onClick={() => togglePlay(track)}
                                                        className={`w-full h-full flex items-center justify-center rounded-full transition-all duration-300 shadow-lg ${currentTrack?.id === track.id && isPlaying
                                                            ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                                                            : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20"
                                                            }`}
                                                    >
                                                        {currentTrack?.id === track.id && isPlaying ? (
                                                            <Pause className="w-5 h-5 fill-white" />
                                                        ) : (
                                                            <Play className="w-5 h-5 fill-white ml-0.5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <input
                                                    type="text"
                                                    placeholder="Track Name"
                                                    value={track.name}
                                                    onChange={(e) =>
                                                        updateTrack(track.id, "name", e.target.value)
                                                    }
                                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-neutral-500 text-sm font-medium"
                                                />
                                            </div>
                                            <div className="col-span-2 text-center">
                                                <input
                                                    type="text"
                                                    placeholder="0:00"
                                                    value={track.duration}
                                                    onChange={(e) =>
                                                        updateTrack(track.id, "duration", e.target.value)
                                                    }
                                                    className="w-full bg-transparent border-none text-center text-neutral-400 focus:ring-0 text-sm font-mono"
                                                />
                                            </div>
                                            <div className="col-span-4 flex items-center gap-3">
                                                <input
                                                    type="file"
                                                    accept="audio/*"
                                                    onChange={(e) => handleMusicFileChange(track.id, e)}
                                                    id={`music-${track.id}`}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor={`music-${track.id}`}
                                                    className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-xs rounded-lg cursor-pointer transition flex items-center justify-center gap-2"
                                                >
                                                    <Upload className="w-3.5 h-3.5" />
                                                    {track.musicFile ? track.musicFile.name : (track.url ? "Change Audio" : "Upload File")}
                                                </label>
                                            </div>
                                            <div className="col-span-1 flex justify-end">
                                                <button
                                                    onClick={() => removeTrack(track.id)}
                                                    className="p-2 text-neutral-500 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {currentTrack && (
                                    <div className="mt-4 p-4 bg-zinc-800 rounded-xl border border-zinc-700 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                            {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white text-sm font-semibold truncate max-w-[200px]">{currentTrack.name || "Unknown Track"}</div>
                                            <div className="text-zinc-500 text-xs">{currentTrack.duration}</div>
                                        </div>
                                        <button
                                            onClick={() => togglePlay(currentTrack)}
                                            className="p-2 text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-zinc-500 font-mono">Preview Mode</span>
                                        </div>
                                    </div>
                                )}
                                {/* Keep audio element always in DOM to ensure ref is available */}
                                <audio
                                    ref={audioRef}
                                    className="hidden"
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onEnded={() => setIsPlaying(false)}
                                />
                            </div>
                        </div>


                        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">
                                Product Variants
                            </h2>
                            {/* Sizes */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Size
                                </label>
                                <div className="flex gap-2">
                                    {["S", "M", "L", "XL"].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => toggleSize(size)}
                                            className={`px-4 py-2 border rounded-lg transition-colors ${selectedSizes.includes(size)
                                                ? "bg-blue-500 border-blue-500 text-white"
                                                : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Colors */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter color name"
                                    value={colorInput}
                                    onChange={(e) => setColorInput(e.target.value)}
                                    onKeyPress={handleColorKeyPress}
                                    className="w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500"
                                />
                                <p className="text-xs text-neutral-500 mt-1">
                                    Press Enter to add a color
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {colors.map((color) => (
                                        <div
                                            key={color.id}
                                            className="flex items-center gap-1 px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-full"
                                        >
                                            <span className="text-sm text-white">{color.color}</span>
                                            <button
                                                onClick={() => removeColor(color.id)}
                                                className="text-neutral-400 hover:text-red-400"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">
                                Pricing & Inventory
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Price *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Discount Price
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={discountPrice}
                                        onChange={(e) => setDiscountPrice(Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Stock Quantity *
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={stockQuantity}
                                        onChange={(e) => setStockQuantity(Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Descriptions */}
                        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">
                                Descriptions
                            </h2>
                            <textarea
                                placeholder="Product Description"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-neutral-500 mb-3"
                            />
                            <textarea
                                placeholder="Shipping Information"
                                value={shippingInfo}
                                onChange={(e) => setShippingInfo(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-neutral-500 mb-3"
                            />
                            <textarea
                                placeholder="Return Policy"
                                value={returnPolicy}
                                onChange={(e) => setReturnPolicy(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-neutral-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Update Button */}
                <div className="flex justify-end mt-6 gap-4">
                    <button
                        onClick={() => router.back()}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" /> Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm ${isUpdating ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                    >
                        {isUpdating ? (
                            <p className="flex items-center gap-2">
                                <Loader className="w-4 h-4 animate-spin" /> Update Product
                            </p>
                        ) : (
                            "Update Product"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
