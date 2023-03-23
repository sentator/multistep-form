import React from "react";
import { FieldValues, Control, Path, ArrayPath, useFieldArray } from "react-hook-form";
import { ControlledInput } from "../../controlledInput/ControlledInput";
import { ControlledInputCounter } from "../../controlledInputCounter/ControlledInputCounter";
import { ControlledInputPrice } from "../../controlledInputPrice/ControlledInputPrice";

import "./orderComposition.scss";

interface OrderCompositionProps<Field extends FieldValues> {
	name: ArrayPath<Field>;
	control: Control<Field>;
}

const OrderComposition = <Field extends FieldValues>(props: OrderCompositionProps<Field>) => {
	const { name, control } = props;
	const { fields, append, remove } = useFieldArray({ name, control });

	return (
		<div className="order-composition">
			<h2 className="order-composition__title">Склад замовлення</h2>
			<div className="order-composition__body">
				{fields.map((field, index) => {
					return (
						<div className="fields-product" key={field.id}>
							<div className="fields-product__name">
								<ControlledInput
									name={`${name}.${index}.productName` as Path<Field>}
									rules={{ required: "Значення не повинно бути пустим." }}
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
									/>
								}
							</div>
							{index !== 0 && (
								<button className="fields-product__btn-clear" onClick={() => remove(index)}>
									<svg
										fill="#000000"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
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
								</button>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OrderComposition;
