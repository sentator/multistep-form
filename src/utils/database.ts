import { CurrencyRate, OptionItem } from "../types";
import us from "../assets/images/countries/us.svg";
import gb from "../assets/images/countries/gb.svg";
import de from "../assets/images/countries/de.svg";
import it from "../assets/images/countries/it.svg";
import pl from "../assets/images/countries/pl.svg";
import fr from "../assets/images/countries/fr.svg";
import es from "../assets/images/countries/es.svg";
import tr from "../assets/images/countries/tr.svg";
import cz from "../assets/images/countries/cz.svg";

export const COUNTRIES: OptionItem[] = [
	{
		id: "us",
		name: "США",
		label: "us",
		icon: us,
	},
	{
		id: "gb",
		name: "Велика Британія",
		label: "gb",
		icon: gb,
	},
	{
		id: "de",
		name: "Німеччина",
		label: "de",
		icon: de,
	},
	{
		id: "it",
		name: "Італія",
		label: "it",
		icon: it,
	},
	{
		id: "pl",
		name: "Польща",
		label: "pl",
		icon: pl,
	},
	{
		id: "fr",
		name: "Франція",
		label: "fr",
		icon: fr,
	},
	{
		id: "es",
		name: "Іспанія",
		label: "es",
		icon: es,
	},
	{
		id: "tr",
		name: "Туреччина",
		label: "tr",
		icon: tr,
	},
	{
		id: "cz",
		name: "Чехія",
		label: "cz",
		icon: cz,
	},
];

export const SHOPS: { [K: string]: OptionItem[] } = {
	default: [
		{ id: "001", name: "Ebay", label: "ebay" },
		{ id: "002", name: "Amazon", label: "amazon" },
	],
	us: [
		{ id: "001", name: "Ebay", label: "ebay" },
		{ id: "002", name: "Amazon", label: "amazon" },
		{ id: "003", name: "6pm", label: "6pm" },
	],
	gb: [
		{ id: "001", name: "Ebay", label: "ebay" },
		{ id: "002", name: "Amazon", label: "amazon" },
		{ id: "003", name: "Uniqlo", label: "uniqlo" },
		{ id: "004", name: "Adidas", label: "adidas" },
	],
	de: [
		{ id: "001", name: "Ebay", label: "ebay" },
		{ id: "002", name: "Amazon", label: "amazon" },
		{ id: "003", name: "Zalando", label: "zalando" },
		{ id: "004", name: "Zara", label: "zara" },
	],
	it: [
		{ id: "001", name: "Ebay", label: "ebay" },
		{ id: "002", name: "Amazon", label: "amazon" },
		{ id: "003", name: "Kiko Milano", label: "kiko_milano" },
		{ id: "004", name: "Bershka", label: "bershka" },
	],
	pl: [
		{ id: "001", name: "Zara", label: "zara" },
		{ id: "002", name: "Amazon", label: "amazon" },
		{ id: "003", name: "Alegro", label: "alegro" },
		{ id: "004", name: "Aliexpress", label: "aliexpress" },
	],
	fr: [
		{ id: "001", name: "Zara", label: "zara" },
		{ id: "002", name: "Amazon", label: "amazon" },
		{ id: "003", name: "Ebay", label: "ebay" },
		{ id: "004", name: "Aliexpress", label: "aliexpress" },
	],
	es: [
		{ id: "001", name: "Zara", label: "zara" },
		{ id: "002", name: "Amazon", label: "amazon" },
		{ id: "003", name: "Massimo Dutti", label: "massimo_dutti" },
		{ id: "004", name: "Alegro", label: "Alegro" },
	],
	tr: [
		{ id: "001", name: "LcWaikiki", label: "lcwaikiki" },
		{ id: "002", name: "Amazon", label: "amazon" },
		{ id: "003", name: "Ebebek", label: "ebebek" },
		{ id: "004", name: "Koton", label: "koton" },
	],
	cz: [
		{ id: "001", name: "4Home", label: "4home" },
		{ id: "002", name: "Rokino", label: "rokino" },
		{ id: "003", name: "Patro", label: "patro" },
		{ id: "004", name: "GlobalMoto", label: "global_moto" },
	],
};

export const CURRENCY: { [key: OptionItem["id"]]: { value: string; symbol: string } } = {
	us: { value: "usd", symbol: "$" },
	gb: { value: "gbp", symbol: "£" },
	de: { value: "eur", symbol: "€" },
	it: { value: "eur", symbol: "€" },
	pl: { value: "eur", symbol: "€" },
	fr: { value: "eur", symbol: "€" },
	es: { value: "eur", symbol: "€" },
	tr: { value: "usd", symbol: "$" },
	cz: { value: "eur", symbol: "€" },
};

// to Euro
export const CURRENCY_CONVERSION_RATES: CurrencyRate = {
	usd: { rate: 0.92 },
	eur: { rate: 1 },
	gbp: { rate: 1.14 },
};
