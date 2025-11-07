import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";

export default function Studio() {
  return (
    <Section padding="lg" className="p-0!">
      <div className="relative h-screen">
        <Container>
          <div className="relative h-[80vh] overflow-hidden rounded-lg opacity-75">
            <Image
              src="https://images.unsplash.com/photo-1617886971858-4234921a7540?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1177"
              alt="studio"
              fill
              className="absolute inset-0 object-cover"
            />
          </div>
        </Container>
        <div className="absolute top-0 py-10 inset-x-0 z-10">
          <Container>
            <div className="text-center">
              <Heading as="h2" size="h3" align="center">
                Behind the scenes
              </Heading>
              <p>Studio sessions, live performances, and moments with fans</p>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}
