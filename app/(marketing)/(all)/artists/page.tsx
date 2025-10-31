import Newsletter from "@/components/Newsletter";
import ArtistBiography from "./_components/ArtistBiography";
import Discography from "./_components/Discography";
import Intro from "./_components/Intro";
import ArtistMerchandise from "./_components/Merchandise";
import Service from "./_components/Service";
import Stats from "./_components/Stats";

export default function ArtistsPage() {
  return (
    <>
      <Intro />
      <Stats />
      <Service />
      <ArtistBiography />
      <Discography />
      <ArtistMerchandise />
      <Newsletter />
    </>
  );
}
