import React from "react";

import { OrderResponseData, UploadedFile } from "../types";
import { deliveryFormContext } from "../context";
import { apiClient } from "../apiClient";
import { isAxiosError } from "axios";

const useDeliveryFormService = () => {
	const { formState, isDocumentsRequired } = React.useContext(deliveryFormContext);

	const fetchOrders = async () => {
		return await apiClient.get<OrderResponseData[]>("/api/orders").then((response) => response.data);
	};

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
				const response = await apiClient.post<UploadedFile[]>("/api/files", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				return response.data;
			} catch (error) {
				if (isAxiosError<UploadedFile[]>(error)) {
					throw new Error("Сталася помилка при відправленні файлів");
				}
			}
		}

		return null;
	};

	const createNewOrder = async () => {
		const uploadedFiles = await _sendFiles();

		if (isDocumentsRequired && !uploadedFiles) {
			throw new Error("Не прикріплено жодного файлу");
		}

		const data = isDocumentsRequired
			? { ...formState, documents: { ...formState.documents, invoice: uploadedFiles } }
			: { generalInformation: formState.generalInformation, address: formState.address };

		try {
			const response = await apiClient.post<OrderResponseData>("/api/orders", JSON.stringify({ data }), {
				headers: {
					"Content-Type": "application/json",
				},
			});

			return response.data;
		} catch (error) {
			if (isAxiosError<OrderResponseData>(error)) {
				throw new Error("Не вдалося відправити дані форми");
			}
		}

		return null;
	};

	return { fetchOrders, createNewOrder };
};

export default useDeliveryFormService;
