import React from "react";
import axios from "axios";

import { OrderResponseData } from "../../types";
import NavigationLink from "../../components/navigationLink/NavigationLink";
import OrdersList from "../../components/ordersList/OrdersList";

import "./homepage.scss";

const Homepage = () => {
	const [orders, setOrders] = React.useState<OrderResponseData[] | null>(null);
	const [isLoading, setLoading] = React.useState<boolean>(true);
	const [isError, setError] = React.useState<boolean>(false);

	React.useEffect(() => {
		async function fetchOrders() {
			try {
				const response = await axios.get<OrderResponseData[]>(
					"https://multistep-form-backend-production.up.railway.app/api/orders"
				);

				setOrders(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setError(true);
				setLoading(false);
			}
		}

		fetchOrders();
	}, []);

	return (
		<div className="homepage">
			<header className="homepage__header">
				<NavigationLink
					title="Зареєструвати відправлення"
					to="/new-order/generalInformation"
					iconPosition="right"
				/>
			</header>
			<div className="homepage__body">
				<div className="section-orders">
					<h2 className="section-orders__title">Мої відправлення</h2>
					<div className="section-orders__body">
						{isLoading && <p>Завантажуємо список замовлень...</p>}
						{isError && <p>Сталася помилка при завантаженні списку замовлень</p>}
						{!isLoading && !isError && orders && orders.length && <OrdersList items={orders} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
