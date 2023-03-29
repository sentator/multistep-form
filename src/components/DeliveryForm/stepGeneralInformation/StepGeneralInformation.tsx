import React from "react";
import { ControlledAutocomplete } from "../../controlledAutocomplete/ControlledAutocomplete";
import { useForm } from "react-hook-form";

import { COUNTRIES, CURRENCY, SHOPS, calcTotalPrice, calcCustomsFees, getFormattedPrice } from "../../../utils";
import { StepGeneralInformationValues, UpdateFormValuesFunction } from "../../../types";
import { ControlledInput } from "../../controlledInput/ControlledInput";
import OrderComposition from "../orderComposition/OrderComposition";
import CardsInformation from "../../cardsInformation/CardsInformation";
import SectionTracking from "../../sectionTracking/SectionTracking";
import Button from "../../button/Button";

import "./stepGeneralInformation.scss";

interface StepGeneralInformationProps {
	formValues: StepGeneralInformationValues;
	updateFormValues: UpdateFormValuesFunction;
	moveToNextStep: () => void;
	addStepDocuments: () => void;
	removeStepDocuments: () => void;
}

const StepGeneralInformation: React.FC<StepGeneralInformationProps> = ({
	formValues,
	updateFormValues,
	moveToNextStep,
	addStepDocuments,
	removeStepDocuments,
}) => {
	const { handleSubmit, control, watch } = useForm<StepGeneralInformationValues>({
		defaultValues: formValues,
		mode: "onSubmit",
	});

	const country = watch("country");
	const orderComposition = watch("orderComposition");
	const optionsShops = country ? SHOPS[country.id] : SHOPS["default"];
	const currency = country ? CURRENCY[country.id] : undefined;
	const currencySymbol = currency?.symbol;
	const currencyValue = currency?.value;
	const totalPrice = calcTotalPrice(orderComposition);
	const customsFees = calcCustomsFees(currencyValue, totalPrice);
	const formattedTotalPrice = getFormattedPrice(totalPrice, currencySymbol);
	const formattedCustomsFees = getFormattedPrice(customsFees, currencySymbol);

	React.useEffect(() => {
		!!customsFees ? addStepDocuments() : removeStepDocuments();
	}, [customsFees]);

	return (
		<form
			className="general-information-form"
			onSubmit={handleSubmit((data) => {
				// console.log("data ready to submit", data);
				updateFormValues("generalInformation", data);
				moveToNextStep();
			})}
		>
			<div className="general-information-form__row general-information-form__row--1">
				<ControlledAutocomplete
					options={COUNTRIES}
					control={control}
					name="country"
					id="select-counties"
					label="Країна"
				/>
				<ControlledAutocomplete
					options={optionsShops}
					control={control}
					name="shop"
					id="select-shop"
					label="Назва інтернет-магазину"
				/>
				<ControlledInput
					control={control}
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
					control={control}
					currencySymbol={currencySymbol}
					formattedTotalPrice={formattedTotalPrice}
				/>
			</div>
			<div className="general-information-form__row general-information-form__row--3">
				<CardsInformation
					name="customsFees"
					control={control}
					formattedCustomsFees={formattedCustomsFees || "0.00 " + (currencySymbol ? currencySymbol : "")}
					isAgreementNeeded={!!customsFees}
				/>
			</div>
			<div className="general-information-form__row general-information-form__row--4">
				<div className="general-information-form__promocode">
					<ControlledInput
						control={control}
						name="promocode"
						id="input_promocode"
						label="Промокод"
						tooltip="Якщо у вас є промокод на знижку, введіть його в це поле."
					/>
				</div>
			</div>
			<div className="general-information-form__row general-information-form__row--5">
				<SectionTracking name="trackNumber" id="input_track-number" control={control} />
			</div>
			<div className="general-information-form__row general-information-form__row--6">
				<Button title="Зберегти відправлення" type="submit" />
			</div>
		</form>
	);
};
export default StepGeneralInformation;
