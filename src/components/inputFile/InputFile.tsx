import { useField } from "formik";

import { transformFileList } from "../../utils";

import "./inputFile.scss";

interface InputFileProps {
	name: string;
	id: string;
	label: string;
	acceptedFormats?: string;
	replaceAttachedFiles: (value: File[] | null) => void;
}

const InputFile: React.FC<InputFileProps> = (props) => {
	const { name, id, label, acceptedFormats, replaceAttachedFiles } = props;
	const [field, meta] = useField(name);

	const attachFiles = (fileList: FileList | null) => {
		const files = transformFileList(fileList);
		replaceAttachedFiles(files);
	};

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
					data-error={meta.touched && !!meta.error}
					onChange={(e) => attachFiles(e.target.files)}
				/>
				<label className="controlled-input-file__label" htmlFor={id}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M12.001 7.00293V14.9829" stroke="#DA291C" strokeLinecap="square" />
						<path d="M8 10.001L12.001 6L16.002 10.001" stroke="#DA291C" strokeLinecap="square" />
						<path d="M8.00098 18.9824H16.001" stroke="#DA291C" strokeLinecap="square" />
					</svg>
					<span>{label}</span>
				</label>
			</div>
			{meta.touched && !!meta.error ? <p className="controlled-input-file__error">{meta.error}</p> : null}
		</div>
	);
};

export default InputFile;
