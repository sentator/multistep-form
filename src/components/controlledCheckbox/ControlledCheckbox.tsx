import { Controller, Control, Path, FieldValues, RegisterOptions } from "react-hook-form";

import "./controlledCheckbox.scss";

interface ControlledCheckboxProps<Field extends FieldValues> {
	control: Control<Field>;
	name: Path<Field>;
	id: string;
	label: string;
	rules?: Omit<RegisterOptions<Field, Path<Field>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
}

export const ControlledCheckbox = <Field extends FieldValues>(props: ControlledCheckboxProps<Field>) => {
	const { control, name, id, label, rules } = props;

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => {
				return (
					<div className="controlled-checkbox">
						<div className="controlled-checkbox__body">
							<input
								className="controlled-checkbox__input visually-hidden"
								type="checkbox"
								id={id}
								data-checked={field.value}
								data-error={!!error}
								{...field}
							/>
							<label className="controlled-checkbox__label" htmlFor={id}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="10"
									viewBox="0 0 12 10"
									fill="none"
								>
									<path d="M1 4.75L4.75 8.5L11 1" stroke="currentColor" strokeLinecap="square" />
								</svg>
								<span className="controlled-checkbox__label-text">{label}</span>
							</label>
						</div>
						{error ? <p className="controlled-checkbox__error">{error.message}</p> : null}
					</div>
				);
			}}
		/>
	);
};
