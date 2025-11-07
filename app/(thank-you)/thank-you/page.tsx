import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import { LucideHeart } from "lucide-react";
import { Heading } from "@/components/Heading";
import Section from "@/components/layout/Section";

export default function ThankYouPage() {
  return (
    <Section padding="lg">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="size-25 bg-sidebar mx-auto flex items-center justify-center rounded-full">
            <LucideHeart className="text-primary fill-primary size-[50px]" />
          </div>
          <Heading
            as="h2"
            size="h1"
            align="center"
            weight="normal"
            className="mt-8"
          >
            Thank you for sowing into God’s work!
          </Heading>
          <div className="text-center text-lg lg:text-2xl">
            <p className="mt-8">
              Your gift is helping bring hope and healing through Christ.
            </p>
            <div className="px-16 lg:px-24 mt-12">
              <div className="h-px bg-linear-to-r from-transparent via-white to-transparent"></div>
            </div>
            <p className="bg-white text-black mx-auto px-10 py-8 rounded mt-16 lg:mt-24">
              Because of you, children are learning God's Word and families are
              being restored.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 text-black bg-white rounded-full px-4 py-2 text-[22px] text-uppercase">
            GOD’S PROMISE
          </div>
          <div className="mt-12 md:mt-20 lg:mt-44 bg-linear-to-r from-white via-transparent to-white max-w-5xl w-full mx-auto p-4 relative before:absolute before:inset-px before:bg-accent rounded overflow-hidden before:rounded py-10 border-gray-700 border">
            <figure className="max-w-xl mx-auto z-10 text-center font-normal relative">
              <blockquote
                className="italic text-white text-2xl font-normal!"
                aria-label="Bible verse from Hebrews 6:10"
              >
                “God is not unjust; He will not forget your work and the love
                you have shown Him.”
              </blockquote>
              <figcaption className="mt-6 text-gray-300">
                — <cite className="not-italic">Hebrews 6:10</cite>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="mt-12 md:mt-20 lg:mt-44 max-w-5xl w-full mx-auto p-4 relative py-10 text-center">
          <Heading size="h5" as="h2" align="center" weight="normal">
            Stay Connected
          </Heading>
          <p className="text-center font-normal! mt-4">
            Because of you, children are learning God's Word and families are
            being restored.
          </p>
        </div>
        <div className="max-w-lg w-full mx-auto">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
            <Input
              placeholder="Enter your email address"
              className="md:flex-1 h-10"
            />
            <Button className="bg-[#D6B46D] hover:bg-[#D6B46D] w-full md:w-auto hover:opacity-90">
              Join Updates
            </Button>
          </div>
        </div>
        <div className="px-16 lg:px-24 mt-20 max-w-xl mx-auto">
          <div className="h-px bg-linear-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>
        <div className="flex flex-col justify-center items-center mt-14 gap-4">
          <span>With gratitude and blessings,</span>
          <span className="text-5xl">Pastor Michael Thompson</span>
        </div>
      </Container>
    </Section>
  );
}
