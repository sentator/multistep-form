import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

import { deliveryFormContext } from "../context";
import StepperBar from "./stepperBar/StepperBar";

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

	const { formSteps, setParticularStep, renderStep, isFormConfirmed } = React.useContext(deliveryFormContext);
	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<div className="container">
					{!isFormConfirmed && (
						<>
							<h1 className="app__title title">Нове відправлення</h1>
							<div className="app__stepper-bar">
								<StepperBar steps={formSteps} />
							</div>
						</>
					)}
					<div className="app__form-step">{renderStep()}</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
