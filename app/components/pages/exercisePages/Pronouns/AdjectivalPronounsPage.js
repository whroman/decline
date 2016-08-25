import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'all',
    'dies',
    'jed',
    'jen',
    'manch',
    'solch',
    'welch'
];



export default function () {
    const props = {
        title: 'Adjectival Pronouns',
        tags
    };
    return (<BasePage { ...props } />);
}
