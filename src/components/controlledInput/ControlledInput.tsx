import { Controller, Control, Path, FieldValues, RegisterOptions } from "react-hook-form";
import Tooltip from "../tooltip/Tooltip";

import "./controlledInput.scss";

interface ControlledInputProps<Field extends FieldValues> {
	control: Control<Field>;
	name: Path<Field>;
	id: string;
	placeholder?: string;
	label?: string;
	rules?: Omit<RegisterOptions<Field, Path<Field>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
	tooltip?: string;
}

export const ControlledInput = <Field extends FieldValues>(props: ControlledInputProps<Field>) => {
	const { control, name, id, placeholder = "", label, rules, tooltip } = props;

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => {
				return (
					<div className="controlled-input">
						{label && (
							<label className="controlled-input__label" htmlFor={id}>
								<span className="controlled-input__label-text">{label}</span>
								{!!tooltip && (
									<span className="controlled-input__label-icon">
										<Tooltip title={tooltip} />
									</span>
								)}
							</label>
						)}
						<div className="controlled-input__input-wrapper">
							<input
								type="text"
								{...field}
								className="controlled-input__input"
								placeholder={placeholder}
								id={id}
								data-error={!!error}
							/>
						</div>
						{error ? <p className="controlled-input__error">{error.message}</p> : null}
					</div>
				);
			}}
		/>
	);
};
