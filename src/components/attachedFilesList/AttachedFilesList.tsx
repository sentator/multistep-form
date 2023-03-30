import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import AttachedFileItem from "../attachedFileItem/AttachedFileItem";

import "./attachedFilesList.scss";
import pdfIcon from "../../assets/images/icons/pdf.svg";

interface AttachedFilesListProps {
	files: File[];
	removeFile: (index: number) => void;
}

const AttachedFilesList: React.FC<AttachedFilesListProps> = ({ files, removeFile }) => {
	const filesProperties = files.map((file) => {
		return file.type === "application/pdf"
			? { icon: pdfIcon, alt: file.name }
			: { preview: URL.createObjectURL(file), alt: file.name };
	});

	return (
		<div className="attached-files">
			<TransitionGroup className="attached-files__list" component="ul">
				{filesProperties.map((file, i) => (
					<CSSTransition
						key={file.alt}
						timeout={300}
						classNames="files-transition"
						mountOnEnter
						unmountOnExit
						appear
					>
						<li className="attached-files__item">
							<AttachedFileItem fileProperties={file} removeFile={() => removeFile(i)} />
						</li>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

export default AttachedFilesList;
