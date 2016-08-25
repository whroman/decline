import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'pronoun-dative',
    'pronoun-accusative'
];



export default function () {
    const props = {
        title: 'Accussative and Dative Pronouns',
        tags
    };
    return (<BasePage { ...props } />);
}
