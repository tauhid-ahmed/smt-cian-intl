"use client";

import { CheckCircle } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { useGetPlansQuery } from "@/lib/api/planApi";

// ==================== TYPE DEFINITIONS ====================
interface Feature {
    text: string;
}

interface MembershipPlan {
    id: string;
    name: string;
    price?: string;
    isPopular?: boolean;
    features: Feature[];
    buttonText: string;
    buttonStyle: "outline" | "solid";
    borderColor?: string;
}

interface GlobalFeature {
    text: string;
}

// ==================== MEMBERSHIP CARD COMPONENT ====================
function MembershipCard({
    plan,
    onSelect,
}: {
    plan: MembershipPlan;
    onSelect: () => void;
}) {
    return (
        <div
            className={`rounded-2xl p-8 border-2 relative flex flex-col h-full ${plan.borderColor || "border-gray-700"
                } hover:border-gray-600 transition-all`}
        >
            <div className="flex items-center justify-between">
                <Heading as="h3" size="h5">
                    {plan.name}
                </Heading>

                {plan.isPopular && (
                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                        Popular
                    </span>
                )}
            </div>

            {/* Price */}
            <div className="my-8">
                <p className="text-5xl font-bold text-yellow-500">{plan.price}</p>
            </div>

            {/* Features - Flexible grow section */}
            <div className="space-y-4 mb-8 grow">
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="size-5.5 text-white shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-lg">{feature.text}</span>
                    </div>
                ))}
            </div>

            {/* Select Button - Always at bottom */}
            <Button
                onClick={onSelect}
                shape="lg"
                size="lg"
                variant={plan.buttonStyle === "solid" ? "secondary" : "outline"}
            >
                {plan.buttonText}
            </Button>
        </div>
    );
}

// ==================== DEFAULT DATA ====================
const defaultGlobalFeatures: GlobalFeature[] = [
    { text: "Cancel anytime" },
    { text: "Pause subscription" },
    { text: "Swap/skip months" },
    { text: "Exclusive discounts" },
    { text: "Birthday gifts" },
];

// ==================== MAIN COMPONENT ====================
function MembershipPricing({
    title = "Choose Your Membership",
    globalFeatures = defaultGlobalFeatures,
}) {
    const { data: plansData, isLoading, isError } = useGetPlansQuery();

    if (isLoading) {
        return (
            <Section padding="lg" className="bg-sidebar">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-zinc-400 font-medium animate-pulse">Loading Membership Plans...</p>
                    </div>
                </Container>
            </Section>
        );
    }

    if (isError) {
        return (
            <Section padding="lg" className="bg-sidebar">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                        <p className="text-red-500 font-bold text-xl mb-2">Oops! Something went wrong.</p>
                        <p className="text-gray-400">We couldn't load the plans. Please try again later.</p>
                    </div>
                </Container>
            </Section>
        );
    }

    const apiPlans = plansData?.data || [];

    // Custom plan for Church (usually custom)
    const churchPlan: MembershipPlan = {
        id: "church",
        name: "Church",
        price: "Custom Pricing",
        features: [
            { text: "Bulk licenses" },
            { text: "Custom selection" },
            { text: "Group rates" },
            { text: "Church resources" },
            { text: "Bulk downloads" },
        ],
        buttonText: "Contact us",
        buttonStyle: "outline",
    };

    const formattedPlans = [
        ...apiPlans.map((plan): MembershipPlan => ({
            id: plan.id,
            name: plan.publicName,
            price: `$${plan.price}/${plan.interval === 'month' ? 'mo' : plan.interval === 'year' ? 'yr' : 'wk'}`,
            isPopular: plan.isPopular,
            features: plan.features.map(f => ({ text: f })),
            buttonText: "Select",
            buttonStyle: plan.isPopular ? "solid" : "outline",
            borderColor: plan.isPopular ? "border-yellow-500" : undefined
        })),
        churchPlan
    ];

    return (
        <Section padding="lg" className="bg-sidebar" >
            <Container>
                <Heading as="h2" size="h3" align="center">
                    {title}
                </Heading>

                {/* Membership Cards Grid - Equal height with flexbox */}
                <div id="membership" className="scroll-mt-48 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16 items-stretch">
                    {formattedPlans.map((plan) => (
                        <MembershipCard
                            key={plan.id}
                            plan={plan}
                            onSelect={() => console.log(`Selected plan: ${plan.id}`)}
                        />
                    ))}
                </div>

                {/* Global Features */}
                <div className="text-center">
                    <Heading as="h3" size="h5" weight="normal" align="center">
                        All plans include:
                    </Heading>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 mt-6">
                        {globalFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="size-5.5 text-white shrink-0" />
                                <span className="text-gray-300 text-lg">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}

export default MembershipPricing;
