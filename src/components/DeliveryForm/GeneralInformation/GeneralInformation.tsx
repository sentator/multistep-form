import { ControlledAutocomplete } from "../../controlledAutocomplete/ControlledAutocomplete";
import { useForm } from "react-hook-form";

import { COUNTRIES, SHOPS } from "../../../utils";
import { OptionItem, ProductItem } from "../../../types";
import { ControlledInput } from "../../controlledInput/ControlledInput";
import OrderComposition from "../orderComposition/OrderComposition";

import "./generalInformation.scss";

export default function GeneralInformation() {
	const { handleSubmit, control, watch } = useForm<{
		country: OptionItem | null;
		shop: OptionItem | null;
		parcelName: string;
		orderComposition: ProductItem[];
	}>({
		defaultValues: {
			country: null,
			shop: null,
			parcelName: "",
			orderComposition: [{ productName: "", quantity: 1, totalPrice: "0.00" }],
		},
	});

	const country = watch("country");

	return (
		<form
			className="general-information-form"
			onSubmit={handleSubmit((data) => {
				console.log("data ready to submit", data);
			})}
		>
			<div className="general-information-form__row general-information-form__row--1">
				<ControlledAutocomplete
					options={COUNTRIES}
					control={control}
					name="country"
					id="select-counties"
					label="Країна"
				/>
				<ControlledAutocomplete
					options={country ? SHOPS[country.id] : SHOPS["default"]}
					control={control}
					name="shop"
					id="select-shop"
					label="Назва інтернет-магазину"
				/>
				<ControlledInput
					control={control}
					name="parcelName"
					id="input_parcel-name"
					label="Назва відправлення (необов'язково)"
					placeholder="Подарунки батькам"
					tooltip="Ви можете назвати відправлення для подальшої зручності її ідентифікації з-поміж інших посилок. Напишіть, наприклад, «Круті кеди», «Подарунок мамі», що завгодно."
				/>
			</div>
			<div className="general-information-form__row">
				<OrderComposition name="orderComposition" control={control} />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
