import { CURRENCY_CONVERSION_RATES } from "./database";

export const convertToEuro = (currency: string | undefined, value: number): number => {
	switch (currency) {
		case "usd":
		case "eur":
		case "gbp":
			return value * CURRENCY_CONVERSION_RATES[currency].rate;
		default:
			return 0;
	}
};
