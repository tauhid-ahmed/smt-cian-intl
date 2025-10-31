import { Heading } from "@/components/Heading";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import TextCarousel from "@/components/TextCarousel";

const testimonials = [
  {
    id: 1,
    text: "I have been listening to Fridia kanil for a while now, and every song feels like a story i can relate to. The lyrics are heartfelt, and the production is top-notch. Truly one of the most talented musicians out there!",
    author: "Sam Newton",
    role: "YouTuber",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    text: "An incredible artist with a unique voice. Every track takes you on an emotional journey that stays with you long after the music stops. The attention to detail in production is outstanding.",
    author: "Emily Chen",
    role: "Music Blogger",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    text: "I've been following this artist's work for years, and the growth and evolution in their sound is remarkable. Each album brings something fresh while staying true to their artistic vision.",
    author: "Marcus Johnson",
    role: "Radio Host",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    text: "The songwriting is pure poetry set to music. It's rare to find an artist who can balance commercial appeal with genuine artistic integrity so effortlessly.",
    author: "Sophie Martinez",
    role: "Music Producer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    text: "Every performance is electric. The passion and energy this artist brings to their craft is infectious. Can't wait to see what comes next!",
    author: "David Park",
    role: "Podcast Host",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

export default function Testimonial() {
  return (
    <Section>
      <Container>
        <Heading as="h2" size="h4" align="center">
          Artist Voice
        </Heading>
        <TextCarousel data={testimonials} />
      </Container>
    </Section>
  );
}
