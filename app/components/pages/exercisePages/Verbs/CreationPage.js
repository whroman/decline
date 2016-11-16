import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'erschaffen',
    'schaffen',
    'kreieren',
    'erstellen'
];

export default function () {
    const props = {
        title: 'Creation Verbs',
        subtitle: tags.map((text) => `"${text}"`).join(', '),
        tags: tags.reduce((arr, text) => {
            return arr.concat(text, `-${text}`);
        }, [])
    };
    return (<BasePage { ...props } />);
}
