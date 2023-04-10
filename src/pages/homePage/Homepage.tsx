import useDeliveryFormService from "../../services/deliveryForm";
import NavigationLink from "../../components/navigationLink/NavigationLink";
import OrdersList from "../../components/ordersList/OrdersList";

import "./homepage.scss";

const Homepage = () => {
	const { isFetching, error, orders } = useDeliveryFormService();

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
						{isFetching && <p>Завантажуємо список замовлень...</p>}
						{!!error && <p>{error}</p>}
						{!isFetching && !error && orders && orders.length && <OrdersList items={orders} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
