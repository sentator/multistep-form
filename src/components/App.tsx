import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

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

	const FORM_STATE = {
		selectedIndex: 0,
		steps: {
			generalInformation: {
				valid: false,
				dirty: false,
				value: {
					country: null,
					shop: null,
					parcelName: "",
					orderComposition: [{ productName: "", quantity: 1, totalPrice: "0.00" }],
					customsFees: [],
					promocode: "",
					trackNumber: "",
				},
			},
			documents: {
				valid: false,
				dirty: false,
				value: {},
			},
			address: {
				valid: false,
				dirty: false,
				value: {},
			},
		},
	};

	const [form, setForm] = React.useState(FORM_STATE);

	const next = () => {
		setForm((prevState) => ({ ...prevState, selectedIndex: prevState.selectedIndex + 1 }));
	};

	const prev = () => {
		setForm((prevState) => ({ ...prevState, selectedIndex: prevState.selectedIndex - 1 }));
	};

	const setSelectedIndex = (index: number) => {
		setForm((prevState) => ({ ...prevState, selectedIndex: index }));
	};

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
					<StepGeneralInformation />
					{/* <StepDocuments /> */}
					{/* <StepAddress /> */}
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
