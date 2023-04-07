import { useField } from "formik";
import Tooltip from "../tooltip/Tooltip";

import "./input.scss";

interface InputProps {
	name: string;
	id: string;
	placeholder?: string;
	label?: string;
	tooltip?: string;
}

const Input = (props: InputProps) => {
	const { name, id, placeholder = "", label, tooltip } = props;
	const [field, meta] = useField(name);

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
					type="text"
					className="controlled-input__input"
					placeholder={placeholder}
					id={id}
					data-error={meta.touched && !!meta.error}
				/>
			</div>
			{meta.touched && meta.error ? <p className="controlled-input__error">{meta.error}</p> : null}
		</div>
	);
};

export default Input;
