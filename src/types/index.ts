export interface OptionItem {
	id: string;
	name: string;
	label: string;
	icon?: string;
}

export interface ProductItem {
	productName: string;
	quantity: number;
	totalPrice: string;
}

export interface CurrencyRate {
	usd: { rate: number };
	eur: { rate: number };
	gbp: { rate: number };
}
