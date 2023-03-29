import React from "react";
import { FieldValues, Path, Control } from "react-hook-form/dist/types";
import { ControlledInputFile } from "../../controlledInputFile/ControlledInputFile";

import "./sectionInvoiceAttachment.scss";

interface SectionInvoiceAttachmentProps<Field extends FieldValues> {
	name: Path<Field>;
	id: string;
	control: Control<Field>;
}

const SectionInvoiceAttachment = <Field extends FieldValues>(props: SectionInvoiceAttachmentProps<Field>) => {
	const { name, id, control } = props;
	const acceptedFormats = ["image/jpeg", "image/png", "application/pdf"];

	return (
		<div className="section-invoice-attachment">
			<h3 className="section-invoice-attachment__title">Рахунок-фактура</h3>
			<div className="section-invoice-attachment__description">
				<p>
					Завантажте рахунок-фактуру вашого замовлення необхідний митній службі України з метою розмитнення
					замовлення. Знайти його можна на електроній пошті або в особистому кабінеті інтернет-магазину.
				</p>
				<p>Будь-який зручний для вас формат: jpg, png, pdf</p>
			</div>
			<div className="section-invoice-attachment__input">
				<ControlledInputFile
					control={control}
					name={name}
					id={id}
					label="Завантажити файли"
					acceptedFormats={acceptedFormats.join(", ")}
					rules={{
						required: "Файл рахунку-фактури є обов'язковим.",
						// 	validate: {
						// 		// required: (files) => files[0] || "Файл рахунку-фактури є обов'язковим.",
						// 		// lessThan200KB: (files) => files[0]?.size < 200000 || "Max 200 KB",
						// 		// acceptedFormats: (files) =>
						// 		// 	acceptedFormats.includes(files[0]?.type) ||
						// 		// 	"Формат файлу не підтримується. Спробуйте jpeg, jpg, png, pdf",
						// 	},
					}}
				/>
			</div>
		</div>
	);
};

export default SectionInvoiceAttachment;
