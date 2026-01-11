import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import TextCarousel from "@/components/TextCarousel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetMeQuery } from "@/lib/api/authApi";
import { useAddArtistReviewMutation } from "@/lib/api/commonApi";
import { Loader2, Star, Camera, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        text: "I have been listening to Fridia kanil for a while now, and every song feels like a story i can relate to. The lyrics are heartfelt, and the production is top-notch. Truly one of the most talented musicians out there!",
        author: "Sam Newton",
        role: "YouTuber",
        avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
        id: 2,
        text: "An incredible artist with a unique voice. Every track takes you on an emotional journey that stays with you long after the music stops. The attention to detail in production is outstanding.",
        author: "Emily Chen",
        role: "Music Blogger",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
        id: 3,
        text: "I've been following this artist's work for years, and the growth and evolution in their sound is remarkable. Each album brings something fresh while staying true to their artistic vision.",
        author: "Marcus Johnson",
        role: "Radio Host",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
        id: 4,
        text: "The songwriting is pure poetry set to music. It's rare to find an artist who can balance commercial appeal with genuine artistic integrity so effortlessly.",
        author: "Sophie Martinez",
        role: "Music Producer",
        avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
        id: 5,
        text: "Every performance is electric. The passion and energy this artist brings to their craft is infectious. Can't wait to see what comes next!",
        author: "David Park",
        role: "Podcast Host",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
];

export default function Testimonial({ artistId }: { artistId: string }) {
    const { data: userData, isError: authError } = useGetMeQuery();
    const [addReview, { isLoading }] = useAddArtistReviewMutation();
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isLoggedIn = !!userData && !authError;

    const handleRatingClick = (val: number) => setRating(val);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please provide a rating");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        try {
            const submissionData = new FormData();
            submissionData.append("data", JSON.stringify({
                artistId,
                rating,
                comment
            }));
            if (selectedFile) {
                submissionData.append("media", selectedFile);
            }

            const result = await addReview(submissionData).unwrap();
            if (result.success) {
                toast.success(result.message || "Thank you for sharing your story!");
                setShowForm(false);
                setRating(0);
                setComment("");
                setSelectedFile(null);
                setPreviewUrl(null);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to submit review");
        }
    };

    return (
        <Section padding="none" className="bg-accent">
            <Container>
                <div className="flex flex-col justify-center pt-20">
                    <div className="text-center mb-10">
                        <Heading as="h2" size="h3" align="center">
                            Stories from Fans
                        </Heading>
                        <p className="text-muted-foreground">How This Artist Changed My Life</p>
                    </div>
                    <TextCarousel data={testimonials} />
                </div>

                <div className="flex flex-col items-center justify-center pb-20">
                    {!showForm ? (
                        <>
                            {isLoggedIn ? (
                                <Button onClick={() => setShowForm(true)} size="lg" className="rounded-full px-8">
                                    Share Your Story
                                </Button>
                            ) : (
                                <div className="text-center p-8 border border-dashed border-white/20 rounded-2xl bg-white/5 max-w-md">
                                    <p className="mb-4 text-white font-medium">Want to share your story?</p>
                                    <Link href="/auth/login">
                                        <Button variant="outline" className="rounded-full px-8 hover:bg-white hover:text-black transition-all">
                                            Login to Comment
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full max-w-2xl bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-white">Your Story</h3>
                                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingClick(star)}
                                                className="focus:outline-none transition-transform active:scale-90"
                                            >
                                                <Star className={`w-8 h-8 ${rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Comment</label>
                                    <Textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tell us how this music impacted your life..."
                                        className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 transition-all resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Add Photo (Optional)</label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        {!previewUrl ? (
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-20 h-20 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors group"
                                            >
                                                <Camera className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                                            </button>
                                        ) : (
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/20">
                                                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-500 transition-colors"
                                                >
                                                    <X className="w-3 h-3 text-white" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-white text-black hover:bg-gray-200 font-bold transition-all flex justify-center items-center gap-2">
                                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                                    {isLoading ? "Submitting..." : "Post Story"}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </Container>
        </Section>
    );
}
