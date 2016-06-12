import getRandomItem from './../../util/getRandomItem';
import nouns from 'tables/nouns/data';

import WordChunk from 'generator/WordChunk/WordChunk';

const dipthongs = [
    'ai',
    'au',
    'äu',
    'ei',
    'eu',
    'ie'
];

const syllableIndicators = dipthongs.concat([
    'a', 'e', 'i', 'o', 'u', 'ä', 'ö', 'ü'
]);

function getNumberOfSyllables (str) {
    const numberOfSyllables = syllableIndicators.reduce((memo, syllable) => {
        const exists = str.toLocaleLowerCase().indexOf(syllable) > -1;
        const modifier = exists ? 1 : 0;
        if (exists) {
            str = str.replace(syllable, '');
        }

        return memo + modifier;
    }, 0);

    return numberOfSyllables
}

export default class Noun {

    constructor ({ root, gender, translations={}, categories=[] }) {
        Object.assign(this, { root, gender, translations, categories });
    }

    static random ({ gender, category }) {
        const filteredNouns = nouns
            .filter((noun) => {
                if (typeof gender !== 'string') return true;
                const nounBelongs = noun.gender === gender;
                return nounBelongs;
            })
            .filter((noun) => {
                if (typeof category !== 'string') return true;
                const nounBelongs = noun.categories.includes(category);
                return nounBelongs;
            });

        const filteredNoun = getRandomItem(filteredNouns);
        const props = {
            root: filteredNoun.text,
            gender: filteredNoun.gender,
            translations: filteredNoun.translations,
            categories: filteredNoun.categories
        };
        const noun = new Noun(props);
        return noun;
    }

    conjugate (grammarCase) {
        const { gender } = this;
        let nounText = this.root;

        const finalLetter = nounText[nounText.length - 1];
        const isMasculine = gender === '0';
        const isNeuter = gender === '2';
        const isPlural = gender === '3';
        const isNominative = grammarCase === '0';
        const isDative = grammarCase === '2';
        const isGenitive = grammarCase === '3';

        const isStrongMaleNoun = isMasculine && finalLetter === 'e';

        if (isStrongMaleNoun && !isNominative) {
            nounText += 'n';
        } else {
            /*
                For plural nouns in the dative case,
                all nouns which do not already have an -n or -s ending add -n.
            */
            if (isDative) {
                if (isPlural) {
                    if (finalLetter !== 's' && finalLetter !== 'n') {
                        nounText += 'n';
                    }
                }
            }

            /*
                Personal names, all neuter and most masculine nouns have genitive case -(e)s endings:
                    normally -es if one syllable long, -s if more.
            */

            if (isGenitive) {
                if (isMasculine || isNeuter) {
                    if (getNumberOfSyllables(nounText) === 1) {
                        nounText += 'e';
                    }
                    nounText += 's';
                }
            }
        }


        return nounText;
    }

    compose (grammarCase) {
        const text = this.conjugate(grammarCase);
        const composition = {
            gender: this.gender,
            translations: this.translations,
            chunks: [
                new WordChunk(text)
            ]
        };

        return composition;
    }
}
