import React from "react";
import { Outlet } from "react-router";

import { StepperBarItem } from "../../types";
import StepperBar from "../../components/stepperBar/StepperBar";

import "./deliveryForm.scss";

interface DeliveryFormProps {
	formSteps: StepperBarItem[];
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ formSteps }) => {
	return (
		<div className="delivery-form-wrapper">
			<h1 className="delivery-form-wrapper__title title">Нове відправлення</h1>
			<div className="delivery-form-wrapper__stepper-bar">
				<StepperBar steps={formSteps} />
			</div>
			<div className="delivery-form-wrapper__body">
				<Outlet />
			</div>
		</div>
	);
};

export default DeliveryForm;
