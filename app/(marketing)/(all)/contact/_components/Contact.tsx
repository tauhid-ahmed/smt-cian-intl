"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import {
  Phone,
  MessageCircle,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

interface ContactMethod {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const contactMethods: ContactMethod[] = [
  {
    id: "phone",
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    content: (
      <div className="space-y-2">
        <p className="text-white text-lg">(555) 123-4567</p>
        <p className="text-gray-300 text-sm">Mon-Fri: 9am - 6pm EST</p>
      </div>
    ),
  },
  {
    id: "chat",
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Live Chat",
    content: (
      <div className="space-y-3">
        <button className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-black transition-colors">
          Start Chat
        </button>
        <p className="text-gray-300 text-sm">Available Mon-Fri, 9am-6pm EST</p>
      </div>
    ),
  },
  {
    id: "location",
    icon: <MapPin className="w-6 h-6" />,
    title: "Mailing Location",
    content: (
      <div className="space-y-1">
        <p className="text-white">CIAN Collective</p>
        <p className="text-white">123 Music Avenue</p>
        <p className="text-white">New York, NY 10001</p>
      </div>
    ),
  },
  {
    id: "social",
    icon: <Globe className="w-6 h-6" />,
    title: "Social Media",
    content: (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition-colors flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            <span className="text-sm">Instagram</span>
          </button>
          <button className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition-colors flex items-center gap-2">
            <Facebook className="w-4 h-4" />
            <span className="text-sm">Facebook</span>
          </button>
          <button className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition-colors flex items-center gap-2">
            <Twitter className="w-4 h-4" />
            <span className="text-sm">Twitter</span>
          </button>
          <button className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
            <span className="text-sm">Tik Tok</span>
          </button>
        </div>
        <p className="text-gray-300 text-sm">@ciancollective</p>
      </div>
    ),
  },
];

export default function ContactMethodsSection() {
  return (
    <Section>
      <Container>
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-16">
            Other Ways to Reach Us
          </h2>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method) => (
              <div
                key={method.id}
                className="bg-linear-to-br from-zinc-800 to-zinc-900 rounded-3xl p-8 border border-zinc-700 hover:border-zinc-600 transition-all"
              >
                <div className="bg-zinc-700 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-white">{method.icon}</div>
                    <h3 className="text-white text-xl font-bold">
                      {method.title}
                    </h3>
                  </div>
                  <div className="mt-4">{method.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
