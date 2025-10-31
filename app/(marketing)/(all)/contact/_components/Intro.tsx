import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Image from "next/image";

export default function Intro() {
  return (
    <div className="intro-height relative bg-black">
      <Image
        src="/images/artist.webp"
        alt="Intro Image"
        fill
        className="size-full object-cover"
      />
      <div className="absolute inset-0 flex justify-center">
        <Container>
          <div className="text-center absolute inset-0 flex flex-col justify-center -translate-y-14">
            <Heading as="h1" size="h1" font="serif" align="center">
              Get In Touch
            </Heading>
            <div className="max-w-2xl w-full mx-auto mt-2">
              <p className="text-lg font-semibold">
                We'd love to hear from you
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
