import React from "react";
import { Link, LinkProps } from "react-router-dom";
import classnames from "clsx";

import "./navigationLink.scss";

interface NavigationLinkProps extends LinkProps {
	title: string;
	iconPosition?: "left" | "right";
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ title, iconPosition = "left", ...rest }) => {
	const linkClassnames = classnames("navigation-link", {
		"navigation-link--icon-left": iconPosition === "left",
	});

	return (
		<Link className={linkClassnames} {...rest}>
			<span className="navigation-link__title">{title}</span>
			<svg
				className="navigation-link__icon"
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
		</Link>
	);
};

export default NavigationLink;
