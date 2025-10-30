import FAQ from "@/components/FAQ";
import { Heading } from "@/components/Heading";
import Section from "@/components/layout/Section";

const faqData = [
  {
    question: "What is Cian Intl?",
    answer:
      "Cian Intl is a platform that allows users to discover artists and shop for unique products.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach out via the contact page or send us an email at support@cianintl.com.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we have a 30-day refund policy for eligible purchases.",
  },
];

export default function FAQSection() {
  return (
    <Section title={"Frequently asked questions"}>
      <FAQ items={faqData} />
    </Section>
  );
}
