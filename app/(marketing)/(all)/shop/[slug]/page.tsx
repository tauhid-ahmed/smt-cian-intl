import RelatedAlbums from "../_components/RelatedAlbums";
import CustomerReviewsSection from "./_components/Comments";
import ProductDetail from "./_components/Details";

export default function ProductDetails() {
  return (
    <>
      <ProductDetail />
      <CustomerReviewsSection />
      <RelatedAlbums />
    </>
  );
}
