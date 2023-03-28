import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/App";
import { DeliveryFormContextProvider } from "./context";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<DeliveryFormContextProvider>
			<App />
		</DeliveryFormContextProvider>
	</React.StrictMode>
);
