import Link from "next/link";
import Container from "@/components/layout/Container";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerColumns = [
  [
    {
      title: "Products",
      links: [
        { label: "Royalty-Free Music", href: "/music" },
        { label: "Sound Effects", href: "/sfx" },
        { label: "AI Voiceover", href: "/ai-voiceover" },
        { label: "AI Image & Video", href: "/ai-tools" },
        { label: "Stock Footage", href: "/stock-footage" },
        { label: "Video Templates", href: "/templates" },
        { label: "LUTs", href: "/luts" },
        { label: "Tools", href: "/tools" },
        { label: "Music API", href: "/api" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Artist for Business", href: "/business" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
  ],
  [
    {
      title: "Business Solutions",
      links: [
        { label: "Businesses", href: "/solutions/businesses" },
        { label: "In-app", href: "/solutions/in-app" },
        { label: "Creative Agencies", href: "/solutions/agencies" },
        { label: "Broadcast & Media", href: "/solutions/broadcast" },
        { label: "Sports Industry", href: "/solutions/sports" },
        { label: "Retail Brands", href: "/solutions/retail" },
        { label: "Tech Companies", href: "/solutions/tech" },
        { label: "Education", href: "/solutions/education" },
      ],
    },
  ],
  [
    {
      title: "Join Us",
      links: [
        { label: "Become a Musician", href: "/join/musician" },
        { label: "Become a Filmmaker", href: "/join/filmmaker" },
        { label: "Become a Template Artist", href: "/join/template-artist" },
        { label: "Become an Ambassador", href: "/join/ambassador" },
        { label: "Become a Channel Partner", href: "/join/partner" },
        { label: "Artlist Jobs", href: "/careers" },
      ],
    },
    {
      title: "Help",
      links: [{ label: "Help Center", href: "/help" }],
    },
  ],
  [
    {
      title: "Resources",
      links: [
        { label: "Artlist Blog", href: "/blog" },
        { label: "Artlist Academy", href: "/academy" },
      ],
    },
    {
      title: "License & Terms",
      links: [
        { label: "Artlist License", href: "/license" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Copyright Policy", href: "/copyright" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ],
];

const footerBrand = {
  title: "Creative tools, built for creators.",
  description:
    "Our mission is to empower creators worldwide to tell their stories through video. We bring opportunity to the creative industry through professional digital assets for video creation, powerful video editing software, and accessible learning resources to support you in achieving your vision.",
};

// Sub-components
function FooterBrand() {
  return (
    <div className="lg:max-w-sm">
      <h3 className="text-lg font-semibold text-white mb-3">
        {footerBrand.title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {footerBrand.description}
      </p>
    </div>
  );
}

function FooterColumn({ section }: { section: FooterSection }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-4">{section.title}</h4>
      <ul className="space-y-3">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-800 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          © {currentYear} Artlist Ltd. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z" />
            </svg>
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function Footer() {
  return (
    <footer className="bg-black text-white mt-48">
      <Container className="py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left side - Brand */}
          <FooterBrand />

          {/* Right side - Link columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {footerColumns.map((column, colIndex) => (
              <div key={colIndex} className="space-y-8">
                {column.map((section) => (
                  <FooterColumn key={section.title} section={section} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <FooterBottom />
      </Container>
    </footer>
  );
}
