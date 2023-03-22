import React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import "./controlledAutocomplete.scss";

interface ControlledAutocompleteProps<
	Option extends { id: string; label: string; name: string; flagUrl: string },
	Field extends FieldValues
> {
	control: Control<Field>;
	name: Path<Field>;
	options: Option[];
	id: string;
	placeholder?: string;
	inputType?: "default" | "withIcon";
}

export const ControlledAutocomplete = <
	Option extends { id: string; label: string; name: string; flagUrl: string },
	Field extends FieldValues
>(
	props: ControlledAutocompleteProps<Option, Field>
) => {
	const { control, options, name, id, inputType = "default" } = props;
	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required: "Field is requried",
			}}
			render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
				return (
					<>
						<Autocomplete
							value={value ? options.find((option) => value.id === option.id) : null}
							getOptionLabel={(option) => option.name}
							onChange={(event: any, newValue) => {
								onChange(newValue ? newValue : null);
							}}
							id={id}
							options={options}
							renderInput={(params) =>
								inputType === "default" && (
									<TextField
										{...params}
										label={props.placeholder}
										inputRef={ref}
										InputProps={{
											...params.InputProps,
											startAdornment: value ? (
												<img src={value.flagUrl} alt={value.label}></img>
											) : null,
										}}
									/>
								)
							}
							renderOption={(props, option, state) => (
								<li className="autocomplete__item" {...props}>
									<img src={option.flagUrl} alt={option.label} />
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
								root: "autocomplete",
								popper: "autocomplete__popper",
								input: "autocomplete__input",
								option: "autocomplete__option",
							}}
							sx={{
								"& .MuiAutocomplete-inputRoot": {
									fontFamily: "Inter",
									display: "flex",
									gap: "10px",
									justifyContent: "flex-start",
									width: "100%",
									height: "46px",
									padding: "10px 38px 10px 10px",
									borderRadius: "12px",
									border: "1px solid var(--gullGrayColor)",
									fontSize: "16px",
									cursor: "pointer",
								},
								"& .MuiOutlinedInput-root .MuiAutocomplete-input": {
									padding: 0,
								},
							}}
						/>
						{error ? <p style={{ color: "red" }}>{error.message}</p> : null}
					</>
				);
			}}
		/>
	);
};
