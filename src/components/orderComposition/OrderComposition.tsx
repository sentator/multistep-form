import { FieldArray } from "formik";
import { v4 as uuidv4 } from "uuid";

import { ProductItem } from "../../types";
import OrderCompositionItem from "../orderCompositionItem/OrderCompositionItem";

import "./orderComposition.scss";

interface OrderCompositionProps {
	name: string;
	fields: ProductItem[];
	formattedTotalPrice: string;
	currencySymbol?: string;
}

const OrderComposition: React.FC<OrderCompositionProps> = (props) => {
	const { name, fields, formattedTotalPrice, currencySymbol } = props;
	const itemsInOrder = fields.length;

	return (
		<div className="order-composition">
			<h2 className="order-composition__title">Склад замовлення</h2>
			<FieldArray name="orderComposition">
				{({ remove, push }) => (
					<>
						<div className="order-composition__body">
							<ul className="order-composition__list">
								{fields.map((field, index) => (
									<li className="order-composition__item" key={field.id}>
										<OrderCompositionItem
											index={index}
											name={name}
											isClearBtnVisible={itemsInOrder > 1}
											removeItem={() => remove(index)}
											currencySymbol={currencySymbol}
										/>
									</li>
								))}
							</ul>
						</div>
						<footer className="order-composition__footer">
							<button
								className="order-composition__btn-add"
								onClick={() => push({ id: uuidv4(), productName: "", quantity: 1, totalPrice: 0 })}
								type="button"
							>
								<span></span>
								<span>ще один товар</span>
							</button>
							{!!formattedTotalPrice && (
								<p className="order-composition__total-price">
									Сума замовлення: <span>{formattedTotalPrice}</span>
								</p>
							)}
						</footer>
					</>
				)}
			</FieldArray>
		</div>
	);
};

export default OrderComposition;
