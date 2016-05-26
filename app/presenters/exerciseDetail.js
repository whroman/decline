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
    const { gender, translations, categories, adjectiveInstances, articleInstance } = phrase.noun;
    const statement = phrase.statement.map((item) => {
        if (!item.chunks) return item.text
        const text = item.chunks
            .map((chunk) => chunk.text)
            .join('')
        return text;
    }).join(' ');

    const answer = `${phrase.start}${statement}.`;

    const present = {
        answer,
        objectGender: OBJECTS_GENDERS[gender],
        objectEnglish: translations.eng.join(', '),
        adjEnglish: adjectiveInstances[0].translations.eng.join(', '),
        articleType: ARTICLE_TYPES[articleInstance.type],
        categories: categories.map((id) => CATEGORIES[id]).join(', ')
    }
    return present;
}
