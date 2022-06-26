export const titleCase = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const pluarlize = (word: string) => {
	return word.slice(-1) === 's' ? word : `${word}s`;
};

export const titleCasePlural = (word: string) => {
	return `${titleCase(word)}s`;
};
