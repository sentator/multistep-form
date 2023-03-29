import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { StepAddressValues, UpdateFormValuesFunction } from "../../../../types";
import { ControlledAutocomplete } from "../../../../components/controlledAutocomplete/ControlledAutocomplete";
import { ControlledInput } from "../../../../components/controlledInput/ControlledInput";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import Button from "../../../../components/button/Button";

import "./address.scss";

interface AddressProps {
	formValues: StepAddressValues;
	updateFormValues: UpdateFormValuesFunction;
}

const Address: React.FC<AddressProps> = ({ formValues, updateFormValues }) => {
	const { handleSubmit, control } = useForm<StepAddressValues>({
		defaultValues: formValues,
		mode: "onSubmit",
	});
	const navigate = useNavigate();

	return (
		<form
			className="address-form"
			onSubmit={handleSubmit((data) => {
				// console.log("data ready to submit", data);
				updateFormValues("address", data);
				navigate("/success");
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
				<NavigationLink title="Назад" to="/new-order/documents" />
				<Button title="Зберегти відправлення" type="submit" />
			</div>
		</form>
	);
};

export default Address;
