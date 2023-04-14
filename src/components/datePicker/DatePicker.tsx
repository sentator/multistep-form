import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { useField } from "formik";
import uk from "date-fns/locale/uk";
import { getYear, getMonth } from "date-fns";

import { getYearsFromRange } from "../../utils";
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
	const years = getYearsFromRange(1920, getYear(new Date()) + 1);
	const months = [
		"Січень",
		"Лютий",
		"Березень",
		"Квітень",
		"Травень",
		"Червень",
		"Липень",
		"Серпень",
		"Вересень",
		"Жовтень",
		"Листопад",
		"Грудень",
	];

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
					onChange={(date) => {
						setValue(date);
					}}
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
					renderCustomHeader={({
						date,
						changeYear,
						changeMonth,
						decreaseMonth,
						increaseMonth,
						prevMonthButtonDisabled,
						nextMonthButtonDisabled,
					}) => (
						<div className="input-datepicker__header">
							<button
								className="input-datepicker__header-btn input-datepicker__header-btn--prev"
								onClick={decreaseMonth}
								disabled={prevMonthButtonDisabled}
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</button>
							<div className="input-datepicker__header-pickers">
								<select
									className="input-datepicker__header-select"
									value={getYear(date)}
									onChange={({ target: { value } }) => changeYear(+value)}
								>
									{years.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<select
									className="input-datepicker__header-select"
									value={months[getMonth(date)]}
									onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
								>
									{months.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
							<button
								className="input-datepicker__header-btn input-datepicker__header-btn--next"
								onClick={increaseMonth}
								disabled={nextMonthButtonDisabled}
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</button>
						</div>
					)}
				/>
			</div>
			{meta.touched && !!meta.error ? <p className="controlled-datepicker__error">{meta.error}</p> : null}
		</div>
	);
};

export default DatePicker;
