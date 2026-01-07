import Intro from "../artists/_components/Intro";
import Footer from "@/components/layout/Footer";
import ArtistListSection from "../artists/_components/ArtistListSection";

export default function ArtistsPage() {
    return (
        <div className="bg-black min-h-screen">
            <Intro />
            <ArtistListSection />
            <Footer />
        </div>
    );
}
