import React from "react";
import { Controller, Control, Path, FieldValues, RegisterOptions } from "react-hook-form";

import "./controlledInputFile.scss";

interface ControlledInputFileProps<Field extends FieldValues> {
	control: Control<Field>;
	name: Path<Field>;
	id: string;
	label: string;
	acceptedFormats?: string;
	rules?: Omit<RegisterOptions<Field, Path<Field>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
}

export const ControlledInputFile = <Field extends FieldValues>(props: ControlledInputFileProps<Field>) => {
	const { control, name, id, label, acceptedFormats, rules } = props;
	const [files, setFiles] = React.useState<File[] | null>(null);
	const filesUrls = files ? files.map((file) => URL.createObjectURL(file)) : [];

	const transformFileList = (value: FileList | null): File[] => {
		return value ? Array.from(value) : [];
	};

	const attachFiles = (fileList: FileList | null, onChange: (value: File[]) => void) => {
		const files = transformFileList(fileList);
		setFiles(files);
		onChange(files);
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
								onChange={(e) => {
									attachFiles(e.target.files, field.onChange);
								}}
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
						<div className="controlled-input-file__files">
							<div className="attached-files">
								<ul className="attached-files__list">
									{filesUrls.map((url) => (
										<li className="attached-files__item" key={url}>
											<span className="attached-file">
												<span className="attached-file__preview">
													<span className="attached-file__icon"></span>
													<img className="attached-file__img" src={url} alt="some img" />
												</span>
												<button className="attached-file__btn-remove" type="button">
													<svg
														version="1.1"
														viewBox="0 0 512 512"
														xmlns="http://www.w3.org/2000/svg"
													>
														<g>
															<path
																d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z    M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8   l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76   l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7   c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"
																fill="currentColor"
															/>
														</g>
													</svg>
												</button>
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
						{error ? <p className="controlled-input-file__error">{error.message}</p> : null}
					</div>
				);
			}}
		/>
	);
};
