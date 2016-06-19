import nounCategories from 'tables/nouns/categories/data';

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

const CATEGORIES = nounCategories.map((item) => item.translations.deu );

export default function presentPhrase (phrase) {
    const { statement, noun, article, adjective } = phrase;
    const answer = statement.map((item) => {
        return item.value || item.text;
    }).join('');

    const present = {
        answer,
        objectGender: OBJECTS_GENDERS[noun.gender],
        objectEnglish: noun.translations.eng.join(', '),
        adjEnglish: adjective.translations.eng.join(', '),
        articleType: ARTICLE_TYPES[article.type],
        categories: noun.categories.map((id) => CATEGORIES[id]).join(', ')
    };

    return present;
}
