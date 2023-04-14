import { COUNTRIES } from "./database";

export const getCountryIconUrl = (label: string): string | null => {
	const selectedCountry = COUNTRIES.find((item) => item.label === label);

	return selectedCountry && selectedCountry.icon ? selectedCountry.icon : null;
};
