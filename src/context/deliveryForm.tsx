import React from "react";

import { DeliveryFormState, StepperBarItem, UpdateFormValuesFunction } from "../types";
import { prepareStepperBarValues } from "../utils";

const FORM_DEFAULT_STATE: DeliveryFormState = {
	selectedStepIndex: 0,
	requiredSteps: [0, 2],
	steps: {
		generalInformation: {
			title: "Інформація про відправлення",
			status: "active",
			isExcluded: false,
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
			title: "Документи",
			status: "hidden",
			isExcluded: false,
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
			title: "Адреса отримання",
			status: "hidden",
			isExcluded: false,
			value: {
				deliveryAddress: "",
				phoneNumber: "",
			},
		},
	},
};

interface DeliveryFormContext {
	formState: DeliveryFormState;
	stepperBarValues: StepperBarItem[];
	next: () => void;
	prev: () => void;
	setParticularStep: (index: number) => void;
	updateFormValues: UpdateFormValuesFunction;
}

export const deliveryFormContext = React.createContext<DeliveryFormContext>({
	formState: FORM_DEFAULT_STATE,
	stepperBarValues: [],
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

	const stepperBarValues = prepareStepperBarValues(formState.steps);

	const next = () => {
		let nextStepIndex = formState.selectedStepIndex + 1;

		if (!formState.requiredSteps.includes(nextStepIndex) && nextStepIndex <= formState.requiredSteps.length) {
			nextStepIndex += 1;
		}

		setFormState((prevState) => ({ ...prevState, selectedStepIndex: nextStepIndex }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const prev = () => {
		setFormState((prevState) => ({ ...prevState, selectedStepIndex: prevState.selectedStepIndex - 1 }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const setParticularStep = (index: number) => {
		setFormState((prevState) => ({ ...prevState, selectedStepIndex: index }));
	};

	// const updateFormValues: UpdateFormValuesFunction = (step, newValues) => {
	// 	setFormState((prevState) => ({
	// 		selectedIndex: prevState.selectedIndex,
	// 		steps: {
	// 			...prevState.steps,
	// 			[step]: {
	// 				...prevState.steps[step],
	// 				value: newValues,
	// 			},
	// 		},
	// 	}));
	// };
	const updateFormValues: UpdateFormValuesFunction = (step, newValues) => {
		setFormState((prevState) => ({
			...prevState,
			steps: {
				...prevState.steps,
				[step]: {
					...prevState.steps[step],
					status: "completed",
					value: newValues,
				},
			},
		}));
	};

	return (
		<deliveryFormContext.Provider
			value={{ formState, stepperBarValues, next, prev, setParticularStep, updateFormValues }}
		>
			{children}
		</deliveryFormContext.Provider>
	);
};

export default Context;
