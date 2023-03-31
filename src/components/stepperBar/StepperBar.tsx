import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { StepperBarItem as StepperBarItemType } from "../../types";
import StepperBarItem from "../stepperBarItem/StepperBarItem";

import "./stepperBar.scss";

interface StepperBarProps {
	steps: StepperBarItemType[];
}

const StepperBar: React.FC<StepperBarProps> = ({ steps }) => {
	const listClassnames = clsx("stepper-bar__list", {
		"stepper-bar__list--2-steps": steps.length === 2,
		"stepper-bar__list--3-steps": steps.length === 3,
	});

	return (
		<div className="stepper-bar">
			<ul className={listClassnames}>
				{steps.map((step, index) => (
					<React.Fragment key={step.title}>
						{index !== 0 && <li className="stepper-bar__line" aria-hidden></li>}
						<li className="stepper-bar__item" data-clickable={step.status === "completed"}>
							{step.url ? (
								<Link to={step.url}>
									<StepperBarItem {...step} />
								</Link>
							) : (
								<StepperBarItem {...step} />
							)}
						</li>
					</React.Fragment>
				))}
			</ul>
		</div>
	);
};

export default StepperBar;
