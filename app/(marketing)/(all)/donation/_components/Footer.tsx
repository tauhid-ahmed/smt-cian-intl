import Section from "@/components/layout/Section";

export default function Footer() {
  return (
    <Section>
      <div className="flex justify-center relative">
        <span className="text-outline text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold capitalize!">
          Other Ways to Give
        </span>
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
      </div>
    </Section>
  );
}
