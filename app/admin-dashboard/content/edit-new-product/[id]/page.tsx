/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import * as React from "react";
import { useState, useRef, ChangeEvent } from "react";
import { Upload, Plus, Trash2, X, Loader, AlertCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import {
    useGetSingleProductQuery,
    useUpdateSingleProductMutation,
} from "@/lib/api/adminApi";
import { useGetArtistsQuery } from "@/lib/api/commonApi";

interface Track {
    id: number;
    name: string;
    duration: string;
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
            (p.tracks || []).map((t: any) => ({
                id: Date.now() + Math.random(),
                name: t.name,
                duration: t.duration,
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

    const handleMusicFileChange = (
        trackId: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setTracks((prev) =>
            prev.map((t) => (t.id === trackId ? { ...t, musicFile: file } : t))
        );
    };

    const addTrack = () =>
        setTracks((prev) => [
            ...prev,
            { id: Date.now(), name: "", duration: "", musicFile: null },
        ]);
    const removeTrack = (id: number) =>
        setTracks((prev) => prev.filter((t) => t.id !== id));
    const updateTrack = (id: number, field: "name" | "duration", value: string) =>
        setTracks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
        );

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
            track.musicFile && formData.append(`tracks`, track.musicFile);
            formData.append(`trackNames[${idx}]`, track.name);
            formData.append(`trackDurations[${idx}]`, track.duration);
        });

        colors.forEach((c, idx) => formData.append(`colors[${idx}]`, c.color));
        selectedSizes.forEach((s, idx) => formData.append(`sizes[${idx}]`, s));

        try {
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
                                        className="grid grid-cols-12 gap-2 items-end"
                                    >
                                        <div className="col-span-5">
                                            <label className="block text-xs text-neutral-400 mb-1">
                                                Track Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter track name"
                                                value={track.name}
                                                onChange={(e) =>
                                                    updateTrack(track.id, "name", e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500 text-sm"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <label className="block text-xs text-neutral-400 mb-1">
                                                Duration
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="3:45"
                                                value={track.duration}
                                                onChange={(e) =>
                                                    updateTrack(track.id, "duration", e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500 text-sm"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <label className="block text-xs text-neutral-400 mb-1">
                                                Upload Music
                                            </label>
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                onChange={(e) => handleMusicFileChange(track.id, e)}
                                                id={`music-${track.id}`}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={`music-${track.id}`}
                                                className="w-full h-9 border border-neutral-700 bg-neutral-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-700"
                                            >
                                                {track.musicFile ? (
                                                    <span className="text-xs text-neutral-300 truncate px-2">
                                                        {track.musicFile.name}
                                                    </span>
                                                ) : (
                                                    <Upload className="w-4 h-4 text-neutral-400" />
                                                )}
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-baseline">
                                            <button
                                                onClick={() => removeTrack(track.id)}
                                                className="w-9 h-9 border border-neutral-700 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-400 hover:border-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
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
