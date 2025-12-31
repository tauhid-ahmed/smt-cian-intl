/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable prefer-const */
"use client";
import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";
import { Upload, X, CircleCheckBig, TicketX, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetSingleArtistQuery } from "@/lib/api/commonApi";
import {  useUpdateSingleArtistMutation } from "@/lib/api/adminApi";
import toast from "react-hot-toast";

interface GalleryPhoto<T> {
    id: number;
    url: string;
    file?: File | T;
}

interface EditArtistPageProps {
    artistId: string;
}

export default function EditArtistPage({ artistId }: EditArtistPageProps) {
    const router = useRouter();
    const [artistName, setArtistName] = useState<string>("");
    const [heroBanner, setHeroBanner] = useState<string | null>(null);
    const [heroBannerFile, setHeroBannerFile] = useState<File | null>(null);

    const [spotifyUrl, setSpotifyUrl] = useState<string>("");
    const [appleMusicUrl, setAppleMusicUrl] = useState<string>("");
    const [youtubeUrl, setYoutubeUrl] = useState<string>("");
    const [numberOfFans, setNumberOfFans] = useState<number>(0);
    const [artistPhoto, setArtistPhoto] = useState<string | null>(null);
    const [artistPhotoFile, setArtistPhotoFile] = useState<File | null>(null);
    const [birthPlace, setBirthPlace] = useState<string>("");
    const [yearsActive, setYearsActive] = useState<string>("");
    const [awards, setAwards] = useState<number>(0);
    const [instagramLink, setInstagramLink] = useState<string>("");
    const [twitterLink, setTwitterLink] = useState<string>("");
    const [tiktokLink, setTiktokLink] = useState<string>("");
    const [biography, setBiography] = useState<string>("");
    const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto<File>[]>([]);

    const heroBannerRef = useRef<HTMLInputElement>(null);
    const artistPhotoRef = useRef<HTMLInputElement>(null);
    const galleryRef = useRef<HTMLInputElement>(null);

    const { data: artistData } = useGetSingleArtistQuery(artistId);
    const [updateArtist, { isLoading: isUpdating }] = useUpdateSingleArtistMutation();

    // Initialize form fields with artist data when it loads
    useEffect(() => {
        if (artistData) {
            setArtistName(artistData.data.name || "");
            setSpotifyUrl(artistData.data.spotify || "");
            setAppleMusicUrl(artistData.data.appleMusic || "");
            setYoutubeUrl(artistData.data.youtube || "");
            setNumberOfFans(artistData.data.followers ?? 0);
            setBirthPlace(artistData.data.location || "");
            setYearsActive(artistData.data.activeYearsStart || "");
            setAwards(artistData.data.awards ?? 0);
            setInstagramLink(artistData.data.instagram || "");
            setTwitterLink(artistData.data.twitter || "");
            setTiktokLink(artistData.data.tiktok || "");
            setBiography(artistData.data.bio || "");
            setHeroBanner(artistData.data.banner);
            setArtistPhoto(artistData.data.image);
            let existingPhotos: GalleryPhoto<File>[] = artistData.data.behindGallery.map((item) => ({
                id: Date.now() + Math.random(),
                url: item,
            }));
            setGalleryPhotos(existingPhotos)

        }
    }, [artistData]);

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

    const handleArtistPhotoChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
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
        const newPhotos: GalleryPhoto<File>[] = files.map((file) => ({
            id: Date.now() + Math.random(),
            url: URL.createObjectURL(file),
            file: file,
        }));
        setGalleryPhotos([...galleryPhotos, ...newPhotos]);
    };

    const handleGalleryDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files || []);
        const newPhotos: GalleryPhoto<File>[] = files
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

    const handlePublish = async (): Promise<void> => {
        // Create FormData object
        const formData = new FormData();
        const updatedArtistData = {
            name: artistName,
            bio: biography,
            location: birthPlace,
            website: "https://www.cian-collection.com",
            spotify: spotifyUrl,
            appleMusic: appleMusicUrl,
            youtube: youtubeUrl,
            instagram: instagramLink,
            twitter: twitterLink,
            tiktok: tiktokLink,
            activeYearsStart: new Date(yearsActive).toISOString(),
            awards: awards,
        };
        const updatedArtistFormdata = JSON.stringify(updatedArtistData);

        formData.append("data", updatedArtistFormdata);


        // Add hero banner file
        if (heroBannerFile) {
            formData.append("heroBanner", heroBannerFile);
        }

        // Add artist photo file
        if (artistPhotoFile) {
            formData.append("artistPhoto", artistPhotoFile);
        }

        // Add gallery photos
        galleryPhotos.forEach((photo, index) => {
            if (photo.file instanceof File) {
                formData.append(`galleryPhotos[${index}]`, photo.file);
            }
        });


        for (let pair of formData.entries()) {
            console.log(pair[0] + ":", pair[1]);
        }

        try {
            await updateArtist({ id: artistId, formData });
            router.back();
            toast.success("Artist updated successfully!");
        } catch (error) {
            console.error("Error updating artist:", error);     
            toast.error("Failed to update artist");
        }


    };

    return (
        <div className='min-h-screen bg-black p-6'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='mb-6'>
                    <div className='flex items-center gap-3 mb-2'>
                        <h1 className='text-2xl font-bold text-white'>
                            Edit New Artist page
                        </h1>
                    </div>
                </div>

                {/* Header Section */}
                <div className='bg-neutral-900 rounded-lg border border-neutral-700 p-6 mb-6'>
                    <h2 className='text-lg font-semibold text-white mb-4'>
                        Header Section
                    </h2>

                    <div className='space-y-4'>
                        {/* Artist Name */}
                        <div>
                            <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                Artist Name
                            </label>
                            <input
                                type='text'
                                placeholder='Enter product title'
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                                className='w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500'
                            />
                        </div>

                        {/* Hero Banner */}
                        <div>
                            <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                Hero Banner
                            </label>
                            <input
                                ref={heroBannerRef}
                                type='file'
                                accept='image/*'
                                onChange={handleHeroBannerChange}
                                className='hidden'
                            />
                            <div
                                onClick={() => heroBannerRef.current?.click()}
                                onDrop={handleHeroBannerDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={(e) => e.preventDefault()}
                                className='w-full h-40 border-2 border-dashed border-neutral-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 overflow-hidden transition-colors'
                            >
                                {heroBanner ? (
                                    <img
                                        src={heroBanner}
                                        alt='Hero Banner'
                                        className='w-full h-full object-cover'
                                    />
                                ) : (
                                    <>
                                        <Upload className='w-8 h-8 text-neutral-400 mb-2' />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* URLs */}
                        <div className='grid grid-cols-3 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                    Spotify URL
                                </label>
                                <input
                                    type='text'
                                    placeholder='https://open.spotify.com/artist...'
                                    value={spotifyUrl}
                                    onChange={(e) =>
                                        setSpotifyUrl(e.target.value)
                                    }
                                    className='w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-sm'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                    Apple Music URL
                                </label>
                                <input
                                    type='text'
                                    placeholder='https://music.apple.com/artist...'
                                    value={appleMusicUrl}
                                    onChange={(e) =>
                                        setAppleMusicUrl(e.target.value)
                                    }
                                    className='w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-sm'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                    YouTube URL
                                </label>
                                <input
                                    type='text'
                                    placeholder='https://youtube.com/@...'
                                    value={youtubeUrl}
                                    onChange={(e) =>
                                        setYoutubeUrl(e.target.value)
                                    }
                                    className='w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-sm'
                                />
                            </div>
                        </div>
                    </div>
                </div>



                {/* Biography Section */}
                <div className='bg-neutral-900 rounded-lg border border-neutral-700 p-6 mb-6'>
                    <h2 className='text-lg font-semibold text-white mb-4'>
                        Biography Section
                    </h2>

                    <div className='grid grid-cols-2 gap-6'>
                        {/* Artist Photo */}
                        <div>
                            <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                Artist Photo
                            </label>
                            <input
                                ref={artistPhotoRef}
                                type='file'
                                accept='image/*'
                                onChange={handleArtistPhotoChange}
                                className='hidden'
                            />
                            <div
                                onClick={() => artistPhotoRef.current?.click()}
                                onDrop={handleArtistPhotoDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={(e) => e.preventDefault()}
                                className='w-full h-64 border-2 border-dashed border-neutral-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 overflow-hidden transition-colors'
                            >
                                {artistPhoto ? (
                                    <img
                                        src={artistPhoto}
                                        alt='Artist'
                                        className='w-full h-full object-cover'
                                    />
                                ) : (
                                    <>
                                        <Upload className='w-8 h-8 text-neutral-400 mb-2' />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Artist Highlights */}
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                    Artist Highlights
                                </label>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                    Birthdig Place
                                </label>
                                <input
                                    type='text'
                                    placeholder='e.g., Los Angeles, CA'
                                    value={birthPlace}
                                    onChange={(e) =>
                                        setBirthPlace(e.target.value)
                                    }
                                    className='w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                    Years Active
                                </label>
                                <input
                                    type='text'
                                    placeholder='e.g., 2015 - Present'
                                    value={yearsActive}
                                    onChange={(e) =>
                                        setYearsActive(e.target.value)
                                    }
                                    className='w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                    Awards
                                </label>
                                <input
                                    type='text'
                                    placeholder='0'
                                    value={awards}
                                    onChange={(e) => setAwards(Number(e.target.value) || 0)}
                                    className='w-full px-4 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500'
                                />
                            </div>

                            <div className='grid grid-cols-3 gap-2'>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                        Instagram Link
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='https://open.spotify...'
                                        value={instagramLink}
                                        onChange={(e) =>
                                            setInstagramLink(e.target.value)
                                        }
                                        className='w-full px-3 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-xs'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                        Twitter Link
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='https://music.apple...'
                                        value={twitterLink}
                                        onChange={(e) =>
                                            setTwitterLink(e.target.value)
                                        }
                                        className='w-full px-3 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-xs'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-neutral-300 mb-2'>
                                        Tiktok Link
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='https://youtube.com...'
                                        value={tiktokLink}
                                        onChange={(e) =>
                                            setTiktokLink(e.target.value)
                                        }
                                        className='w-full px-3 py-2.5 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-500 text-xs'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Artist Biography */}
                    <div className='mt-6'>
                        <label className='block text-sm font-medium text-neutral-300 mb-2'>
                            Artist Biography / Story
                        </label>
                        <textarea
                            placeholder="Write the artist's biography, story, and achievements here..."
                            value={biography}
                            onChange={(e) => setBiography(e.target.value)}
                            rows={8}
                            className='w-full px-4 py-3 border border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-neutral-500'
                        />
                    </div>
                </div>

                {/* Gallery Section */}
                <div className='bg-neutral-900 rounded-lg border border-neutral-700 p-6 mb-6'>
                    <h2 className='text-lg font-semibold text-white mb-4'>
                        Gallery Section
                    </h2>

                    <div>
                        <label className='block text-sm font-medium text-neutral-300 mb-2'>
                            Behind the Scenes Photos
                        </label>
                        <input
                            ref={galleryRef}
                            type='file'
                            accept='image/*'
                            multiple
                            onChange={handleGalleryChange}
                            className='hidden'
                        />
                        <div
                            onClick={() => galleryRef.current?.click()}
                            onDrop={handleGalleryDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                            className='w-full h-40 border-2 border-dashed border-neutral-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 bg-neutral-900 transition-colors'
                        >
                            <Upload className='w-8 h-8 text-neutral-400 mb-2' />
                            <span className='text-sm text-neutral-500'>
                                Upload multiple images
                            </span>
                        </div>
                        {galleryPhotos.length > 0 && (
                            <div className='grid grid-cols-4 gap-3 mt-4'>
                                {galleryPhotos.map((photo) => (
                                    <div
                                        key={photo.id}
                                        className='relative group'
                                    >
                                        <img
                                            src={photo.url}
                                            alt='Gallery'
                                            className='w-full h-24 object-cover rounded-lg'
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeGalleryPhoto(photo.id);
                                            }}
                                            className='absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                                        >
                                            <X className='w-3 h-3' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Publish Button */}
                <div className='flex justify-end gap-4'>
                    <button
                        onClick={() => router.back()}
                        className='bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm'
                    >
                        <TicketX className='w-4 h-4' />
                        Cancle
                    </button>
                    <button
                        onClick={handlePublish}
                        className='bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm'
                    >
                        {isUpdating ? <div className='flex items-center gap-3'>
                            <Loader size={24} className="animate-spin" /> Saving...
                        </div> : <div className='flex items-center gap-2'>
                            <CircleCheckBig className='w-4 h-4' />
                            Publish
                        </div>}
                    </button>
                </div>
            </div>
        </div>
    );
}
