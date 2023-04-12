import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import { StepDocumentsValues, StepperBarItem } from "../../../../types";
import { deliveryFormContext } from "../../../../context";
import AttachInvoice from "../../../../components/attachInvoice/AttachInvoice";
import Input from "../../../../components/input/Input";
import DatePicker from "../../../../components/datePicker/DatePicker";
import NavigationButton from "../../../../components/navigationButton/NavigationButton";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import StepperBar from "../../../../components/stepperBar/StepperBar";

import "./documents.scss";
import Button from "../../../../components/button/Button";

const Documents: React.FC = () => {
	const {
		formState: { documents },
		updateDocuments,
	} = React.useContext(deliveryFormContext);

	const navigate = useNavigate();

	const submitStep = (data: StepDocumentsValues) => {
		updateDocuments(data);
		navigate("/new-order/address");
	};

	const validationSchema = Yup.object().shape({
		invoice: Yup.mixed().required("Файл рахунку-фактури є обов'язковим."),
		lastName: Yup.string()
			.required("Значення не повинно бути пустим.")
			.matches(/^[А-ЩЬЮЯҐЄІЇ-][а-щьюяґєії'-]*$/gi, {
				message: "Доступні лише літери з українського алфавіту",
			}),
		firstName: Yup.string()
			.required("Значення не повинно бути пустим.")
			.matches(/^[А-ЩЬЮЯҐЄІЇ-][а-щьюяґєії'-]*$/gi, { message: "Доступні лише літери з українського алфавіту" }),
		patronymicName: Yup.string()
			.required("Значення не повинно бути пустим.")
			.matches(/^[А-ЩЬЮЯҐЄІЇ-][а-щьюяґєії'-]*$/gi, { message: "Доступні лише літери з українського алфавіту" }),
		passport: Yup.string()
			.required("Значення недопустиме.")
			.matches(/[А-ЩЬЮЯҐЄІЇ]{2}\d{6}/gi, { message: "Серія та номер повинні відповідати формату АБ123456" })
			.max(8, "Серія та номер повинні відповідати формату АБ123456"),
		birthDate: Yup.string().required("Значення не повинно бути пустим."),
		passportIssueDate: Yup.string().required("Значення не повинно бути пустим."),
		passportIssuedBy: Yup.string()
			.required("Значення не повинно бути пустим.")
			.matches(/^[А-ЩЬЮЯҐЄІЇ -.,0-9][а-щьюяґєії' -.,0-9]*$/gi, {
				message: "Доступні лише літери з українського алфавіту",
			}),
		registrationAddress: Yup.string()
			.required("Значення не повинно бути пустим.")
			.matches(/^[А-ЩЬЮЯҐЄІЇ -.,0-9][а-щьюяґєії' -.,0-9]*$/gi, {
				message: "Доступні лише літери з українського алфавіту",
			}),
		identificationNumber: Yup.string()
			.required("Значення не повинно бути пустим.")
			.matches(/\d{10}/gi, { message: "Ідентифікаційний номер повинен містити 10 цифр" })
			.max(10, "Ідентифікаційний номер повинен містити 10 цифр"),
	});

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
				<Formik initialValues={documents} validationSchema={validationSchema} onSubmit={submitStep}>
					<Form className="documents-form">
						<div className="documents-form__invoice">
							<AttachInvoice
								name="invoice"
								id="input_invoice"
								initialValue={documents.invoice}
								acceptedFormats={["image/jpeg", "image/png", "application/pdf"]}
							/>
						</div>
						<div className="documents-form__row documents-form__row--2-columns">
							<div className="documents-form__column">
								<Input name="lastName" id="input_lastName" label="Прізвище (українською)" />
							</div>
							<div className="documents-form__column">
								<Input name="firstName" id="input_firstName" label="Ім'я (українською)" />
							</div>
						</div>
						<div className="documents-form__row documents-form__row--2-columns">
							<div className="documents-form__column">
								<Input
									name="patronymicName"
									id="input_patronymic-name"
									label="По батькові (українською)"
								/>
							</div>
							<div className="documents-form__column">
								<Input name="passport" id="input_passport" label="Серія та номер паспорта" />
							</div>
						</div>
						<div className="documents-form__row documents-form__row--2-columns">
							<div className="documents-form__column">
								<DatePicker name="birthDate" id="input_birth-date" label="Дата народження" />
							</div>
							<div className="documents-form__column">
								<DatePicker
									name="passportIssueDate"
									id="input_passport-issue-date"
									label="Дата видачі паспорта"
								/>
							</div>
						</div>
						<div className="documents-form__row">
							<Input name="passportIssuedBy" id="input_passport-issued-by" label="Ким виданий" />
						</div>
						<div className="documents-form__row">
							<Input
								name="registrationAddress"
								id="input_registration-address"
								label="Адреса реєстрації"
							/>
						</div>
						<div className="documents-form__row">
							<Input
								name="identificationNumber"
								id="input_identification-number"
								label="Ідентифікаційний номер"
							/>
						</div>
						<div className="documents-form__row documents-form__row--controls">
							<Button title="Скасувати" type="button" onClick={() => navigate("/")} />
							<div className="documents-form__navigation">
								<NavigationLink title="Назад" to="/new-order/generalInformation" />
								<NavigationButton title="Продовжити" iconPosition="right" type="submit" />
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default Documents;
