/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { useState, useRef, ChangeEvent, DragEvent } from "react";
import {
  Upload,
  Plus,
  Trash2,
  X,
  AlertCircle,
  Loader,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useAddProductMutation } from "@/lib/api/adminApi";
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
  file: File;
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
  selectedSizes?: string;
  colors?: string;
  tracks?: string;
}

export default function AddNewProduct() {
  const router = useRouter();
  // ✅ Loader state for publish button
  const [isPublishing, setIsPublishing] = useState(false);

  // Basic Info
  const [productTitle, setProductTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");

  // Media Upload
  const [mainCoverImage, setMainCoverImage] = useState<string | null>(null);
  const [mainCoverFile, setMainCoverFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  // Pricing & Inventory
  const [price, setPrice] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<string>("");

  // Music (Track list)
  const [songs, setSongs] = useState<File[]>([]);

  const [tracks, setTracks] = useState<Track[]>([]);

  // Product Variants
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<ColorVariant[]>([]);
  const [colorInput, setColorInput] = useState<string>("");

  // Descriptions
  const [productDescription, setProductDescription] = useState<string>("");
  const [shippingInfo, setShippingInfo] = useState<string>("");
  const [returnPolicy, setReturnPolicy] = useState<string>("");

  // Validation
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [showValidation, setShowValidation] = useState<boolean>(false);

  // Refs
  const mainCoverRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  // Validation function

  // Main Cover Image Handlers
  const handleMainCoverChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setMainCoverFile(file);
      setMainCoverImage(URL.createObjectURL(file));
      if (showValidation) {
        setValidationErrors((prev) => ({ ...prev, mainCoverImage: undefined }));
      }
    }
  };

  const handleMainCoverDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setMainCoverFile(file);
      setMainCoverImage(URL.createObjectURL(file));
      if (showValidation) {
        setValidationErrors((prev) => ({ ...prev, mainCoverImage: undefined }));
      }
    }
  };

  // Gallery Handlers
  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    const newImages: GalleryImage[] = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file: file,
    }));

    setGalleryImages([...galleryImages, ...newImages]);
  };

  const handleGalleryDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    const newImages: GalleryImage[] = files
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        file: file,
      }));

    setGalleryImages([...galleryImages, ...newImages]);
  };

  const removeGalleryImage = (id: number): void => {
    setGalleryImages(galleryImages.filter((img) => img.id !== id));
  };

  // Track Handlers
  const addTrack = (): void => {
    setTracks([
      ...tracks,
      { id: Date.now(), name: "", duration: "", musicFile: null },
    ]);
  };

  const removeTrack = (id: number): void => {
    if (tracks.length > 1) {
      setTracks(tracks.filter((track) => track.id !== id));
    }
  };

  const updateTrack = (
    id: number,
    field: keyof Track,
    value: string | File
  ): void => {
    setTracks(
      tracks.map((track) =>
        track.id === id ? { ...track, [field]: value } : track
      )
    );
    console.log(tracks);
    if (showValidation) {
      setValidationErrors((prev) => ({ ...prev, tracks: undefined }));
    }
  };

  const handleMusicFileChange = (
    trackId: number,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      updateTrack(trackId, "musicFile", file);
      setSongs([...songs, file]);
    }
  };

  // Size Handlers
  const toggleSize = (size: string): void => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Color Handlers
  const addColor = (): void => {
    if (colorInput.trim()) {
      setColors([...colors, { id: Date.now(), color: colorInput.trim() }]);
      setColorInput("");
    }
  };

  const removeColor = (id: number): void => {
    setColors(colors.filter((c) => c.id !== id));
  };

  const handleColorKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addColor();
    }
  };

  const [addProduct, { data, error, isLoading }] = useAddProductMutation();
  const { data: artistRes } = useGetArtistsQuery();

  const handlePublish = async () => {
    setShowValidation(true);

    // ✅ Start loader
    setIsPublishing(true);

    // Validate required fields

    const errors: ValidationErrors = {};
    if (!productTitle.trim()) errors.productTitle = "Product title is required";
    if (!category.trim()) errors.category = "Category is required";
    if (!price || isNaN(Number(price)))
      errors.price = "Price is required and must be a number";
    if (!stockQuantity || isNaN(Number(stockQuantity)))
      errors.stockQuantity = "Stock quantity is required and must be a number";
    if (!mainCoverFile) errors.mainCoverImage = "Main cover image is required";
    if (tracks.length === 0) errors.tracks = "At least one track is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);

      // ✅ Stop loader on validation error
      setIsPublishing(false);
      return;
    }

    if (!selectedArtist) {
      errors.artist = "Artist is required";
    }

    try {
      const formData = new FormData();

      const data = {
        title: productTitle.trim(),
        category: category.trim(),
        artistId: selectedArtist,
        price: Number(price),
        discountPrice: Number(discountPrice),
        stock: Number(stockQuantity),
        description: productDescription.trim(),
        shippingInfo: shippingInfo.trim(),
        returnPolicy: returnPolicy.trim(),
        sizes: selectedSizes,
        colors: colors.map((c) => c.color),
        tracks: tracks.map((t) => ({
          name: t.name,
          duration: t.duration,
        })),
      };

      if (mainCoverFile) {
        formData.append("mainImage", mainCoverFile);
      }

      const dataString = JSON.stringify(data);

      formData.append("data", dataString);

      songs.forEach((items: File) => {
        formData.append(`trackFiles`, items);
      });

      galleryImages.forEach((item: GalleryImage) => {
        formData.append(`gallery`, item.file);
        console.log(item.file);
      });

      const result = await addProduct(formData).unwrap();
      console.log("Product data:", data);
      console.log("FormData keys:", Array.from(formData.keys()));
      console.log("Result:", result);
      router.back();
    } catch (err: unknown) {
      alert(`❌ Error: ${err}`);
    } finally {
      // ✅ Stop loader after API finishes
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Add New Product</h1>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
              className="px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg"
            >
              <option value="">Select Artist</option>

              {artistRes?.data?.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>

            {validationErrors.artist && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.artist}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Product Title & Category */}
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
                    onChange={(e) => {
                      setProductTitle(e.target.value);
                      if (showValidation) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          productTitle: undefined,
                        }));
                      }
                    }}
                    className={`w-full px-4 py-2.5 border ${
                      validationErrors.productTitle
                        ? "border-red-500"
                        : "border-neutral-700"
                    } bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500`}
                  />
                  {validationErrors.productTitle && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.productTitle}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category"
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
                    className={`w-full px-4 py-2.5 border ${
                      validationErrors.category
                        ? "border-red-500"
                        : "border-neutral-700"
                    } bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500`}
                  />
                  {validationErrors.category && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.category}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Media Upload
              </h2>

              {/* Main Cover Image */}
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
                  onDrop={handleMainCoverDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={`w-full h-48 border-2 border-dashed ${
                    validationErrors.mainCoverImage
                      ? "border-red-500"
                      : "border-neutral-700"
                  } rounded-lg flex items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 overflow-hidden transition-colors`}
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
                {validationErrors.mainCoverImage && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors.mainCoverImage}
                  </p>
                )}
              </div>

              {/* Product Gallery */}
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
                    onDrop={handleGalleryDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="w-full h-20 border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-neutral-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Music (Track list) */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Music (Track list) *
                </h2>
                <button
                  onClick={addTrack}
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                >
                  <Plus className="w-4 h-4" />
                  Add New
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
                            {track.musicFile?.name || "File selected"}
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
              {validationErrors.tracks && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.tracks}
                </p>
              )}
            </div>

            {/* Product Variants */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Product Variants
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Size
                  </label>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          selectedSizes.includes(size)
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

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
                        <span className="text-sm text-white">
                          {color.color}
                        </span>
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
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pricing & Inventory */}
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
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      if (showValidation) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          price: undefined,
                        }));
                      }
                    }}
                    className={`w-full px-4 py-2.5 border ${
                      validationErrors.price
                        ? "border-red-500"
                        : "border-neutral-700"
                    } bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500`}
                  />
                  {validationErrors.price && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.price}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Discount Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
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
                    placeholder="0"
                    value={stockQuantity}
                    onChange={(e) => {
                      setStockQuantity(e.target.value);
                      if (showValidation) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          stockQuantity: undefined,
                        }));
                      }
                    }}
                    className={`w-full px-4 py-2.5 border ${
                      validationErrors.stockQuantity
                        ? "border-red-500"
                        : "border-neutral-700"
                    } bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-500`}
                  />
                  {validationErrors.stockQuantity && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.stockQuantity}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Descriptions
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Product Description
                  </label>
                  <textarea
                    placeholder="Describe the product in detail..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Shipping Information
                  </label>
                  <textarea
                    placeholder="Enter shipping details and estimated delivery times..."
                    value={shippingInfo}
                    onChange={(e) => setShippingInfo(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Return Policy
                  </label>
                  <textarea
                    placeholder="Specify return policy and conditions..."
                    value={returnPolicy}
                    onChange={(e) => setReturnPolicy(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-neutral-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={() => router.back()}
            className="bg-yellow-400 hover:bg-yellow-500  text-black font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            Cancel
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing} // ✅ disable button while loading
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm"
          >
            {isPublishing ? (
              // ✅ Loader icon with Tailwind animate-spin
              <Loader className="w-4 h-4 animate-spin text-black" />
            ) : (
              <Loader className="w-4 h-4" />
            )}
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
}
