const OBJECTS_GENDERS = [
    'Maskuline',
    'Feminin',
    'Neuter',
    'Plural'
];

const ARTICLE_TYPES = [
    'Definit',
    'Indefinit',
    'Kein',
    'Possesiv'
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
