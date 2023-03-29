import NavigationLink from "../../components/navigationLink/NavigationLink";

import "./homepage.scss";

const Homepage = () => {
	return (
		<div className="homepage">
			<NavigationLink
				title="Зареєструвати відправлення"
				to="/new-order/generalInformation"
				iconPosition="right"
			/>
		</div>
	);
};

export default Homepage;
