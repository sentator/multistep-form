import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { StepDocumentsValues, UpdateFormValuesFunction } from "../../../../types";
import { ControlledDatePicker } from "../../../../components/controlledDatePicker/ControlledDatePicker";
import { ControlledInput } from "../../../../components/controlledInput/ControlledInput";
import NavigationButton from "../../../../components/navigationButton/NavigationButton";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import SectionInvoiceAttachment from "../../../../components/sectionInvoiceAttachment/SectionInvoiceAttachment";

import "./documents.scss";

interface DocumentsProps {
	formValues: StepDocumentsValues;
	updateFormValues: UpdateFormValuesFunction;
	updateFormStepsStatus: (action: "next" | "prev" | number) => void;
}

const Documents: React.FC<DocumentsProps> = ({ formValues, updateFormValues, updateFormStepsStatus }) => {
	const { handleSubmit, control } = useForm<StepDocumentsValues>({
		defaultValues: formValues,
		mode: "onSubmit",
	});
	const navigate = useNavigate();

	return (
		<form
			className="documents-form"
			onSubmit={handleSubmit((data) => {
				// console.log("data ready to submit", data);
				updateFormValues("documents", data);
				updateFormStepsStatus("next");
				navigate("/new-order/address");
			})}
		>
			<div className="documents-form__invoice">
				<SectionInvoiceAttachment control={control} name="invoice" id="input_invoice" />
			</div>
			<div className="documents-form__row documents-form__row--2-columns">
				<div className="documents-form__column">
					<ControlledInput
						control={control}
						name="lastName"
						id="input_lastName"
						label="Прізвище (українською)"
						rules={{
							required: "Значення не повинно бути пустим.",
							pattern: {
								value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/gi,
								message: "Доступні лише літери з українського алфавіту",
							},
						}}
					/>
				</div>
				<div className="documents-form__column">
					<ControlledInput
						control={control}
						name="firstName"
						id="input_firstName"
						label="Ім'я (українською)"
						rules={{
							required: "Значення не повинно бути пустим.",
							pattern: {
								value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/gi,
								message: "Доступні лише літери з українського алфавіту",
							},
						}}
					/>
				</div>
			</div>
			<div className="documents-form__row documents-form__row--2-columns">
				<div className="documents-form__column">
					<ControlledInput
						control={control}
						name="patronymicName"
						id="input_patronymic-name"
						label="По батькові (українською)"
						rules={{
							required: "Значення не повинно бути пустим.",
							pattern: {
								value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/gi,
								message: "Доступні лише літери з українського алфавіту",
							},
						}}
					/>
				</div>
				<div className="documents-form__column">
					<ControlledInput
						control={control}
						name="passport"
						id="input_passport"
						label="Серія та номер паспорта"
						rules={{
							required: "Значення недопустиме.",
							pattern: {
								value: /[А-ЩЬЮЯҐЄІЇ]{2}\d{6}/gi,
								message: "Серія та номер повинні відповідати формату АБ123456",
							},
							maxLength: {
								value: 8,
								message: "Серія та номер повинні відповідати формату АБ123456",
							},
						}}
					/>
				</div>
			</div>
			<div className="documents-form__row documents-form__row--2-columns">
				<div className="documents-form__column">
					<ControlledDatePicker
						control={control}
						name="birthDate"
						id="input_birth-date"
						label="Дата народження"
						rules={{
							required: "Значення не повинно бути пустим.",
						}}
					/>
				</div>
				<div className="documents-form__column">
					<ControlledDatePicker
						control={control}
						name="passportIssueDate"
						id="input_passport-issue-date"
						label="Дата видачі паспорта"
						rules={{
							required: "Значення не повинно бути пустим.",
						}}
					/>
				</div>
			</div>
			<div className="documents-form__row">
				<ControlledInput
					control={control}
					name="passportIssuedBy"
					id="input_passport-issued-by"
					label="Ким виданий"
					rules={{
						required: "Значення не повинно бути пустим.",
						pattern: {
							value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/gi,
							message: "Доступні лише літери з українського алфавіту",
						},
					}}
				/>
			</div>
			<div className="documents-form__row">
				<ControlledInput
					control={control}
					name="registrationAddress"
					id="input_registration-address"
					label="Адреса реєстрації"
					rules={{
						required: "Значення не повинно бути пустим.",
						pattern: {
							value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/gi,
							message: "Доступні лише літери з українського алфавіту",
						},
					}}
				/>
			</div>
			<div className="documents-form__row">
				<ControlledInput
					control={control}
					name="identificationNumber"
					id="input_identification-number"
					label="Ідентифікаційний номер"
					rules={{
						required: "Значення не повинно бути пустим.",
						pattern: {
							value: /\d{10}/gi,
							message: "Ідентифікаційний номер повинен містити 10 цифр",
						},
						maxLength: {
							value: 10,
							message: "Ідентифікаційний номер повинен містити 10 цифр",
						},
					}}
				/>
			</div>
			<div className="documents-form__row documents-form__row--controls">
				<NavigationLink
					title="Назад"
					to="/new-order/generalInformation"
					onClick={() => updateFormStepsStatus("prev")}
				/>
				<NavigationButton title="Продовжити" iconPosition="right" type="submit" />
			</div>
		</form>
	);
};

export default Documents;
