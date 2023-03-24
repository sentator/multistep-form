import { ArrayPath, Path, FieldValues, Control } from "react-hook-form";

import { ControlledInput } from "../../controlledInput/ControlledInput";
import { ControlledInputCounter } from "../../controlledInputCounter/ControlledInputCounter";
import { ControlledInputPrice } from "../../controlledInputPrice/ControlledInputPrice";

import "./orderCompositionItem.scss";

interface OrderCompositionItemProps<Field extends FieldValues> {
	index: number;
	name: ArrayPath<Field>;
	control: Control<Field>;
	isClearBtnVisible: boolean;
	removeItem: () => void;
	currencySymbol?: string;
}

const OrderCompositionItem = <Field extends FieldValues>(props: OrderCompositionItemProps<Field>) => {
	const { index, name, control, isClearBtnVisible, removeItem, currencySymbol } = props;
	return (
		<div className="fields-product">
			<div className="fields-product__name">
				<ControlledInput
					name={`${name}.${index}.productName` as Path<Field>}
					rules={{
						validate: {
							required: (value) => {
								if (!value) {
									return "Значення не повинно бути пустим.";
								}
								if (value.match(/\W/gi)) return "Доступні лише символи з латиниці";
							},
						},
					}}
					control={control}
					id={`${name}_${index}_productName`}
					label="Назва товару (латиницею)"
				/>
			</div>
			<div className="fields-product__quantity">
				<ControlledInputCounter
					name={`${name}.${index}.quantity` as Path<Field>}
					control={control}
					id={`${name}_${index}_quantity`}
					label="Кількість"
				/>
			</div>
			<div className="fields-product__price">
				{
					<ControlledInputPrice
						name={`${name}.${index}.totalPrice` as Path<Field>}
						rules={{
							validate: {
								required: (value) => {
									if (value === "0.00")
										return "Для подальшої реєстрації відправлення, вкажіть вартість товару за одиницю.";
								},
							},
						}}
						control={control}
						id={`${name}_${index}_totalPrice`}
						label="Вартість"
						tooltip="Вартість вводьте з податками (tax), якщо вони є. Доставку до закордонного складу не враховуйте."
						currencySymbol={currencySymbol}
					/>
				}
			</div>
			{isClearBtnVisible && (
				<button className="fields-product__btn-clear" onClick={removeItem}>
					<svg
						fill="currentColor"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 95.939 95.939"
					>
						<g>
							<path
								d="M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0
                c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608
                c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021
                c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535
                c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97
                z"
							/>
						</g>
					</svg>
					<span>Видалити</span>
				</button>
			)}
		</div>
	);
};

export default OrderCompositionItem;
