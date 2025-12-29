"use client";

import React, { useState } from "react";
import { Mail, Settings, X } from "lucide-react";
import Link from "next/link";

export default function NewsletterSection() {
  const [showSubscribe, setShowSubscribe] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    preferences: {
      newMusic: false,
      artistStories: false,
      events: false,
      exclusiveContent: false,
      ministryUpdates: false,
    },
    agreeToEmails: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "agreeToEmails") {
      setFormData((prev) => ({
        ...prev,
        agreeToEmails: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked,
        },
      }));
    }
  };

  const handleSubscribe = () => {
    if (formData.email && formData.agreeToEmails) {
      console.log("Subscribing with data:", formData);
      alert("Thank you for subscribing to CIAN Collective!");
      setShowSubscribe(false);
      // Reset form
      setFormData({
        email: "",
        firstName: "",
        preferences: {
          newMusic: false,
          artistStories: false,
          events: false,
          exclusiveContent: false,
          ministryUpdates: false,
        },
        agreeToEmails: false,
      });
    } else {
      alert("Please enter your email and agree to receive emails.");
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo/Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-500 mb-6 tracking-wide">
          CIAN COLLECTIVE
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl mb-12 font-light">
          Faith-Filled Music That Inspires
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Subscribe Button */}
          <button
            onClick={() => setShowSubscribe(true)}
            className="group relative bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3.5 uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <Mail size={20} />
              Subscribe to Newsletter
            </span>
          </button>

          {/* Manage Preferences Button */}
          <button
            onClick={() => setShowPreferences(true)}
            className="group relative bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3.5 uppercase tracking-wider transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <Settings size={20} />
              Manage Preferences
            </span>
          </button>
        </div>
      </div>

      {/* Subscribe Modal */}
      {showSubscribe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-lg w-full relative border border-gray-800">
            {/* Close Button */}
            <button
              onClick={() => setShowSubscribe(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <h2 className="text-3xl font-bold text-yellow-500 mb-3">
              Stay Connected with
              <br />
              CIAN Collective
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Get new releases, exclusive content, and inspiring stories
              delivered to your inbox.
            </p>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            {/* First Name Field */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-2">
                First Name{" "}
                <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Your first name"
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
            </div>

            {/* Preferences Section */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-3">
                What would you like to receive?{" "}
                <span className="text-gray-500 text-xs">
                  (Select all that apply)
                </span>
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="newMusic"
                    checked={formData.preferences.newMusic}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="text-gray-300 text-sm group-hover:text-gray-200">
                    New Music Releases
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="artistStories"
                    checked={formData.preferences.artistStories}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="text-gray-300 text-sm group-hover:text-gray-200">
                    Artist Stories & Testimonies
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="events"
                    checked={formData.preferences.events}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="text-gray-300 text-sm group-hover:text-gray-200">
                    Events & Concerts
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="exclusiveContent"
                    checked={formData.preferences.exclusiveContent}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="text-gray-300 text-sm group-hover:text-gray-200">
                    Exclusive Content & Behind-the-Scenes
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="ministryUpdates"
                    checked={formData.preferences.ministryUpdates}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <span className="text-gray-300 text-sm group-hover:text-gray-200">
                    Ministry Updates
                  </span>
                </label>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="mb-6 pt-4 border-t border-gray-800">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeToEmails"
                  checked={formData.agreeToEmails}
                  onChange={handleCheckboxChange}
                  className="mt-0.5 w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                />
                <span className="text-gray-300 text-sm group-hover:text-gray-200">
                  I agree to receive emails from CIAN Collective
                </span>
              </label>
            </div>

            {/* Subscribe Button */}
            <Link href={"/about-us/newsletter/welcome-cian-community"}>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe Now
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4 py-4"
          onClick={() => setShowPreferences(false)}
        >
          <div
            className="bg-black rounded-lg max-w-5xl h-fit w-full relative border border-gray-800  max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 overflow-y-auto p-8">
              {`
                
              `}
              {/* Newsletter Subscription Status */}
              <div className="bg-gray-900/50 rounded-lg p-6 mb-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="text-yellow-500" size={24} />
                    <div>
                      <h3 className="text-white font-semibold">
                        Newsletter Subscription
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400 text-sm">Status:</span>
                        <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded">
                          Subscribed
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm px-4 py-2 rounded transition-colors">
                    Unsubscribe
                  </button>
                </div>
              </div>

              <div className="grid gap-8 grid-cols-1 md:grid-cols-3 sm:grid-cols-4 ">
                {/* Email Frequency Section */}
                <div className="bg-gray-900/50 rounded-lg p-6 mb-6 border border-gray-800 md:col-span-1 sm:col-span-2">
                  <h3 className="text-white font-semibold mb-4">
                    Email Frequency
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="frequency"
                        defaultChecked
                        className="mt-1 w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                      />
                      <div>
                        <div className="text-gray-200 font-medium">
                          Weekly Digest
                        </div>
                        <div className="text-gray-400 text-sm">
                          Receive a summary of updates once per week
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="frequency"
                        className="mt-1 w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                      />
                      <div>
                        <div className="text-gray-200 font-medium">
                          Daily Updates
                        </div>
                        <div className="text-gray-400 text-sm">
                          Stay informed with daily email updates
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="frequency"
                        className="mt-1 w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                      />
                      <div>
                        <div className="text-gray-200 font-medium">
                          Monthly Newsletter Only
                        </div>
                        <div className="text-gray-400 text-sm">
                          Receive only our monthly newsletter
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Content Preferences Section */}
                <div className="bg-gray-900/50 rounded-lg p-6 mb-6 border border-gray-800 md:col-span-2 sm:col-span-2">
                  <h3 className="text-white font-semibold mb-2">
                    Content Preferences
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Choose the types of content you&apos;d like to receive
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-gray-200">
                        New Music Releases
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-gray-200">
                        Artist Stories & Testimonies
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-gray-200">
                        Events & Concerts
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-gray-200">
                        Exclusive Content & Behind-the-Scenes
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-gray-200">
                        Ministry Updates
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    alert("Preferences saved successfully!");
                    setShowPreferences(false);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
                >
                  Save Preferences
                </button>
              </div>

              {/* Footer Info */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h4 className="text-gray-300 text-sm font-semibold mb-2">
                  About CIAN Collective
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">
                  We respect your privacy and will never share your email
                  address with third parties. You can update your preferences or
                  unsubscribe at any time. For questions about our email
                  practices, contact us at{" "}
                  <a
                    href="mailto:hello@ciancollective.com"
                    className="text-yellow-500 hover:underline"
                  >
                    hello@ciancollective.com
                  </a>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPreferences(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-yellow-500/50 rounded-full animate-pulse"></div>
    </div>
  );
}
