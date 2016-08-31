import React from 'react';
import BasePage from '../BasePage';
import twoWayPrepositions from './twoWayPrepositions'
import accusativePrepositions from './accusativePrepositions'

export default function () {
    const props = {
        title: 'Accusative Prepositions',
        subtitle: accusativePrepositions.map((text) => `"${text}"`).join(', '),
        tags: accusativePrepositions
    };
    return (<BasePage { ...props } />);
}
