import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function Mission() {
  return (
    <Section className="overflow-hidden">
      <Container className="relative">
        <div className="text-center font-black">
          <span className="text-outline text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold capitalize!">
            Our Mission
          </span>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0) 20%, black 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0) 20%, black 100%)",
          }}
        />
      </Container>
      <div className="text-center max-w-3xl mx-auto text-2xl text-gray-300">
        <blockquote>
          &apos;&apos;To amplify voices that glorify God and create a community
          where faith and music intersect to change lives.&apos;&apos;
        </blockquote>
      </div>
    </Section>
  );
}
