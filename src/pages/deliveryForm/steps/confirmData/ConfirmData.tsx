import React from "react";
import { useNavigate } from "react-router";

import { StepperBarItem } from "../../../../types";
import { deliveryFormContext } from "../../../../context";
import useDeliveryFormService from "../../../../services/deliveryForm";
import StepperBar from "../../../../components/stepperBar/StepperBar";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import Button from "../../../../components/button/Button";

import "./confirmData.scss";

const ConfirmData = () => {
	const navigate = useNavigate();
	const { sendOrderData, isSending, error } = useDeliveryFormService(() => {
		navigate("/");
		clearContextData();
	});
	const { isDocumentsRequired, clearContextData } = React.useContext(deliveryFormContext);

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
				{isSending && (
					<>
						<p className="page-confirmation__text">ЗАЧЕКАЙТЕ, БУДЬ ЛАСКА!</p>
						<p className="page-confirmation__text">Відбувається надсилання форми...</p>
					</>
				)}
				{!!error && (
					<>
						<>
							<p className="page-confirmation__text">СТАЛАСЯ ПОМИЛКА!</p>
							<p className="page-confirmation__text">{error}</p>
						</>
					</>
				)}
				{!isSending && !error && (
					<>
						<p className="page-confirmation__text">ВІТАЄМО!</p>
						<p className="page-confirmation__text">
							Ви заповнили всі поля форми і тепер вона готова до відправки.
						</p>
					</>
				)}
			</div>
			<div className="page-confirmation__footer">
				<NavigationLink to="/new-order/address" title="Редагувати форму" />
				<Button title="Відправити" onClick={sendOrderData} disabled={isSending || !!error} />
			</div>
		</div>
	);
};

export default ConfirmData;
