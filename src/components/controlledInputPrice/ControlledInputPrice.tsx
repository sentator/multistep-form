import { Controller, Control, Path, FieldValues, RegisterOptions } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";

import Tooltip from "../tooltip/Tooltip";

import "./controlledInputPrice.scss";

interface ControlledInputPriceProps<Field extends FieldValues> {
	control: Control<Field>;
	name: Path<Field>;
	id: string;
	label?: string;
	rules?: Omit<RegisterOptions<Field, Path<Field>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
	tooltip?: string;
	currencySymbol?: string;
}

export const ControlledInputPrice = <Field extends FieldValues>(props: ControlledInputPriceProps<Field>) => {
	const { control, name, id, label, rules, tooltip, currencySymbol } = props;

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => {
				return (
					<div className="controlled-price-field">
						{label && (
							<label className="controlled-price-field__label" htmlFor={id}>
								<span className="controlled-price-field__label-text">{label}</span>
								{!!tooltip && (
									<span className="controlled-price-field__label-icon">
										<Tooltip title={tooltip} />
									</span>
								)}
							</label>
						)}
						<div className="controlled-price-field__input-wrapper">
							<CurrencyInput
								className="controlled-price-field__input"
								id={id}
								allowNegativeValue={false}
								decimalScale={2}
								decimalSeparator="."
								suffix={currencySymbol && ` ${currencySymbol}`}
								maxLength={8}
								step={1}
								value={value}
								onValueChange={onChange}
								data-error={!!error}
								{...rest}
							/>
						</div>
						{error ? <p className="controlled-price-field__error">{error.message}</p> : null}
					</div>
				);
			}}
		/>
	);
};
