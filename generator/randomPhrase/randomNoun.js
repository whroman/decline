import getRandomItem from './../util/getRandomItem';
import nouns from 'tables/nouns/data';
import Noun from './../Words/Noun/Noun';

export default function getRandomNoun ({ gender, category }) {
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
