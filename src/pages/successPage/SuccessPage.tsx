import NavigationLink from "../../components/navigationLink/NavigationLink";

import "./successPage.scss";

const SuccessPage = () => {
	return (
		<div className="page-success">
			<div className="container">
				<h2 className="page-success__title">Вітаємо, форму заповнено успішно!</h2>
				<div className="page-success__body">
					<p className="page-success__text">
						Ми зареєстрували Ваше відправлення і від тепер будемо повідомляти про будь які зміни щодо нього.
					</p>
				</div>
				<div className="page-success__footer">
					<NavigationLink to="/" title="Повернутися на головну" />
				</div>
			</div>
		</div>
	);
};

export default SuccessPage;
