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

const CATEGORIES = [
    'Menschen',
    'Familie',
    'Tiere',
    'Körper',
    'Kinder aufziehen'
];

export default function presentPhrase (phrase) {
    const { noun, article, text, adjective } = phrase;
    const present = {
        answer:       text,
        objectGender: OBJECTS_GENDERS[noun.gender],
        objectEnglish: noun.enText,
        adjEnglish: adjective.en,
        articleType: ARTICLE_TYPES[article.type],
        categories: noun.categories.map((id) => CATEGORIES[id])
    }
    return present;
}
