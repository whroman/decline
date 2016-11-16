import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'sprechen',
    'erklären',
    'erzählen',
    'sagen',
    'rufen',
    'nennen'
];

export default function () {
    const props = {
        title: 'Speech Verbs',
        subtitle: tags.map((text) => `"${text}"`).join(', '),
        tags: tags.reduce((arr, text) => {
            return arr.concat(text, `-${text}`);
        }, [])
    };
    return (<BasePage { ...props } />);
}
