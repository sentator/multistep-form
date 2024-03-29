import { Controller, Control, Path, FieldValues, RegisterOptions } from "react-hook-form";

import { transformFileList } from "../../../utils";

import "./controlledInputFile.scss";

interface ControlledInputFileProps<Field extends FieldValues> {
	control: Control<Field>;
	name: Path<Field>;
	id: string;
	label: string;
	acceptedFormats?: string;
	rules?: Omit<RegisterOptions<Field, Path<Field>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
	replaceAttachedFiles: (value: File[] | null) => void;
}

export const ControlledInputFile = <Field extends FieldValues>(props: ControlledInputFileProps<Field>) => {
	const { control, name, id, label, acceptedFormats, rules, replaceAttachedFiles } = props;

	const attachFiles = (fileList: FileList | null) => {
		const files = transformFileList(fileList);
		replaceAttachedFiles(files);
	};

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => {
				return (
					<div className="controlled-input-file">
						<div className="controlled-input-file__input-wrapper">
							<input
								type="file"
								multiple
								accept={acceptedFormats}
								{...field}
								value={undefined}
								className="controlled-input-file__input visually-hidden"
								id={id}
								data-error={!!error}
								onChange={(e) => attachFiles(e.target.files)}
							/>
							<label className="controlled-input-file__label" htmlFor={id}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
								>
									<path d="M12.001 7.00293V14.9829" stroke="#DA291C" strokeLinecap="square" />
									<path
										d="M8 10.001L12.001 6L16.002 10.001"
										stroke="#DA291C"
										strokeLinecap="square"
									/>
									<path d="M8.00098 18.9824H16.001" stroke="#DA291C" strokeLinecap="square" />
								</svg>
								<span>{label}</span>
							</label>
						</div>
						{error ? <p className="controlled-input-file__error">{error.message}</p> : null}
					</div>
				);
			}}
		/>
	);
};
