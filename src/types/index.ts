import {
	StepGeneralInformationValues,
	StepDocumentsValues,
	StepAddressValues,
	DeliveryFormState,
	UpdateFormValuesFunction,
} from "./deliveryForm";
interface OptionItem {
	id: string;
	name: string;
	label: string;
	icon?: string;
}

interface ProductItem {
	productName: string;
	quantity: number;
	totalPrice: string;
}

interface CurrencyRate {
	usd: { rate: number };
	eur: { rate: number };
	gbp: { rate: number };
}

export type {
	OptionItem,
	ProductItem,
	CurrencyRate,
	StepGeneralInformationValues,
	StepDocumentsValues,
	StepAddressValues,
	DeliveryFormState,
	UpdateFormValuesFunction,
};
