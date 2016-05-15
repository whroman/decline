const OBJECTS_GENDERS = [
    'Maskulin',
    'Feminin',
    'Neutrum',
    'Plural'
];

const ARTICLE_TYPES = [
    'Definitiv',
    'Indefinit',
    'Ohne',
    'Possessiv'
];

export default function presentPhrase (phrase) {
    const { noun, article, text } = phrase;
    const present = {
        answer:       text,
        objectGender: OBJECTS_GENDERS[noun.gender],
        articleType: ARTICLE_TYPES[article.type]
    }
    return present;
}
