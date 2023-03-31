import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { StepDocumentsValues, StepperBarItem } from "../../../../types";
import { deliveryFormContext } from "../../../../context";
import { ControlledDatePicker } from "../../../../components/controlledDatePicker/ControlledDatePicker";
import { ControlledInput } from "../../../../components/controlledInput/ControlledInput";
import NavigationButton from "../../../../components/navigationButton/NavigationButton";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import SectionInvoiceAttachment from "../../../../components/sectionInvoiceAttachment/SectionInvoiceAttachment";

import "./documents.scss";
import StepperBar from "../../../../components/stepperBar/StepperBar";

const Documents: React.FC = () => {
	const {
		formState: { documents },
		updateDocuments,
	} = React.useContext(deliveryFormContext);

	const { handleSubmit, control, setValue } = useForm<StepDocumentsValues>({
		defaultValues: documents,
		mode: "onSubmit",
	});
	const navigate = useNavigate();

	const [attachedFiles, setAttachedFiles] = React.useState(documents.invoice);

	const replaceAttachedFiles = (value: File[] | null) => {
		setAttachedFiles(value);
		setValue("invoice", value, { shouldValidate: true });
	};

	const removeAttachedFile = (index: number) => {
		if (attachedFiles) {
			const filteredFiles = attachedFiles.filter((_, i) => i !== index);

			setAttachedFiles(filteredFiles);
			setValue("invoice", filteredFiles, { shouldValidate: true });
		}
	};

	const steps: StepperBarItem[] = [
		{ title: "Інформація про відправлення", status: "completed", url: "/new-order/generalInformation" },
		{ title: "Документи", status: "editing" },
		{ title: "Адреса отримання", status: "hidden" },
	];

	return (
		<div className="documents-form">
			<div className="documents-form__stepper">
				<StepperBar steps={steps} />
			</div>
			<div className="documents-form__form">
				<form
					className="documents-form"
					onSubmit={handleSubmit((data) => {
						updateDocuments(data);
						navigate("/new-order/address");
					})}
				>
					<div className="documents-form__invoice">
						<SectionInvoiceAttachment
							control={control}
							name="invoice"
							id="input_invoice"
							attachedFiles={attachedFiles}
							replaceAttachedFiles={replaceAttachedFiles}
							removeAttachedFile={removeAttachedFile}
						/>
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
						<NavigationLink title="Назад" to="/new-order/generalInformation" />
						<NavigationButton title="Продовжити" iconPosition="right" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default Documents;
