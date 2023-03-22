import React from "react";
import useAutocomplete from "@mui/base/useAutocomplete";
import clsx from "clsx";
import { OptionItem } from "../../types";

import "./autocomplete.scss";

interface AutocompleteProps<T> {
	id: string;
	options: ReadonlyArray<T>;
	value: T | null;
	onChange: (event: React.SyntheticEvent, value: T | null) => void;
}

const Autocomplete: React.FC<AutocompleteProps<OptionItem>> = ({ id, options, value, onChange }) => {
	const {
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		popupOpen,
	} = useAutocomplete({
		id,
		options,
		value,
		onChange,
		getOptionLabel: (option) => option.name,
	});
	const componentClassnames = clsx("autocomplete", { opened: popupOpen, filled: !!value });

	return (
		<>
			<div className={componentClassnames} {...getRootProps()}>
				<label className="autocomplete__label" {...getInputLabelProps()}>
					Країна
				</label>
				<div className="autocomplete__input">
					<input {...getInputProps()} />
					{value && <img src={value.icon} alt={value.label} />}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 8L12 16L20 8" stroke="#33332F" strokeLinejoin="round"></path>
					</svg>
				</div>
				{groupedOptions.length > 0 ? (
					<ul className="autocomplete__list" {...getListboxProps()}>
						{(groupedOptions as OptionItem[]).map((option, index) => (
							<li className="autocomplete__item" {...getOptionProps({ option, index })}>
								<img src={option.icon} alt={option.label} />
								<span>{option.name}</span>
							</li>
						))}
					</ul>
				) : null}
			</div>
		</>
	);
};

export default Autocomplete;
