import ReactDatePicker, { registerLocale } from "react-datepicker";
import { useField } from "formik";
import uk from "date-fns/locale/uk";

import Tooltip from "../tooltip/Tooltip";

import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.scss";

interface DatePickerProps {
	name: string;
	id: string;
	placeholder?: string;
	label?: string;
	tooltip?: string;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
	const { name, id, label, tooltip } = props;
	registerLocale("uk", uk);

	const [field, meta, { setValue }] = useField(name);

	return (
		<div className="controlled-datepicker">
			{label && (
				<label className="controlled-datepicker__label" htmlFor={id}>
					<span className="controlled-datepicker__label-text">{label}</span>
					{!!tooltip && (
						<span className="controlled-datepicker__label-icon">
							<Tooltip title={tooltip} />
						</span>
					)}
				</label>
			)}
			<div className="controlled-datepicker__wrapper">
				<ReactDatePicker
					wrapperClassName="input-datepicker"
					id={id}
					name={name}
					onChange={(date) => setValue(date)}
					onBlur={field.onBlur}
					selected={field.value}
					locale="uk"
					dateFormat="dd.MM.yyyy"
					popperClassName="input-datepicker__popper"
					customInput={
						<input
							className="input-datepicker__input"
							type="text"
							data-error={meta.touched && !!meta.error}
						/>
					}
				/>
			</div>
			{meta.touched && !!meta.error ? <p className="controlled-datepicker__error">{meta.error}</p> : null}
		</div>
	);
};

export default DatePicker;
