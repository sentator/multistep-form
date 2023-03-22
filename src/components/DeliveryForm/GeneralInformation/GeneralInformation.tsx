import { ControlledAutocomplete } from "../../controlledAutocomplete/ControlledAutocomplete";
import { useForm } from "react-hook-form";

import { COUNTRIES, SHOPS } from "../../../utils";
import { OptionItem } from "../../../types";
import { ControlledInput } from "../../controlledInput/ControlledInput";

export default function Test() {
	const { handleSubmit, control, watch } = useForm<{
		country: OptionItem | null;
		shop: OptionItem | null;
		parcelName: string;
	}>({ defaultValues: { country: null, shop: null, parcelName: "" } });

	const country = watch("country");

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log("data ready to submit", data);
			})}
		>
			<div style={{ maxWidth: 220 }}>
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
					id="input_parcel name"
					label="Назва відправлення (необов'язково)"
					placeholder="Подарунки батькам"
					tooltip="Ви можете назвати відправлення як завгодно для подальшої зручності"
				/>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
}
