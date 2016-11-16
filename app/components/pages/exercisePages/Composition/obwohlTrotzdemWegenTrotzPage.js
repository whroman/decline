import React from 'react';
import BasePage from '../BasePage';

const tags = [
    ', obwohl',
    ', trotzdem',
    'trotzdem',
    'wegen',
    'trotz'
];

export default function () {
    const props = {
        title: 'Obwohl, Trotzdem, Wegen and Trotz',
        subtitle: '"Even though" and "Despite" as prepositions and as conjunctions.',
        tags
    };
    return (<BasePage { ...props } />);
}
