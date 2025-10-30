import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="bg-white">
      <Section padding="lg">
        <Container>
          <div className="space-y-4 text-black text-left">
            <Heading size="h3" as="h2" className="text-black">
              The full power of Artlist built for business
            </Heading>
            <p className="max-w-3xl">
              Get the most advanced AI tools and everything your team needs to
              create anything at scale — fast, secure, and built to transform
              your process. From idea to execution, nothing is off limits.
            </p>
            <Button className="bg-black hover:bg-black/80 text-white">
              Contact Sales
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
