import React from "react";
import { FieldValues, Control, ArrayPath, Path, useFieldArray } from "react-hook-form";

import { ControlledCheckbox } from "../controlledCheckbox/ControlledCheckbox";
import Tooltip from "../tooltip/Tooltip";

import "./cardsInformation.scss";

interface CardsInformationProps<Field extends FieldValues> {
	name: ArrayPath<Field>;
	control: Control<Field>;
	formattedCustomsFees: string;
	isAgreementNeeded: boolean;
}

const CardsInformation = <Field extends FieldValues>(props: CardsInformationProps<Field>) => {
	const { name, control, formattedCustomsFees, isAgreementNeeded } = props;
	const { fields, replace } = useFieldArray({ name, control } as never);

	React.useEffect(() => {
		isAgreementNeeded ? replace([{ value: true }]) : replace([{ value: false }]);
	}, [isAgreementNeeded, replace]);

	return (
		<div className="cards-information">
			<div className="cards-information__list">
				<div className="cards-information__item">
					<div className="customs-fees">
						{isAgreementNeeded && (
							<div className="customs-fees__row">
								{fields.map((field, index) => (
									<div className="customs-fees__row-item" key={field.id}>
										<ControlledCheckbox
											name={`${name}.${index}.value` as Path<Field>}
											control={control}
											id="customs-fees-checkbox"
											label="Я згоден з оплатою послуги розмитнення (митний збір, податки та митно-брокерські послуги)"
											rules={{
												required:
													"Для подальшої реєстрації відправлення, необхідно погодитись з вищезазначеною умовою",
											}}
										/>
									</div>
								))}
							</div>
						)}
						<div className="customs-fees__row">
							<p className="customs-fees__title">Орієнтовна сума митних платежів</p>
							<span className="customs-fees__tooltip">
								<Tooltip title="Якщо сумарна вартість товарів посилки складає до 150 євро – Ви не сплачуєте додаткових податків. Якщо сумарна вартість товарів перевищує 150 євро – Ви сплачуєте мито в розмірі 10% від суми, яка перевищує 150 євро + ПДВ в розмірі 20% від суми, що перевищує 150 євро з додаванням мита. Додатково сплачується 3% за митно-брокерські послуги НП Глобал." />
							</span>
							<div className="customs-fees__price">≈ {formattedCustomsFees}</div>
						</div>
					</div>
				</div>
				<div className="cards-information__item">
					<div className="client-bonuses">
						<p className="client-bonuses__title">Бонусів для списання немає</p>
						<p className="client-bonuses__body">
							Бонуси нараховуються по замовленням, які мають поточний статус: "Отримано замовником". За
							кожних 0.5кг посилки нараховується по 5 грн
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardsInformation;
