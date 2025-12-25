import { Heading } from "@/components/Heading";
import Intro from "../artists/_components/Intro";
import Container from "@/components/layout/Container";  
import Footer from "@/components/layout/Footer";
import ArtistListSection from "../artists/_components/ArtistListSection";

export default function ArtistsPage() {
    return (
        <>
            <Intro />
            <Container>
                <div className="my-24 max-w-7xl mx-auto">
                    <Heading>
                        All Artists
                    </Heading>
                </div>
                <ArtistListSection/>
            </Container>
            <Footer/>
        </>
    );
}

