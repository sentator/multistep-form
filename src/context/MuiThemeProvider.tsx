import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const MuiThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
