import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";

export default function Studio() {
  return (
    <Section padding="lg" className="p-0!">
      <div className="relative lg:min-h-screen md:min-h-screen h-[500px] flex items-center">
        <Container>
          <div
            className="
              relative
              w-full
              h-[45vh]
              sm:h-[55vh]
              md:h-[65vh]
              lg:h-[75vh]
              xl:h-[80vh]
              overflow-hidden
              rounded-lg
              opacity-75 cursor-pointer
            "
          >
            <Image
              src="/images/behind-the-image.png"
              alt="studio"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Container>
        <div
          className="
            absolute
            inset-x-0
            top-0
            z-10
            pt-6
            sm:pt-10
            md:pt-14
            lg:pt-20
          "
        >
          <Container>
            <div className="text-center">
              <h2
                className="
                  text-[#D9D9D9]
                  font-bold
                  mb-3
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  lg:text-5xl
                "
              >
                Behind the scenes
              </h2>

              <p
                className="
                  text-[#D9D9D9]
                  font-medium
                  text-sm
                  sm:text-base
                  md:text-lg
                  lg:text-xl
                "
              >
                Studio sessions, live performances, and moments with fans
              </p>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
