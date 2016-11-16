import React from 'react';
import BasePage from '../BasePage';
import twoWayPrepositions from './twoWayPrepositions'

const subtitle = [
    'Whether the preposition takes the Accusative or Dative depends on the context!',
    'These prepositions are:',
    twoWayPrepositions.map((text) => `"${text}"`).join(', ')
].join(' ');

export default function () {
    const props = {
        title: 'Two-Way Prepositions',
        subtitle,
        tags: twoWayPrepositions
    };
    return (<BasePage { ...props } />);
}
