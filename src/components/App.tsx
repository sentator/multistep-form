import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

import GeneralInformation from "./DeliveryForm/GeneralInformation/GeneralInformation";

function App() {
	const theme = createTheme({
		components: {
			MuiAutocomplete: {
				styleOverrides: {
					inputRoot: {
						fontFamily: "Inter",
						display: "flex",
						gap: "10px",
						justifyContent: "flex-start",
						width: "100%",
						height: "48px",
						padding: "10px 38px 10px 10px",
						borderRadius: "12px",
						fontSize: "16px",
						cursor: "pointer",
					},
					option: {
						display: "flex",
						alignItems: "center",
						gap: "10px",
						padding: "10px",
						minHeight: "46px",
						fontSize: "1rem",
						lineHeight: "140%",
						fontFamily: "var(--fontFamily)",
						color: "#333",
						cursor: "pointer",
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					notchedOutline: {
						borderColor: "var(--gullGrayColor)",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<div className="container">
					<h1 className="title">Нове відправлення</h1>
					<div className="stepper-bar">
						<ul className="stepper-bar__list">
							<li className="stepper-bar__item active">
								<span className="stepper-bar__item-icon"></span>
								<span className="stepper-bar__item-title">Інформація про відправлення</span>
							</li>
							<li className="stepper-bar__line"></li>
							<li className="stepper-bar__item">
								<span className="stepper-bar__item-icon"></span>
								<span className="stepper-bar__item-title">Адреса отримання</span>
							</li>
						</ul>
					</div>
					<GeneralInformation />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
