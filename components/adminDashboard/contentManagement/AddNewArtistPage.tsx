/* eslint-disable @next/next/no-img-element */
/* eslint-disable prefer-const */
"use client";
import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { useForm } from "react-hook-form";
import {
    Upload,
    X,
    CircleCheckBig,
    TicketX,
    Loader,
    AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddArtistMutation } from "@/lib/api/adminApi";
import toast from "react-hot-toast";


const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
        </div>
    );
};



interface GalleryPhoto {
    id: number;
    url: string;
    file: File;
}

interface FormData {
    artistName: string;
    spotifyUrl: string;
    appleMusicUrl: string;
    youtubeUrl: string;
    numberOfFans: string;
    birthPlace: string;
    yearsActive: string;
    awards: string;
    instagramLink: string;
    twitterLink: string;
    tiktokLink: string;
    biography: string;
    website: string;
}

export default function AddNewArtist() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            artistName: "",
            spotifyUrl: "",
            appleMusicUrl: "",
            youtubeUrl: "",
            numberOfFans: "",
            birthPlace: "",
            yearsActive: "",
            awards: "",
            instagramLink: "",
            twitterLink: "",
            tiktokLink: "",
            biography: "",
            website: "",
        }
    });

    const [heroBanner, setHeroBanner] = useState<string | null>(null);
    const [heroBannerFile, setHeroBannerFile] = useState<File | null>(null);
    const [artistPhoto, setArtistPhoto] = useState<string | null>(null);
    const [artistPhotoFile, setArtistPhotoFile] = useState<File | null>(null);
    const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);

    const heroBannerRef = useRef<HTMLInputElement>(null);
    const artistPhotoRef = useRef<HTMLInputElement>(null);
    const galleryRef = useRef<HTMLInputElement>(null);

    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    const handleHeroBannerChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setHeroBannerFile(file);
            setHeroBanner(URL.createObjectURL(file));
        }
    };

    const handleHeroBannerDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setHeroBannerFile(file);
            setHeroBanner(URL.createObjectURL(file));
        }
    };

    const handleArtistPhotoChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setArtistPhotoFile(file);
            setArtistPhoto(URL.createObjectURL(file));
        }
    };

    const handleArtistPhotoDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setArtistPhotoFile(file);
            setArtistPhoto(URL.createObjectURL(file));
        }
    };

    const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(e.target.files || []);
        const newPhotos: GalleryPhoto[] = files.map((file) => ({
            id: Date.now() + Math.random(),
            url: URL.createObjectURL(file),
            file: file,
        }));
        setGalleryPhotos([...galleryPhotos, ...newPhotos]);
    };

    const handleGalleryDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files || []);
        const newPhotos: GalleryPhoto[] = files
            .filter((file) => file.type.startsWith("image/"))
            .map((file) => ({
                id: Date.now() + Math.random(),
                url: URL.createObjectURL(file),
                file: file,
            }));
        setGalleryPhotos([...galleryPhotos, ...newPhotos]);
    };

    const removeGalleryPhoto = (id: number): void => {
        setGalleryPhotos(galleryPhotos.filter((photo) => photo.id !== id));
    };

    const [addArtist, { isLoading, isSuccess, error, isError }] = useAddArtistMutation();

    const onSubmit = async (formData: FormData): Promise<void> => {
        const data = new FormData();

        const artistData = {
            name: formData.artistName,
            bio: formData.biography,
            location: formData.birthPlace,
            website: formData.website || "https://www.cian-collection.com",
            spotify: formData.spotifyUrl,
            appleMusic: formData.appleMusicUrl,
            youtube: formData.youtubeUrl,
            instagram: formData.instagramLink,
            twitter: formData.twitterLink,
            tiktok: formData.tiktokLink,
            activeYearsStart: new Date(formData.yearsActive).toISOString(),
            awards: Number(formData.awards),
        };

        data.append("data", JSON.stringify(artistData));

        if (heroBannerFile) {
            data.append("banner", heroBannerFile);
        }

        if (artistPhotoFile) {
            data.append("image", artistPhotoFile);
        }

        const behindGalleryPhotos = galleryPhotos.filter(photo =>
            photo.file.type.startsWith("image/")
        );

        behindGalleryPhotos.forEach(photo => {
            data.append("behindGallery", photo.file);
        });

        try {
            await addArtist(data).unwrap();
        } catch (error) {
            console.error("Failed to add artist:", error);
        }
    };

    if (isSuccess) {
        toast.success('Artist added successfully!');
        router.back();
    }



    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-white">
                            Add New Artist page
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Header Section
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Artist Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter artist name"
                                    {...register("artistName", {
                                        required: "Artist name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Artist name must be at least 2 characters"
                                        }
                                    })}
                                    className={`w-full px-4 py-2.5 border ${errors.artistName ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500`}
                                />
                                <ErrorMessage message={errors.artistName?.message} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Hero Banner <span className="text-red-500">*</span>
                                </label>
                                <input
                                    ref={heroBannerRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleHeroBannerChange}
                                    className="hidden"
                                />
                                <div
                                    onClick={() => heroBannerRef.current?.click()}
                                    onDrop={handleHeroBannerDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => e.preventDefault()}
                                    className={`w-full h-40 border-2 border-dashed ${!heroBanner ? 'border-neutral-700' : 'border-green-500'} rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 overflow-hidden transition-colors`}
                                >
                                    {heroBanner ? (
                                        <img
                                            src={heroBanner}
                                            alt="Hero Banner"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                                            <span className="text-sm text-neutral-500">Upload hero banner image</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Spotify URL
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://open.spotify.com/artist..."
                                        {...register("spotifyUrl", {
                                            pattern: {
                                                value: urlPattern,
                                                message: "Please enter a valid URL"
                                            }
                                        })}
                                        className={`w-full px-4 py-2.5 border ${errors.spotifyUrl ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-sm`}
                                    />
                                    <ErrorMessage message={errors.spotifyUrl?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Apple Music URL
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://music.apple.com/artist..."
                                        {...register("appleMusicUrl", {
                                            pattern: {
                                                value: urlPattern,
                                                message: "Please enter a valid URL"
                                            }
                                        })}
                                        className={`w-full px-4 py-2.5 border ${errors.appleMusicUrl ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-sm`}
                                    />
                                    <ErrorMessage message={errors.appleMusicUrl?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        YouTube URL
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://youtube.com/@..."
                                        {...register("youtubeUrl", {
                                            pattern: {
                                                value: urlPattern,
                                                message: "Please enter a valid URL"
                                            }
                                        })}
                                        className={`w-full px-4 py-2.5 border ${errors.youtubeUrl ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-sm`}
                                    />
                                    <ErrorMessage message={errors.youtubeUrl?.message} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Stats Section
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Number of Fans
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., 1000000"
                                {...register("numberOfFans", {
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Please enter a valid number"
                                    }
                                })}
                                className={`w-48 px-4 py-2.5 border ${errors.numberOfFans ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500`}
                            />
                            <ErrorMessage message={errors.numberOfFans?.message} />
                        </div>
                    </div>

                    <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Biography Section
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Artist Photo <span className="text-red-500">*</span>
                                </label>
                                <input
                                    ref={artistPhotoRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleArtistPhotoChange}
                                    className="hidden"
                                />
                                <div
                                    onClick={() => artistPhotoRef.current?.click()}
                                    onDrop={handleArtistPhotoDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => e.preventDefault()}
                                    className={`w-full h-64 border-2 border-dashed ${!artistPhoto ? 'border-neutral-700' : 'border-green-500'} rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 overflow-hidden transition-colors`}
                                >
                                    {artistPhoto ? (
                                        <img
                                            src={artistPhoto}
                                            alt="Artist"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                                            <span className="text-sm text-neutral-500">Upload artist photo</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Artist Highlights
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Birth Place <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Los Angeles, CA"
                                        {...register("birthPlace", {
                                            required: "Birth place is required",
                                            minLength: {
                                                value: 2,
                                                message: "Birth place must be at least 2 characters"
                                            }
                                        })}
                                        className={`w-full px-4 py-2.5 border ${errors.birthPlace ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500`}
                                    />
                                    <ErrorMessage message={errors.birthPlace?.message} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Years Active <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        {...register("yearsActive", {
                                            required: "Years active is required",
                                            validate: (value) => {
                                                const date = new Date(value);
                                                const now = new Date();
                                                if (date > now) {
                                                    return "Date cannot be in the future";
                                                }
                                                return true;
                                            }
                                        })}
                                        className={`w-full px-4 py-2.5 border ${errors.yearsActive ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500`}
                                    />
                                    <ErrorMessage message={errors.yearsActive?.message} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Awards <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        {...register("awards", {
                                            required: "Number of awards is required",
                                            min: {
                                                value: 0,
                                                message: "Awards cannot be negative"
                                            },
                                            validate: (value) => {
                                                if (!Number.isInteger(Number(value))) {
                                                    return "Awards must be a whole number";
                                                }
                                                return true;
                                            }
                                        })}
                                        className={`w-full px-4 py-2.5 border ${errors.awards ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500`}
                                    />
                                    <ErrorMessage message={errors.awards?.message} />
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Instagram
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="https://instagram.com/..."
                                            {...register("instagramLink", {
                                                pattern: {
                                                    value: urlPattern,
                                                    message: "Invalid URL"
                                                }
                                            })}
                                            className={`w-full px-3 py-2.5 border ${errors.instagramLink ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-xs`}
                                        />
                                        <ErrorMessage message={errors.instagramLink?.message} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Twitter
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="https://twitter.com/..."
                                            {...register("twitterLink", {
                                                pattern: {
                                                    value: urlPattern,
                                                    message: "Invalid URL"
                                                }
                                            })}
                                            className={`w-full px-3 py-2.5 border ${errors.twitterLink ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-xs`}
                                        />
                                        <ErrorMessage message={errors.twitterLink?.message} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Tiktok
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="https://tiktok.com/..."
                                            {...register("tiktokLink", {
                                                pattern: {
                                                    value: urlPattern,
                                                    message: "Invalid URL"
                                                }
                                            })}
                                            className={`w-full px-3 py-2.5 border ${errors.tiktokLink ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-xs`}
                                        />
                                        <ErrorMessage message={errors.tiktokLink?.message} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Artist Biography / Story <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                placeholder="Write the artist's biography, story, and achievements here..."
                                {...register("biography", {
                                    required: "Biography is required",
                                    minLength: {
                                        value: 50,
                                        message: "Biography must be at least 50 characters"
                                    }
                                })}
                                rows={8}
                                className={`w-full px-4 py-3 border ${errors.biography ? 'border-red-500' : 'border-neutral-700'} bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-neutral-500`}
                            />
                            <ErrorMessage message={errors.biography?.message} />
                        </div>
                    </div>

                    <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Gallery Section
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                Behind the Scenes Photos
                            </label>
                            <input
                                ref={galleryRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleGalleryChange}
                                className="hidden"
                            />
                            <div
                                onClick={() => galleryRef.current?.click()}
                                onDrop={handleGalleryDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={(e) => e.preventDefault()}
                                className="w-full h-40 border-2 border-dashed border-neutral-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                                <span className="text-sm text-neutral-500">
                                    Upload multiple images
                                </span>
                            </div>
                            {galleryPhotos.length > 0 && (
                                <div className="grid grid-cols-4 gap-3 mt-4">
                                    {galleryPhotos.map((photo) => (
                                        <div key={photo.id} className="relative group">
                                            <img
                                                src={photo.url}
                                                alt="Gallery"
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeGalleryPhoto(photo.id);
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 text-red-500">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-semibold">Please fix the following errors before submitting:</span>
                            </div>
                            <ul className="mt-2 ml-7 text-sm text-red-400 list-disc">
                                {Object.entries(errors).map(([field, error]) => (
                                    <li key={field}>{error.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm"
                        >
                            <TicketX className="w-4 h-4" />
                            Cancel
                        </button>
                       

                        <button
                           type="submit"
                            className='bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm'
                        >
                            {isLoading ? <div className='flex items-center gap-3'>
                                <Loader size={24} className="animate-spin" /> Saving...
                            </div> : <div className='flex items-center gap-2'>
                                <CircleCheckBig className='w-4 h-4' />
                                Publish
                            </div>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}