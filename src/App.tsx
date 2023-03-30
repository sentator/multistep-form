import React from "react";
import { Routes, Route } from "react-router";

import { deliveryFormContext } from "./context";
import { Homepage, SuccessPage } from "./pages";
import { DeliveryForm, GeneralInformation, Documents, Address } from "./pages/deliveryForm";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	const {
		formState,
		formSteps,
		updateFormValues,
		updateFormStepsStatus,
		isStepDocumentsRequired,
		addStepDocuments,
		removeStepDocuments,
		clearContextData,
	} = React.useContext(deliveryFormContext);
	return (
		<div className="app">
			<div className="container">
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route
						path="/new-order"
						element={<DeliveryForm formSteps={formSteps} updateFormStepsStatus={updateFormStepsStatus} />}
					>
						<Route
							path="generalInformation"
							element={
								<GeneralInformation
									formValues={formState.steps.generalInformation.value}
									updateFormValues={updateFormValues}
									updateFormStepsStatus={updateFormStepsStatus}
									addStepDocuments={addStepDocuments}
									removeStepDocuments={removeStepDocuments}
								/>
							}
						/>
						<Route
							path="documents"
							element={
								<Documents
									formValues={formState.steps.documents.value}
									updateFormValues={updateFormValues}
									updateFormStepsStatus={updateFormStepsStatus}
								/>
							}
						/>
						<Route
							path="address"
							element={
								<Address
									formValues={formState.steps.address.value}
									updateFormValues={updateFormValues}
									updateFormStepsStatus={updateFormStepsStatus}
									prevStepUrl={
										isStepDocumentsRequired
											? "/new-order/documents"
											: "/new-order/generalInformation"
									}
									nextStepUrl={"/success"}
									onSuccessSubmission={clearContextData}
								/>
							}
						/>
					</Route>
					<Route path="/success" element={<SuccessPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
