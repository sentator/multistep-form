import { DeliveryFormState, StepperBarItem } from "../types";

export const prepareStepperBarValues = (steps: DeliveryFormState["steps"]): StepperBarItem[] => {
	const rawValues = Object.entries(steps).map((item) => {
		return {
			label: item[0],
			title: item[1].title,
			status: item[1].status,
			isExcluded: item[1].isExcluded,
		};
	});

	const filteredValues = rawValues.filter((step) => !step.isExcluded);
	const preparedValues = filteredValues.map(({ isExcluded, ...rest }) => ({ ...rest }));

	return preparedValues;
};
