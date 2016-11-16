import React from 'react';
import BasePage from '../BasePage';

const tags = [
    ['present-perfect', 'passive-voice'],
    ['future-perfect', 'passive-voice'],
    ['past-perfect', 'passive-voice']
];

export default function () {
    const props = {
        title: 'Perfect Tenses in the Passive Voice',
        subtitle: 'They all require "worden"!',
        tags
    };
    return (<BasePage { ...props } />);
}
