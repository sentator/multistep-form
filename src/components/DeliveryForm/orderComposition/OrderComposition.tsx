import { FieldValues, Control, useFieldArray, ArrayPath } from "react-hook-form";
import { ProductItem } from "../../../types";
import OrderCompositionItem from "../orderCompositionItem/OrderCompositionItem";

import "./orderComposition.scss";

interface OrderCompositionProps<Field extends FieldValues> {
	name: ArrayPath<Field>;
	control: Control<Field>;
	formattedTotalPrice: string;
	currencySymbol?: string;
}

const OrderComposition = <Field extends FieldValues>(props: OrderCompositionProps<Field>) => {
	const { name, control, formattedTotalPrice, currencySymbol } = props;
	const { fields, append, remove } = useFieldArray({ name, control } as never);
	const itemsInOrder = fields.length;

	const addNewItemFields = () => {
		append({ productName: "", quantity: 1, totalPrice: "0.00" });
	};

	return (
		<div className="order-composition">
			<h2 className="order-composition__title">Склад замовлення</h2>
			<div className="order-composition__body">
				<ul className="order-composition__list">
					{fields.map((field, index) => (
						<li className="order-composition__item" key={field.id}>
							<OrderCompositionItem
								index={index}
								name={name}
								control={control}
								isClearBtnVisible={itemsInOrder > 1}
								removeItem={() => remove(index)}
								currencySymbol={currencySymbol}
								// currentPrice={}
							/>
						</li>
					))}
				</ul>
			</div>
			<footer className="order-composition__footer">
				<button className="order-composition__btn-add" onClick={addNewItemFields} type="button">
					<span></span>
					<span>ще один товар</span>
				</button>
				{!!formattedTotalPrice && (
					<p className="order-composition__total-price">
						Сума замовлення: <span>{formattedTotalPrice}</span>
					</p>
				)}
			</footer>
		</div>
	);
};

export default OrderComposition;
