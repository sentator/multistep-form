import { useField, useFormikContext } from "formik";

import Tooltip from "../tooltip/Tooltip";

import "./inputCounter.scss";

interface InputCounterProps {
	name: string;
	id: string;
	label?: string;
	tooltip?: string;
}

const InputCounter: React.FC<InputCounterProps> = (props) => {
	const { name, id, label, tooltip } = props;
	const [field, meta] = useField(props);
	const { setFieldValue } = useFormikContext();

	const validateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.replace(/\D/gi, "");
		let modifiedValue = 0;

		if (value.length) {
			modifiedValue = Number(value);
		}

		setFieldValue(name, modifiedValue);
	};

	const updateValue = (type: "asc" | "desc", value: number) => {
		type === "asc" && setFieldValue(name, value + 1);
		type === "desc" && setFieldValue(name, value - 1);
	};

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
						name={name}
						id={id}
						onChange={validateValue}
					/>
					<div className="input-counter__controls">
						<button
							className="input-counter__btn input-counter__btn--desc"
							type="button"
							disabled={field.value <= 1}
							onClick={() => updateValue("desc", field.value)}
						></button>
						<button
							className="input-counter__btn input-counter__btn--asc"
							type="button"
							disabled={field.value >= 100}
							onClick={() => updateValue("asc", field.value)}
						></button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InputCounter;
