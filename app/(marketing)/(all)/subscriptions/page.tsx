import Explore from "./_components/Explore";
import FAQSection from "./_components/FAQ";
import HowItWorks from "./_components/HowItWorks";
import Intro from "./_components/Intro";
import BoxShowcase from "./_components/MagicBox";
import MembershipPricing from "./_components/Plans";
import Testimonial from "./_components/Testimonial";

export default function page() {
  return (
    <>
      <Intro />
      <HowItWorks />
      <MembershipPricing />
      <BoxShowcase />
      <Testimonial />
      <FAQSection />
      <Explore />
    </>
  );
}
