import { ProductItem } from "../types";

export const calcTotalPrice = (items: ProductItem[]): number => {
	const result = items.reduce((acc, item) => {
		const price = Number(item.totalPrice);
		acc += item.quantity * price;

		return acc;
	}, 0);

	return result;
};
