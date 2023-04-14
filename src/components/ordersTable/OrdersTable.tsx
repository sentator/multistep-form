import React from "react";
import { useTable, Column, useExpanded } from "react-table";

import { OrdersTableData } from "../../types";

import "./ordersTable.scss";

interface OrdersTableProps {
	columns: Column<OrdersTableData>[];
	data: OrdersTableData[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ columns, data }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useExpanded
	);
	return (
		<div className="orders-table">
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render("Header")}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default OrdersTable;
