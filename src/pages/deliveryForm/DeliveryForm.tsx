import React from "react";
import { Outlet } from "react-router";

import "./deliveryForm.scss";

const DeliveryForm: React.FC = () => {
	return (
		<div className="delivery-form-wrapper">
			<div className="container">
				<h1 className="delivery-form-wrapper__title title">Нове відправлення</h1>
				<div className="delivery-form-wrapper__body">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DeliveryForm;
