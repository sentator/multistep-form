import React from "react";
import { useField } from "formik";
import CurrencyInput from "react-currency-input-field";

import Tooltip from "../tooltip/Tooltip";

import "./inputPrice.scss";

interface InputPriceProps {
	name: string;
	id: string;
	label?: string;
	tooltip?: string;
	currencySymbol?: string;
	initialValue?: number;
}

const InputPrice: React.FC<InputPriceProps> = (props) => {
	const { name, id, label, tooltip, currencySymbol, initialValue = 0 } = props;
	const [field, meta, { setValue }] = useField(name);
	const [localValue, setLocalValue] = React.useState<string | undefined>(initialValue.toFixed(2));

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
					name={name}
					id={id}
					allowNegativeValue={false}
					decimalScale={2}
					decimalSeparator="."
					disableGroupSeparators
					suffix={currencySymbol && ` ${currencySymbol}`}
					maxLength={8}
					step={1}
					data-error={meta.touched && !!meta.error}
					value={localValue}
					onValueChange={(value) => {
						setLocalValue(value);
						setValue(value ? Number(value) : 0);
					}}
				/>
			</div>
			{meta.touched && meta.error ? <p className="controlled-price-field__error">{meta.error}</p> : null}
		</div>
	);
};

export default InputPrice;
