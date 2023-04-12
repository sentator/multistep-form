import React from "react";
import { Column } from "react-table";

import { OrdersTableData, ProductItem } from "../../types";
import { CURRENCY } from "../../utils";
import useDeliveryFormService from "../../services/deliveryForm";
import NavigationLink from "../../components/navigationLink/NavigationLink";
import OrdersTable from "../../components/ordersTable/OrdersTable";

import "./homepage.scss";

const Homepage = () => {
	const { isFetching, error, orders } = useDeliveryFormService();

	const columns: Column<OrdersTableData>[] = React.useMemo(
		() => [
			{
				id: "expander",
				Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
					<button {...getToggleAllRowsExpandedProps()} className="btn-expand" type="button">
						{isAllRowsExpanded ? "▼" : "►"}
					</button>
				),
				Cell: ({ row }: { row: any }) =>
					row.canExpand ? (
						<button {...row.getToggleRowExpandedProps()} className="btn-expand" type="button">
							{row.isExpanded ? "▼" : "►"}
						</button>
					) : null,
			},
			{
				Header: "Країна",
				accessor: ({ country }) => {
					return (
						<span className="cell-country">
							{country.icon ? (
								<span className="cell-country__icon">
									<img src={country.icon} alt={country.name} />
								</span>
							) : null}
							<span className="cell-country__name">{country.name}</span>
						</span>
					);
				},
			},
			{ Header: "Магазин", accessor: ({ shop }) => shop.name },
			{ Header: "Назва посилки", accessor: "parcelName" },
			{ Header: "Трек-номер", accessor: "trackNumber" },
			{
				Header: "Товари",
				columns: [
					{
						Header: "Назва товару",
						accessor: "productName",
					},
					{
						Header: "Кількість, од.",
						accessor: "quantity",
					},
					{
						Header: (
							<span>
								Вартість, всього <br /> / за 1 од.
							</span>
						),
						accessor: "totalPrice",
					},
				],
			},
		],
		[]
	);

	const data: OrdersTableData[] = React.useMemo(
		() =>
			orders?.map(
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
			) || [],
		[orders]
	);

	return (
		<div className="wrapper">
			<div className="homepage">
				<header className="homepage__header">
					<div className="homepage__create-new">
						<NavigationLink
							title="Зареєструвати відправлення"
							to="/new-order/generalInformation"
							iconPosition="right"
						/>
					</div>
				</header>
				<div className="homepage__body">
					<div className="section-orders">
						<h2 className="section-orders__title">Мої відправлення</h2>
						<div className="section-orders__body">
							{isFetching && <p>Завантажуємо список замовлень...</p>}
							{!!error && <p>{error}</p>}
							{!isFetching && !error && orders && orders.length && (
								<OrdersTable columns={columns} data={data} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
