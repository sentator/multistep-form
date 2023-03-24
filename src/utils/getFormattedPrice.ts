export const getFormattedPrice = (value: number | undefined, currencySymbol: string | undefined): string => {
	return !!value ? value.toFixed(2) + (!!currencySymbol ? ` ${currencySymbol}` : "") : "";
};
