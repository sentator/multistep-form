import React from "react";
import { useField } from "formik";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import Tooltip from "../tooltip/Tooltip";

import "./inputPhone.scss";

interface InputProps {
	name: string;
	id: string;
	placeholder?: string;
	label?: string;
	tooltip?: string;
}

const InputPhone = (props: InputProps) => {
	const { name, id, placeholder = "", label, tooltip } = props;
	const [field, meta, { setValue }] = useField<string>(name);

	const normalizePhoneNumber = (value: string) => {
		const phoneNumber = parsePhoneNumberFromString(value, "UA");

		if (!phoneNumber) {
			return value;
		}

		return phoneNumber.formatInternational();
	};

	const updatePhoneNumberValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const phoneNumber = normalizePhoneNumber(event.target.value);
		setValue(phoneNumber);
	};

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
					{...field}
					type="tel"
					className="controlled-input__input"
					placeholder={placeholder}
					id={id}
					data-error={meta.touched && !!meta.error}
					onChange={updatePhoneNumberValue}
				/>
			</div>
			{meta.touched && meta.error ? <p className="controlled-input__error">{meta.error}</p> : null}
		</div>
	);
};

export default InputPhone;
