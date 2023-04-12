import React from "react";

import { prepareOrdersTableData } from "../../utils";
import { useOrdersTableColumns } from "../../hooks";
import useDeliveryFormService from "../../services/deliveryForm";
import NavigationLink from "../../components/navigationLink/NavigationLink";
import OrdersTable from "../../components/ordersTable/OrdersTable";

import "./homepage.scss";

const Homepage = () => {
	const { isFetching, error, orders } = useDeliveryFormService();
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
