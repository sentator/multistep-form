import { Routes, Route } from "react-router";

import { Homepage, SuccessPage } from "./pages";
import { DeliveryForm, Documents, Address, ConfirmData } from "./pages/deliveryForm";
import GeneralInformationWrapper from "./pages/deliveryForm/GeneralInformationWrapper";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	return (
		<div className="app">
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/new-order" element={<DeliveryForm />}>
					<Route path="generalInformation" element={<GeneralInformationWrapper />} />
					<Route path="documents" element={<Documents />} />
					<Route path="address" element={<Address />} />
					<Route path="confirm-data" element={<ConfirmData />} />
				</Route>
				<Route path="/success" element={<SuccessPage />} />
			</Routes>
		</div>
	);
}

export default App;
