const dipthongs = [
    'ai',
    'au',
    'äu',
    'ei',
    'eu',
    'ie'
];

const syllableIndicators = dipthongs.concat([
    'a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'ü'
]);

export default function getNumberOfSyllables (str) {
    const numberOfSyllables = syllableIndicators.reduce((memo, syllable) => {
        const re = new RegExp(syllable,"gi");
        const matches = (str.match(re) || []).length;
        str = str.replace(re, '');

        return memo + matches;
    }, 0);

    return numberOfSyllables;
}
