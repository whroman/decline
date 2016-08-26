import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'future-perfect',
    'future-simple',
    ['present-simple', 'passive-voice']
];

export default function () {
    const props = {
        title: 'Future Perfect, Future Imperfect and Passive Simple Present Tenses',
        subtitle: 'They all require "werden"!',
        tags
    };
    return (<BasePage { ...props } />);
}
