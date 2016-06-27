import create from './beginningGenerator';

const accusativeBeginnings = create([
    'möchte',
    'möchtest',
    'möchte',
    'möchte',
    'möchten',
    'möchtet',
    'möchten'
]).concat(create([
    'will',
    'willst',
    'will',
    'will',
    'wollen',
    'wollt',
    'wollen'
])).concat(create([
    'habe',
    'hast',
    'hat',
    'hat',
    'haben',
    'habt',
    'haben',
])).concat(create([
    'sehe',
    'siehst',
    'sieht',
    'sieht',
    'sehen',
    'seht',
    'sehen',
])).concat(create([
    'höre',
    'hörst',
    'hört',
    'hört',
    'hören',
    'hört',
    'hören',
]));

export default accusativeBeginnings;