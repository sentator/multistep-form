import React from "react";
import { useNavigate } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { StepGeneralInformationValues } from "../../types";
import { deliveryFormContext } from "../../context";
import GeneralInformation from "./steps/generalInformation/GeneralInformation";

const GeneralInformationWrapper: React.FC = () => {
	const {
		formState: { generalInformation },
		updateGeneralInformation,
		isDocumentsRequired,
		addStepDocuments,
		removeStepDocuments,
	} = React.useContext(deliveryFormContext);
	const navigate = useNavigate();

	const validationSchema = Yup.object().shape({
		country: Yup.mixed().required("Значення не повинно бути пустим."),
		shop: Yup.mixed().required("Значення не повинно бути пустим."),
		orderComposition: Yup.array()
			.of(
				Yup.object().shape({
					productName: Yup.string()
						.required("Значення не повинно бути пустим.")
						.matches(/\w/gi, { message: "Доступні лише символи з латиниці" }),
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

	const submitStep = (data: StepGeneralInformationValues) => {
		updateGeneralInformation(data);

		const nextStepUrl = isDocumentsRequired ? "/new-order/documents" : "/new-order/address";
		navigate(nextStepUrl);
	};

	return (
		<div className="general-information-form">
			<Formik
				initialValues={generalInformation}
				validationSchema={validationSchema}
				onSubmit={submitStep}
				enableReinitialize
			>
				{({ values, setFieldValue }) => (
					<Form>
						<GeneralInformation
							orderCompositionValue={values.orderComposition}
							customsFeesValue={values.customsFees}
							resetShopValue={() => setFieldValue("shop", null)}
							addStepDocuments={addStepDocuments}
							removeStepDocuments={removeStepDocuments}
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default GeneralInformationWrapper;
