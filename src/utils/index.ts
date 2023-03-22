import { Country } from "../types";
import us from "../assets/images/countries/us.svg";
import gb from "../assets/images/countries/gb.svg";
import de from "../assets/images/countries/de.svg";
import it from "../assets/images/countries/it.svg";
import pl from "../assets/images/countries/pl.svg";
import fr from "../assets/images/countries/fr.svg";
import es from "../assets/images/countries/es.svg";
import tr from "../assets/images/countries/tr.svg";
import cz from "../assets/images/countries/cz.svg";

export const COUNTRIES: Country[] = [
	{
		id: "us",
		name: "США",
		label: "us",
		flagUrl: us,
	},
	{
		id: "gb",
		name: "Велика Британія",
		label: "gb",
		flagUrl: gb,
	},
	{
		id: "de",
		name: "Німеччина",
		label: "de",
		flagUrl: de,
	},
	{
		id: "it",
		name: "Італія",
		label: "it",
		flagUrl: it,
	},
	{
		id: "pl",
		name: "Польща",
		label: "pl",
		flagUrl: pl,
	},
	{
		id: "fr",
		name: "Франція",
		label: "fr",
		flagUrl: fr,
	},
	{
		id: "es",
		name: "Іспанія",
		label: "es",
		flagUrl: es,
	},
	{
		id: "tr",
		name: "Туреччина",
		label: "tr",
		flagUrl: tr,
	},
	{
		id: "cz",
		name: "Чехія",
		label: "cz",
		flagUrl: cz,
	},
];
