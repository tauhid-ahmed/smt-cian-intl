
'use client'

import EditArtistPage from "@/components/adminDashboard/contentManagement/EditArtistPage";
import { useParams } from "next/navigation";

const Page = () => {
    const {id } = useParams() ; 
    console.log(id)
  return (
    <div>
      <EditArtistPage artistId={id as string} />
    </div>
  );
};

export default Page;
