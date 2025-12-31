export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
  return formatted.slice(0, 23); // Max 19 digits + 4 spaces
};

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, "");
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const getCardBrand = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, "");

  if (/^4/.test(cleaned)) return "Visa";
  if (/^5[1-5]/.test(cleaned)) return "Mastercard";
  if (/^3[47]/.test(cleaned)) return "American Express";
  if (/^6(?:011|5)/.test(cleaned)) return "Discover";

  return "Unknown";
};
