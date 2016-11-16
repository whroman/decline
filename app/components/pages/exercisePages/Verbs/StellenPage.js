import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'stellen',
    '-stellen',
    'stehen',
    '-stehen',
    'liegen',
    '-liegen',
    'legen',
    '-legen'
];

export default function () {
    const props = {
        title: 'Uses of "stellen", "stehen", "legen", "liegen"',
        tags
    };
    return (<BasePage { ...props } />);
}
