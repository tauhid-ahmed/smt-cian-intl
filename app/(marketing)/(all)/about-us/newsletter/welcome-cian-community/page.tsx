"use client";

import { CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SuccessScreen() {
  const router = useRouter();
  const handleResendEmail = () => {
    console.log("Resending confirmation email...");
    alert("Confirmation email has been resent!");
  };

  const handleExploreMusic = () => {
    console.log("Navigating to music...");
    alert("Redirecting to music page...");
  };

  const handleClose = () => {
    console.log("Closing success screen...");
    alert("Closing...");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Main Success Card */}
        <div className="bg-black rounded-lg p-12 text-center border border-gray-800 mb-4">
          {/* Check Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <CheckCircle
                size={80}
                className="text-yellow-500"
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* Welcome Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">
            Welcome to the
            <br />
            CIAN Community!
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Thank you for subscribing to our newsletter. We&apos;re excited to
            have you join our faith-filled community.
          </p>
        </div>

        {/* Check Your Inbox Section */}
        <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800 mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="text-yellow-500" size={24} />
            <h2 className="text-yellow-500 text-xl font-semibold">
              Check Your Inbox
            </h2>
          </div>

          <p className="text-gray-300 text-center mb-4">
            We&apos;ve sent a confirmation email to your inbox. Click the link
            in the email to verify your subscription and complete the process.
          </p>

          <p className="text-gray-500 text-sm text-center">
            Didn&apos;t receive the email? Check your spam folder or click below
            to resend.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="bg-black rounded-lg p-8 border border-gray-800 mb-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Resend Email Button */}
            <button
              onClick={handleResendEmail}
              className="bg-transparent border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white font-semibold px-8 py-3 rounded transition-all duration-300"
            >
              Resend Confirmation Email
            </button>

            {/* Explore Music Button */}
            <Link href={"/music"}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50">
                EXPLORE MUSIC
              </button>
            </Link>
          </div>
        </div>

        {/* Close Button */}
        <div className="text-center">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-300 uppercase text-sm tracking-wider font-semibold transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
