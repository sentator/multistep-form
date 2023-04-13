import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

import { OrderResponseData, StepperBarItem } from "../../../../types";
import { deliveryFormContext } from "../../../../context";
import useDeliveryFormService from "../../../../services/deliveryForm";
import StepperBar from "../../../../components/stepperBar/StepperBar";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import Button from "../../../../components/button/Button";

import "./confirmData.scss";

const ConfirmData = () => {
	const { isDocumentsRequired, clearContextData } = React.useContext(deliveryFormContext);
	const navigate = useNavigate();
	const { createNewOrder } = useDeliveryFormService();
	const queryClient = useQueryClient();
	const {
		mutate: sendOrderData,
		isLoading,
		isError,
		error,
	} = useMutation<OrderResponseData | null, Error>(createNewOrder, {
		onSuccess: () => {
			queryClient.invalidateQueries(["orders"]);
			navigate("/");
			clearContextData();
		},
	});

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
				{isLoading && (
					<>
						<p className="page-confirmation__text">ЗАЧЕКАЙТЕ, БУДЬ ЛАСКА!</p>
						<p className="page-confirmation__text">Відбувається надсилання форми...</p>
					</>
				)}
				{isError && (
					<>
						<>
							<p className="page-confirmation__text">СТАЛАСЯ ПОМИЛКА!</p>
							<p className="page-confirmation__text">{error.message}</p>
						</>
					</>
				)}
				{!isLoading && !isError && (
					<>
						<p className="page-confirmation__text">ВІТАЄМО!</p>
						<p className="page-confirmation__text">
							Ви заповнили всі поля форми і тепер вона готова до відправки.
						</p>
					</>
				)}
			</div>
			<div className="page-confirmation__footer">
				<Button title="Скасувати" type="button" onClick={() => navigate("/")} />
				<div className="page-confirmation__navigation">
					<NavigationLink to="/new-order/address" title="Редагувати форму" />
					<Button title="Відправити" onClick={() => sendOrderData()} disabled={isLoading || isError} />
				</div>
			</div>
		</div>
	);
};

export default ConfirmData;
