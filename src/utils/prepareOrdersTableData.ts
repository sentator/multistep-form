import { OrderResponseData, OrdersTableData, ProductItem } from "../types";
import { CURRENCY } from "./database";

export const prepareOrdersTableData = (
	orderResponseData: OrderResponseData[] | null | undefined
): OrdersTableData[] => {
	const data: OrdersTableData[] =
		orderResponseData?.map(
			({
				data: {
					generalInformation: { orderComposition, ...rest },
				},
			}) => {
				const { symbol: currencySymbol } = CURRENCY[rest.country.label];
				return {
					...rest,
					productName: orderComposition
						.reduce((acc: string[], item: ProductItem) => {
							acc = [...acc, item.productName];
							return acc;
						}, [])
						.join(", "),
					quantity: orderComposition.reduce((acc, item) => {
						acc += item.quantity;
						return acc;
					}, 0),
					totalPrice:
						orderComposition
							.reduce((acc, item) => {
								acc += item.totalPrice * item.quantity;
								return acc;
							}, 0)
							.toFixed(2) + ` ${currencySymbol}`,
					subRows:
						orderComposition.length > 1
							? orderComposition.map((item) => ({
									country: { name: "", icon: null },
									shop: { name: "" },
									parcelName: "",
									promocode: "",
									trackNumber: "",
									subRows: null,
									...item,
									totalPrice: item.totalPrice.toFixed(2) + ` ${currencySymbol}`,
							  }))
							: null,
				};
			}
		) || [];

	return data;
};
