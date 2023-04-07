import React from "react";
import { useNavigate } from "react-router";

import { StepperBarItem } from "../../../../types";
import { deliveryFormContext } from "../../../../context";
import { useDeliveryFormService } from "../../../../hooks";
import StepperBar from "../../../../components/stepperBar/StepperBar";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import Button from "../../../../components/button/Button";

import "./confirmData.scss";

const ConfirmData = () => {
	const navigate = useNavigate();
	const { sendFormData } = useDeliveryFormService(() => navigate("/"));
	const { isDocumentsRequired, clearContextData } = React.useContext(deliveryFormContext);

	const acceptFormSubmittion = () => {
		sendFormData();
		clearContextData();
	};

	const steps: StepperBarItem[] = isDocumentsRequired
		? [
				{ title: "Інформація про відправлення", status: "completed", url: "/new-order/generalInformation" },
				{ title: "Документи", status: "completed", url: "/new-order/documents" },
				{ title: "Адреса отримання", status: "completed", url: "/new-order/address" },
		  ]
		: [
				{ title: "Інформація про відправлення", status: "completed", url: "/new-order/generalInformation" },
				{ title: "Адреса отримання", status: "completed", url: "/new-order/address" },
		  ];

	return (
		<div className="page-confirmation">
			<div className="page-confirmation__stepper">
				<StepperBar steps={steps} />
			</div>
			<div className="page-confirmation__body">
				<p className="page-confirmation__text">ВІТАЄМО!</p>
				<p className="page-confirmation__text">Ви заповнили всі поля форми і тепер вона готова до відправки.</p>
			</div>
			<div className="page-confirmation__footer">
				<NavigationLink to="/new-order/address" title="Редагувати форму" />
				<Button title="Відправити" onClick={acceptFormSubmittion} />
			</div>
		</div>
	);
};

export default ConfirmData;
