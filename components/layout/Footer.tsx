import { socialPaths } from "@/paths";
import Link from "next/link";
import React from "react";
import { BsTelephone } from "react-icons/bs";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaYoutube,
} from "react-icons/fa";

const socialIcons = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  map: <FaMapMarkerAlt />,
  email: <FaEnvelope />,
  phone: <BsTelephone />,
};

// Contact Information
const CONTACT_INFO = {
  address: {
    line1: "The Octopus Building",
    line2: "Royal Road, Pointe aux Canonniers",
    postalCode: "30510",
  },
  phone: {
    business: "269 1500",
    hotline: "5256 6138",
  },
  email: "info@deals.mu",
  hours: {
    weekday: { label: "Monday - Friday", time: "08h00 - 20h00" },
    saturday: { label: "Saturday", time: "08h00 - 16h00" },
    sunday: { label: "Sunday", time: "08h00 - 13h00", note: "(Office Closed)" },
  },
};

// Footer Links
const FOOTER_LINKS = {
  categories: [
    "Hotels",
    "Activities",
    "TOURS & ECO TOURISM",
    "Events and tickets",
    "Business and meetings",
    "Nosy be",
    "Travel",
    "Corporate deal",
    "Airport & VIP pick up",
    "Team building",
  ],
  additional: [
    "About Us",
    "Contact Us",
    "Why are we the best?",
    "FAQs",
    "Video Tutorials",
    { text: "baodeal.net by baodeal", link: "https://baodeal.net" },
    "Corporate Deals",
    "Madagascar blogs",
    "Influencer Program",
  ],
  legal: [
    "Terms & Conditions",
    "Cookie Policy",
    "Cancellation policy",
    "Cyclone Protocol",
    "Privacy",
  ],
};

// Company Information
const COMPANY_INFO = {
  name: "Baodeal.net",
  registrationNumber: "15288",
  tradingName: "Baodeals Simply the Best Ltd",
};

export default function Footer() {
  return (
    <footer className="bg-[#333]">
      {/* Newsletter Section */}
      <div className="bg-green-600 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="text-base md:text-lg font-semibold uppercase md:px-16 text-center md:text-left">
            Sign Up For Our Newsletter
          </div>
          <div className="flex w-full md:w-auto items-stretch gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 text-black w-full md:w-[300px] bg-white"
            />
            <button className="text-white border bg-green px-6 py-2 font-semibold whitespace-nowrap">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8 xl:gap-12 mb-12">
            {/* Column 1 - All Categories */}
            <div>
              <div className="font-semibold mb-3 uppercase text-base text-white">
                All Categories
              </div>
              <hr className="w-9 border-t-2 border-red-700 mb-4" />
              <ul className="space-y-2 list-disc pl-5 text-white/80">
                {FOOTER_LINKS.categories.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 2 - Additional Information */}
            <div>
              <div className="font-semibold mb-3 uppercase text-base text-white">
                Additional Information
              </div>
              <hr className="w-9 border-t-2 border-red-700 mb-4" />
              <ul className="space-y-2 list-disc pl-5 text-white/80">
                {FOOTER_LINKS.additional.map((item, index) =>
                  typeof item === "string" ? (
                    <li key={index}>{item}</li>
                  ) : (
                    <li key={index}>
                      <a
                        href={item.link}
                        className="underline hover:text-white"
                      >
                        {item.text}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Column 3 - Legal Information */}
            <div>
              <div className="font-semibold mb-3 uppercase text-base text-white">
                Legal Information
              </div>
              <hr className="w-9 border-t-2 border-red-700 mb-4" />
              <ul className="space-y-2 list-disc pl-5 text-white/80">
                {FOOTER_LINKS.legal.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact Form */}
            <div className="sm:col-span-2 xl:col-span-2">
              <div className="font-semibold mb-3 uppercase text-base text-white">
                Send Us A Message
              </div>
              <hr className="w-9 border-t-2 border-red-700 mb-4" />
              <div className="text-gray-300 mb-4">
                Feel free to contact us by phone, email or by our contact form
              </div>
              <div className="space-y-3 max-w-2xl">
                <input
                  type="text"
                  placeholder="Your Name*"
                  className="w-full px-4 py-2 bg-white text-[#404040] focus:outline-none focus:ring-2 focus:ring-green-600"
                  aria-label="Your Name"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Telephone"
                  className="w-full px-4 py-2 bg-white text-[#404040] focus:outline-none focus:ring-2 focus:ring-green-600"
                  aria-label="Your Telephone"
                />
                <input
                  type="email"
                  placeholder="Your Email*"
                  className="w-full px-4 py-2 bg-white text-[#404040] focus:outline-none focus:ring-2 focus:ring-green-600"
                  aria-label="Your Email"
                  required
                />
                <textarea
                  placeholder="Type your message here...*"
                  className="w-full px-4 py-2 bg-white text-[#404040] h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
                  aria-label="Your Message"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white font-semibold transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="mb-10">
            <div className="font-semibold mb-3 uppercase text-base text-white">
              Contact Details
            </div>
            <hr className="w-9 border-t-2 border-red-700 mb-6" />
            <div className="bg-[#444] px-6 py-8 max-w-2xl">
              <div className="text-white/80 space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    {CONTACT_INFO.address.line1}, {CONTACT_INFO.address.line2},{" "}
                    {CONTACT_INFO.address.postalCode}
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                  <BsTelephone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div>
                      <strong className="text-white">
                        Tel (business hours):
                      </strong>{" "}
                      {CONTACT_INFO.phone.business}
                    </div>
                    <div>
                      <strong className="text-white">Tel (Hotline):</strong>{" "}
                      {CONTACT_INFO.phone.hotline}
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="pl-8 space-y-1">
                  <div>
                    <strong className="text-white">
                      {CONTACT_INFO.hours.weekday.label}:
                    </strong>{" "}
                    {CONTACT_INFO.hours.weekday.time}
                  </div>
                  <div>
                    <strong className="text-white">
                      {CONTACT_INFO.hours.saturday.label}:
                    </strong>{" "}
                    {CONTACT_INFO.hours.saturday.time}
                  </div>
                  <div>
                    <strong className="text-white">
                      {CONTACT_INFO.hours.sunday.label}:
                    </strong>{" "}
                    {CONTACT_INFO.hours.sunday.time}{" "}
                    {CONTACT_INFO.hours.sunday.note}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-5 h-5 flex-shrink-0" />
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="hover:text-white"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between pt-8 border-t border-gray-600">
            <div className="text-xs text-gray-300 text-center lg:text-left">
              © {new Date().getFullYear()} {COMPANY_INFO.name}, a Registered
              Tour Operator (No. {COMPANY_INFO.registrationNumber}), Trading as{" "}
              {COMPANY_INFO.tradingName}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div>Stay connected</div>
              <div className="flex items-center gap-4">
                {Object.entries(socialPaths).map(([social, href]) => (
                  <Link
                    key={social}
                    href={href()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    aria-label={social}
                  >
                    {socialIcons[social as keyof typeof socialIcons]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
