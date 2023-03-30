import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

import { StepperBarItem } from "../../types";
import StepperBar from "../../components/stepperBar/StepperBar";

import "./deliveryForm.scss";

interface DeliveryFormProps {
	formSteps: StepperBarItem[];
	updateFormStepsStatus: (action: "next" | "prev" | number) => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ formSteps, updateFormStepsStatus }) => {
	const navigate = useNavigate();

	const moveToSelectedStep = (index: number) => {
		const selectedStep = formSteps[index];

		if (selectedStep) {
			updateFormStepsStatus(index);
			navigate(selectedStep.url);
		}
	};

	return (
		<div className="delivery-form-wrapper">
			<h1 className="delivery-form-wrapper__title title">Нове відправлення</h1>
			<div className="delivery-form-wrapper__stepper-bar">
				<StepperBar steps={formSteps} moveToSelectedStep={moveToSelectedStep} />
			</div>
			<div className="delivery-form-wrapper__body">
				<Outlet />
			</div>
		</div>
	);
};

export default DeliveryForm;
