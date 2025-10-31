import Contact from "./_component/Contact";
import Explore from "./_component/Explore";
import FAQSection from "./_component/FAQ";
import Features from "./_component/Features";
import Intro from "./_component/Intro";
import Offer from "./_component/Offer";
import Service from "./_component/Service";
import Overview from "./_component/Overview";
import TestimonialCarousel from "./_component/Testimonial";

export default function page() {
  return (
    <>
      <Intro />
      <Explore
        source={[
          {
            src: "/video/video-1.mp4",
            type: "video/mp4",
          },
        ]}
        title={"Music & SFX"}
        subtitle={"made by top musicians"}
        href={""}
        hrefTitle={""}
      />
      <Explore
        source={[
          {
            src: "/video/video-2.mp4",
            type: "video/mp4",
          },
        ]}
        title={"Music & SFX"}
        subtitle={"made by top musicians"}
        href={""}
        hrefTitle={""}
      />
      <Explore
        source={[
          {
            src: "/video/video-3.mp4",
            type: "video/mp4",
          },
        ]}
        title={"Music & SFX"}
        subtitle={"made by top musicians"}
        href={""}
        hrefTitle={""}
      />
      <Features />
      <Service />
      <Contact />
      <Overview />
      <TestimonialCarousel />
      <Offer />
      <FAQSection />
    </>
  );
}
