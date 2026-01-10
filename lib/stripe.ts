/**
 * Stripe utility for manual API calls
 * Note: In a production environment, you would use the official Stripe SDK
 * and handle secrets securely on the server side.
 */

const STRIPE_AUTH =
    "Bearer pk_test_51PMlmpAE1lXUvAexf8vaM2B30fSC9XXARvezhEHlCc8sePnReLWl42at82unsE0LIfdw9FkmDNPybHkw7qGHnDAm00atqOe0Z0";

export interface CreatePaymentMethodData {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
}

export const createPaymentMethod = async (card: CreatePaymentMethodData) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("type", "card");
    urlencoded.append("card[number]", card.number);
    urlencoded.append("card[exp_month]", card.exp_month);
    urlencoded.append("card[exp_year]", card.exp_year);
    urlencoded.append("card[cvc]", card.cvc);

    const response = await fetch("https://api.stripe.com/v1/payment_methods", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: STRIPE_AUTH,
        },
        body: urlencoded,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.error?.message || "Failed to create payment method"
        );
    }

    return response.json();
};

export const confirmPaymentIntent = async (
    paymentIntentId: string,
    paymentMethodId: string,
    clientSecret: string
) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("payment_method", paymentMethodId);
    urlencoded.append("client_secret", clientSecret);
    // In a real app, this would be a real URL
    urlencoded.append(
        "return_url",
        `${window.location.origin}/payment-success`
    );

    const response = await fetch(
        `https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: STRIPE_AUTH,
            },
            body: urlencoded,
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.error?.message || "Failed to confirm payment"
        );
    }

    return response.json();
};
