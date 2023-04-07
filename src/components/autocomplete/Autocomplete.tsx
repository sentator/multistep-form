import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";
import { useField } from "formik";

import { OptionItem } from "../../types";
import Tooltip from "../tooltip/Tooltip";

import "./autocomplete.scss";

interface AutocompleteProps<Option extends OptionItem> {
	name: string;
	options: Option[];
	id: string;
	placeholder?: string;
	label?: string;
	tooltip?: string;
}

export const Autocomplete = <Option extends OptionItem>(props: AutocompleteProps<Option>) => {
	const { options, name, id, label, tooltip } = props;
	const [field, meta, { setValue }] = useField(name);

	return (
		<div className="controlled-autocomplete">
			{label && (
				<label className="controlled-autocomplete__label" htmlFor={id}>
					<span className="controlled-autocomplete__label-text">{label}</span>
					{!!tooltip && (
						<span className="controlled-autocomplete__label-icon">
							<Tooltip title={tooltip} />
						</span>
					)}
				</label>
			)}
			<div className="controlled-autocomplete__autocomplete-wrapper">
				<MuiAutocomplete
					options={options}
					getOptionLabel={(option) => option.name}
					value={field.value}
					onChange={(_, value) => {
						setValue(value || null);
					}}
					onBlur={field.onBlur}
					renderInput={(params) => (
						<TextField
							{...params}
							name="country"
							id="select-country"
							error={Boolean(meta.touched && meta.error)}
							InputProps={{
								...params.InputProps,
								startAdornment:
									field.value && field.value.icon ? (
										<img src={field.value.icon} alt={field.value.label}></img>
									) : null,
							}}
						/>
					)}
					renderOption={(props, option, state) => (
						<li className="autocomplete__item" {...props}>
							{option && option.icon && <img src={option.icon} alt={option.label} />}
							<span>{option.name}</span>
						</li>
					)}
					popupIcon={
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 8L12 16L20 8" stroke="#33332F" strokeLinejoin="round"></path>
						</svg>
					}
					clearIcon={false}
					disablePortal
					classes={{
						root: "controlled-autocomplete__autocomplete autocomplete",
						popper: "autocomplete__popper",
						input: "autocomplete__input",
						option: "autocomplete__option",
					}}
					sx={{
						"& .MuiOutlinedInput-root .MuiAutocomplete-input": {
							padding: 0,
						},
					}}
				/>
			</div>
			{meta.touched && meta.error ? <p className="controlled-autocomplete__error">{meta.error}</p> : null}
		</div>
	);
};
