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
	invoice: File[] | null;
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
	// title: string;
	// status: "active" | "completed" | "hidden";
	// isExcluded: boolean;
	value: T;
}

export interface DeliveryFormState {
	selectedStepIndex: number;
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

export interface StepperBarItem {
	label: string;
	title: string;
	status: "active" | "completed" | "hidden";
}
