import React from "react";

import GeneralInformation from "./DeliveryForm/GeneralInformation/GeneralInformation";

function App() {
	return (
		<>
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
					<GeneralInformation />
				</div>
			</div>
		</>
	);
}

export default App;
