"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import parse from "html-react-parser";
import { twMerge } from "tailwind-merge";

interface DonateMethod {
  method: string;
  description: string;
  address: string;
}

const donateMethodData: DonateMethod[] = [
  {
    method: "Donate by Check",
    description: "Make checks payable to our organization and mail to",
    address: "123 Charity Lane, Suite 456 Philanthropy City, CA 90210",
  },
  {
    method: "Stock or Securities",
    description: "Transfer appreciated securities for potential tax benefits.",
    address:
      "<span>Contact our development team at</span> <span class='block text-sm'>giving@organization.org for transfer instructions.</span>",
  },
  {
    method: "Donor-Advised Fund (DAF)",
    description: "Recommend a grant from your DAF account.",
    address:
      "<span>Our legal name: Community Impact Foundation</span> <span class='block text-sm'>EIN: 12-3456789</span>",
  },
];

export default function Footer() {
  return (
    <Section>
      <div className="flex justify-center relative mb-16">
        <h2 className="text-outline text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-center text-white">
          Other Ways to Give
        </h2>

        {/* Subtle gradient overlay for polish */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0) 20%, black 100%)",
          }}
        />
      </div>

      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 place-items-stretch max-w-340 mx-auto">
          {donateMethodData.map((method) => (
            <div
              key={method.method}
              className={twMerge(
                "group w-full bg-linear-to-br from-gray-50 to-zinc-100",
                "rounded-3xl p-px border border-zinc-700 hover:border-zinc-500 transition-all duration-300"
              )}
            >
              <div className="bg-white rounded-3xl p-8 h-full flex flex-col justify-between shadow-lg">
                <div className="space-y-6!">
                  <h3 className="text-gray-950 text-2xl font-bold mb-2">
                    {method.method}
                  </h3>
                  <p className="text-gray-950 mb-4 text-xl">
                    {method.description}
                  </p>

                  <div className="text-gray-800 leading-relaxed bg-zinc-100 rounded p-4 text-sm">
                    {parse(method.address)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 text-sm font-medium">
          © 2025 CIAN Collective. All rights reserved.
        </div>
      </Container>
    </Section>
  );
}
