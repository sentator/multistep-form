import React from "react";

import { DeliveryFormState, StepperBarItem, UpdateFormValuesFunction } from "../types";

const FORM_DEFAULT_STATE: DeliveryFormState = {
	selectedStepIndex: 0,
	steps: {
		generalInformation: {
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
			value: {
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
		},
		address: {
			value: {
				deliveryAddress: "",
				phoneNumber: "",
			},
		},
	},
};
const FORM_DEFAULT_STEPS: StepperBarItem[] = [
	{ label: "generalInformation", title: "Інформація про відправлення", status: "active" },
	{ label: "address", title: "Адреса отримання", status: "hidden" },
];

interface DeliveryFormContext {
	formState: DeliveryFormState;
	formSteps: StepperBarItem[];
	next: () => void;
	prev: () => void;
	moveToStep: (index: number) => void;
	updateFormValues: UpdateFormValuesFunction;
	isFormConfirmed: boolean;
	addStepDocuments: () => void;
	removeStepDocuments: () => void;
}

export const deliveryFormContext = React.createContext<DeliveryFormContext>({
	formState: FORM_DEFAULT_STATE,
	formSteps: FORM_DEFAULT_STEPS,
	next: () => {},
	prev: () => {},
	moveToStep: (index) => {},
	updateFormValues: (step, newValues) => {},
	isFormConfirmed: false,
	addStepDocuments: () => {},
	removeStepDocuments: () => {},
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const [formState, setFormState] = React.useState<DeliveryFormState>(FORM_DEFAULT_STATE);
	const [isStepDocumentsRequired, setStepDocumentsRequired] = React.useState<boolean>(false);
	const [formSteps, setFormSteps] = React.useState<StepperBarItem[]>(FORM_DEFAULT_STEPS);
	const [isFormConfirmed, setFormConfirmed] = React.useState<boolean>(false);

	const next = () => {
		const currentStepIndex = formState.selectedStepIndex;
		const nextStepIndex = currentStepIndex + 1;
		setFormSteps((prevState) =>
			prevState.map((step, index) => {
				switch (index) {
					case currentStepIndex:
						return {
							...step,
							status: "completed",
						};
					case nextStepIndex:
						return {
							...step,
							status: "active",
						};
					default:
						return {
							...step,
						};
				}
			})
		);
		setFormState((prevState) => ({ ...prevState, selectedStepIndex: nextStepIndex }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const prev = () => {
		const currentStepIndex = formState.selectedStepIndex;
		const prevStepIndex = currentStepIndex - 1;
		setFormSteps((prevState) =>
			prevState.map((step, index) => {
				switch (index) {
					case currentStepIndex:
						return {
							...step,
							status: "hidden",
						};
					case prevStepIndex:
						return {
							...step,
							status: "active",
						};
					default:
						return {
							...step,
						};
				}
			})
		);
		setFormState((prevState) => ({ ...prevState, selectedStepIndex: prevStepIndex }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const showSuccessPage = () => {
		setFormConfirmed(true);
	};

	const addStepDocuments = () => {
		const newStepsArray = [...formSteps];

		if (!newStepsArray.find((step) => step.label === "documents")) {
			newStepsArray.splice(1, 0, { label: "documents", title: "Документи", status: "hidden" });
		}

		setStepDocumentsRequired(true);
		setFormSteps(newStepsArray);
	};

	const removeStepDocuments = () => {
		setFormSteps((prevState) => prevState.filter((step) => step.label !== "documents"));
		setStepDocumentsRequired(false);
	};

	const moveToStep = (index: number) => {
		setFormSteps((prevState) =>
			prevState.map((step, i) => {
				if (i === index) {
					return {
						...step,
						status: "active",
					};
				}

				if (i > index) {
					return {
						...step,
						status: "hidden",
					};
				}

				return { ...step };
			})
		);
		setFormState((prevState) => ({ ...prevState, selectedStepIndex: index }));
	};

	const updateFormValues: UpdateFormValuesFunction = (step, newValues) => {
		setFormState((prevState) => ({
			...prevState,
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
		<deliveryFormContext.Provider
			value={{
				formState,
				formSteps,
				next,
				prev,
				moveToStep,
				updateFormValues,
				isFormConfirmed,
				addStepDocuments,
				removeStepDocuments,
			}}
		>
			{children}
		</deliveryFormContext.Provider>
	);
};

export default Context;
