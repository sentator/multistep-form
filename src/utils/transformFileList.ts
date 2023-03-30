export const transformFileList = (value: FileList | null): File[] => {
	return value ? Array.from(value) : [];
};
