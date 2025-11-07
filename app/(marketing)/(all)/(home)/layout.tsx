import Footer from "@/components/layout/Footer";

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      {children} <Footer />
    </>
  );
}
