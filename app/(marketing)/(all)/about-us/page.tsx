import CTASection from "./_components/CTACard";
import Intro from "./_components/Intro";
import Mission from "./_components/Mission";
import WhatWeStandFor from "./_components/OurStand";
import Stats from "./_components/Stats";
import OurStory from "./_components/Story";
import MeetTheTeam from "./_components/Team";
import Testimonial from "./_components/Testimonial";
import VideoIntro from "./_components/VideoIntro";

export default function page() {
  return (
    <>
      <Intro />
      <Mission />
      <OurStory />
      <VideoIntro />
      <WhatWeStandFor />
      <MeetTheTeam />
      <Stats />
      <Testimonial />
      <CTASection />
    </>
  );
}
