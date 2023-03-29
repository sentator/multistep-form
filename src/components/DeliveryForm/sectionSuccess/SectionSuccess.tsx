import React from "react";

import "./sectionSuccess.scss";

const SectionSuccess = () => {
	return (
		<div className="section-success">
			<div className="container">
				<h2 className="section-success__title">Вітаємо, форму заповнено успішно!</h2>
				<div className="section-success__body">
					<p className="section-success__text">
						Ми зареєстрували Ваше відправлення і від тепер будемо повідомляти про будь які зміни щодо нього.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SectionSuccess;
