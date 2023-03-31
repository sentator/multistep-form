import { Routes, Route } from "react-router";

import { Homepage, SuccessPage } from "./pages";
import { DeliveryForm, GeneralInformation, Documents, Address } from "./pages/deliveryForm";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	return (
		<div className="app">
			<div className="container">
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/new-order" element={<DeliveryForm />}>
						<Route path="generalInformation" element={<GeneralInformation />} />
						<Route path="documents" element={<Documents />} />
						<Route path="address" element={<Address />} />
					</Route>
					<Route path="/success" element={<SuccessPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
