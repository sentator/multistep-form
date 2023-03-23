import React from "react";
import { Tooltip as MuiTooltip } from "@mui/material";

import "./tooltip.scss";

interface TooltipProps {
	title: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title }) => {
	return (
		<MuiTooltip title={title} placement="top">
			<svg
				className="tooltip-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
			>
				<g clipPath="url(#clip0_298_214)">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12.001 2C6.47759 2 2 6.47759 2 12.001C2 17.5244 6.47759 22.002 12.001 22.002C17.5244 22.002 22.002 17.5244 22.002 12.001C22.002 6.47759 17.5244 2 12.001 2ZM1 12.001C1 5.92531 5.92531 1 12.001 1C18.0767 1 23.002 5.92531 23.002 12.001C23.002 18.0767 18.0767 23.002 12.001 23.002C5.92531 23.002 1 18.0767 1 12.001Z"
						fill="black"
					/>
					<path
						d="M9.09009 9.00002C9.32519 8.33169 9.78924 7.76813 10.4 7.40915C11.0108 7.05018 11.729 6.91896 12.4273 7.03873C13.1255 7.15851 13.7589 7.52154 14.2152 8.06355C14.6714 8.60555 14.9211 9.29154 14.9201 10C14.9201 12 11.9201 13 11.9201 13"
						stroke="black"
						strokeLinecap="square"
						strokeLinejoin="round"
					/>
					<path d="M12 17H12.01" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
				</g>
				<defs>
					<clipPath id="clip0_298_214">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</MuiTooltip>
	);
};

export default Tooltip;
