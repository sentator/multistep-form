import {
	StepGeneralInformationValues,
	StepDocumentsValues,
	StepAddressValues,
	DeliveryFormState,
	StepperBarItem,
} from "./deliveryForm";
interface OptionItem {
	id: string;
	name: string;
	label: string;
	icon?: string;
}

interface ProductItem {
	id: string;
	productName: string;
	quantity: number;
	totalPrice: number;
}

interface CurrencyRate {
	usd: { rate: number };
	eur: { rate: number };
	gbp: { rate: number };
}

interface OrderResponseData {
	_id: string;
	data: {
		generalInformation: {
			country: OptionItem;
			shop: OptionItem;
			parcelName: string;
			orderComposition: ProductItem[];
			customsFees: [{ value: boolean }];
			promocode: string;
			trackNumber: string;
		};
		documents?: {
			invoice: UploadedFile[];
			lastName: string;
			firstName: string;
			patronymicName: string;
			passport: string;
			birthDate: Date;
			passportIssueDate: Date;
			passportIssuedBy: string;
			registrationAddress: string;
			identificationNumber: string;
		};
		address: {
			deliveryAddress: string;
			phoneNumber: string;
		};
	};
	createdAt: string;
	updatedAt: string;
}

interface UploadedFile {
	originalName: string;
	fileName: string;
	fileUrl: string;
}

interface OrdersTableData {
	country: OptionItem | { name: string; icon: null };
	shop: OptionItem | { name: string };
	parcelName: string;
	productName: string;
	quantity: number;
	totalPrice: string;
	promocode: string;
	trackNumber: string;
	subRows: OrdersTableData[] | null;
}

export type {
	OptionItem,
	ProductItem,
	CurrencyRate,
	StepGeneralInformationValues,
	StepDocumentsValues,
	StepAddressValues,
	DeliveryFormState,
	StepperBarItem,
	OrderResponseData,
	UploadedFile,
	OrdersTableData,
};
