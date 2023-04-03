import React from "react";
import { useFormikContext } from "formik";

interface FormObserverProps {
	fieldName: string;
	onChange: () => void;
}

const FormObserver: React.FC<FormObserverProps> = ({ fieldName, onChange }) => {
	const { values } = useFormikContext<{ [key: string]: any }>();

	React.useEffect(() => {
		onChange();
	}, [values[fieldName]]);

	return null;
};

export default FormObserver;
