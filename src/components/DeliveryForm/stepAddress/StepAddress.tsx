import React from "react";
import { useForm } from "react-hook-form";

import { StepAddressValues, UpdateFormValuesFunction } from "../../../types";
import { ControlledAutocomplete } from "../../controlledAutocomplete/ControlledAutocomplete";
import { ControlledInput } from "../../controlledInput/ControlledInput";
import Button from "../../button/Button";
import NavigationButton from "../../navigationButton/NavigationButton";

import "./stepAddress.scss";

interface StepAddressProps {
	formValues: StepAddressValues;
	updateFormValues: UpdateFormValuesFunction;
	moveToPrevStep: () => void;
	moveToNextStep: () => void;
}

const StepAddress: React.FC<StepAddressProps> = ({ formValues, updateFormValues, moveToPrevStep, moveToNextStep }) => {
	const { handleSubmit, control } = useForm<StepAddressValues>({
		defaultValues: formValues,
		mode: "onSubmit",
	});

	return (
		<form
			className="address-form"
			onSubmit={handleSubmit((data) => {
				// console.log("data ready to submit", data);
				updateFormValues("address", data);
				moveToNextStep();
				console.log("finished successed!");
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
				<NavigationButton title="Назад" iconPosition="left" type="button" onClick={moveToPrevStep} />
				<Button title="Зберегти відправлення" type="submit" />
			</div>
		</form>
	);
};

export default StepAddress;
