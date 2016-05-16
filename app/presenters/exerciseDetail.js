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
    'menschen',
    'familie',
    'tiere'
];


export default function presentPhrase (phrase) {
    const { noun, article, text } = phrase;
    const present = {
        answer:       text,
        objectGender: OBJECTS_GENDERS[noun.gender],
        articleType: ARTICLE_TYPES[article.type],
        aufEnglish: noun.enText,
        categories: noun.categories.map((id) => CATEGORIES[id])
    }
    return present;
}
