import React from "react";
import { useNavigate } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { OptionItem, ProductItem, StepGeneralInformationValues, StepperBarItem } from "../../../../types";
import { COUNTRIES, CURRENCY, SHOPS, calcTotalPrice, calcCustomsFees, getFormattedPrice } from "../../../../utils";
import { deliveryFormContext } from "../../../../context";
import FormObserver from "../../../../components/formObserver/FormObserver";
import { Autocomplete } from "../../../../components/autocomplete/Autocomplete";
import Input from "../../../../components/input/Input";
// import { ControlledAutocomplete } from "../../../../components/controlledAutocomplete/ControlledAutocomplete";
// import { ControlledInput } from "../../../../components/controlledInput/ControlledInput";
import OrderComposition from "../../../../components/orderComposition/OrderComposition";
import CardsInformation from "../../../../components/cardsInformation/CardsInformation";
import SectionTracking from "../../../../components/sectionTracking/SectionTracking";
import Button from "../../../../components/button/Button";
import StepperBar from "../../../../components/stepperBar/StepperBar";

import "./generalInformation.scss";

interface FormValues {
	country: OptionItem | null;
	shop: OptionItem | null;
	parcelName: string;
	orderComposition: ProductItem[];
	customsFees: [{ value: false }];
	promocode: string;
	trackNumber: string;
}

const GeneralInformation: React.FC = () => {
	const {
		formState: { generalInformation },
		updateGeneralInformation,
		addStepDocuments,
		removeStepDocuments,
	} = React.useContext(deliveryFormContext);
	const navigate = useNavigate();

	const initialValues: FormValues = {
		country: null,
		shop: null,
		parcelName: "",
		orderComposition: [{ productName: "", quantity: 1, totalPrice: 0 }],
		customsFees: [{ value: false }],
		promocode: "",
		trackNumber: "",
	};
	const validationSchema = Yup.object().shape({
		country: Yup.mixed().required("Значення не повинно бути пустим."),
		shop: Yup.mixed().required("Значення не повинно бути пустим."),
		orderComposition: Yup.array()
			.of(
				Yup.object().shape({
					productName: Yup.string()
						.required("Значення не повинно бути пустим.")
						.matches(/\W/gi, { message: "Доступні лише символи з латиниці" }),
					totalPrice: Yup.number().moreThan(
						0,
						"Для подальшої реєстрації відправлення, вкажіть вартість товару за одиницю."
					),
				})
			)
			.required("Must have products in order")
			.min(1, "Minimum of 1 product"),
		customsFees: Yup.array().of(
			Yup.object().shape({
				value: Yup.mixed().notOneOf(
					[false],
					"Для подальшої реєстрації відправлення, необхідно погодитись з вищезазначеною умовою"
				),
			})
		),
		trackNumber: Yup.string().optional().min(6, "Значення занадто коротке. Повинно бути 6 символів або більше."),
	});

	// const country = watch("country");
	// const orderComposition = watch("orderComposition");
	// const optionsShops = country ? SHOPS[country.id] : SHOPS["default"];
	// const currency = country ? CURRENCY[country.id] : undefined;
	// const currencySymbol = currency?.symbol;
	// const currencyValue = currency?.value;
	// const totalPrice = calcTotalPrice(orderComposition);
	// const customsFees = calcCustomsFees(currencyValue, totalPrice);
	// const formattedTotalPrice = getFormattedPrice(totalPrice, currencySymbol);
	// const formattedCustomsFees = getFormattedPrice(customsFees, currencySymbol);

	// React.useEffect(() => {
	// 	!!customsFees ? addStepDocuments() : removeStepDocuments();
	// }, [customsFees]);

	// const submitStep = (data: StepGeneralInformationValues) => {
	// 	updateGeneralInformation(data);

	// 	const nextStepUrl = !!customsFees ? "/new-order/documents" : "/new-order/address";
	// 	navigate(nextStepUrl);
	// };

	// const steps: StepperBarItem[] = !!customsFees
	// 	? [
	// 			{ title: "Інформація про відправлення", status: "editing" },
	// 			{ title: "Документи", status: "hidden" },
	// 			{ title: "Адреса отримання", status: "hidden" },
	// 	  ]
	// 	: [
	// 			{ title: "Інформація про відправлення", status: "editing" },
	// 			{ title: "Адреса отримання", status: "hidden" },
	// 	  ];

	return (
		<div className="general-information-form">
			{/* <div className="general-information-form__stepper">
				<StepperBar steps={steps} />
			</div> */}
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={console.log}
				enableReinitialize
			>
				{({ values, handleSubmit, setFieldValue }) => (
					<form className="general-information-form__form" onSubmit={handleSubmit}>
						<FormObserver fieldName="country" onChange={() => setFieldValue("shop", null)} />
						<div className="general-information-form__row general-information-form__row--1">
							<Autocomplete options={COUNTRIES} name="country" id="select-counties" label="Країна" />
							<Autocomplete
								options={
									values.country && values.country.id ? SHOPS[values.country.id] : SHOPS["default"]
								}
								name="shop"
								id="select-shop"
								label="Назва інтернет-магазину"
							/>
							<Input
								name="parcelName"
								id="input_parcel-name"
								label="Назва відправлення (необов'язково)"
								placeholder="Подарунки батькам"
								tooltip="Ви можете назвати відправлення для подальшої зручності її ідентифікації з-поміж інших посилок. Напишіть, наприклад, «Круті кеди», «Подарунок мамі», що завгодно."
							/>
						</div>
						<div className="general-information-form__row general-information-form__row--2">
							<OrderComposition
								name="orderComposition"
								fields={values.orderComposition}
								currencySymbol={"$"}
								formattedTotalPrice={"1.00"}
							/>
						</div>
						<div className="general-information-form__row general-information-form__row--3">
							<CardsInformation
								name="customsFees"
								// formattedCustomsFees={
								// 	formattedCustomsFees || "0.00 " + (currencySymbol ? currencySymbol : "")
								// }
								fields={values.customsFees}
								formattedCustomsFees={"0.00"}
								// isAgreementNeeded={!!customsFees}
								isAgreementNeeded={true}
							/>
						</div>
						<div className="general-information-form__row general-information-form__row--4">
							<div className="general-information-form__promocode">
								<Input
									name="promocode"
									id="input_promocode"
									label="Промокод"
									tooltip="Якщо у вас є промокод на знижку, введіть його в це поле."
								/>
							</div>
						</div>

						<div className="general-information-form__row general-information-form__row--5">
							<SectionTracking name="trackNumber" id="input_track-number" />
						</div>

						<div className="general-information-form__row general-information-form__row--6">
							<Button title="Зберегти відправлення" type="submit" />
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};
export default GeneralInformation;
