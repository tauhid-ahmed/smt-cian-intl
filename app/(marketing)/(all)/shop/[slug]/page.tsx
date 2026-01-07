import RelatedAlbums from "../_components/RelatedAlbums";
import CustomerReviewsSection from "./_components/Comments";
import ProductDetail from "./_components/Details";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetails({ params }: Props) {
    const { slug } = await params;

    return (
        <>
            <ProductDetail slug={slug} />
            <CustomerReviewsSection />
            <RelatedAlbums />
        </>
    );
}
