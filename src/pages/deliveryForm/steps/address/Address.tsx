import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { StepAddressValues, StepperBarItem } from "../../../../types";
import { deliveryFormContext } from "../../../../context";
import StepperBar from "../../../../components/stepperBar/StepperBar";
import { ControlledInput } from "../../../../components/controlledInput/ControlledInput";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import Button from "../../../../components/button/Button";

import "./address.scss";

const Address: React.FC = () => {
	const {
		formState: { address },
		updateAddress,
		clearContextData,
		isDocumentsRequired,
	} = React.useContext(deliveryFormContext);

	const { handleSubmit, control } = useForm<StepAddressValues>({
		defaultValues: address,
		mode: "onSubmit",
	});
	const navigate = useNavigate();

	const prevStep = isDocumentsRequired ? "/new-order/documents" : "/new-order/generalInformation";
	const nextStep = "/success";

	const steps: StepperBarItem[] = isDocumentsRequired
		? [
				{ title: "Інформація про відправлення", status: "completed", url: "/new-order/generalInformation" },
				{ title: "Документи", status: "completed", url: "/new-order/documents" },
				{ title: "Адреса отримання", status: "editing" },
		  ]
		: [
				{ title: "Інформація про відправлення", status: "completed", url: "/new-order/generalInformation" },
				{ title: "Адреса отримання", status: "editing" },
		  ];

	return (
		<div className="address-form">
			<div className="address-form__stepper">
				<StepperBar steps={steps} />
			</div>
			<div className="address-form__form">
				<form
					className="address-form"
					onSubmit={handleSubmit((data) => {
						updateAddress(data);
						clearContextData();
						navigate(nextStep);
					})}
				>
					<div className="address-form__row">
						<div className="address-form__column">
							<ControlledInput
								control={control}
								name="deliveryAddress"
								id="input_delivery-address"
								label="Адреса доставки"
								rules={{
									required: "Значення не повинно бути пустим.",
								}}
							/>
						</div>
						<div className="address-form__column">
							<ControlledInput
								control={control}
								name="phoneNumber"
								id="input_phone-number"
								label="Контактний номер телефону"
								rules={{
									required: "Значення не повинно бути пустим.",
								}}
							/>
						</div>
					</div>
					<div className="address-form__row address-form__row--controls">
						<NavigationLink title="Назад" to={prevStep} />
						<Button title="Зберегти відправлення" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default Address;
