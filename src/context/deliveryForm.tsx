import React from "react";

import { DeliveryFormState, UpdateFormValuesFunction } from "../types";

const FORM_DEFAULT_STATE: DeliveryFormState = {
	selectedIndex: 0,
	steps: {
		generalInformation: {
			valid: false,
			dirty: false,
			value: {
				country: null,
				shop: null,
				parcelName: "",
				orderComposition: [{ productName: "", quantity: 1, totalPrice: "0.00" }],
				customsFees: [{ value: false }],
				promocode: "",
				trackNumber: "",
			},
		},
		documents: {
			valid: false,
			dirty: false,
			value: {
				invoice: "",
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
		},
		address: {
			valid: false,
			dirty: false,
			value: {
				deliveryAddress: "",
				phoneNumber: "",
			},
		},
	},
};

interface DeliveryFormContext {
	formState: DeliveryFormState;
	next: () => void;
	prev: () => void;
	setParticularStep: (index: number) => void;
	updateFormValues: UpdateFormValuesFunction;
}

export const deliveryFormContext = React.createContext<DeliveryFormContext>({
	formState: FORM_DEFAULT_STATE,
	next: () => {},
	prev: () => {},
	setParticularStep: (index) => {},
	updateFormValues: (step, newValues) => {},
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const [formState, setFormState] = React.useState<DeliveryFormState>(FORM_DEFAULT_STATE);

	const next = () => {
		setFormState((prevState) => ({ ...prevState, selectedIndex: prevState.selectedIndex + 1 }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const prev = () => {
		setFormState((prevState) => ({ ...prevState, selectedIndex: prevState.selectedIndex - 1 }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const setParticularStep = (index: number) => {
		setFormState((prevState) => ({ ...prevState, selectedIndex: index }));
	};

	const updateFormValues: UpdateFormValuesFunction = (step, newValues) => {
		setFormState((prevState) => ({
			selectedIndex: prevState.selectedIndex,
			steps: {
				...prevState.steps,
				[step]: {
					...prevState.steps[step],
					value: newValues,
				},
			},
		}));
	};
	return (
		<deliveryFormContext.Provider value={{ formState, next, prev, setParticularStep, updateFormValues }}>
			{children}
		</deliveryFormContext.Provider>
	);
};

export default Context;
