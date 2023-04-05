import React from "react";
import { useFormikContext } from "formik";

const useWatch = <T, K extends keyof T>(fieldName: K): T[K] => {
	const { values }: { values: T } = useFormikContext<T>();
	const [state, setState] = React.useState<T[K]>(values[fieldName]);

	React.useEffect(() => {
		setState(values[fieldName]);
	}, [values[fieldName]]);

	return state;
};

export default useWatch;
