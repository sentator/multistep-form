import React from "react";
import clsx from "clsx";

import { StepperBarItem as StepperBarItemType } from "../../types";
import StepperBarItem from "../stepperBarItem/StepperBarItem";

import "./stepperBar.scss";
// states: active, completed, hidden

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
						<li className="stepper-bar__item">
							<StepperBarItem {...step} />
						</li>
					</React.Fragment>
				))}
				{/* <li className="stepper-bar__item active">
					<span className="stepper-bar__item-icon"></span>
					<span className="stepper-bar__item-title">Інформація про відправлення</span>
				</li>
				<li className="stepper-bar__line"></li>
				<li className="stepper-bar__item">
					<span className="stepper-bar__item-icon"></span>
					<span className="stepper-bar__item-title">Адреса отримання</span>
				</li> */}
			</ul>
		</div>
	);
};

export default StepperBar;
