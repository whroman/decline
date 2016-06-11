import adjectives from 'tables/adjectives/data';
import Adjective from './../Words/Adjective/Adjective';
import getRandomItem from './../util/getRandomItem';

export default function randomAdjective () {
    const foo = getRandomItem(adjectives);
    const adj = new Adjective({
        root: foo.text,
        translations: foo.translations
    });

    return adj;
}