"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Heading } from "@/components/Heading"
import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Gift, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useAddReviewMutation, useGetSingleProductQuery } from "@/lib/api/commonApi"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/config/api"

interface FormData {
    product: string
    contentType: string
    rating: number
    review: string
    reviewTitle: string
    displayName: string
    email: string
    location: string
    permissions: {
        verify: boolean
        consent: boolean
        spotlight: boolean
        emails: boolean
    }
}

const ReviewPage = () => {
    const { productId } = useParams()
    const router = useRouter()
    const [addReview, { isLoading }] = useAddReviewMutation()
    const { data: productData } = useGetSingleProductQuery(productId as string, {
        skip: !productId,
    })

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState<FormData>({
        product: (productId as string) || "",
        contentType: "both",
        rating: 0,
        review: "",
        reviewTitle: "",
        displayName: "",
        email: "",
        location: "",
        permissions: {
            verify: false,
            consent: false,
            spotlight: false,
            emails: false,
        },
    })

    const product = productData?.data

    const handleRatingClick = (star: number) => {
        setFormData((prev) => ({ ...prev, rating: star }))
    }

    const handleCheckboxChange = (key: keyof FormData["permissions"]) => {
        setFormData((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [key]: !prev.permissions[key],
            },
        }))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.rating === 0) {
            toast.error("Please provide a rating")
            return
        }

        if (!formData.review) {
            toast.error("Please write a review")
            return
        }

        try {
            const payload = {
                productId: productId,
                rating: formData.rating,
                comment: formData.review,
                isVerifiedPurchase: formData.permissions.verify,
                consentMarketing: formData.permissions.consent,
            }

            const submissionData = new FormData()
            submissionData.append("data", JSON.stringify(payload))
            if (selectedFile) {
                submissionData.append("media", selectedFile)
            }

            const result = await addReview(submissionData).unwrap()

            if (result.success) {
                toast.success(result.message || "Review submitted successfully!")
                router.push("/shop")
            }
        } catch (error: any) {
            console.error("[Review Submission Error]", error)
            toast.error(error?.data?.message || "Failed to submit review. Please try again.")
        }
    }

    return (
        <Container className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="my-24 mt-48 ">
                <Heading as="h1" size="h1" font="serif" align="center" className="mt-6 mb-2">
                    Share Your Story
                </Heading>
                <p className="text-center font-light text-2xl text-[#FFFFFF]">Your review helps others discover great music</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-24">
                {/* Section 1: Product Selection */}
                <Card className="border border-border bg-transparent p-6">
                    <h3 className="text-lg font-semibold mb-6">Reviewing:</h3>
                    <div className="space-y-4">
                        {product ? (
                            <div className="flex items-center gap-4">
                                <Image
                                    src={product.mainImage || "/placeholder.jpg"}
                                    alt={product.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                    width={64}
                                    height={64}
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-2xl">{product.title}</p>
                                    <p className="text-lg font-light text-white">{product.category}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400">Loading product details...</p>
                        )}
                    </div>
                </Card>

                {/* Section 2: Content Type & Rating */}
                <Card className="border border-border bg-transparent p-6 space-y-8">
                    {/* Content Type Selection */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">What Would You Like To Share?</h3>
                        <div className="space-y-3">
                            {[
                                { id: "review", label: "Product Review", desc: "Rate the quality, sound, packaging, etc." },
                                { id: "testimony", label: "Personal Testimony", desc: "Share how this music impacted your faith" },
                                { id: "both", label: "Both", desc: "Combine product review with your story" },
                            ].map((option) => (
                                <label key={option.id} className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="contentType"
                                        value={option.id}
                                        checked={formData.contentType === option.id}
                                        onChange={handleInputChange}
                                        className="mt-1 w-5 h-5 cursor-pointer"
                                    />
                                    <div>
                                        <p className="font-medium text-2xl">{option.label}<span className="text-lg font-light">{" "} {option.desc}</span></p>

                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </Card>
                <Card className="border border-border bg-transparent p-6 space-y-10">
                    {/* Rating Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Overall Rating*</h3>
                        <p className="text-base">How would you rate this product?</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingClick(star)}
                                    className="focus:outline-none transition"
                                >
                                    <svg
                                        className={`w-8 h-8 ${formData.rating >= star ? "fill-foreground text-foreground" : "text-border-white"
                                            }`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                        <span className="text-lg text-white font-light ml-2">
                            {formData.rating > 0 ? `${formData.rating} Star${formData.rating > 1 ? "s" : ""}` : ""}
                        </span>
                    </div>
                </Card>

                {/* Review Textarea */}
                <Card className="border border-border bg-transparent p-6">
                    <div>
                        <h3 className="text-lg font-semibold">Your Review*</h3>
                        <p className="text-base font-normal">Share your thoughts about this product</p>
                    </div>
                    <Textarea
                        name="review"
                        value={formData.review}
                        onChange={handleInputChange}
                        placeholder="Share your thoughts about this product..."
                        className="min-h-32 resize-none  text-foreground placeholder:text-muted-foreground bg-[#3B3B3B]"
                    />
                    <p className="text-xs text-right">{formData.review.length}/500 chars</p>
                    <div className="mt-7">
                        {/* Review Title */}
                        <label className="block mb-2">
                            <span className="font-semibold text-lg">Review Title (Optional)</span>
                        </label>
                        <Input
                            type="text"
                            name="reviewTitle"
                            value={formData.reviewTitle}
                            onChange={handleInputChange}
                            placeholder="Give your review a title"
                            className=" text-foreground h-13.5 placeholder:py-2 placeholder:text-muted-foreground bg-[#3B3B3B]"
                        />
                    </div>

                    <div className="mt-7">
                        {/* Helpful Prompts */}

                        <h3 className="font-semibold text-lg mb-4">Helpful Prompts:</h3>
                        <ul className="space-y-3 font-normal rounded-lg text-lg bg-[#3B3B3B] p-4">
                            <li className="flex gap-3">
                                <span className="text-foreground">•</span>
                                <span>What did you love most about this product?</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">•</span>
                                <span>How has this music encouraged you?</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">•</span>
                                <span>Would you recommend it to others?</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-foreground">•</span>
                                <span>What makes this artist/album special?</span>
                            </li>
                        </ul>

                    </div>

                </Card>

                {/* Section 3: Media Upload */}
                <Card className="border border-border bg-transparent p-6">
                    <div>
                        <h3 className="text-lg font-semibold">Add photos or video (Optional)</h3>
                        <p className="text-base font-normal">Help others see your experience</p>
                    </div>
                    <div className="flex gap-6 mb-8">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,video/*"
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="border-[0.5] border-dashed border-white rounded-lg p-8 flex flex-col items-center justify-center min-w-32 hover:bg-muted transition"
                        >
                            {selectedFile ? (
                                <span className="text-sm font-medium text-green-400">{selectedFile.name}</span>
                            ) : (
                                <>
                                    <svg className="w-8 h-8 text-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-sm font-medium">Add Photo/Video</span>
                                </>
                            )}
                        </button>
                    </div>
                    <ul className="space-y-2 text-base">
                        <li className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-white text-sm">
                                ✓
                            </span>
                            <span>Accepted formats: JPG, PNG, MP4, MOV</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-white text-sm">
                                ✓
                            </span>
                            <span>Max 5 photos or 1 video per review</span>
                        </li>
                    </ul>
                </Card>

                {/* Section 4: Reviewer Information */}
                <Card className="border border-border bg-transparent p-6 space-y-7">
                    <h3 className="text-lg font-semibold">Reviewer Information</h3>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Display Name*</label>
                        <Input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            placeholder="Your name"
                            className="text-foreground h-15 bg-[#3B3B3B] placeholder:text-muted-foreground"
                        />
                        <p className="text-base font-normal mt-2">(This is how your name will appear publicly)</p>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Email*</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className=" text-foreground h-15 bg-[#3B3B3B] placeholder:text-muted-foreground"
                        />
                        <p className="text-base font-normal mt-2">(Only for verification - never show publicly)</p>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Location (Optional)</label>
                        <Input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="City, State/Country"
                            className="text-foreground h-15 bg-[#3B3B3B] placeholder:text-muted-foreground"
                        />
                    </div>
                </Card>

                {/* Section 5: Permissions */}
                <Card className="border border-border bg-transparent p-6">
                    <h3 className="text-lg font-semibold mb-6">Permissions</h3>
                    <div className="space-y-7">
                        {[
                            { key: "verify" as const, label: "I verify this is a genuine review based on my own experience" },
                            {
                                key: "consent" as const,
                                label:
                                    "I consent to CIAN Collective using my review and media in marketing materials (social media, website, emails)",
                            },
                            {
                                key: "spotlight" as const,
                                label: "I'd like to be featured as a Customer Spotlight story (may be contacted for more details)",
                            },
                            { key: "emails" as const, label: "Send me emails about similar products" },
                        ].map((permission) => (
                            <label key={permission.key} className="flex items-center justify-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.permissions[permission.key]}
                                    onChange={() => handleCheckboxChange(permission.key)}
                                    className="mt-1 w-5 h-5 cursor-pointer"
                                />
                                <span className="text-sm font-normal">{permission.label}</span>
                            </label>
                        ))}
                    </div>
                </Card>

                {/* Review Reward Info */}
                <Card className="border border-border p-6 bg-[#3B3B3B]">
                    <div className="flex gap-4">
                        <Gift className="w-6 h-6 text-yellow-400" />
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Review Reward</h4>
                            <p className="text-base font-normal">
                                Share your story and get 15% OFF your next purchase! Discount code will be sent to your email after your
                                review is approved.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Submit Button & Footer */}
                <div className="space-y-4 flex flex-col items-center justify-center">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="md:w-[10%] lg:w-[20%] sm:w-[35%] bg-foreground text-background hover:opacity-90 transition py-2 h-auto mb-6 flex items-center justify-center gap-2"
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isLoading ? "Submitting..." : "Submit Review"}
                    </Button>
                    <p className="text-center font-normal text-base">
                        Your review will be checked by our team before appearing in the site (usually within 24 hours)
                    </p>
                    {/* Contact Support */}
                    <Link href="/#" className="pt-0 mb-10 text-center">
                        <h4 className="font-semibold mb-2 text-lg">Contact Support</h4>
                    </Link>
                </div>
            </form>
        </Container>
    )
}

export default ReviewPage
