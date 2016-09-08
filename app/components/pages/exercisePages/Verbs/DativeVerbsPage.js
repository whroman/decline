import React from 'react';
import BasePage from '../BasePage';

const verbs = [
    'antworten',
    'danken',
    'fehlen',
    'folgen',
    'gefallen',
    'gehören',
    'glauben',
    'helfen',
    'passieren',
    'verzeihen',
    'begegnen',
    'bleiben',
    'gratulieren',
    'nützen',
    'drohen',
    'passen',
    'raten',
    'schaden',
    'schmecken',
    'erlauben',
    'einfallen',
    'trauen',
    'gleichen',
    'verboten'
];

const tags = verbs.reduce((memo, item) => {
    memo.push(
        ['pronoun-dative', item],
        ['pronoun-dative', `-${item}`]
    );
    return memo;
}, []);

const subtitle = 'These verbs include: ' + verbs.map(item => `"${item}"`).join(', ');

export default function () {
    const props = {
        title: 'Verbs with Dative Direct Objects',
        subtitle,
        tags
    };
    return (<BasePage { ...props } />);
}
