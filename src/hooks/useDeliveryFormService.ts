import React from "react";
import axios from "axios";

import { OrderResponseData } from "../types";
import { deliveryFormContext } from "../context";

const useDeliveryFormService = (onSuccess?: () => void) => {
	const { formState } = React.useContext(deliveryFormContext);

	const sendFormData = async () => {
		try {
			const response = await axios.post<OrderResponseData>(
				"https://multistep-form-backend-production.up.railway.app/api/orders",
				JSON.stringify({ data: formState }),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data) {
				onSuccess?.();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return { sendFormData };
};

export default useDeliveryFormService;
