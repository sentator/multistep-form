import React from "react";
import { useFormikContext } from "formik";

// variant 1
// const useWatch = <T extends { [key: string]: any }>(fieldName: keyof T): T[typeof fieldName] => {
// 	const { values }: { values: T } = useFormikContext<T>();
// 	const [state, setState] = React.useState(values.fieldName);

// 	React.useEffect(() => {
// 		setState(values.fieldName);
// 	}, [values.fieldName]);
// 	return state;
// };

// variant 2
const useWatch = <T extends { [key: string]: any }>(fieldName: keyof T): T[typeof fieldName] => {
	const { values }: { values: T } = useFormikContext<T>();
	const [state, setState] = React.useState(values[fieldName]);

	React.useEffect(() => {
		setState(values[fieldName]);
	}, [values[fieldName]]);
	return state;
};

export default useWatch;
