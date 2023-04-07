import { Controller, Control, Path, FieldValues, RegisterOptions } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";

import Tooltip from "../../tooltip/Tooltip";

import "react-datepicker/dist/react-datepicker.css";
import "./controlledDatePicker.scss";

interface ControlledDatePickerProps<Field extends FieldValues> {
	control: Control<Field>;
	name: Path<Field>;
	id: string;
	rules?: Omit<RegisterOptions<Field, Path<Field>>, "setValueAs" | "disabled" | "valueAsNumber">;
	placeholder?: string;
	label?: string;
	tooltip?: string;
}

export const ControlledDatePicker = <Field extends FieldValues>(props: ControlledDatePickerProps<Field>) => {
	const { control, name, id, label, tooltip, rules } = props;
	registerLocale("uk", uk);

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
				return (
					<div className="controlled-datepicker">
						{label && (
							<label className="controlled-datepicker__label" htmlFor={id}>
								<span className="controlled-datepicker__label-text">{label}</span>
								{!!tooltip && (
									<span className="controlled-datepicker__label-icon">
										<Tooltip title={tooltip} />
									</span>
								)}
							</label>
						)}
						<div className="controlled-datepicker__wrapper">
							<DatePicker
								wrapperClassName="input-datepicker"
								onChange={onChange}
								onBlur={onBlur}
								selected={value}
								locale="uk"
								dateFormat="dd.MM.yyyy"
								popperClassName="input-datepicker__popper"
								customInput={
									<input className="input-datepicker__input" ref={ref} data-error={!!error} />
								}
							/>
						</div>
						{error ? <p className="controlled-datepicker__error">{error.message}</p> : null}
					</div>
				);
			}}
		/>
	);
};
