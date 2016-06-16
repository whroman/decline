const generator = (set) => [
    'Ich '  + set[0],
    'Du '   + set[1],
    'Er '   + set[2],
    'Sie '  + set[3],
    'Wir '  + set[4],
    'Ihr '  + set[5],
    'Sie '  + set[6],
];

const accusativeBeginnings = generator([
    'möchte',
    'möchtest',
    'möchte',
    'möchte',
    'möchten',
    'möchtet',
    'möchten'
]).concat(generator([
    'will',
    'willst',
    'will',
    'will',
    'wollen',
    'wollt',
    'wollen'
])).concat(generator([
    'habe',
    'hast',
    'hat',
    'hat',
    'haben',
    'habt',
    'haben',
])).concat(generator([
    'sehe',
    'siehst',
    'sieht',
    'sieht',
    'sehen',
    'seht',
    'sehen',
])).concat(generator([
    'höre',
    'hörst',
    'hört',
    'hört',
    'höben',
    'hört',
    'höben',
]));

export default accusativeBeginnings;