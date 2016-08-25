import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'sprechen',
    '-sprechen',
    'erklären',
    'erzählen',
    '-rufen',
    'sagen',
    '-sagen',
    'nennen'
]



export default function () {
    const props = {
        title: 'Speech Verbs',
        subtitle: [
            'sprechen',
            'erklären',
            'erzählen',
            'sagen',
            'rufen',
            'nennen'
        ].map((text) => `"${text}"`).join(', '),
        tags
    };
    return (<BasePage { ...props } />);
}
