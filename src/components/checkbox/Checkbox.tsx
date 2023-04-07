import { useField } from "formik";

import "./checkbox.scss";

interface CheckboxProps {
	name: string;
	id: string;
	label: string;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
	const { name, id, label } = props;
	const [field, meta] = useField(props);

	return (
		<div className="controlled-checkbox">
			<div className="controlled-checkbox__body">
				<input
					className="controlled-checkbox__input visually-hidden"
					type="checkbox"
					id={id}
					{...field}
					data-checked={field.value}
					data-error={meta.touched && !!meta.error}
					checked={field.value}
				/>
				<label className="controlled-checkbox__label" htmlFor={id}>
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
						<path d="M1 4.75L4.75 8.5L11 1" stroke="currentColor" strokeLinecap="square" />
					</svg>
					<span className="controlled-checkbox__label-text">{label}</span>
				</label>
			</div>
			{meta.touched && meta.error ? <p className="controlled-checkbox__error">{meta.error}</p> : null}
		</div>
	);
};

export default Checkbox;
