import { OptionItem, ProductItem } from ".";

export interface StepGeneralInformationValues {
	country: OptionItem | null;
	shop: OptionItem | null;
	parcelName: string;
	orderComposition: ProductItem[];
	customsFees: [{ value: boolean }];
	promocode: string;
	trackNumber: string;
}
export interface StepDocumentsValues {
	invoice: FileList | "";
	lastName: string;
	firstName: string;
	patronymicName: string;
	passport: string;
	birthDate: Date | null;
	passportIssueDate: Date | null;
	passportIssuedBy: string;
	registrationAddress: string;
	identificationNumber: string;
}
export interface StepAddressValues {
	deliveryAddress: string;
	phoneNumber: string;
}

interface DeliveryFormStep<T> {
	valid: boolean;
	dirty: boolean;
	value: T;
}

export interface DeliveryFormState {
	selectedIndex: number;
	steps: {
		generalInformation: DeliveryFormStep<StepGeneralInformationValues>;
		documents: DeliveryFormStep<StepDocumentsValues>;
		address: DeliveryFormStep<StepAddressValues>;
	};
}

export type UpdateFormValuesFunction = (
	step: keyof DeliveryFormState["steps"],
	newValues: DeliveryFormState["steps"][typeof step]["value"]
) => void;