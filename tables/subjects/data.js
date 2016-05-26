// const SUBJECT_TYPES = [
//     'ich',
//     'du',
//     'es',
//     'sie',
//     'ihr'
// ];

const RAW_SUBJECTS = [
    [
/*      DE      EN */
        'hier', 'here',
/*      Types   Genders */
        ['2', '3'], ['0', '1', '2', '3']
    ],
    [
        'dort', 'over there',
        ['2', '3'], ['0', '1', '2', '3']
    ],
    [
        'das', 'that',
        ['2'], ['0', '1', '2']
    ],
    [
        'das', 'those',
        ['3'], ['3']
    ],
    [
        'er', 'he',
        ['2'], ['0']
    ],
    [
        'sie', 'she',
        ['2'], ['1']
    ],
    [
        'es', 'it',
        ['2'], ['2']
    ],
    [
        'sie', 'they',
        ['2'], ['3']
    ],
    [
        'Sie', 'you (formal)',
        ['3'], ['3']
    ],
    [
        'wir', 'we',
        ['3'], ['3']
    ],
    [
        'ihr', 'you all',
        ['3'], ['3']
    ],
];

class Subject {
    constructor (deText, enText, types, genders) {
        Object.assign(this, { deText, enText, types, genders});
    }
}

const subjects = RAW_SUBJECTS.map((subject) => new Subject(...subject));

export default subjects;