import { convertToEuro } from "./convertToEuro";

const LIMIT = 150;
const NP_GLOBAL_FEE = 2.95; // 2.917
const GOVERNMENT__FEE = 0.1;
const VAT_RATE = 0.2;

export const calcCustomsFees = (currency: string | undefined, value: number): number => {
	const priceInEuro = convertToEuro(currency, value);
	const difference = priceInEuro - LIMIT;
	let result = 0;

	if (difference > 0) {
		// result = difference * 0.1 * 1.2 * NP_GLOBAL_FEE;
		result = difference * GOVERNMENT__FEE * (1 + VAT_RATE) * NP_GLOBAL_FEE;
	}

	return result;
};
