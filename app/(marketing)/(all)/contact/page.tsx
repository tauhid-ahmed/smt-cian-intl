import ContactMethodsSection from "./_components/Contact";
import ContactForm from "./_components/ContactForm";
import Intro from "./_components/Intro";
import QuickAnswerSection from "./_components/QuickAnswer";
import WorkDemo from "./_components/WorkDemo";

export default function page() {
  return (
    <>
      <Intro />
      <WorkDemo />
      <ContactForm />
      <QuickAnswerSection />
      <ContactMethodsSection />
    </>
  );
}
