import React from "react";
import clsx from "clsx";

import "./stepperBarItem.scss";

interface StepperBarItemProps {
	status: "editing" | "completed" | "hidden";
	title: string;
}

const StepperBarItem: React.FC<StepperBarItemProps> = ({ status, title }) => {
	const itemClassnames = clsx("stepper-bar-item", {
		editing: status === "editing",
		completed: status === "completed",
		hidden: status === "hidden",
	});
	return (
		<span className={itemClassnames}>
			<span className="stepper-bar-item__icon"></span>
			<span className="stepper-bar-item__title">{title}</span>
		</span>
	);
};

export default StepperBarItem;
