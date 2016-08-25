import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'erfahren',
    'wissen',
    'wussten',
    'glauben',
    'glaubten',
    'denken'
];



export default function () {
    const props = {
        title: 'Knowledge Verbs',
        subtitle: tags.map((text) => `"${text}"`).join(', '),
        tags
    };
    return (<BasePage { ...props } />);
}
