import React from "react";

import { getCountryIconUrl } from "../../utils/getCountryIconUrl";

import "./ordersListItem.scss";

interface OrdersListItemProps {
	countryLabel: string;
	parcelName: string;
	trackNumber: string;
}

const OrdersListItem: React.FC<OrdersListItemProps> = ({ countryLabel, parcelName, trackNumber }) => {
	const iconUrl = getCountryIconUrl(countryLabel);
	return (
		<div className="order-item">
			<div className="order-item__icon">{iconUrl && <img src={iconUrl} alt={iconUrl} />}</div>
			<div className="order-item__body">
				{!!parcelName ? (
					<p className="order-item__title">{parcelName}</p>
				) : (
					<p className="order-item__title">Відправлення без назви</p>
				)}
				<div className="order-item__content">
					{!!trackNumber && <p className="order-item__tracking-number">Трек номер: {trackNumber}</p>}
				</div>
				<p className="order-item__status">Статус: Відправлення зареєстровано</p>
			</div>
		</div>
	);
};

export default OrdersListItem;
