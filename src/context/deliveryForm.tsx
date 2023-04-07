import React from "react";
import { v4 as uuidv4 } from "uuid";

import { DeliveryFormState, StepAddressValues, StepDocumentsValues, StepGeneralInformationValues } from "../types";

const FORM_DEFAULT_STATE: DeliveryFormState = {
	generalInformation: {
		country: null,
		shop: null,
		parcelName: "",
		orderComposition: [{ id: uuidv4(), productName: "", quantity: 1, totalPrice: 0 }],
		customsFees: [{ value: true }],
		promocode: "",
		trackNumber: "",
	},
	documents: {
		invoice: null,
		lastName: "",
		firstName: "",
		patronymicName: "",
		passport: "",
		birthDate: null,
		passportIssueDate: null,
		passportIssuedBy: "",
		registrationAddress: "",
		identificationNumber: "",
	},
	address: {
		deliveryAddress: "",
		phoneNumber: "",
	},
};

interface DeliveryFormContext {
	formState: DeliveryFormState;
	updateGeneralInformation: (value: StepGeneralInformationValues) => void;
	updateDocuments: (value: StepDocumentsValues) => void;
	updateAddress: (value: StepAddressValues) => void;
	clearContextData: () => void;
	isDocumentsRequired: boolean;
	addStepDocuments: () => void;
	removeStepDocuments: () => void;
}

export const deliveryFormContext = React.createContext<DeliveryFormContext>({
	formState: FORM_DEFAULT_STATE,
	updateGeneralInformation: (value) => {},
	updateDocuments: (value) => {},
	updateAddress: (value) => {},
	clearContextData: () => {},
	isDocumentsRequired: false,
	addStepDocuments: () => {},
	removeStepDocuments: () => {},
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const [formState, setFormState] = React.useState<DeliveryFormState>(FORM_DEFAULT_STATE);
	const [isDocumentsRequired, setDocumentsRequired] = React.useState<boolean>(false);

	const updateGeneralInformation = (value: StepGeneralInformationValues) => {
		setFormState({ ...formState, generalInformation: value });
	};

	const updateDocuments = (value: StepDocumentsValues) => {
		setFormState({ ...formState, documents: value });
	};

	const updateAddress = (value: StepAddressValues) => {
		setFormState({ ...formState, address: value });
	};

	const clearContextData = () => {
		setFormState(FORM_DEFAULT_STATE);
	};

	const addStepDocuments = () => {
		setDocumentsRequired(true);
	};

	const removeStepDocuments = () => {
		setDocumentsRequired(false);
	};

	return (
		<deliveryFormContext.Provider
			value={{
				formState,
				updateGeneralInformation,
				updateDocuments,
				updateAddress,
				clearContextData,
				isDocumentsRequired,
				addStepDocuments,
				removeStepDocuments,
			}}
		>
			{children}
		</deliveryFormContext.Provider>
	);
};

export default Context;
