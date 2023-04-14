import React from "react";
import { Column } from "react-table";

import { OrdersTableData } from "../types";

const useOrdersTableColumns = () => {
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
	return columns;
};

export default useOrdersTableColumns;
