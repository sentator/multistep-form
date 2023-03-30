import React from "react";
import classnames from "clsx";

import "./navigationButton.scss";

interface NavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	iconPosition?: "left" | "right";
	isInsideLink?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
	title,
	iconPosition = "right",
	isInsideLink = false,
	...rest
}) => {
	const btnClassnames = classnames("navigation-btn", {
		"navigation-btn--icon-left": iconPosition === "left",
		"navigation-btn--inside-link": isInsideLink,
	});
	return (
		<button className={btnClassnames} aria-hidden={isInsideLink} tabIndex={isInsideLink ? -1 : 0} {...rest}>
			<span className="navigation-btn__title">{title}</span>
			<svg
				className="navigation-btn__icon"
				width={20}
				height={20}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="5" y1="12" x2="19" y2="12"></line>
				<polyline points="12 5 19 12 12 19"></polyline>
			</svg>
		</button>
	);
};

export default NavigationButton;
