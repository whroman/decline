import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'vor',
    'bevor'
];

export default function () {
    const props = {
        title: 'Vor, Bevor, Davor, Vorher',
        subtitle: '"vor" is a preposition, "bevor" is a subjunctive conjunction, and "davor" and "vorher" are adverbs.',
        tags
    };
    return (<BasePage { ...props } />);
}
