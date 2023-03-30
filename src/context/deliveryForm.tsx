import React from "react";

import { DeliveryFormState, StepperBarItem, UpdateFormValuesFunction } from "../types";

const FORM_DEFAULT_STATE: DeliveryFormState = {
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
	{
		label: "generalInformation",
		title: "Інформація про відправлення",
		status: "editing",
		url: "/new-order/generalInformation",
	},
	{ label: "address", title: "Адреса отримання", status: "hidden", url: "/new-order/address" },
];

interface DeliveryFormContext {
	formState: DeliveryFormState;
	formSteps: StepperBarItem[];
	updateFormValues: UpdateFormValuesFunction;
	updateFormStepsStatus: (action: "next" | "prev" | number) => void;
	isStepDocumentsRequired: boolean;
	addStepDocuments: () => void;
	removeStepDocuments: () => void;
	clearContextData: () => void;
}

export const deliveryFormContext = React.createContext<DeliveryFormContext>({
	formState: FORM_DEFAULT_STATE,
	formSteps: FORM_DEFAULT_STEPS,
	updateFormValues: (step, newValues) => {},
	updateFormStepsStatus: (action) => {},
	isStepDocumentsRequired: false,
	addStepDocuments: () => {},
	removeStepDocuments: () => {},
	clearContextData: () => {},
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const [formState, setFormState] = React.useState<DeliveryFormState>(FORM_DEFAULT_STATE);
	const [isStepDocumentsRequired, setStepDocumentsRequired] = React.useState<boolean>(false);
	const [formSteps, setFormSteps] = React.useState<StepperBarItem[]>(FORM_DEFAULT_STEPS);

	const addStepDocuments = () => {
		const newStepsArray = [...formSteps];

		if (!newStepsArray.find((step) => step.label === "documents")) {
			newStepsArray.splice(1, 0, {
				label: "documents",
				title: "Документи",
				status: "hidden",
				url: "/new-order/documents",
			});
		}

		setFormSteps(newStepsArray);
		setStepDocumentsRequired(true);
	};

	const removeStepDocuments = () => {
		const newStepsArray = formSteps.filter((step) => step.label !== "documents");

		setFormSteps(newStepsArray);
		setStepDocumentsRequired(false);
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

	const updateFormStepsStatus = (action: "next" | "prev" | number) => {
		const currentStepIndex = formSteps.findIndex((item) => item.status === "editing");
		let newFormSteps = [...formSteps];

		if (action === "next") {
			const nextStepIndex = currentStepIndex + 1;
			newFormSteps = formSteps.map((step, index) => {
				switch (index) {
					case currentStepIndex:
						return {
							...step,
							status: "completed",
						};
					case nextStepIndex:
						return {
							...step,
							status: "editing",
						};
					default:
						return {
							...step,
						};
				}
			});
		}

		if (action === "prev") {
			const prevStepIndex = currentStepIndex - 1;
			newFormSteps = formSteps.map((step, index) => {
				switch (index) {
					case currentStepIndex:
						return {
							...step,
							status: "hidden",
						};
					case prevStepIndex:
						return {
							...step,
							status: "editing",
						};
					default:
						return {
							...step,
						};
				}
			});
		}

		if (typeof action === "number") {
			newFormSteps = formSteps.map((step, i) => {
				if (i === action) {
					return {
						...step,
						status: "editing",
					};
				}

				if (i > action) {
					return {
						...step,
						status: "hidden",
					};
				}

				return { ...step };
			});
		}

		setFormSteps(newFormSteps);
	};

	const clearContextData = () => {
		setFormState(FORM_DEFAULT_STATE);
		setFormSteps(FORM_DEFAULT_STEPS);
		setStepDocumentsRequired(false);
	};

	return (
		<deliveryFormContext.Provider
			value={{
				formState,
				formSteps,
				updateFormValues,
				updateFormStepsStatus,
				isStepDocumentsRequired,
				addStepDocuments,
				removeStepDocuments,
				clearContextData,
			}}
		>
			{children}
		</deliveryFormContext.Provider>
	);
};

export default Context;
