import { Controller, Control, Path, FieldValues } from "react-hook-form";
import Tooltip from "../tooltip/Tooltip";

import "./controlledInputCounter.scss";

interface ControlledInputCounterProps<Field extends FieldValues> {
	control: Control<Field>;
	name: Path<Field>;
	id: string;
	label?: string;
	tooltip?: string;
}

export const ControlledInputCounter = <Field extends FieldValues>(props: ControlledInputCounterProps<Field>) => {
	const { control, name, id, label, tooltip } = props;

	const validateValue = (event: React.ChangeEvent<HTMLInputElement>, handleChange: (newValue: number) => void) => {
		const value = event.target.value.replace(/\D/gi, "");
		let modifiedValue = 0;

		if (value.length) {
			modifiedValue = Number(value);
		}

		handleChange(modifiedValue);
	};

	const updateValue = (type: "asc" | "desc", value: number, handleChange: (newValue: number) => void) => {
		type === "asc" && handleChange(value + 1);
		type === "desc" && handleChange(value - 1);
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				return (
					<div className="controlled-counter">
						{label && (
							<label className="controlled-counter__label" htmlFor={id}>
								<span className="controlled-counter__label-text">{label}</span>
								{!!tooltip && (
									<span className="controlled-counter__label-icon">
										<Tooltip title={tooltip} />
									</span>
								)}
							</label>
						)}
						<div className="controlled-counter__input">
							<div className="input-counter">
								<input
									className="input-counter__input"
									type="text"
									{...field}
									id={id}
									onChange={(e) => validateValue(e, field.onChange)}
								/>
								<div className="input-counter__controls">
									<button
										className="input-counter__btn input-counter__btn--desc"
										type="button"
										disabled={field.value <= 1}
										onClick={() => updateValue("desc", field.value, field.onChange)}
									></button>
									<button
										className="input-counter__btn input-counter__btn--asc"
										type="button"
										disabled={field.value >= 100}
										onClick={() => updateValue("asc", field.value, field.onChange)}
									></button>
								</div>
							</div>
						</div>
					</div>
				);
			}}
		/>
	);
};
