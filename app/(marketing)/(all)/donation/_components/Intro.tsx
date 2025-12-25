import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Image from "next/image";
import Stats from "./Stats";
import BlurSeparator from "@/components/BlurFrame";

export default function Intro() {
  return (
    <div className="intro-height relative bg-black">
      <Image
        src="/images/Rectangle 6244.png"
        alt="Intro Image"
        fill
        className="size-full object-cover"
      />
      <div className="absolute inset-0 flex justify-center">
        <Container>
          <div className="text-center absolute inset-0 flex flex-col justify-center -translate-y-14">
            <Heading as="h1" size="h1" font="serif" align="center">
              Make a Difference Today
            </Heading>
            <div className="max-w-2xl w-full mx-auto mt-2">
              <p className="text-lg font-semibold">
                Your generous donation helps us create lasting change in
                communities around the world
              </p>
            </div>
          </div>
        </Container>
      </div>
      <div className="absolute inset-x-0 bottom-0 translate-y-1/2 z-20">
        <Stats />
      </div>
      <BlurSeparator />
    </div>
  );
}
