import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

export default function Explore() {
  return (
    <Section className="overflow-hidden">
      <Container className="relative">
        <div className="text-center font-black">
          <span className="text-outline text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold capitalize!">
            Ready to Start your Journey?
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
      <div className="flex flex-col justify-center gap-4">
        <div className="text-center text-white font-semibold">
          Join 5,000+ faith-filled music lovers
        </div>
        <Button shape="pill" className="w-fit mx-auto mt-10 lg:mt-20">
          Start Your Subscription
        </Button>
        <div className="mt-6 text-center">Cancel anytime • No commitments</div>
      </div>
    </Section>
  );
}
