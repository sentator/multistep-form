import React from "react";
import { useQuery } from "react-query";

import { OrderResponseData } from "../../types";
import { prepareOrdersTableData } from "../../utils";
import { useOrdersTableColumns } from "../../hooks";
import useDeliveryFormService from "../../services/deliveryForm";
import NavigationLink from "../../components/navigationLink/NavigationLink";
import OrdersTable from "../../components/ordersTable/OrdersTable";

import "./homepage.scss";

const Homepage = () => {
	const { fetchOrders } = useDeliveryFormService();
	const { data: orders, isLoading, isError } = useQuery<OrderResponseData[], Error>(["orders"], fetchOrders);
	const columns = useOrdersTableColumns();
	const data = React.useMemo(() => prepareOrdersTableData(orders), [orders]);

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
							{isLoading && <p>Завантажуємо список замовлень...</p>}
							{isError && <p>Сталася помилка при завантаженні списку замовлень</p>}
							{!isLoading && !isError && orders && orders.length && (
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
