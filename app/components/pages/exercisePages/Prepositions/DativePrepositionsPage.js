import React from 'react';
import BasePage from '../BasePage';
import dativePrepositions from './dativePrepositions'

export default function () {
    const props = {
        title: 'Dative Prepositions',
        subtitle: dativePrepositions.map((text) => `"${text}"`).join(', '),
        tags: dativePrepositions
    };
    return (<BasePage { ...props } />);
}
