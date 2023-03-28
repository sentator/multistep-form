import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

import { deliveryFormContext } from "../context";
import StepperBar from "./stepperBar/StepperBar";
import StepGeneralInformation from "./DeliveryForm/stepGeneralInformation/StepGeneralInformation";
import StepDocuments from "./DeliveryForm/stepDocuments/StepDocuments";
import StepAddress from "./DeliveryForm/stepAddress/StepAddress";

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

	const { formState, stepperBarValues, next, prev, setParticularStep, updateFormValues } =
		React.useContext(deliveryFormContext);

	const FORM_STEPS = [
		{
			label: "generalInformation",
			title: "Інформація про відправлення",
		},
		{
			label: "documents",
			title: "Документи",
		},
		{
			label: "address",
			title: "Адреса отримання",
		},
	];

	const renderStep = () => {
		switch (formState.selectedStepIndex) {
			case 0:
				return (
					<StepGeneralInformation
						formValues={formState.steps.generalInformation.value}
						updateFormValues={updateFormValues}
						moveToNextStep={next}
					/>
				);
			case 1:
				return (
					<StepDocuments
						formValues={formState.steps.documents.value}
						updateFormValues={updateFormValues}
						moveToPrevStep={prev}
						moveToNextStep={next}
					/>
				);
			case 2:
				return (
					<StepAddress
						formValues={formState.steps.address.value}
						updateFormValues={updateFormValues}
						moveToPrevStep={prev}
					/>
				);
			default:
				return (
					<StepGeneralInformation
						formValues={formState.steps.generalInformation.value}
						updateFormValues={updateFormValues}
						moveToNextStep={next}
					/>
				);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<div className="container">
					<h1 className="app__title title">Нове відправлення</h1>
					<div className="app__stepper-bar">
						<StepperBar steps={stepperBarValues} />
					</div>
					<div className="app__form-step">{renderStep()}</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
