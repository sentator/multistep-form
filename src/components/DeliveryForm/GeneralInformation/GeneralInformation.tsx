import { ControlledAutocomplete } from "../../controlledAutocomplete/ControlledAutocomplete";
import { useForm } from "react-hook-form";

import { COUNTRIES } from "../../../utils";
import { Country } from "../../../types";

export default function Test() {
	const { handleSubmit, control } = useForm<{
		country: Country | null;
	}>({ defaultValues: { country: null } });

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log("data ready to submit", data);
			})}
		>
			<div style={{ maxWidth: 220 }}>
				<ControlledAutocomplete options={COUNTRIES} control={control} name="country" id="select-counties" />
				<button type="submit">Submit</button>
			</div>
		</form>
	);
}
