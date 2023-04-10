import React from "react";
import axios, { isAxiosError } from "axios";

import { OrderResponseData, UploadedFile } from "../types";
import { deliveryFormContext } from "../context";

const useDeliveryFormService = (onSuccess?: () => void) => {
	const { formState, isDocumentsRequired } = React.useContext(deliveryFormContext);
	const [error, setError] = React.useState<string | null>(null);
	const [isSending, setSending] = React.useState<boolean>(false);
	const [isFetching, setFetching] = React.useState<boolean>(false);
	const [orders, setOrders] = React.useState<OrderResponseData[] | null>(null);

	const _sendFiles = async () => {
		const {
			documents: { invoice: files },
		} = formState;

		if (files) {
			const formData = new FormData();

			files.forEach((file) => {
				formData.append("files", file);
			});

			try {
				setSending(true);
				const response = await axios.post<UploadedFile[]>(
					"https://multistep-form-backend-production.up.railway.app/api/files",
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				);

				return response.data;
			} catch (error) {
				if (isAxiosError<UploadedFile[]>(error)) {
					setError("Сталася помилка при відправленні файлів");
				}
			}
		}

		return null;
	};

	const sendOrderData = async () => {
		const uploadedFiles = await _sendFiles();

		if (isDocumentsRequired && !uploadedFiles) {
			setSending(false);
			setError("Не прикріплено жодного файлу");
			return;
		}

		const data = isDocumentsRequired
			? { ...formState, documents: { ...formState.documents, invoice: uploadedFiles } }
			: { generalInformation: formState.generalInformation, address: formState.address };

		try {
			setSending(true);
			const response = await axios.post<OrderResponseData>(
				"https://multistep-form-backend-production.up.railway.app/api/orders",
				JSON.stringify({ data }),
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
			if (isAxiosError<OrderResponseData>(error)) {
				setError("Не вдалося відправити дані форми");
			}
		}
		setSending(false);
	};

	const fetchAllOrders = async () => {
		try {
			setFetching(true);
			const response = await axios.get<OrderResponseData[]>(
				"https://multistep-form-backend-production.up.railway.app/api/orders"
			);

			setOrders(response.data);
			setFetching(false);
		} catch (error) {
			if (isAxiosError<OrderResponseData[]>(error)) {
				setError("Не вдалося завантажити список замовлень");
				setFetching(false);
			}
		}
	};

	React.useEffect(() => {
		fetchAllOrders();
	}, []);

	return { isSending, isFetching, error, sendOrderData, orders };
};

export default useDeliveryFormService;
