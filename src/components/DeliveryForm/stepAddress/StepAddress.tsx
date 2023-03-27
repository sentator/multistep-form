import React from "react";
import { useForm } from "react-hook-form";

import { ControlledAutocomplete } from "../../controlledAutocomplete/ControlledAutocomplete";
import { ControlledInput } from "../../controlledInput/ControlledInput";
import Button from "../../button/Button";
import NavigationButton from "../../navigationButton/NavigationButton";

import "./stepAddress.scss";

const StepAddress = () => {
	const { handleSubmit, control } = useForm<{
		deliveryAddress: string;
		phoneNumber: string;
	}>({
		defaultValues: {
			deliveryAddress: "",
			phoneNumber: "",
		},
		mode: "onSubmit",
	});

	return (
		<form
			className="address-form"
			onSubmit={handleSubmit((data) => {
				console.log("data ready to submit", data);
			})}
		>
			<div className="address-form__row">
				<div className="address-form__column">
					{/* REPLACE IT to autocomplete component */}
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
							// pattern: {
							// 	value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/gi,
							// 	message: "Доступні лише літери з українського алфавіту",
							// },
						}}
					/>
				</div>
			</div>
			<div className="address-form__row address-form__row--controls">
				<NavigationButton title="Назад" iconPosition="left" type="button" />
				<Button title="Зберегти відправлення" type="submit" />
			</div>
		</form>
	);
};

export default StepAddress;
