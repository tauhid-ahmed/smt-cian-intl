import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Image from "next/image";
import Stats from "./Stats";
import BlurSeparator from "@/components/BlurFrame";

export default function Intro() {
  return (
    <div className="intro-height relative bg-black">
      <Image
        src="https://images.unsplash.com/photo-1694286068127-ae7d036ccec5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
        alt="Intro Image"
        fill
        className="size-full object-cover"
      />
      <div className="absolute inset-0 flex justify-center">
        <Container>
          <div className="text-center absolute inset-0 flex flex-col justify-center -translate-y-14">
            <Heading as="h1" size="h1" font="serif" align="center">
              About CIAN Collective
            </Heading>
            <div className="max-w-2xl w-full mx-auto mt-2">
              <p className="text-lg font-semibold">
                Spreading Faith Through Music
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
