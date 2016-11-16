import React from 'react';
import BasePage from '../BasePage';
import genitivePrepositions from './genitivePrepositions'

export default function () {
    const props = {
        title: 'Genitive Prepositions',
        subtitle: genitivePrepositions.map((text) => `"${text}"`).join(', '),
        tags: genitivePrepositions
    };
    return (<BasePage { ...props } />);
}
