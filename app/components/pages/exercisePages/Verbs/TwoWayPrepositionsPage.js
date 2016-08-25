import React from 'react';
import BasePage from '../BasePage';
import twoWayPrepositions from './twoWayPrepositions'

const tags = twoWayPrepositions;


export default function () {
    const props = {
        title: 'Two-Way Prepositions',
        subtitle: twoWayPrepositions.map((text) => `"${text}"`).join(', '),
        tags
    };
    return (<BasePage { ...props } />);
}
