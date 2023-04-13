import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import { DeliveryFormContextProvider, MuiThemeProvider } from "./context";

import "./index.scss";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<QueryClientProvider client={queryClient}>
		<HashRouter>
			<DeliveryFormContextProvider>
				<MuiThemeProvider>
					<App />
				</MuiThemeProvider>
			</DeliveryFormContextProvider>
		</HashRouter>
	</QueryClientProvider>
);
