import { Controller, Control, Path, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { OptionItem } from "../../types";
import Tooltip from "../tooltip/Tooltip";

import "./controlledAutocomplete.scss";

interface ControlledAutocompleteProps<Option extends OptionItem, Field extends FieldValues> {
	control: Control<Field>;
	name: Path<Field>;
	options: Option[];
	id: string;
	placeholder?: string;
	label?: string;
	tooltip?: string;
}

export const ControlledAutocomplete = <Option extends OptionItem, Field extends FieldValues>(
	props: ControlledAutocompleteProps<Option, Field>
) => {
	const { control, options, name, id, label, tooltip } = props;

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required: "Значення не повинно бути пустим.",
			}}
			render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
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
							<Autocomplete
								value={value ? options.find((option) => value.id === option.id) : null}
								getOptionLabel={(option) => option.name}
								onChange={(event: any, newValue) => {
									onChange(newValue ? newValue : null);
								}}
								id={id}
								options={options}
								renderInput={(params) => (
									<TextField
										{...params}
										label={props.placeholder}
										inputRef={ref}
										InputProps={{
											...params.InputProps,
											startAdornment:
												value && value.icon ? (
													<img src={value.icon} alt={value.label}></img>
												) : null,
										}}
										error={Boolean(error)}
									/>
								)}
								renderOption={(props, option, state) => (
									<li className="autocomplete__item" {...props}>
										{option && option.icon && <img src={option.icon} alt={option.label} />}
										<span>{option.name}</span>
									</li>
								)}
								popupIcon={
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
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
						{error ? <p className="controlled-autocomplete__error">{error.message}</p> : null}
					</div>
				);
			}}
		/>
	);
};
