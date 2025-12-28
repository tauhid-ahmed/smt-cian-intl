"use client";
import { Button } from "@/components/ui/button";

export default function PricingButton() {
  const handleScroll = () => {
    const membershipSection = document.getElementById("membership");
    if (membershipSection) {
      membershipSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button onClick={handleScroll} size="lg" className="mt-6">
      See Plans & Pricing
    </Button>
  );
}
