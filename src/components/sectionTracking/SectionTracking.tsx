import { Control, FieldValues, Path } from "react-hook-form";

import { ControlledInput } from "../controlledInput/ControlledInput";

import "./sectionTracking.scss";

interface SectionTrackingProps<Field extends FieldValues> {
	name: Path<Field>;
	id: string;
	control: Control<Field>;
}

const SectionTracking = <Field extends FieldValues>(props: SectionTrackingProps<Field>) => {
	const { name, id, control } = props;
	return (
		<div className="section-tracking">
			<div className="section-tracking__input">
				<ControlledInput
					control={control}
					name={name}
					id={id}
					label="Трек-номер"
					rules={{
						validate: {
							required: (value) => {
								if (value && value.length < 6)
									return "Значення занадто коротке. Повинно бути 6 символів або більше.";
							},
						},
					}}
				/>
			</div>
			<div className="section-tracking__description">
				Ще не отримали трек номер? Створіть відправлення та додайте трек номер пізніше. Без трек номеру ми не
				зможемо доставити вашу посилку
			</div>
		</div>
	);
};

export default SectionTracking;
