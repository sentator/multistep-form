import React from "react";

import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
	return (
		<button className="button" {...rest}>
			{title}
		</button>
	);
};

export default Button;
