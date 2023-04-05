import React from "react";

import { OptionItem, ProductItem, StepGeneralInformationValues, StepperBarItem } from "../../../../types";
import { COUNTRIES, CURRENCY, SHOPS, calcTotalPrice, calcCustomsFees, getFormattedPrice } from "../../../../utils";
import { useWatch } from "../../../../hooks";
import { Autocomplete } from "../../../../components/autocomplete/Autocomplete";
import Input from "../../../../components/input/Input";
import OrderComposition from "../../../../components/orderComposition/OrderComposition";
import CardsInformation from "../../../../components/cardsInformation/CardsInformation";
import SectionTracking from "../../../../components/sectionTracking/SectionTracking";
import Button from "../../../../components/button/Button";
import StepperBar from "../../../../components/stepperBar/StepperBar";

import "./generalInformation.scss";

interface GeneralInformationProps {
	values: StepGeneralInformationValues;
	handleSubmit: (event?: React.FormEvent<HTMLFormElement> | undefined) => void;
	resetShop: () => void;
	addStepDocuments: () => void;
	removeStepDocuments: () => void;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({
	values,
	handleSubmit,
	resetShop,
	addStepDocuments,
	removeStepDocuments,
}) => {
	const country = useWatch<StepGeneralInformationValues>("country") as OptionItem | null;
	const orderComposition = useWatch<StepGeneralInformationValues>("orderComposition") as ProductItem[];
	const firstRender = React.useRef<boolean>(true);

	const optionsShops = country ? SHOPS[country.id] : SHOPS["default"];
	const currency = country ? CURRENCY[country.id] : undefined;
	const currencySymbol = currency?.symbol;
	const currencyValue = currency?.value;
	const totalPrice = calcTotalPrice(orderComposition);
	const customsFees = calcCustomsFees(currencyValue, totalPrice);
	const formattedTotalPrice = getFormattedPrice(totalPrice, currencySymbol);
	const formattedCustomsFees = getFormattedPrice(customsFees, currencySymbol);

	React.useEffect(() => {
		if (!firstRender.current) {
			resetShop();
		}
		firstRender.current = false;
	}, [country]);

	React.useEffect(() => {
		!!customsFees ? addStepDocuments() : removeStepDocuments();
	}, [customsFees]);

	const steps: StepperBarItem[] = !!customsFees
		? [
				{ title: "Інформація про відправлення", status: "editing" },
				{ title: "Документи", status: "hidden" },
				{ title: "Адреса отримання", status: "hidden" },
		  ]
		: [
				{ title: "Інформація про відправлення", status: "editing" },
				{ title: "Адреса отримання", status: "hidden" },
		  ];

	return (
		<>
			<div className="general-information-form__stepper">
				<StepperBar steps={steps} />
			</div>
			<form className="general-information-form__form" onSubmit={handleSubmit}>
				<div className="general-information-form__row general-information-form__row--1">
					<Autocomplete options={COUNTRIES} name="country" id="select-counties" label="Країна" />
					<Autocomplete options={optionsShops} name="shop" id="select-shop" label="Назва інтернет-магазину" />
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
						currencySymbol={currencySymbol}
						formattedTotalPrice={formattedTotalPrice}
					/>
				</div>
				<div className="general-information-form__row general-information-form__row--3">
					<CardsInformation
						name="customsFees"
						formattedCustomsFees={formattedCustomsFees || "0.00 " + (currencySymbol ? currencySymbol : "")}
						fields={values.customsFees}
						isAgreementNeeded={!!customsFees}
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
		</>
	);
};
export default GeneralInformation;
