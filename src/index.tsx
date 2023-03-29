import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import { DeliveryFormContextProvider, MuiThemeProvider } from "./context";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<HashRouter>
			<DeliveryFormContextProvider>
				<MuiThemeProvider>
					<App />
				</MuiThemeProvider>
			</DeliveryFormContextProvider>
		</HashRouter>
	</React.StrictMode>
);
