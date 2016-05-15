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
    console.log(phrase);
    const { noun, article, text } = phrase;
    console.log(phrase);
    const present = {
        answer:       text,
        objectGender: OBJECTS_GENDERS[noun.gender],
        articleType: ARTICLE_TYPES[article.type]
    }
    return present;
}

