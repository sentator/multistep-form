export const getYearsFromRange = (startYear: number, endYear: number) => {
	return new Array(endYear - startYear).fill(null).map((d, i) => i + startYear);
};
